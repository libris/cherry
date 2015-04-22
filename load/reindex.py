# -*- coding: utf-8 -*-

import argparse
from itertools import islice
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk,scan

def _build_idx_req(index, hits):
    for h in hits:
        yield { '_index': index, '_type': h.get('_type'), '_id' : h.get('_id'), '_source': h.get('_source'), '_parent': h.get('fields', {}).get('_parent', None) }


def reindex(**args):
    from_es = Elasticsearch(args['server'], sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)
    to_es = Elasticsearch(args['server'], sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)
    batch_count = 0

    results = _build_idx_req(args['toindex'], scan(from_es, {"query": { "match_all": {} }}, index=args['fromindex'], doc_type=args['type'], fields=['_parent','_source','_routing']))

    while True:
        chunk = list(islice(results, 2000))
        batch_count += len(chunk)
        if not chunk:
            break

        (count, response) = bulk(to_es, chunk)
        to_es.cluster.health(wait_for_status='yellow', request_timeout=10)

    print("Processed {0} documents and reindexed {1}.".format(batch_count, count))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Reindex cherry')
    parser.add_argument('--server', help='Elastic server host, default to localhost', default='localhost', nargs='+')
    parser.add_argument('--fromindex', help='The index to read from (defaults to "cherry")', default='cherry')
    parser.add_argument('--toindex', help='The index to write data to', required=True)
    parser.add_argument('--type', help='The doc_type to read from (and write to)')

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    reindex(**args)
