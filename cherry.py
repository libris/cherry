#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os, io, re
from os.path import isfile
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
from whelk import Storage, Record
from external import Twitter, Google, all_trends
from elasticsearch import Elasticsearch
from search import *

pp = pprint.PrettyPrinter(indent=1)
#es = Elasticsearch('localhost', sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)

app = Flask(__name__)
app.config.from_pyfile('config.cfg')
app.secret_key = app.config.get('SESSION_SECRET_KEY')
app.remember_cookie_duration = timedelta(days=31)
app.permanent_session_lifetime = timedelta(days=31)


#app.config.from_object(__name__)

es = Elasticsearch(app.config['ELASTIC_HOST'], sniff_on_start=True, sniff_on_connection_fail=True, sniff_timeout=60, sniffer_timeout=300, timeout=30)
storage = Storage(host=app.config['DATABASE_HOST'], database=app.config['DATABASE_NAME'], user=app.config['DATABASE_USER'], password=app.config['DATABASE_PASSWORD'])
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
                        "type": ["annotation"],
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
            "unigrams_gnd" : {"significant_terms" : {"field" : "text", "size": 50, "gnd": {}}},
            "unigrams" : {"significant_terms" : {"field" : "text.unigrams", "size": 50}},
            "bigrams_gnd" : {"significant_terms" : {"field" : "text.shingles", "size": 50, "gnd": {}}},
            "bigrams" : {"significant_terms" : {"field" : "text.shingles", "size": 50}},


        }}},
        "highlight" : { "fields" : {"creator.familyName": {  
                                        "fragment_size": 100,
                                        "number_of_fragments": 3,
                                        "force_source": 'true'
                                    },
                                    "aggregations.text.shingles": {  
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

#    if sort:
#        if sort == 'd':
#            query['sort'] = [{ "description" : "asc" }]
#
#        if sort == 's':
#            query['sort'] = [{ "summary" : "asc" }]
#


    if request.args.get('f'):
        query['_source'] = request.args.get('f').split(',')

    t0 = time.time()
    app.logger.debug("about to search")
    #HERE is the elastic search call
    r = es.search(body=query, index='cherry', doc_type='record')
    app.logger.debug("did search {0}".format(time.time() - t0))
    return json.dumps(r)

    rtext = r
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return json.dumps(err)

    if q and rtext.get('hits', {}).get('hits', None):
        for ch, hit in enumerate(rtext['hits']['hits']):
            for cs, s in enumerate(hit['highlight']['text']):
                a = re.sub('<[^>]*>', '', s)
                print(a)
                #rtext['hits']['hits'][ch]['highlight']['summary'][cs] = a

        try:
            for ch, hit in enumerate(rtext.get('hits', {}).get('hits', [])):
                try:
                    for cs, s in enumerate(hit.get('highlight', {}).get('text', [])):
                        a = re.sub('<[^>]*>', '', s)
                        print(a)
                        rtext['hits']['hits'][ch]['highlight']['text'][cs] = a
                except Exception as e:
                    app.logger.error("Highlights enumerate fail: {0}".format(e))
                    continue
        except Exception as e:
            app.logger.error("Hits enumeration failed: {0}".format(e))

    #rtext["hits_total"] = rtext["hits"]["total"]
    #return jsonify(rtext)
    return json.dumps(rtext)


def child_texts(p):
    query = {
        "_source": "text",
        "query": {
        "has_parent" : {
            "parent_type" : "record",
            "query" : {
                "term" : {
                    "_id" :p
                }
            }
        }
    } }
    r = es.search(body=query, index='cherry', doc_type='annotation')
    hits = r.get('hits', {}).get('hits', [])
    texts = ' '.join([hit.get('_source').get('text', []) for hit in hits])
    return texts

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
    result = es.search(body=query, doc_type=doc_type, index='cherry')
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


@app.route('/api/flt_records_with_related')
def api_flt_records_with_related():
    query = request.args.get('q')
    num_related = request.args.get('n')
    if num_related:
        num_related = int(num_related)
    else:
        num_related = 2
    excluded_ids = [ident.replace("/", "") for ident in request.args.get('exclude','').split(",")]
    print("excluded_ids", excluded_ids)

    t0 = time.time()
    #related = do_related_query(query)['items']
    #executed = ' '.join([query] + related[:num_related])
    flt = assemble_flt_records(query, excluded_ids)
    #flt['query'] = {'words':query,'relatedWords':related}
    flt['duration'] = "PT{0}S".format(time.time() - t0)

    return json_response(flt)

@app.route('/api/flt_records')
def api_flt_records():
    query = request.args.get('q')
    return json_response(assemble_flt_records(query))

def assemble_flt_records(query, excluded_ids=[]):
    print("assemble_flt_records. query:", query)
    items = []
    parent_ids = excluded_ids
    result = do_flt_query(es, size=50, q=query)
    qmeta = {"executed":query, "relatedWords":get_related_words_from_query_result(result, query)}

    for hit in result.get('hits',{}).get('hits',[]):
        ident = hit['fields']['_parent']
        cover_art_url = find_preferred_cover(ident)
        if cover_art_url and not ident in parent_ids:
            parent_record = es.get_source(index='cherry',doc_type='record',id=ident)
            hitlist_record = {
                              '@id': parent_record['@id'],
                              'title': parent_record['title'],
                              'creator': parent_record['creator']
                             }
            #hitlist_record['annotation'] = [hit['_source']]
            if cover_art_url: 
                hitlist_record['coverArt'] = cover_art_url
            items.append(hitlist_record)
        parent_ids.append(ident)

    return { "@context":"/cherry.jsonld", "query":qmeta, "items":items }


@app.route('/api/flt')
def api_flt():
    size = request.args.get('size',75)
    return json_response(do_flt_query(es, size=size, q=request.args.get('q'), doctype=request.args.get('doctype')))

def old_do_flt_query(size=75, qstr=None, doctype=None):
    """Will search annotations if no other doctype is given."""
    q = qstr if qstr else request.args.get('q')
    i = request.args.get('i')
    if not doctype:
        doctype=['annotation', 'excerpt']
    frm = request.args.get('from')
    to = request.args.get('to')
    sort = request.args.get('sort')
    t = request.args.get('t')#filter by type of annotation
    n = 50
    date_filter = []
    precision = 'y'

    print("Query on ", q)

    if i:
        try:
            q = child_texts(i)
        except:
            print("no record with id: ", i)
            return {"err": 1, "msg": "Ingen post med angivet id"}

    query = {
        "sort" : [],
        "size" : size,

        "query" :  {"flt": {
            "fields": ["text"],
            "like_text": q,
            "max_query_terms": 52,
            "prefix_length": 4
        }},

        #"fields": ["_parent", "name", "isPartOf.url", "text"],
        "fields": ["_parent"],
        #"_source" :[],
        #        "highlight" : { "fields" : { "summary" : {"type": "plain"}},
        #                        "pre_tags" : ["<1>"],
        #                        "post_tags" : ["<\/1>"],
        #                       "fragment_size": 100
        #                      },

        #min doc count might decrease risk of choosing misspellings, though throwing away rare occurrences of relevant synonyms - find a good threshold
        # don't calculate aggs for flt. that is handled by related.
        "aggs" : {
            "unigrams" : {"significant_terms" : {"field" : "text.unigrams", "size": 30, "gnd": {}}},
            #"bigrams" : {"significant_terms" : {"field" : "text.shingles", "size": 10, "gnd": {}}},
            #"bigrams_gnd" : {"significant_terms" : {"field" : "text.shingles", "size": 10}},


        }
    }
    if t:
        query['query'] = {
            "filtered": {
                "query": {
                    "flt": {
                        "fields": ["text"],
                        "like_text": q,
                        "max_query_terms": 52,
                        "prefix_length": 4
                    }
                },
                "filter": {
                    "and": [{ "isPartOf.@type": { "value": t}},]
                }
            }
        }

    if request.args.get('n'):
        print("n")
        n = int(request.args.get('n'))
        query['size'] = str(n)

    if request.args.get('page'):
        print("page")
        query['from'] = n * int(request.args.get('page'))
        print("the from", query['from'])




    if request.args.get('f'):
        query['_source'] = request.args.get('f').split(',')

    t0 = time.time()
    app.logger.debug("about to search")
    #HERE is the elastic search call
    #r = requests.post(app.config['ELASTIC_URI'] + '/_search?pretty=true', data = json.dumps(query))
    print("doc_type:",doctype)
    r = es.search(body=query, index='cherry', doc_type=doctype)
    app.logger.debug("did search {0} ({1} according to es)".format(time.time() - t0, r['took']))
    #print(r)
    return r

    rtext = json.loads(r.text)
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return err
    if rtext.get('hits', {}).get('hits', None):

        return rtext

    return rtext

@app.route('/api/suggest')
def api_suggest():
    """Suggests spelling corrections, not autocomplete."""
    q = request.args.get('q')
    precision = 'y'

    qq = {
        "query_string" : {
            "default_field" : "text",
            "default_operator" : "AND",
            "query" : q,

        }
    } if q and q != '*' else {}

    query = {
        "sort" : [],
        "size" : 75,

        #"query" : qq,

        "suggest" : {
            "text" : q,
            "simple_phrase" : {
                "phrase" : {
                    "field" : "text",#suggest multiple fields? _all?
                    "size" : 2,
                    "real_word_error_likelihood" : 0.95,
                    "max_errors" : 3,
                    "gram_size" : 2,
                    "direct_generator" : [ {
                        "field" : "text",
                        "suggest_mode" : "popular",
                        "min_word_length" : 1
                    } ],
                }
            }
        },


    }


    t0 = time.time()
    app.logger.debug("about to search")
    #HERE is the elastic search call
    r = es.search(body=query, index='cherry', doc_type='annotation')
    app.logger.debug("did search {0}".format(time.time() - t0))
    #return r.text

    rtext = r
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return json.dumps(err)

    if rtext.get('suggest', 0):
        return json.dumps(rtext.get('suggest'))

    return json.dumps(rtext)

def cleanup(s):
    noise_words_set = ["och", "är", "har", "en", "av", "för", "att", "med", "ger", "i"]
    print(s)
    stuff = ' '.join(w for w in s.split() if w not in noise_words_set)
    return stuff

@app.route('/api/related')
def api_related():
    return json_response(do_related_query(request.args.get('q')))

def get_related_words_from_query_result(rtext, q):
    t0 = time.time()
    rel_terms = rtext.get('aggregations', {}).get('unigrams', {}).get('buckets', [])
    unique = []
    if rel_terms:
        #unique = [t for t in rel_terms if q not in t]
        for i in rel_terms:
            if not i["key"].isdigit() and i["key"] not in q.split(): #and q not in i["key"]:
                w = cleanup(i["key"])
                ok = True
                for u in unique:
                    if w in u:
                        print("{0} not ok because {1}".format(w, u))
                        ok = False
                if ok:
                    unique.append(w)


        #unique = list(set([cleanup(i["key"]) for i in rel_terms if q not in i["key"]]))
        print("unique: ",unique)
    print("elapsed", time.time()-t0)
    return unique


def do_related_query(q):
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
                                "fields" : ["creator.familyName", "creator.givenName", "title"],
                                "default_operator" : "AND",
                                "query" : q
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
            "unigrams" : {"significant_terms" : {"field" : "text.unigrams", "size": 30, "gnd": {}}},
            #"bigrams" : {"significant_terms" : {"field" : "text.shingles", "size": 30, "gnd": {}}},
        }

    }


    t0 = time.time()
    #HERE is the elastic search call
    r = es.search(body=query, index='cherry', doc_type='annotation')
    app.logger.debug("did search {0}".format(time.time() - t0))
    return r

    rtext = r
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return err

    return {"items": get_related_words_from_query_result(rtext, q) }

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
    r = es.search(body=query, index='cherry', doc_type='record')
    #r = es.search(body=query, index='cherry')
    return json.dumps(r)

@app.route('/api/trending')
def api_trending():
    t0 = time.time()
    try:
        with open('trending_topics.txt', 'r') as f:
            topics = eval(f.read())
    except:
        print("No trend file found. Loading (unchecked) from scratch.")
        topics = all_trends(google, twitter)

    return json_response({"items": topics, "duration": "PT{0}S".format(time.time() - t0)})


@app.route('/api/json')
def api_json():
    """For dev purposes only."""
    return raw_json_response(api_search())

@app.route('/bok/<path:recordpath>')
def load_record_with_all_children(recordpath):
    print("recordpath", recordpath)
    ident = recordpath.replace("/", "")
    record = es.get_source(index='cherry', doc_type='record', id=ident)
    if record:
        record['annotation'] = find_children('annotation', ident)
        record['excerpt'] = find_children('excerpt', ident)
        record['coverArt'] = find_children('cover', ident)

        return json_response(record)
    else:
        print("Resource {0} not found.".format(recordpath))
        abort(404)

#@app.route('/xinfo/', defaults={'path': ''})
@app.route('/xinfo/<path:xinfopath>')
def load_image(xinfopath):
    record = storage.load("/xinfo/{0}".format(xinfopath), store='xinfo')
    if record:
        if record.entry['contentType'] in ['image/jpeg','image/jpg','image/png','image/gif']:
            return send_file(io.BytesIO(record.data), attachment_filename='image.jpg', mimetype=record.entry['contentType'])
        elif record.entry['contentType'] in ['application/json','application/ld+json']:
            datatext = bytes(record.data).decode('utf-8')
            return json.loads(datatext)
    else:
        print("Resource /xinfo/{0} was not found.".format(xinfopath))
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

