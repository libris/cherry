#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import requests
from itertools import islice
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk, scan
from PIL import Image
from io import BytesIO

def get_image_data(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    return img.size

def assemble_records(hits):
    for hit in hits:
        try:
            record = hit.get("_source")
            identifier = hit.get("_id")
            parent_id = hit.get("fields", {}).get("_parent")
            # Fix misspelled field
            if 'covertArt' in record:
                covertArt = record.pop("covertArt")
                if covertArt:
                    record['coverArt'] = covertArt
            if 'coverArt' in record:
                (width, height) = get_image_data("http://cherry.libris.kb.se{0}".format(record['coverArt']))
                print("setting height: {0}, width: {1} on {2}".format(height, width, record['coverArt']))
                record['height'] = height
                record['width'] = width
                yield { '_index': 'cherry', '_type': 'cover', '_id': identifier, '_parent': parent_id, '_source': record }

        except Exception as e:
            print("Failed", e)

def main(**args):
    es = Elasticsearch(args['server'], sniff_on_start=True, sniff_on_connection_fail=True, sniff_timeout=60, timeout=60)
    query = {
        "fields": ["_parent", "_source"],
        "query": {
            "match_all" : {}
        }
    }

    results = assemble_records(scan(es, query, scroll='30m', index='cherry', doc_type='cover'))
    batch_count = 0

    while True:
        chunk = list(islice(results, 2000))
        batch_count += len(chunk)
        if not chunk:
            break

        (count, response) = bulk(to_es, chunk)
        to_es.cluster.health(wait_for_status='yellow', request_timeout=10)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Completes coverart with image dimensions')
    parser.add_argument('--server', help='Elastic server, default to localhost', default='localhost', nargs='+')

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    main(**args)

