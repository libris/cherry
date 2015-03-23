#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import argparse
import json
import pprint
from index_config import create_config
import requests

def create(**args):


    base_url = 'http://localhost:9200'

    # check if index exists
    # Example: http://localhost:9200/ebok
    #url = 'http://%s:%d/%s/' % (args['server'], args['port'], args['index'])
    #url_c = 'http://localhost:9200/cherry/_close'# tunnel
    #url_o = 'http://localhost:9200/cherry/_open'# tunnel
    #url_m = 'http://localhost:9200/cherry/_mapping/{type}'# tunnel
    #url_s = 'http://localhost:9200/cherry/_settings'# tunnel
    url = base_url + '/' + args['index']
    #url = 'http://hp01.libris.kb.se:9200/cherry/'
    #print("the url", url_m)

    if 0: #requests.get(url + '_stats').status_code == 200:
        if args['delete']:
            print('Attempting delete of existing index at %s ...' % url)
            r = requests.delete(url)
            print("\n{0} done: {1}".format(args['index'], r.text))
        else:
            print("Index exists, use --delete flag to force deletion before creation")
            exit(1)
    
    # create index
    ret = requests.put(url, data=json.dumps(create_config(args['index'], 'settings')))

    print("create return ", )
    for i in (json.loads(ret.text)).get('items', []):
        print(i)


    if ret.status_code == 200:
        print("settings succeeded for", url)
        for etype,mapping in create_config(args['index'], 'mappings').items():
            print("setting mappings for",etype)
            ret = requests.put("{url}/_mapping/{type}".format(url=url, type=etype), data=json.dumps(mapping))
            if ret.status_code == 200:
                print("mappings succeeded for", etype)
            else:
                print("Could not map index, HTTP status %d\n%s" % (ret.status_code, ret.text))
    else:
        print("Could not create index, HTTP status %d\n%s" % (ret.status_code, ret.text))

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


