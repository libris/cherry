#!/usr/bin/env python
# -*- coding: utf-8 -*-

import magic
from os import listdir
from os.path import join
import argparse
import lxml.html
from lxml.html.clean import Cleaner
from elasticsearch import Elasticsearch, NotFoundError
from elasticsearch.helpers import bulk, scan

es = None

def find_parent(isbn):
    query = {
        "query": {
            "term" : { "isbn" : isbn }
        }
    }
    result  = es.search(index=args['index'],
                       doc_type='record',
                       size=1,
                       body=query)
    if 'hits' in result:
        try:
            parent = result.get("hits").get("hits")[0].get("_id")
            return parent
        except:
            print("No hits for {0}".format(isbn))
    else:
        print("No hits for {0}".format(isbn))
    return None

def read_files(**args):
    cleaner = Cleaner(javascript=True, style=True)

    directory = args['directory']# "bokrondellen_summaries"
    #directory = "brs"
    prefix = args['prefix'] #"bokrondellen"
    suffix = args['type'] #"summary"

    docs = {}
    badcount = 0
    for f in listdir(directory):

        encoding = magic.from_file(join(directory, f)).decode('utf-8')
        if encoding.startswith("UTF-8") or encoding.startswith("ASCII text") or encoding.startswith("FORTRAN program"):
            dumpfile = open(join(directory, f))
        elif encoding.startswith("ISO-8859"):
            dumpfile = open(join(directory, f), encoding='latin1')
        else:
            print("BAD DATA in %s!!!! (%s)" % (f, encoding))
            badcount += 1

        record = {}
        reading_summary = False
        for line in dumpfile:
            line = line.strip()
            if line == "####":
                reading_summary = False
            if reading_summary:
                if line:
                    html = lxml.html.document_fromstring(cleaner.clean_html(line))
                    text = " ".join(t.strip() for t in html.xpath('//text()'))
                    text = text.replace("<br>","\n")
                    text = text.replace("<br />","\n")
                    text = text.replace("<br/>","\n")
                    text = text.replace("<b>", "")
                    text = text.replace("</b>", "")
                    text = text.replace("<i>", "")
                    text = text.replace("</i>", "")
                    text = text.replace("<p>", " ")
                    text = text.replace("</p>", " ")
                    text = text.replace("&nbsp;", " ")
                    record['text'] += text
            if line.startswith("## ISBN:"):
                record['isbn'] = line[8:]
                record['@type'] = "Summary"
                record['annotates'] = {"@id":"urn:isbn:%s" % record['isbn']}
                record['annotationSource'] = {"name":prefix.capitalize()}
                record['parent'] = find_parent(record['isbn'])
                record['text'] = ""
            if line == "## SUMMARY:":
                reading_summary = True

        if 'parent' in record and record['parent']:
            docs["%s:%s:%s" % (prefix ,record['isbn'], suffix)] = record
            record = {}

            if len(docs) % 1000 == 0:
                bulkdata = [ { '_index': 'cherry', '_type': 'annotation', '_id' : str(es_id) , '_parent': jsondoc.pop('parent'), '_source': jsondoc } for (es_id, jsondoc) in docs.items() ]
                r = bulk(es, bulkdata)
                docs = {}
    print("Processing remainder.")
    bulkdata = [ { '_index': 'cherry', '_type': 'annotation', '_id' : str(es_id) , '_parent': jsondoc.pop('parent'), '_source': jsondoc } for (es_id, jsondoc) in docs.items() ]
    r = bulk(es, bulkdata)

    print("Done. Badcount is %d" % badcount)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Loads annotations from xinfodump for cherry')
    parser.add_argument('--server', help='Elastic host, default to localhost', default='localhost', nargs='+')
    parser.add_argument('--index', help='Cherry index, default to cherry', default='cherry')
    parser.add_argument('--directory', help='The directory that contains the files')
    parser.add_argument('--prefix', help='Identifier and annotationSource. I.e. bokrondellen or nielsen.')
    parser.add_argument('--type', help='Type of data. I.e. summary or review.')

    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    es = Elasticsearch(args['server'], sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)

    read_files(**args)
