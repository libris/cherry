#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
from elasticsearch import Elasticsearch, NotFoundError
from elasticsearch.helpers import bulk, scan

from_es = None
to_es = None

def find_parent(identifier):
    term = "wasDerivedFrom.@id"
    if identifier.startswith("urn:"):
        term = "isbn"
        identifier = identifier[4:]

    print("term", term, " identifier", identifier)

    query = {
        "query": {
            "term" : { term : identifier }
        }
    }
    result  = to_es.search(index=args['index'],
                       doc_type='record',
                       size=1,
                       body=query)
    if 'hits' in result:
        try:
            return result.get("hits").get("hits")[0].get("_source").get("_id")
        except:
            print("No hits for {0}".format(identifier))
    return None


def load_annotations(**args):
    query = {
        "query": {
            "match_all" : {}
        },
    }
    docs ={}
    batch_count = 0
    for hit in scan(from_es, query, index=args['xinfoindex'], doc_type=args['xinfotype']):
        xinfo_record = hit.get('_source')
        xinfo_id = hit.get('_id')

        try:
            cherry_id = find_parent(xinfo_record.get('annotates').get('@id'))
        except NotFoundError:
            cherry_id = None

        if cherry_id:
            xinfo_record['parent'] = cherry_id
            docs[xinfo_id] = xinfo_record


            batch_count += 1
            if batch_count % 2000 == 0:
                print("Batch full. Saving {0} documents to ES".format(len(docs)))
                bulkdata = [ { '_index': 'cherry', '_type': 'annotation', '_id' : str(es_id), 'parent': jsondoc.pop('parent'), '_source': jsondoc } for (es_id, jsondoc) in docs.items() ]
                r = bulk(to_es, bulkdata)
                docs = {}

    # Save remaining docs
    if len(docs) > 0:
        print("Collection complete. Saving {0} documents to ES".format(len(docs)))
        bulkdata = [ { '_index': 'cherry', '_type': 'annotation', '_id' : str(es_id) , 'parent': jsondoc.pop('parent'), '_source': jsondoc } for (es_id, jsondoc) in docs.items() ]
        r = bulk(to_es, bulkdata)

    print("Totally {0} documents collected.".format(batch_count))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Loads annotations from xinfo for cherry')
    parser.add_argument('--from', help='Elastic URL to read data from, default to localhost', default='localhost', nargs='+')
    parser.add_argument('--xinfoindex', help='The name of the xinfo index to read from (defaults to "xinfo")', default='xinfo')
    parser.add_argument('--xinfotype', help='The type in xinfo that contains annotation records (defaults to "annotation")', default='annotation')
    parser.add_argument('--to', help='Elastic URL to write data to, default to localhost', default='localhost', nargs='+')
    parser.add_argument('--index', help='Cherry index, default to cherry', default='cherry')

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    from_es = Elasticsearch(args['from'], sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)
    to_es = Elasticsearch(args['to'], sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)
    load_annotations(**args)

