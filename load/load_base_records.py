#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests

def load_records():
    url = "http://hp01.libris.kb.se:9200/libris_index/bib/_search?pretty"
    query = {
        "query": {
            "term" : { "about.identifier.identifierScheme.@id" : "/def/identifiers/isbn" }
        }
    }
    ret = requests.post(url, data=json.dumps(query))
    print ret.text


if __name__ == "__main__":
    load_records()

