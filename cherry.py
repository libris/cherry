#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os, io, re
from os.path import isfile, join
import json
from flask import (Flask, render_template, request, make_response, Response, abort, send_file, session, redirect, jsonify)
import jinja2
import requests
import urllib
import hashlib
from datetime import timedelta, datetime, date
import time
import calendar
from itsdangerous import URLSafeTimedSerializer
import string
import random
import sys
from traceback import print_last
import pprint
import collections
import operator
#from whelk import Storage, Record
from external import Twitter, Google, all_trends
from elasticsearch import Elasticsearch
import search
from nltk.metrics import edit_distance
from os.path import commonprefix

pp = pprint.PrettyPrinter(indent=1)
#es = Elasticsearch('localhost', sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)

app = Flask(__name__)
app.config.from_pyfile('config.cfg')
app.secret_key = app.config.get('SESSION_SECRET_KEY')
app.remember_cookie_duration = timedelta(days=31)
app.permanent_session_lifetime = timedelta(days=31)


#app.config.from_object(__name__)

es = Elasticsearch(app.config['ELASTIC_HOST'], sniff_on_start=True, sniff_on_connection_fail=True, sniff_timeout=60, sniffer_timeout=300, timeout=30)
#storage = Storage(host=app.config['DATABASE_HOST'], database=app.config['DATABASE_NAME'], user=app.config['DATABASE_USER'], password=app.config['DATABASE_PASSWORD'])
twitter = Twitter(access_token=app.config['TWITTER_ACCESS_TOKEN'],
                  access_token_secret=app.config['TWITTER_ACCESS_TOKEN_SECRET'],
                  consumer_key=app.config['TWITTER_CONSUMER_KEY'],
                  consumer_secret=app.config['TWITTER_CONSUMER_SECRET'])
google = Google()

JSON_LD_MIME_TYPE = 'application/ld+json'#Obsolete?

def json_response(data):
    return json.dumps(data), 200, {'Content-Type':'application/json'}

@app.route('/api/search')
def api_search():
    """Search with q by excerpt: text, name, or record: title or creator. 
    Searching record and excerpt.
    Returns hitlist, aggregation: family name, text.bigrams
    Used for: nothing yet.
    """
    print("search")
    q = request.args.get('q')#fritext
    t = request.args.get('t')#titel
    c = request.args.get('c')#creator

    sort = request.args.get('sort')
    n = 50
    precision = 'y'


    qq = {'filtered' : {
        'query':{ 
            "bool": {
                "should": [],
                "must": []
            }
        }    
    }
    } if (q or t or c) and q != '*' else { "match_all": {} }

    if q:
        qq['filtered']['query']['bool']['should'].append({ 
            "has_child": {
                        "type": ["excerpt"],
                        "query": {

                            "query_string" : {
                                "fields" : ["text", "name"],
                                "default_operator" : "AND",
                                "query" : q,

                            }
                        }
                    }
            })

    if t:
        qq['filtered']['query']['bool']['must'].append({
            "query_string": {
                "fields": ["title"],
                "default_operator": "AND",
                "query": t
                }
        })
    if c:
        qq['filtered']['query']['bool']['must'].append({
            "query_string": {
                "fields": ["creator.familyName", "creator.givenName"],
                "default_operator": "AND",
                "query": c
                }
        })
    query = {
        #"_source" : ['_id', 'name', '@id', 'creator', 'title'],
        "fields": ["_source", "highlight"],
        "sort" : [],
        "size" : 75,

        "query" : qq,


        "aggs": {
            "creator" : {"terms" : {"field" : "creator.familyName", "size": 10}},
            "child_content": {
                "children": {"type": "annotation"},
        "aggs" : {
            "unigrams" : {"significant_terms" : {"field" : "text", "size": 50, "gnd": {}}},
            "bigrams" : {"significant_terms" : {"field" : "text.bigrams", "size": 50, "gnd": {}}},


        }}},
        "highlight" : { "fields" : {"creator.familyName": {  
                                        "fragment_size": 100,
                                        "number_of_fragments": 3,
                                        "force_source": 'true'
                                    },
                                    "aggregations.text.bigrams": {  
                                        "fragment_size": 100,
                                        "number_of_fragments": 3,
                                        "force_source": 'true'
                                    }},
                       "pre_tags" : ["</em>"],
                       "post_tags" : ["</em>"],
                      }



    }
    if request.args.get('n'):
        print("n")
        n = int(request.args.get('n'))
        query['size'] = str(n)

    if request.args.get('page'):
        print("page")
        query['from'] = n * int(request.args.get('page'))



    if request.args.get('f'):
        query['_source'] = request.args.get('f').split(',')

    t0 = time.time()
    app.logger.debug("about to search")
    #HERE is the elastic search call
    r = es.search(body=query, index=app.config['CHERRY'], doc_type='record')
    app.logger.debug("did search {0}".format(time.time() - t0))
    return json.dumps(r)

    rtext = r
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return json.dumps(err)


    #rtext["hits_total"] = rtext["hits"]["total"]
    #return jsonify(rtext)
    return json.dumps(rtext)


def find_children(doc_type, parent_id):
    query = {
        "query": {
            "has_parent" : {
                "parent_type" : "record",
                "query" : {
                    "term" : {
                        "_id" : parent_id
                    }
                }
            }
        }
    }
    result = es.search(body=query, doc_type=doc_type, index=app.config['CHERRY'])
    return [hit['_source'] for hit in result.get('hits', {}).get('hits', [])]

def find_preferred_cover(ident):
    images = find_children('cover', ident)
    url = None
    for image in images:
        if not url:
            url = {"@type":"CoverArt","url":image['coverArt'],"height":image['height'],"width":image['width']}
        if image['annotationSource']['name'] == "Smakprov":
            # Found preferred image
            url = {"@type":"CoverArt","url":image['coverArt'],"height":image['height'],"width":image['width']}

    return url

@app.route('/api/flt')
def api_flt():
    size = request.args.get('size',75)
    items = []
    query = request.args.get('q')
    num_related = request.args.get('n')
    ident = request.args.get('i')
    if num_related:
        num_related = int(num_related)
    else:
        num_related = 2
    excluded_ids = [ident.replace("/", "") for ident in request.args.get('exclude','').split(",")]
    #^^flt with related
    #vv assemble
    if ident:
        excluded_ids.append(ident)

    result = search.do_flt_query(es, request.args, index_name=app.config['CHERRY'])
    return json.dumps(result)
    qmeta = {"executed":query, "relatedPhrases":get_related_phrases_from_query_result(result, query)}

    for hit in result.get('hits',{}).get('hits',[]):
        ident = hit['fields']['_parent']
        cover_art_url = find_preferred_cover(ident)
        if cover_art_url and not ident in excluded_ids:
            parent_record = es.get_source(index=app.config['CHERRY'],doc_type='record',id=ident)
            hitlist_record = {
                              '@id': parent_record['@id'],
                              'identifier': ident,
                              'title': parent_record['title'],
                              'creator': parent_record['creator']
                             }
            hitlist_record['annotation'] = [hit['_source']]
            if cover_art_url: 
                hitlist_record['coverArt'] = cover_art_url
            items.append(hitlist_record)
        excluded_ids.append(ident)

    return json_response({ "@context":"/cherry.jsonld", "query":qmeta, "items":items })

@app.route('/api/suggest')
def api_suggest():
    """Suggests spelling corrections, not autocomplete.
    Searches record, field: author_title
    Returns list of suggestions, author_title.shingles.
    """
    q = request.args.get('q')
    precision = 'y'

    query = {
        "sort" : [],
        "size" : 75,

        #"query" : qq,

        "suggest" : {
            "text" : q,
            "simple_phrase" : {
                "phrase" : {
                    "field" : "author_title.shingles",
                    "size" : 2,
                    "real_word_error_likelihood" : 0.95,
                    "max_errors" : 3,
                    "gram_size" : 2,
                    "direct_generator" : [ {
                        "field" : "author_title.shingles",
                        "suggest_mode" : "popular",
                        "min_word_length" : 1
                    } ],
                }
            }
        },


    }


    t0 = time.time()
    r = es.search(body=query, index=app.config['CHERRY'], doc_type='record')
    app.logger.debug("did search {0}".format(time.time() - t0))

    rtext = r
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return json.dumps(err)

    if rtext.get('suggest', 0):
        return json.dumps(rtext.get('suggest'))

    return json.dumps(rtext)


@app.route('/api/complete')
def api_complete():
    """Complete takes >= 3 chars, and returns a json list containing completed parts of phrase plus suggestions and the number of hits for each suggestion, sorted by frequency."""
    q = request.args.get('q')

    
    n = 500
    qq = {
        "match" : {
            "author_title.shingles": q
        }
        } if q and q != '*' else { "match_all": {} }
    query = {
            #"_source" : [ "highlight"],
            "query" : qq,
            "size": n,


            "highlight" : {
                "fields" : {
                    "author_title.shingles" : { "fragment_size": "50", "number_of_fragments" : 5,  "term_vector":"with_positions_offsets" }
                    }
                }}


    r = es.search(index=app.config['CHERRY'], body=query, doc_type='record')
    return json.dumps(r)
    highlights = []
    try:
        r = es.search(index=suggestIndex, body=query)
        return json.dumps(r)
        rtext = r
        if rtext.get('status', 0):
            err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
            err['exception'] = r.text

        if rtext.get('hits', {}).get('hits', None):
            try:
                for i, hit in enumerate(rtext.get('hits', {}).get('hits', [])):
                    try:
                        for j, c in enumerate(hit.get('highlight', {}).get('author_title.shingles', [])):
                            #[ highlights.append("{0} {1}".format(q_head,s.lower())) for s in re.findall('<em>(.*?)</em>', c) ]
                            [ highlights.append(q_head+' '+s.lower()) for s in re.findall('<em>(.*?)</em>', c) ]
                    except Exception as e:
                        app.logger.error("Enumerate fail: {0}".format(e))
                        continue
            except Exception as e:
                app.logger.error("Hits enumeration failed: {0}".format(e))
    except Exception as e:
        app.logger.error("Search failed: {0}".format(e))

    hl_counter=collections.Counter(highlights)
    hl_sorted = sorted(
        hl_counter.iteritems(),
        key=operator.itemgetter(1),
        reverse=True
    )[:10]
    return json.dumps({"suggestions": hl_sorted})
    return json.dumps({"suggestions": list(set(highlights))})

@app.route('/api/blogtrends')
def api_blogtrends():
    """Måste välja ett subset av alla dokument för att significant_terms ska bli meningsfullt.
    Takes no arguments, returns significant terms from last week of blog posts.
    """
    query = {
        "query": {
            "constant_score" : {
                "filter" : {
                    "range" : {
                        "created" : {
                            "gte": "now-7d",
                            "lte": "now"
                        }
                    }
                }
            }
        },
        "aggs" : {
            "bigrams" : {"significant_terms" : {"field" : "text.bigrams", "size": 3000, "gnd": {}}},
    }
    }

    r = es.search(body=query, index=app.config['CHERRY'], doc_type='blog')
    #return json.dumps(r)

    u = get_related_phrases_from_query_result(r, " ")
    u = [w for w in u if len(w.split(" ")) > 1]
    return json.dumps({"items": u})

@app.route('/api/related')
def api_related():
    return json_response(do_related_query(request.args.get('q')))

def prefix_diff(l):
    bigrams = [s for s in l if len(s.split(" ")) > 1] #any of the strings is a bigram
    if bigrams:
        common = [a for a in l[0].split(" ") if a in l[1].split(" ")]
        if common:
            return 0
        else:
            return 4


    l.sort(key=len)
    return len(l[-1][len(commonprefix(l)):])

def get_related_phrases_from_query_result(rtext, q):
    t0 = time.time()
    rel_terms = rtext.get('aggregations', {}).get('bigrams', {}).get('buckets', [])
    unique = []
    if rel_terms:
        #unique = [i["key"] for i in rel_terms if not i["key"].isdigit() and prefix_diff([i["key"], q]) > 3]
        for i in rel_terms:
            k = i["key"].strip()
            if not k.isdigit() and prefix_diff([q, k]) > 3:
                #unique.append(k)
                ok = True
                for u in unique:
                    if prefix_diff([k, u]) < 4:
                        print("{0} not ok because {1}".format(k, u))
                        ok = False
                if ok:
                    unique.append(k)


        #unique = list(set([cleanup(i["key"]) for i in rel_terms if q not in i["key"]]))
        print("unique: ",unique)
    print("elapsed", time.time()-t0)
    return unique


def do_related_query(q):
    """Search by q, record - author_title, and annotation - text
    Return aggs: significant terms, cleaned up by get_related_phrases_from_query_result-method.
    """
    print("related")
    precision = 'y'


    query = {
        "size": 0,
        "query" : { "filtered": { "query": { 
            "bool": {
                "should": [
                    {"has_parent" : {
                        "parent_type" : "record",
                        "query" : {
                            "query_string": {
                                "default_field" : "author_title",
                                "default_operator" : "AND",
                                "query" : "{0}".format(q)
                            }
                        }
                    }},
                    {"flt": {
                        "fields": ["text"],
                        "like_text": q,
                        "max_query_terms": 10,
                        "prefix_length": 4
                    }},
                ]


        }}}},

        "aggs" : {
            #"unigrams" : {"significant_terms" : {"field" : "text.unigrams", "size": 30, "gnd": {}}},
            "bigrams" : {"significant_terms" : {"field" : "text.bigrams", "size": 30, "gnd": {}}},
        }

    }


    t0 = time.time()
    #HERE is the elastic search call
    r = es.search(body=query, index=app.config['CHERRY'], doc_type='annotation')
    app.logger.debug("did search {0}".format(time.time() - t0))
    #return r

    rtext = r
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return err

    return {"items": get_related_phrases_from_query_result(rtext, q) }

@app.route('/api/children')
def api_children():
    q = request.args.get('q')
    qq = {
        "has_child" : {
            "type": "annotation",
            "query" : {
                "query_string" : {
                    "default_field" : "text",
                    "default_operator" : "AND",
                    "query" : q,
                }
            }

        }
    } if q and q != '*' else {}
    query = {
        "fields": ["_parent",],
        "_source": ["creator", "isbn"],
        "query": qq,


        "aggs": {
            "parent_id": {
                "terms": { 
                    "field": "_parent",
                    "size": 50
                },
                "aggs": {
                    "comments": {
                        "terms": { 
                            "field":"annotationSource.name",
                        },
                    }
                }
            }
        }

    }
    r = es.search(body=query, index=app.config['CHERRY'], doc_type='record')
    #r = es.search(body=query, index=app.config['CHERRY'])
    return json.dumps(r)

@app.route('/api/trending')
def api_trending():
    t0 = time.time()
    try:
        with open('trending_topics.txt', encoding='utf-8') as f:
            topics = eval(f.read())
    except Exception as e:
        print("No trend file found. Loading (unchecked) from scratch.")
        topics = all_trends(google, twitter)

    return json_response({"items": topics, "duration": "PT{0}S".format(time.time() - t0)})


@app.route('/api/json')
def api_json():
    """For dev purposes only."""
    return raw_json_response(api_search())

@app.route('/api/bok')
def load_record_by_query():
    return load_record_with_all_children(request.args.get('q'))

@app.route('/bok/<path:recordpath>')
def load_record_with_all_children(recordpath):
    print("recordpath", recordpath)
    ident = recordpath.replace("/", "")
    record = es.get_source(index=app.config['CHERRY'], doc_type='record', id=ident)
    if record:
        record['identifier'] = ident
        record['annotation'] = find_children('annotation', ident)
        record['excerpt'] = find_children('excerpt', ident)
        record['coverArt'] = find_children('cover', ident)

        return json_response(record)
    else:
        print("Resource {0} not found.".format(recordpath))
        abort(404)

@app.route('/xinfo/<path:xinfopath>')
def load_image(xinfopath):
    filename = "{0}.jpg".format(xinfopath.split("/")[0].split(":")[1])
    try:
        with open(join(app.config['XINFO_PATH'], filename), "rb") as imgfile:
            return send_file(io.BytesIO(imgfile.read()), attachment_filename=filename, mimetype="image/jpeg")
    except Exception as e:
        print("failed to load file {0}: {1}".format(filename, e))
        abort(404)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, 'hashes.json')
    try:
        hashes = json.load(open(json_url))
    except FileNotFoundError:
        hashes = {}
    return render_template('index.html', hashes=hashes) # TODO: import hashes.json for cachebusting


if __name__ == '__main__':
    app.debug = True #app.config['DEBUG']
    app.run(host=app.config['BIND_HOST'], port=app.config['BIND_PORT'])

