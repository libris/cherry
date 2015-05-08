# -*- coding: utf-8 -*-
import time

def child_texts(es, index_name, p):
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
    r = es.search(body=query, index=index_name, doc_type='annotation')
    hits = r.get('hits', {}).get('hits', [])
    texts = ' '.join([hit.get('_source').get('text', []) for hit in hits])
    print("associated texts:", texts)
    return texts

def do_flt_query(es, size=75, q=None, i=None, doctype=None, frm=None, to=None, sort=None, t=None, n=None, f=None, page=None, index_name='cherry'):
    """Will search annotations if no other doctype is given."""
    if not doctype:
        doctype=['annotation', 'excerpt']
    n = 50
    date_filter = []
    precision = 'y'

    if i:
        try:
            q = child_texts(es, index_name, i)
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

        "fields": ["_parent"],

        "aggs" : {
            #"unigrams" : {"significant_terms" : {"field" : "text.unigrams", "size": 30, "gnd": {}}},
            "bigrams" : {"significant_terms" : {"field" : "text.bigrams", "size": 30, "gnd": {}}},
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

    if n:
        n = int(n)
        query['size'] = str(n)

    if page:
        print("page")
        query['from'] = n * int(page)
        print("the from", query['from'])




    if f:
        query['_source'] = f.split(',')

    r = es.search(body=query, index=index_name, doc_type=doctype)
    return r

