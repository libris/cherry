#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import json
import subprocess
from os import listdir
from os.path import isfile, join
from elasticsearch import Elasticsearch

es = None

def extract(pdffile):
    isbn = pdffile.split("/").pop().split(".")[0]
    text = subprocess.Popen("pdftotext -enc UTF-8 -nopgbrk -eol unix %s -" % pdffile, shell=True, stdout=subprocess.PIPE).stdout.read().decode('utf-8')
    print("Extracted text from %s with %d characters." % (isbn, len(text)))
    record = {
        'isbn': isbn,
        'text': text,
    }
    return record

def find_parent(isbn):
    query = {
        "query": {
            "term" : { "isbn" : isbn }
        }
    }
    result  = es.search(index='cherry',
                       doc_type='record',
                       size=1,
                       body=query)
    if 'hits' in result:
        try:
            parent = result.get("hits").get("hits")[0].get("_id")
            return paren
        except:
            print("No hits for {0}".format(isbn))

    return None



if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Cherry PDF extractor')
    parser.add_argument('--elasticsearch', help='Elasticsearch connect url', default='localhost:9200', nargs='+')
    args = vars(parser.parse_args())
    es = Elasticsearch(args['elasticsearch'], sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=10, timeout=30)

    path = '/tmp/archive'
    for pdf in listdir(path):
        pdf_with_path = join(path, pdf)
        if isfile(pdf_with_path) and pdf_with_path.endswith(".pdf"):
            record = extract(pdf_with_path)
            parent = find_parent(record['isbn'])
            if parent:
                es.create(index='cherry', doc_type='excerpt', id=record['isbn'], body=record, parent=parent)

