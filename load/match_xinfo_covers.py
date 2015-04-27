#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse, os
from itertools import islice
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk, scan

def find_parent(identifier, es):
    if not identifier:
        return None
    term = "wasDerivedFrom.@id"
    if identifier.startswith("urn:isbn:"):
        term = "isbn"
        identifier = identifier[9:]

    query = {
        "query": {
            "term" : { term : identifier }
        }
    }
    result  = es.search(index='cherry',
                       doc_type='record',
                       size=1,
                       body=query)
    try:
        return result.get("hits").get("hits")[0].get("_source").get("_id")
    except Exception as e:
        return None


def assemble_records(hits, es):
    for hit in hits:
        record_source = hit.get('_source')
        parent_id = find_parent(record_source.get("annotates", {}).get("@id"), es)
        if parent_id:
            record_source.remove("modified")
            record_id = record_source.get("@id")[1:].replace("isbn:", "").replace("/", ":")
            print("Found parent {0} for {1}".format(parent_id, record_source))

            yield { '_index': 'cherry', '_type': 'cover', '_id': record_id, '_parent': parent_id, '_source': record_source }



def main(**args):
    es = Elasticsearch(args['server'], sniff_on_start=True, sniff_on_connection_fail=True, sniff_timeout=60, timeout=60)
    query = {
        "query": {
            "match_all" : {}
        }
    }

    results = assemble_records(scan(es, query, scroll='30m', index='xinfo', doc_type='cover'), es)
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
