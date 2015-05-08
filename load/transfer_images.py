#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import requests
from itertools import islice
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk, scan
from PIL import Image
from io import BytesIO

def get_image(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    return img

def find_images(hits):
    for hit in hits:
        try:
            record = hit.get("_source")
            identifier = hit.get("_id")
            if 'coverArt' in record and record['coverArt'].startswith("/xinfo/"):
                image = get_image("http://cherry.libris.kb.se{0}".format(record['coverArt']))
                #print("Loaded image ",record['coverArt'])
                yield (identifier, image)

        except Exception as e:
            print("Failed", e)

def main(**args):
    es = Elasticsearch(args['server'], sniff_on_start=True, sniff_on_connection_fail=True, sniff_timeout=60, timeout=60)
    query = {
        "size":100,
        "fields": ["_parent", "_source"],
        "query": {
            "match_all" : {}
        }
    }

    images = find_images(scan(es, query, scroll='5m', index='cherry', doc_type='cover'))

    counter = 0

    for (identifier, image) in images:
        isbn = identifier.split(":")[1]
        image.save("{directory}/{identifier}.jpg".format(directory=args['dir'], identifier=isbn))
        print("Saved image {0}/{1}.jpg".format(args['dir'], isbn))
        counter += 1

        #if counter > 3:
        #    print("That's enough for now.")
        #    break

    print("Saved {0} images to {1}".format(counter, args['dir']))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Save db images to disk')
    parser.add_argument('--server', help='elastic server', default='localhost', nargs='+')
    parser.add_argument('--dir', help='Directory to save images to', required=True)

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    main(**args)


