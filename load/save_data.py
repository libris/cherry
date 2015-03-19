#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests

def collate():
    docs = []

def bulk_store(docs, esurl):
    print("Saving {0} documents to ES".format(len(docs)))
    bulkdata = ["{ \"index\" : { \"_id\" : \""+str(es_id)+"\" }}\n"+json.dumps(jsondoc) for (es_id, jsondoc) in docs.items()]
    r = requests.put(esurl, data='\n'.join(bulkdata)+'\n')
    if r.status_code != 200:
        print("Trouble saving. Result of bulk:", r.text)

