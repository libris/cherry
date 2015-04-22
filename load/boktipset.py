#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
from itertools import islice
import requests
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk, scan
from .util import *

boktipset_url = 'http://api.boktipset.se/book/book.cgi?isbn={isbn}&accesskey={key}&format=json'
boktipset_comments_url = 'http://api.boktipset.se/book/comments.cgi?value={book}&accesskey={key}&format=json'

def load_comments(bookid, isbn, url, key):
    print("Trying to load comments for book id", bookid)
    r = requests.get(boktipset_comments_url.format(book=bookid, key=key))
    try:
        comments_raw = r.json()
        return build_annotation("Comment", isbn, url, [remove_markup(c.get('text')) for c in comments_raw.get("answer", {}).get("bookcomments", {}).get("bookcomment", [])])
    except:
        print("Failed to read json for", isbn)
    return None


def load_record(isbn, key):
    print("Trying to load btdata for isbn", isbn)
    r = requests.get(boktipset_url.format(isbn=isbn, key=key))
    try:
        return r.json()
    except:
        print("Failed to read json for", isbn)
    return None

def build_annotation(rtype, isbn, url, text):
    return {
        "@type": rtype,
        "annotates": {
            "@id": "urn:isbn:{0}".format(isbn)
        },
        "annotationSource": {
            "name": "boktipset.se",
            "url": url
        },
        "text": text
    }

def build_boktipset_records(hits, key):
    for hit in hits:
        parent_id = hit.get('_id')
        for isbn in hit.get('_source').get('isbn', []):
            btrecord = load_record(isbn, key)
            if btrecord and "answer" in btrecord:
                btrecord = btrecord.get("answer", {})
                if btrecord['saga']:
                    yield { '_index': hit.get('_index'), '_type':'annotation', '_id': "boktipset:{0}:summary".format(isbn), '_parent': parent_id, '_source': build_annotation("Summary", isbn, btrecord['url'], remove_markup(btrecord['saga'])) }

                if btrecord['reviews']:
                    yield { '_index': hit.get('_index'), '_type':'annotation', '_id': "boktipset:{0}:review".format(isbn), '_parent': parent_id, '_source': build_annotation("Review", isbn, btrecord['url'], [remove_markup(r.get("text")) for r in btrecord.get("reviews", {}).get("review", [])]) }

                comments = load_comments(btrecord['bookid'], isbn, btrecord['url'], key)
                if comments:
                    yield { '_index': hit.get('_index'), '_type':'annotation', '_id': "boktipset:{0}:comment".format(isbn), '_parent': parent_id, '_source': comments }

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

    results = build_boktipset_records(scan(es, query, scroll='30m', index='cherry', doc_type='record'), args['accesskey'])
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
    parser.add_argument('--accesskey', help='Boktipset access key', required=True)
    group = parser.add_mutually_exclusive_group()

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    main(**args)
