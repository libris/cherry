#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import argparse
import json
import pprint
from index_config import create_config
import requests

def create(**args):


    # check if index exists
    # Example: http://localhost:9200/ebok
    #url = 'http://%s:%d/%s/' % (args['server'], args['port'], args['index'])
    url_c = 'http://localhost:9400/xinfo_index/_close'# tunnel
    url_o = 'http://localhost:9400/xinfo_index/_open'# tunnel
    url_m = 'http://localhost:9400/xinfo_index/_mapping/book'# tunnel
    url_s = 'http://localhost:9400/xinfo_index/_settings'# tunnel
    #url = 'http://hp01.libris.kb.se:9200/xinfo_index/'
    print "the url", url_m

    if 0: #requests.get(url + '_stats').status_code == 200:
        if args['delete']:
            print 'Attempting delete of existing index at %s ...' % url,
            #r = requests.delete(url + 'ebok/')
            #print "\nebok done", r.text
            #r = requests.delete(url + 'ebook/')
            #print '\nebook done', r.text
            r = requests.delete(url)
            print '\nxcherry done', r.text
        else:
            print "Index exists, use --delete flag to force deletion before creation"
            exit(1)
    
    # create index
    #ret = requests.put(url, data=json.dumps(create_config(args['index'])))

    ret = requests.post(url_c)
    ret = requests.put(url_s, data=json.dumps(create_config(args['index'])['settings']))
    ret = requests.post(url_o)
    print "create return ", 
    for i in (json.loads(ret.text)).get('items', []):
        print i


    if ret.status_code == 200:
        print "settings succeeded", url_s
        ret = requests.put(url_m, data=json.dumps(create_config(args['index'])['mappings']))
        if ret.status_code == 200:
            print "mappings succeeded", url_m
        else:
            print "Could not create index, HTTP status %d\n%s" % (ret.status_code, ret.text)
    else:
        print "Could not create index, HTTP status %d\n%s" % (ret.status_code, ret.text)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Sets up an elasticsearch index for cherry project') 
    parser.add_argument('-d', '--delete', action='store_true', help='forces deletion if index exists')
    parser.add_argument('-p', '--port', help='elasticsearch port number, defaults to 9200', type=int, default=9200)
    parser.add_argument('--server', help='Elastic search server, default to localhost', default='localhost')
    parser.add_argument('--index', help='Name of index', default='xinfo_index')

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    create(**args)

