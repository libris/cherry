#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse, os
from itertools import islice
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk, scan
from os.path import isfile, join


JPG_DIR = "jpegs"
DEST_DIR = "matched_jpegs"



def build_record(isbn, parent_identifier):
    return {
        "@type": "CoverArt",
        "isPartOf": {
            "@id": parent_identifier
        },
        "annotates": {
            "@id": "urn:isbn:{0}".format(isbn)
        },
        "annotationSource": {
            "name": "Smakprov",
            "url": "http://www.smakprov.se/bok/{0}".format(isbn)
        },
        "coverArt": "/cover/{0}.jpg".format(isbn)
    }

def assemble_records(hits):
    for hit in hits:
        parent_id = hit.get('_id')
        parent_identifier = hit.get('_source').get('@id')
        for isbn in hit.get('_source').get('isbn', []):
            filename = "{0}.jpg".format(isbn)
            if isfile(join(JPG_DIR, filename)):
                os.rename(join(JPG_DIR, filename), join(DEST_DIR, filename))
                print("Found cover image {0}, yielding.".format(filename))
                yield { '_index': 'cherry', '_type': 'cover', '_id': "smakprov:{0}:cover".format(isbn), '_parent': parent_id, '_source': build_record(isbn, parent_identifier) }



def main(**args):
    es = Elasticsearch(args['server'], sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)
    query = {
        "size": 500,
        "_source": {
            "include": [
                "@id",
                "isbn",
            ]
        },
        "query": {
            "match_all" : {}
        }
    }

    results = assemble_records(scan(es, query, scroll='30m', index='cherry', doc_type='record'))
    batch_count = 0

    while True:
        chunk = list(islice(results, 2000))
        batch_count += len(chunk)
        if not chunk:
            break

        (count, response) = bulk(es, chunk)
        es.cluster.health(wait_for_status='yellow', request_timeout=10)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Loads boktipset reviews into cherry')
    parser.add_argument('--server', help='Elastic server, default to localhost', default='localhost', nargs='+')
    group = parser.add_mutually_exclusive_group()

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    main(**args)
