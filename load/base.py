#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
from itertools import islice
from slugify import slugify
from elasticsearch import Elasticsearch, NotFoundError
from elasticsearch.helpers import bulk, scan


def _build_idx_req(index, hits):
    docs = {}
    for hit in hits:
        xl_record = hit.get('_source').get('about', {})
        if 'creator' in xl_record:
            creator = xl_record['creator'] if type(xl_record['creator']) is list else [xl_record['creator']]

            name = "{0} {1}".format(creator[0].get('givenName', ''), creator[0].get('familyName', '')) if creator[0].get('familyName') else "{0}".format(creator[0].get('name', ''))
            slug_name = slugify(name, to_lower=True, separator='')

            slug_title = slugify(xl_record.get('title', ''), to_lower=True, separator='')

            es_id = "{name}{title}".format(name=slug_name, title=slug_title)

            if es_id:
                cherry_record = docs.get(es_id, {}) #if es_id in docs else to_es.get_source(index=index, doc_type='record', id=es_id, ignore=404)

                cherry_record = combine_record(cherry_record, xl_record)
                cherry_record['@id'] = "/{name}/{title}".format(name=slug_name, title=slug_title)
                docs[es_id] = cherry_record

                yield { '_index': index, '_type': 'record', '_id' : str(es_id), '_source': cherry_record }

def load_records(**args):
    from_es = Elasticsearch(args['from'], sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)
    to_es = Elasticsearch(args['to'], sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)

    query = {
        "size": 1000,
        "_source": {
            "include": [
                "about.@id",
                "about.creator.*",
                "about.title",
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
                    { "exists": { "field": "about.isbn" } },
                    { "or" : [
                        { "not" : { "exists": { "field": "about.language" } } },
                        { "term": { "about.language.@id" : "/def/languages/swe" } }
                        ]
                    }
                ],
#                "must": [
#                    { "or" : [
#                        { "query" : { "match_phrase_prefix": { "about.classification.notation.untouched": { "query": "H" } } } },
#                        { "and": [
#                            { "not" : { "exists": { "field": "about.classification" } } },
#                            { "not" : { "term": { "about.literaryForm.@id": "/def/enum/content/NotFictionNotFurtherSpecified" } } },
#                        ] }
#                    ] }
#                ]
            }
        }
    }

    batch_count = 0
    results = _build_idx_req(args['index'], scan(from_es, query, index=args['xlindex'], doc_type=args['xltype']))

    while True:
        chunk = list(islice(results, 2000))
        batch_count += len(chunk)
        if not chunk:
            break
        (count, response) = bulk(to_es, chunk)
        print("Bulked sofar:", batch_count)
        to_es.cluster.health(wait_for_status='yellow', request_timeout=10)

    print("Totally {0} documents collected (some might have been deduped).".format(batch_count))

    # Poppa popcorn
    # Vin
    # Yeah!


# TODO: check which fields should be overwritten
def combine_record(old, new):
    if not old:
        old = {}
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

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Loads base records from LIBRISXL for cherry')
    parser.add_argument('--from', help='Elastic URL to read data from, default to localhost', default='localhost', nargs='+')
    parser.add_argument('--xlindex', help='The name of the LIBRISXL index to read from (defaults to "libris")', default='libris')
    parser.add_argument('--xltype', help='The type in LIBRISXL that contains bibliographic records (defaults to "bib")', default='bib')
    parser.add_argument('--to', help='Elastic URL to write data to, default to localhost', default='localhost', nargs='+')
    parser.add_argument('--index', help='Cherry index, default to cherry', default='cherry')

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    load_records(**args)
