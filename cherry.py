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

pp = pprint.PrettyPrinter(indent=1)

app = Flask(__name__)
app.config.from_pyfile('config.cfg')
app.secret_key = app.config.get('SESSION_SECRET_KEY')
app.remember_cookie_duration = timedelta(days=31)
app.permanent_session_lifetime = timedelta(days=31)

whelk = Storage(host=app.config['DATABASE_HOST'], database=app.config['DATABASE_NAME'], user=app.config['DATABASE_USER'], password=app.config['DATABASE_PASSWORD'])

#app.config.from_object(__name__)

JSON_LD_MIME_TYPE = 'application/ld+json'#Obsolete?

@app.route('/')
@app.route('/search')
def index():
    return json.dumps("välkommen")

@app.route('/api/search')
def api_search():
    print("search")
    q = request.args.get('q')
    sort = request.args.get('sort')
    n = 50
    filters = []
    precision = 'y'

#    qq = {
#        "query_string" : {
#            "default_field" : "_all",
#            "default_operator" : "AND",
#            "query" : q,
#
#        }
#    } if q and q != '*' else { "match_all": {} }
    qq = {
        "common": {
            "summary": {
                "query": q,
                "cutoff_frequency": 0.001
            }
        }
    } if q and q != '*' else { "match_all": {} }

    query = {
        #"_source" : ['highlight'],
        "sort" : [],
        "size" : 75,

        "query" : qq,

        #  "filtered" : {
        #      "filter": {
        #          "match" : {}
        #      }
        #  },
        "sort" : [
            #   { "post_date" : {"order" : "asc"}},
            #   "user",
            #   { "name" : "desc" },
            { "description" : "asc" },
            "_score"
        ],

        "aggs" : {"room" : {"significant_terms" : {"field" : "summary"}}},

        "highlight" : { "fields" : { "summary" : {"type": "plain"}},
                       "pre_tags" : ["1"],
                       "post_tags" : ["1"],
                       "fragment_size": 100
                      },

        "suggest" : {
            "text" : q,
            "simple_phrase" : {
                "phrase" : {
                    "field" : "_all",
                    "size" : 2,
                    "real_word_error_likelihood" : 0.95,
                    "max_errors" : 3,
                    "gram_size" : 2,
                    "direct_generator" : [ {
                        "field" : "_all",
                        "suggest_mode" : "popular",
                        "min_word_length" : 1
                    } ],
                    "highlight": {
                        "pre_tag": "<1>",
                        "post_tag": "</1>"
                    }
                }
            }
        },


    }



    if request.args.get('n'):
        print("n")
        n = int(request.args.get('n'))
        query['size'] = str(n)

    if request.args.get('page'):
        print("page")
        query['from'] = n * int(request.args.get('page'))

    if sort:
        if sort == 'd':
            query['sort'] = [{ "description" : "asc" }]

        if sort == 's':
            query['sort'] = [{ "summary" : "asc" }]

 #   query['filter']['and']['filters'] = filters


    if request.args.get('f'):
        query['_source'] = request.args.get('f').split(',')

    t0 = time.time()
    app.logger.debug("about to search")
    #HERE is the elastic search call
    print("elastic", app.config['ELASTIC_URI'])
    r = requests.post(app.config['ELASTIC_URI'] + '/_search?pretty=true', data = json.dumps(query))
    app.logger.debug("did search {0}".format(time.time() - t0))
    return r.text

    rtext = json.loads(r.text)
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return json.dumps(err)

    if 0:#rtext.get('hits', {}).get('hits', None):
        for ch, hit in enumerate(rtext['hits']['hits']):
            for cs, s in enumerate(hit['highlight']['summary']):
                a = re.sub('<[^>]*>', '', s)
                print(a)
                #rtext['hits']['hits'][ch]['highlight']['summary'][cs] = a

        try:
            for ch, hit in enumerate(rtext.get('hits', {}).get('hits', [])):
                try:
                    for cs, s in enumerate(hit.get('highlight', {}).get('about.fullTextContent.raw', [])):
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


@app.route('/api/flt')
def api_flt():
    q = request.args.get('q')
    frm = request.args.get('from')
    to = request.args.get('to')
    sort = request.args.get('sort')
    t = request.args.get('t')#filter by type of annotation
    n = 50
    filters = []
    date_filter = []
    precision = 'y'

#    qq = {
#        "query_string" : {
#            "default_field" : "_all",
#            "default_operator" : "AND",
#            "query" : q,
#
#        }
#    } if q and q != '*' else { "match_all": {} }

    query = {
        "sort" : [],
        "size" : 75,

        "query" :  {"flt": {
            "fields": ["summary"],
            "like_text": q,
            "max_query_terms": 12,
            "prefix_length": 4
        }},

        "_source" :[],
        #        "highlight" : { "fields" : { "summary" : {"type": "plain"}},
        #                        "pre_tags" : ["<1>"],
        #                        "post_tags" : ["<\/1>"],
        #                       "fragment_size": 100
        #                      },
        "aggs" : {"room" : {"significant_terms" : {"field" : "summary", "min_doc_count" : 3}}}, #min doc count might decrease risk of choosing misspellings, though throwing away rare occurrences of relevant synonyms - find a good threshold


    }
    if t:
        query = {
        "query": {
            "filtered": {
                "query": {
                    "flt": {
                        "fields": ["summary"],
                        "like_text": q,
                        "max_query_terms": 12,
                        "prefix_length": 4
                    }
                },
                "filter": {
                    "and": [{ "type": { "value": t}},]
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
    r = requests.post(app.config['ELASTIC_URI'] + '/_search?pretty=true', data = json.dumps(query))
    app.logger.debug("did search {0}".format(time.time() - t0))
    #return r.text

    rtext = json.loads(r.text)
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return json.dumps(err)
    if rtext.get('hits', {}).get('hits', None):

        #return jsonify(rtext)
        #return r.text
        return json.dumps(rtext)

    return json.dumps(rtext)

@app.route('/api/suggest')
def api_suggest():
    q = request.args.get('q')
    precision = 'y'

    qq = {
        "query_string" : {
            "default_field" : "_all",
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
                    "field" : "_all",
                    "size" : 2,
                    "real_word_error_likelihood" : 0.95,
                    "max_errors" : 3,
                    "gram_size" : 2,
                    "direct_generator" : [ {
                        "field" : "_all",
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
        "query" : { "filtered": { "filter": { "term": { "summary": q }}}},
        "aggs" : {"room" : {"significant_terms" : {"field" : "summary"}}},
    }


    t0 = time.time()
    app.logger.debug("about to search")
    #HERE is the elastic search call
    print("elastic", app.config['ELASTIC_URI'])
    r = requests.post(app.config['ELASTIC_URI'] + '/_search?search_type=count', data = json.dumps(query))
    app.logger.debug("did search {0}".format(time.time() - t0))

    rtext = json.loads(r.text)
    if rtext.get('status', 0):
        app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return json.dumps(err)

    return json.dumps(rtext)

@app.route('/api/json')
def api_json():
    """For dev purposes only."""
    return raw_json_response(api_search())

#@app.route('/xinfo/', defaults={'path': ''})
@app.route('/xinfo/<path:xinfopath>')
def load_image(xinfopath):
    record = whelk.load("/xinfo/{0}".format(xinfopath), store='xinfo')
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

