#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests

def load_records():
    url = "http://hp01.libris.kb.se:9200/libris_index/bib/_search?pretty"
    query = {
        "_source": [
            "about.@id",
            "about.attributedTo.*",
            "about.author.*",
            "about.instanceTitle.titleValue",
            "about.classification.*",
            "about.subject.*",
            "about.identifier.identifierValue",
            "about.publication.*",
        ],
        "query": {
            "term" : { "about.identifier.identifierScheme.@id" : "/def/identifiers/isbn" }
        }
    }
    ret = requests.post(url, data=json.dumps(query))
    jres = json.loads(ret.text)
    for hit in jres['hits']['hits']:
        print("source", hit['_source'])


if __name__ == "__main__":
    load_records()

