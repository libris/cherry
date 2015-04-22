#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import json
import subprocess
from os import listdir, makedirs
from os.path import isfile, join, exists
from elasticsearch import Elasticsearch
from PIL import Image

es = None
TMP_PPM_DIR = "/tmp/ppm"
JPG_DIR = "jpegs"

def extract(pdffile):
    print("Extracting $pdffile")
    isbn = pdffile.split("/").pop().split(".")[0]
    image = Image.open(subprocess.Popen("pdftoppm -f 1 -l 1 %s -" % pdffile, shell=True, stdout=subprocess.PIPE).stdout)
    image.save("{dir}/{isbn}.jpg".format(dir=JPG_DIR, isbn=isbn))
    print("Done ...")


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

    if not exists(TMP_PPM_DIR):
        makedirs(TMP_PPM_DIR)
    if not exists(JPG_DIR):
        makedirs(JPG_DIR)

    path = '/tmp/archive'
    for pdf in listdir(path):
        pdf_with_path = join(path, pdf)
        if isfile(pdf_with_path) and pdf_with_path.endswith(".pdf"):
            extract(pdf_with_path)
            #parent = find_parent(record['isbn'])
            #if parent:
                #es.create(index='cherry', doc_type='excerpt', id=record['isbn'], body=record, parent=parent)

