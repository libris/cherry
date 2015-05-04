#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse, os
from itertools import islice
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk, scan
from os import listdir
from os.path import isfile, join

def find_parent(es, isbn):
    if not isbn:
        return None
    query = {
        "query": {
            "term" : { "isbn" : isbn }
        }
    }
    result  = es.search(index='cherry',
                       doc_type='record',
                       size=1,
                       body=query)
    try:
        res = result.get("hits").get("hits")[0].get("_source").get("_id")
        if res:
            print("Found parent for {0}: {1}".format(isbn, res))
        return res
    except Exception as e:
        return None

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

def assemble_records(es):
    for jpg in listdir("../cover_images/"):
        try:
            isbn = jpg.split("/").pop().split(".")[0]
            parent_id = find_parent(es,isbn)
            if parent_id:
                yield { '_index': 'cherry', '_type': 'cover', '_id': "smakprov:{0}:cover".format(isbn), '_parent': parent_id, '_source': build_record(isbn, parent_id) }
        except Exception as e:
            print("Failed", e)


def main(**args):
    es = Elasticsearch(args['server'], sniff_on_start=True, sniff_on_connection_fail=True, sniff_timeout=60)

    results = assemble_records(es)
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

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    main(**args)
