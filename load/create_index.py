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
    url = 'http://localhost:9200/texts/'
    #url = 'http://10.50.16.150:9200/{0}/'.format(args['index'])

    if requests.get(url + '_stats').status_code == 200:
        if args['delete']:
            print 'Attempting delete of existing index at %s ...' % url,
            #r = requests.delete(url + 'ebok/')
            #print "\nebok done", r.text
            #r = requests.delete(url + 'ebook/')
            #print '\nebook done', r.text
            r = requests.delete(url)
            print '\nebook done', r.text
        else:
            print "Index exists, use --delete flag to force deletion before creation"
            exit(1)
    
    # create index
    ret = requests.put(url, data=json.dumps(create_config(args['index'])))
    print "create return ", 
    for i in (json.loads(ret.text)).get('items', []):
        print i


    if ret.status_code == 200:
        print "Index created at %s" % url
    else:
        print "Could not create index, HTTP status %d\n%s" % (ret.status_code, ret.text)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Sets up an elasticsearch index for cherry project') 
    parser.add_argument('-d', '--delete', action='store_true', help='forces deletion if index exists')
    parser.add_argument('-p', '--port', help='elasticsearch port number, defaults to 9200', type=int, default=9200)
    parser.add_argument('--server', help='Elastic search server, default to localhost', default='localhost')
    parser.add_argument('--index', help='Name of index', default='texts')

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    create(**args)

