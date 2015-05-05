#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse, os
from itertools import islice
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk, scan


def find_xinfo_record(isbn, from_es):
    query = {
        "query": {
            "term" : { "annotates.@id" : "urn:isbn:{0}".format(isbn) }
        }
    }
    result  = from_es.search(index='xinfo',
                       doc_type='cover',
                       size=1,
                       body=query)
    try:
        xinfo_record = result.get("hits").get("hits")[0].get("_source", {})
        if xinfo_record:
            print("Found xinfo record for {0}".format(isbn))
        return xinfo_record
    except Exception as e:
        return None

def assemble_records(hits, from_es):
    for hit in hits:
        record_source = hit.get('_source')
        xinfo_record = None
        if 'isbn' in record_source and type(record_source['isbn']) == list:
            for i in record_source['isbn']:
                if not xinfo_record:
                    xinfo_record = find_xinfo_record(i, from_es)
        elif 'isbn' in record_source:
            xinfo_record = find_xinfo_record(record_source['isbn'], from_es)

        parent_id = hit.get("_id")
        if parent_id and xinfo_record:
            xinfo_record.pop("modified")
            coverArt = xinfo_record.pop("covertArt")
            xinfo_record['coverArt'] = coverArt
            record_id = xinfo_record.get("@id")[1:].replace("isbn:", "").replace("/", ":")

            yield { '_index': 'cherry', '_type': 'cover', '_id': record_id, '_parent': parent_id, '_source': xinfo_record }



def main(**args):
    from_es = Elasticsearch(args['fromserver'], sniff_on_start=True, sniff_on_connection_fail=True, sniff_timeout=60, timeout=60)
    to_es = Elasticsearch(args['toserver'], sniff_on_start=True, sniff_on_connection_fail=True, sniff_timeout=60, timeout=60)
    query = {
        "query": {
            "match_all" : {}
        }
    }

    results = assemble_records(scan(to_es, query, scroll='30m', index='cherry', doc_type='record'), from_es)
    batch_count = 0

    while True:
        chunk = list(islice(results, 2000))
        batch_count += len(chunk)
        if not chunk:
            break

        (count, response) = bulk(to_es, chunk)
        to_es.cluster.health(wait_for_status='yellow', request_timeout=10)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Loads boktipset reviews into cherry')
    parser.add_argument('--fromserver', help='Elastic server, default to localhost', default='localhost', nargs='+')
    parser.add_argument('--toserver', help='Elastic server, default to localhost', default='localhost', nargs='+')

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    main(**args)
