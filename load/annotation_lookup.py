#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests
from slugify import slugify
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk, scan
import re

#Using python es-client?
#es = Elasticsearch(hosts=app.config['ES_HOSTS'], sniff_on_start=False, sniff_on_connection_fail=True, sniffer_timeout=5)

esurl = "http://localhost:9200"
es = Elasticsearch('localhost', sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)
#hp01 = Elasticsearch('hp01.libris.kb.se', sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)

class Candidate:
    def __init__(self, pid, title, givenName, familyName, year, isbn):
        self.pid = pid
        self.title = title
        #self.creator = creator
        self.givenName = givenName
        self.familyName = familyName
        self.year = year
        self.isbn = isbn

    def to_dict(self):
        return {"_id": self.pid, "title": self.title, "givenName": self.givenName, "familyName": self.familyName, "year": self.year, "isbn": self.isbn}

    def __repr__(self):
        return str({"_id": self.pid, "title": self.title, "givenName": self.givenName, "familyName": self.familyName, "year": self.year, "isbn": self.isbn})

def the_escapist(o):
    return re.escape(o.group(0))

def backbone_items():
    query = {
        "_source":{ 
            "include": [
                #"creator.*",
                "creator",
                "title",
                #"publication.yr",
                "publication.providerDate",
                "isbn"
            ],
        },

        "filter" : {
            "exists" : { "field" : ["creator", "title", "isbn"] }
        }

    }

    res = scan(es,query, index='cherry', doc_type='record')
    #print("number of hits: ", len(res.get('hits').get('hits')), )

    for hit in res:#.get('hits').get('hits'):
        source = hit.get('_source', {})
        t = re.sub(r"[!\/|&-:<>\[\]~\"']", the_escapist, source.get('title'))
        try:
            y = re.search(r'\d\d\d\d', source.get('publication', [])[0].get('providerDate', 0)).group()
        except Exception as e:
            #print(e)
            #print("year: ", source.get('publication'), hit.get('_id'))
            y = 0
        creator = source.get('creator')
        if type(creator) == list:
            creator = creator[0]
        gn = creator.get('givenName')
        fn = creator.get('familyName')
        c = Candidate(hit.get('_id'), t, gn, fn, y, source.get('isbn', [])[0])
        #print(c)
        yield c


def inverse_annotation_lookup(c):
    query = {
        "query": {
            "bool": {
                "must": [
                    {
                        "query_string": {
                            "fields": ["text", "name", "url"],
                            "query": c.title,
                            #"type": "phrase"
                        }
                    },
                    {
                        "query_string": {
                            "fields": ["text", "name", "url"],
                            "query": "{0} AND {1}".format(c.givenName, c.familyName),
                            #"type": "phrase"
                        }
                    }
                ]
            }
        }
    }


    try:
        for hit in es.search(body=query, index='cherry', doc_type='blog').get('hits').get('hits'):

            source = hit.get('_source', {})
            candidates = [s.get('_id') for s in source.get("parentCandidate", {})]
            if not c.pid in candidates:
                query = {"script": "addcandidate", "params" : {"a" : c.to_dict()}}
                ret = es.update(body=query, index='cherry', doc_type='blog', id=hit.get('_id'))
    except Exception as e:
        print(e)
        print(c)

def save_child(source, parent):
    #parent = json.loads(parent)
    pid = parent.get('_id', 0)
    new_id = "{name}:blog:{isbn}".format(name=slugify(source.get('isPartOf', {}).get('name', 0)), isbn=parent.get('isbn', [])[0])
    if pid and new_id:
        ret = es.index(body=source, index='cherry', doc_type='annotation', id=new_id, parent=pid)


def dedup_candidates():
    print("\n\n dedup candidates")
    #after the lookup, run a dedup on all children with parentCandidates
    query = {
            "filter" : {
                "exists" : { "field" : "parentCandidate" }
            }
    }
    count = 0
    #for hit in es.search(body=query, index='cherry', doc_type='blog').get('hits').get('hits'):
    for hit in scan(es, query, index='cherry', doc_type='blog'):
        count = count+1

        source = hit.get('_source', {})
        #if 1 parentCandidate:  
        #reindex child with found parent
        if len(source.get('parentCandidate', [])) == 1:
            parent = source.get('parentCandidate', [])[0]
            save_child(source, parent)
        #if >=2 parentCandidates:
        #compare yr of candidates
        #if diff > 2, use youngest parent: (remove candidates?)
        #if diff <= 2, save to "uncertain", for manual check later
        elif len(source.get('parentCandidate', [])) >= 2:
            parents = source.get('parentCandidate', [])
            #parents = [json.loads(p) for p in parents]
            sp = sorted(parents, key=lambda x: x["yr"], reverse=True)
            diff = int(sp[0]["yr"]) - int(sp[1]["yr"])
            if diff > 2:
                parent = sp[0]
                save_child(source, parent)
            else:
                doc = source.update({"parentUncertain": 'true'})
                ret = es.index(body=source, index='cherry', doc_type='blog', id=hit.get('_id'))
    print("total number of children: ", count)


def cleanup_candidates():
    query = {
            "filter" : {
                "exists" : { "field" : "parentCandidate" }
            }
    }

    for hit in scan(es, query, index='cherry', doc_type='blog'):
        scr = {"script" : "ctx._source.remove(\"parentCandidate\")"}
        scr = {"script" : "ctx._source.remove(\"parentUncertain\")"}
        ret = es.update(body=scr, index='cherry', doc_type='blog', id=hit.get('_id'))
            




def iterate_backbone():
    for c in backbone_items():
        inverse_annotation_lookup(c)



if __name__ == "__main__":
    cleanup_candidates()
    iterate_backbone()
    dedup_candidates()
