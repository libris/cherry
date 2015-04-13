# -*- coding: utf-8 -*-

import argparse
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk,scan

def reindex(**args):
    from_es = Elasticsearch(args['server'], sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)
    to_es = Elasticsearch(args['server'], sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)
    docs = {}
    batch_count = 1
    for hit in scan(from_es, {"query": { "match_all": {} }}, index=args['fromindex'], doc_type=args['type'], fields=['_parent','_source','_routing']):
        record = hit.get('_source')
        parent_id = hit.get("fields", {}).get("_parent", None)
        record_id = hit.get("_id")
        record['parent_id'] = parent_id
        record['record_type'] = hit.get("_type")

        batch_count += 1
        docs[record_id] = record

        if batch_count % 2000 == 0:
            print("Batch full. Saving {0} documents to ES".format(len(docs)))
            bulkdata = [ { '_index': args['toindex'], '_type': jsondoc.pop('record_type'), '_id' : record_id, '_source': jsondoc, '_parent': jsondoc.pop('parent_id') } for (record_id, jsondoc) in docs.items() ]
            r = bulk(to_es, bulkdata)
            docs = {}

    if len(docs) > 0:
        print("Collection complete. Saving {0} documents to ES".format(len(docs)))
        bulkdata = [ { '_index': args['toindex'], '_type': jsondoc.pop('record_type'), '_id' : record_id, '_source': jsondoc, '_parent': jsondoc.pop('parent_id') } for (record_id, jsondoc) in docs.items() ]
        r = bulk(to_es, bulkdata)


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
