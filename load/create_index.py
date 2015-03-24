#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import argparse
import json
import requests

def create(**args):

    base_url = 'http://localhost:9200'

    url = base_url + '/' + args['index']

    if requests.get(url + '/_stats').status_code == 200:
        if args['delete']:
            print('Attempting delete of existing index at %s ...' % url)
            r = requests.delete(url)
            print("\ndelete {0} done: {1}".format(args['index'], r.text))
        else:
            print("Index exists, use --delete flag to force deletion before creation")
            exit(1)

    # create index
    cf = open('load/cherry_es_config.json','r')
    ret = requests.put(url, data=cf.read())

    print("{0} create result: {1}".format(args['index'], ret.text))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Sets up an elasticsearch index for cherry project') 
    parser.add_argument('-d', '--delete', action='store_true', help='forces deletion if index exists')
    parser.add_argument('-p', '--port', help='elasticsearch port number, defaults to 9200', type=int, default=9200)
    parser.add_argument('--server', help='Elastic search server, default to localhost', default='localhost')
    parser.add_argument('--index', help='Name of index', default='cherry')

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    create(**args)


