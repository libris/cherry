#!/usr/bin/env python

import os
import sys
from re import split
import json
import requests
from argparse import ArgumentParser
from flask import Flask

app = Flask(__name__)
app.config.from_pyfile('../config.cfg')
home = '/Users/lisa/dev/cherry'


def bookdata(pdir):
    lines = [line.strip() for line in open('{0}/archive/bulktext.txt'.format(pdir))]
    first = 0
    size = 10
    c = 1
    while first+size <= len(lines):
        part = " ".join(lines[first:first+size])
        first+=size
        c+=1
        yield (c, part)


def ingest(**args):
    url = app.config['ELASTIC_URI']
    pdir = app.config['INGEST_ROOT']
    esdoc = []
    bulk_result = []

    json_data = {}
    count = 0

    for c, part in bookdata(pdir):
        if len(part):
            try:
                #Bulk index
                print "ett"
                esdoc += [ '{ "index" : { "_id" : "%s"}}'% c ]
                print "tu"
                json_data["description"] = part
                #target_dir = '{0}/{1}'.format(app.config['ARCHIVE_ROOT'], bib_dir)
                target_dir = '{0}/archive'.format(pdir)
                esdoc += [ json.dumps(json_data) ]
                print "ett", esdoc


                #Save source json

                if not os.path.exists(target_dir):
                    os.makedirs(target_dir)
                with open('{0}/source.json'.format(target_dir), 'w') as outfile:
                    json.dump(json_data, outfile)
                

            except Exception as e:
                print e
                print "Error creating bulk post for bibid: {0}, {1}".format(c, e)

            json_data = {}
            count +=1
            if count > 99:
                if url:
                    print "bulking", len(esdoc)
                    r = requests.put(url + '/text/_bulk', data='\n'.join(esdoc)+'\n')
                    try:
                        for doc in json.loads(r.text).get('items', []):
                            bulk_result.append(doc)
                            the_error = doc.get('index', {}).get('error', 0)
                            if the_error:
                                print the_error
                    except:
                        ett = 1
                    count = 0
                    with open('{0}/load/archive/esdocfile.json'.format(home), 'w') as outfile:
                        json.dump(esdoc, outfile)
                    esdoc = []



    if url:
        print "last bulk", len(esdoc)
        r = requests.put(url + '/text/_bulk', data='\n'.join(esdoc)+'\n')
        try:
            for doc in json.loads(r.text).get('items', []):
                bulk_result.append(doc)
                the_error = doc.get('index', {}).get('error', 0)
                if the_error:
                    print the_error
        except:
            ett = 1
        esdoc = []

        print "Bulk result: ", bulk_result

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-t', '--total', action='store_true', help='total ingest, as opposed to only reindexing')
    args = vars(parser.parse_args())

    ingest(**args)

