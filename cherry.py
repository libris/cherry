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

pp = pprint.PrettyPrinter(indent=1)
#es = Elasticsearch('localhost', sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)

app = Flask(__name__)
app.config.from_pyfile('config.cfg')
app.secret_key = app.config.get('SESSION_SECRET_KEY')
app.remember_cookie_duration = timedelta(days=31)
app.permanent_session_lifetime = timedelta(days=31)


#app.config.from_object(__name__)

es = Elasticsearch(app.config['ELASTIC_HOST'], sniff_on_start=True, sniff_on_connection_fail=True, sniff_timeout=60, timeout=10)
#storage = Storage(host=app.config['DATABASE_HOST'], database=app.config['DATABASE_NAME'], user=app.config['DATABASE_USER'], password=app.config['DATABASE_PASSWORD'])
twitter = Twitter(access_token=app.config['TWITTER_ACCESS_TOKEN'],
                  access_token_secret=app.config['TWITTER_ACCESS_TOKEN_SECRET'],
                  consumer_key=app.config['TWITTER_CONSUMER_KEY'],
                  consumer_secret=app.config['TWITTER_CONSUMER_SECRET'])
google = Google()

JSON_LD_MIME_TYPE = 'application/ld+json'#Obsolete?

@app.route('/')
@app.route('/search')
def index():
    return json.dumps("välkommen")



@app.route('/api/search')
def api_search():
    print("search")
    q = request.args.get('q')
    t = request.args.get('t')
    c = request.args.get('c')

    sort = request.args.get('sort')
    n = 50
    filters = []
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

        "aggs" : {"room" : {"terms" : {"field" : "creator.familyName"}}},

        "highlight" : { "fields" : {"creator.familyName": {  
                                        "fragment_size": 100,
                                        "number_of_fragments": 3,
                                        "force_source": 'true'
                                    },
                                    "creator.familyName": {  
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
 #   query['filter']['and']['filters'] = filters


    if request.args.get('f'):
        query['_source'] = request.args.get('f').split(',')

    t0 = time.time()
    app.logger.debug("about to search")
    #HERE is the elastic search call
    print("elastic", app.config['ELASTIC_URI'])
    r = es.search(body=query, index='cherry', doc_type='record')
    app.logger.debug("did search {0}".format(time.time() - t0))
    return json.dumps(r)

    rtext = r
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return json.dumps(err)

    if 0:#rtext.get('hits', {}).get('hits', None):
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
                        #rtext['hits']['hits'][ch]['highlight']['summary'][cs] = a
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

@app.route('/api/trending')
def api_trending():
    items = []
    for topic in all_trends(twitter, google):
        flt = do_flt_query(1, topic)
        if flt.get('hits',{}).get('hits',[]):
            ident = flt['hits']['hits'][0]['fields']['_parent']
            record = es.get_source(index='cherry',doc_type='record',id=ident)
            record['hotBecause'] = topic
            items.append(record)

    return json.dumps({"@context":"/cherry.jsonld","items":items})

@app.route('/api/flt')
def api_flt():
    return json.dumps(do_flt_query(75))

def do_flt_query(size=75, qstr=None):
    q = qstr if qstr else request.args.get('q')
    i = request.args.get('i')
    frm = request.args.get('from')
    to = request.args.get('to')
    sort = request.args.get('sort')
    t = request.args.get('t')#filter by type of annotation
    n = 50
    filters = []
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

        "fields": ["_parent", "name", "isPartOf.url", "text"],
        #"_source" :[],
        #        "highlight" : { "fields" : { "summary" : {"type": "plain"}},
        #                        "pre_tags" : ["<1>"],
        #                        "post_tags" : ["<\/1>"],
        #                       "fragment_size": 100
        #                      },
        #"aggs" : {"room" : {"significant_terms" : {"field" : "text", "min_doc_count" : 3}}}, #min doc count might decrease risk of choosing misspellings, though throwing away rare occurrences of relevant synonyms - find a good threshold
        "aggs" : {
            "room" : {"terms" : {"field" : "text", "size": 5}},
            "shingles" : {"terms" : {"field" : "text.shingles", "size": 5}},


        }
    }
    if t:
        query = {
        "query": {
            "filtered": {
                "query": {
                    "flt": {
                        "fields": ["text"],
                        "like_text": q,
                        "max_query_terms": 12,
                        "prefix_length": 4
                    }
                },
                "filter": {
                    "and": [{ "isPartOf.@type": { "value": t}},]
                }
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
    r = es.search(body=query, index='cherry', doc_type='annotation')
    app.logger.debug("did search {0}".format(time.time() - t0))
    print(r)
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
        "_source" : ['suggest'],
        "sort" : [],
        "size" : 75,

        "query" : qq,

        "suggest" : {
            "text" : q,
            "simple_phrase" : {
                "phrase" : {
                    "field" : "text",
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
    r = requests.post(app.config['ELASTIC_URI'] + '/_search?pretty=true', data = json.dumps(query))
    app.logger.debug("did search {0}".format(time.time() - t0))
    #return r.text

    rtext = json.loads(r.text)
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return json.dumps(err)

    if rtext.get('suggest', 0):
        return json.dumps(rtext.get('suggest'))

    return json.dumps(rtext)



@app.route('/api/related')
def api_related():
    print("related")
    q = request.args.get('q')
    precision = 'y'


    query = {
        "query" : { "filtered": { "filter": { "term": { "text": q }}}},#use on text.shingles for bigrams
        "aggs" : {"st" : {"significant_terms" : {"field" : "text"}},
                  "t":  {"terms": {"field": "text", "size": 100}}},
        

    }


    t0 = time.time()
    app.logger.debug("about to search")
    #HERE is the elastic search call
    r = es.search(body=query, index='cherry', doc_type='annotation')
    app.logger.debug("did search {0}".format(time.time() - t0))

    rtext = r
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return json.dumps(err)

    return json.dumps(rtext)


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

@app.route('/api/json')
def api_json():
    """For dev purposes only."""
    return raw_json_response(api_search())

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


if __name__ == '__main__':
    app.debug = True #app.config['DEBUG']
    app.run(host=app.config['BIND_HOST'], port=app.config['BIND_PORT'])

