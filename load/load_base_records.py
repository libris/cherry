#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests
from slugify import slugify

esurl = "http://localhost:9200"


def load_records():
    url = "http://hp01.libris.kb.se:9200/libris_index/bib/_search?pretty"
    query = {
        "_source": [
            "about.@id",
            "about.creator.*",
            "about.title",
            "about.classification.*",
            "about.subject.*",
            "about.isbn",
            "about.publication.*",
        ],
        "query": {
            "term" : { "about.identifier.identifierScheme.@id" : "/def/identifiers/isbn" },
        },

        "filter" : {
            "exists" : { "field" : ["about.creator", "about.title"] }
        }

    }
    ret = requests.post(url, data=json.dumps(query))
    docs = []
    jres = json.loads(ret.text)
    for hit in jres['hits']['hits']:
        xl_record = hit.get('_source').get('about', {})
        xl_identifier = xl_record.pop("@id")

        creator = xl_record.get('creator', [{}])[0]
        name = "{0} {1}".format(creator.get('givenName', ''), creator.get('familyName', '')) if creator.get('familyName') else "{0}".format(creator.get('name', ''))
        birthYear = creator.get("birthYear", "")
        slug_name = slugify("{0} {1}".format(name, birthYear), to_lower=True, separator='')

        slug_title = slugify(xl_record.get('title', ''), to_lower=True, separator='')

        es_id = "{name}{title}".format(name=slug_name, title=slug_title)

        cherry_record = load(es_id)
        cherry_record = combine_record(cherry_record, xl_record)
        cherry_record['@id'] = "/book/{name}/{title}".format(name=slug_name, title=slug_title)
        cherry_record['derivedFrom'] = {"@id":xl_identifier}

        docs += [ "{ \"index\" : { \"_id\" : \""+es_id+"\" }}" ]
        docs += [ json.dumps(cherry_record) ]

    bulk_store(docs)


    # Poppa popcorn
    # Vin
    # Yeah!


# TODO: check which fields should be overwritten
def combine_record(old, new):
    isbn = old.get('isbn',[])
    old.update(new)
    old['isbn'] += isbn
    return old

def bulk_store(docs):
    print("Saving to ES")
    r = requests.put(esurl + '/cherry/book/_bulk', data='\n'.join(docs)+'\n')
    print("Result of bulk:", r)

def load(id):
    url = "{baseurl}/cherry/book/{id}".format(baseurl=esurl, id=id)
    response = requests.get(url)
    record = {}
    if response.status_code == 200:
        record = json.loads(response.text).get("_source")
    else:
        print("URL {url} was a BAD REQUEST ({code})".format(url=url,code=response.status_code))
    return record




if __name__ == "__main__":
    load_records()
