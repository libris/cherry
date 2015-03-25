#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests
from slugify import slugify
from .save_data import *

esurl = "http://localhost:9200"
#xlhost = "http://localhost:9400"
xlhost = "http://hp02.libris.kb.se:9200"


def load_records():
    url = xlhost + "/libris_index/bib/_search?search_type=scan&scroll=1m"
    query = {
        "size": 1000,
        "_source": {
            "include": [
                "about.@id",
                "about.creator.*",
                "about.title",
                "about.classification.*",
                "about.subject.*",
                "about.isbn",
                "about.publication.*"
            ],
            "exclude": [
                "about.subject.broader"
            ]
        },
        "query": {
            "match_all" : {}
        },
        "filter" : {
            "bool": {
                "must": [
                    { "exists": { "field": "about.creator" } },
                    { "exists": { "field": "about.title" } },
                    { "exists": { "field": "about.isbn" } }
                ],
                "must": [
                    { "terms": { "about.language.@id" : [ "/def/languages/swe" ] } }
                ],
                "must": [
                    { "or" : [
                        { "or" : [
                            { "query" : { "match_phrase_prefix": { "about.classification.notation.untouched": { "query": "H" } } } },
                            { "query" : { "match_phrase_prefix": { "about.classification.notation.untouched": { "query": "8" } } } }
                        ] },
                        { "and": [
                            { "not" : { "term": { "about.literaryForm.@id": "/def/enum/content/NotFictionNotFurtherSpecified" } } },
                            { "not" : { "exists": { "field": "about.classification" } } }
                        ] }
                    ] }
                ]
            }
        }
    }
    ret = requests.post(url, data=json.dumps(query))
    jres = json.loads(ret.text)
    print("ES query resulted in {0} hits. Starting scroll/scan.".format(jres['hits']['total']))

    scroll_id = jres['_scroll_id']
    scrolling = True
    batch_count = 0
    while scrolling:
        docs = {}
        ret = requests.post(xlhost+"/_search/scroll?scroll=1m", data=scroll_id)
        jres = json.loads(ret.text)
        scroll_id = jres['_scroll_id']
        num_docs_in_batch = len(jres['hits'].get('hits', []))
        print("Number of docs in batch {0}: {1}".format(batch_count, num_docs_in_batch))
        batch_count += 1
        if num_docs_in_batch == 0:
            print("All documents loaded. Breaking.")
            scrolling = False
        else:
            for hit in jres['hits']['hits']:
                xl_record = hit.get('_source').get('about', {})

                creator = xl_record.get('creator', [{}])[0]
                name = "{0} {1}".format(creator.get('givenName', ''), creator.get('familyName', '')) if creator.get('familyName') else "{0}".format(creator.get('name', ''))
                slug_name = slugify(name, to_lower=True, separator='')

                slug_title = slugify(xl_record.get('title', ''), to_lower=True, separator='')

                es_id = "{name}{title}".format(name=slug_name, title=slug_title)

                cherry_record = docs.get(es_id, load(es_id))
                cherry_record = combine_record(cherry_record, xl_record)
                cherry_record['@id'] = "/{name}/{title}".format(name=slug_name, title=slug_title)

                docs[es_id] = cherry_record

            bulk_store(docs, esurl + '/cherry/record/_bulk')

    # Poppa popcorn
    # Vin
    # Yeah!


# TODO: check which fields should be overwritten
def combine_record(old, new):
    xl_identifier = new.pop("@id")
    isbn = set([])
    if 'isbn' in old:
        isbn = set(old['isbn'])
    isbn.update(new.get('isbn', []))
    isbn = list(filter(None, isbn))
    old.update(new)
    if isbn:
        old['isbn'] = isbn
    if 'wasDerivedFrom' in old:
        derives = set([der['@id'] for der in old['wasDerivedFrom']])
        derives.add(xl_identifier)
        old["wasDerivedFrom"] = [{"@id":xlid} for xlid in derives]
    else:
        old["wasDerivedFrom"] = [{"@id":xl_identifier}]
    return old

def load(id):
    url = "{baseurl}/cherry/record/{id}".format(baseurl=esurl, id=id)
    response = requests.get(url)
    record = {}
    if response.status_code == 200:
        record = json.loads(response.text).get("_source")
    return record

if __name__ == "__main__":
    load_records()
