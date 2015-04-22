#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import requests
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk, scan

boktipset_url = 'http://api.boktipset.se/book/book.cgi?isbn={isbn}&accesskey={key}&format=json'

def load_record(isbn, key):
    print("Trying to load btdata for isbn", isbn)
    r = requests.get(boktipset_url.format(isbn=isbn, key=key))
    try:
        return r.json()
    except:
        print("Failed to read json for", isbn)
    return None


def main(**args):
    es = Elasticsearch(args['server'], sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)
    query = {
        "size": 1000,
        "_source": {
            "include": [
                "isbn",
            ]
        },
        "query": {
            "match_all" : {}
        }
    }
    docs = {}
    for hit in scan(es, query, index='cherry', doc_type='record'):
        parent_id = hit.get('_id')
        btrecord = None
        for isbn in hit.get('_source').get('isbn', []):
            if not btrecord:
                btrecord = load_record(isbn, args['accesskey'])
            else:
                print("Already found btrecord for related ISBN")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Loads boktipset reviews into cherry')
    parser.add_argument('--server', help='Elastic server, default to localhost', default='localhost', nargs='+')
    parser.add_argument('--accesskey', help='Boktipset access key', required=True)
    group = parser.add_mutually_exclusive_group()

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    main(**args)
