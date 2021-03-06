#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import requests
from dateutil.parser import parse
import lxml.html
from lxml.html.clean import Cleaner
import base64
from lxml import etree
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
from .util import *

ATOM = "{http://www.w3.org/2005/Atom}"
blogs = {
    "feelgoodbiblioteket" : "http://feelgoodbiblioteket.com/feed/atom/?paged={page}",
    "fiktiviteter" : "http://www.fiktiviteter.se/feed/atom/?paged={page}",
    "kulturloggen" : "http://feeds.feedburner.com/Kulturloggen",
    "nellas" : "http://nellasbocker.blogspot.se/feeds/posts/default",
    "lyrans" : "http://www.lyransnoblesser.se/feeds/posts/default",
    "carolina" : "http://www.blogger.com/feeds/1677622624277141676/posts/default",
    "bookbirds" : "http://www.blogger.com/feeds/6219321356983036215/posts/default",
    "sagorna" : "https://www.blogger.com/feeds/8641905497705737270/posts/default",
    "oarya" : "http://oarya.se/feed/atom/?paged={page}",
    "bokhora" : "http://bokhora.se/feed/atom/?paged={page}"
}


def consume(url, server, index_name):
    print("Consuming blog from ", url)
    es = Elasticsearch(server, sniff_on_start=True, sniff_on_connection_fail=True, sniffer_timeout=60)
    page = 0
    docs = {}
    cleaner = Cleaner(javascript=True, style=True)
    next_page = None
    while True:
        page += 1
        if not next_page:
            next_page = url.format(page=page)
        if page > 1 and next_page == url:
            print("Failure casued looping. Saving documents and breaking.")
            bulkdata = [ { '_index': index_name, '_type': 'blog', '_id' : str(es_id) , '_source': jsondoc } for (es_id, jsondoc) in docs.items() ]
            bulk(es, bulkdata)
            break

        res = requests.get(next_page, stream=True, timeout=3600, headers={'Accept': 'application/atom+xml'})

        entries = []
        try:
            xml_root = etree.parse(res.raw)

            blog_name = xml_root.findtext("{0}title".format(ATOM))
            blog_subtitle = xml_root.findtext("{0}subtitle".format(ATOM))

            blog_url= xml_root.findall("{0}link[@rel='alternate'][@type='text/html']".format(ATOM))[0].get("href")

            entries = xml_root.findall("{0}entry".format(ATOM))
            print("Found {0} entries on page {1}".format(len(entries), next_page))

            next_link_elements = xml_root.findall("{0}link[@rel='next']".format(ATOM))
            next_page = next_link_elements[0].get("href") if len(next_link_elements) > 0 else None
        except lxml.etree.XMLSyntaxError as ex:
            print("Problem with page, trying next", ex)
            next

        if len(entries) == 0:
            print("All posts consumed. Saving ...")
            bulkdata = [ { '_index': index_name, '_type': 'blog', '_id' : str(es_id) , '_source': jsondoc } for (es_id, jsondoc) in docs.items() ]
            r = bulk(es, bulkdata)
            print("save result", r)
            break


        for entry in entries:
            try:
                entry_title = lxml.html.document_fromstring(entry.findtext("{0}title".format(ATOM))).text_content()
                pub_element = lxml.html.document_fromstring(entry.findtext("{0}published".format(ATOM))).text_content()
                published = parse(pub_element)
                back_link_elements = entry.findall("{0}link[@rel='alternate']".format(ATOM))
                entry_id = back_link_elements[0].get("href") if len(next_link_elements) > 0 else entry.findtext("{0}id".format(ATOM))
                content = entry.find("{0}content".format(ATOM)).text
                entry_content = remove_markup(content)

                categories = [c.get("term") for c in entry.findall("{0}category".format(ATOM))]

                jsonld = {}
                jsonld['@type'] = "BlogPosting"
                jsonld['name'] = entry_title
                jsonld['url'] = entry_id
                jsonld['text'] = entry_content
                jsonld['created'] = published.strftime("%Y-%m-%dT%H:%M:%S%z")
                if categories:
                    jsonld['keywords'] = categories
                jsonld['isPartOf'] = {'url' : blog_url, '@type':"Blog",'name': blog_name }
                if blog_subtitle:
                    jsonld['isPartOf']['subTitle'] = blog_subtitle

                elastic_id = bytes.decode(base64.urlsafe_b64encode(bytes(entry_id, 'UTF-8')))

                docs[elastic_id] = jsonld
            except lxml.etree.XMLSyntaxError as ex:
                print("Problem on page {0}: {1}".format(page, ex))
            except AttributeError:
                print("attribute error for content:", content)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Loads blog posts into cherry')
    parser.add_argument('--server', help='Elastic server, default to localhost', default='localhost', nargs='+')
    parser.add_argument('--toindex', help='Elastic index, default to cherry', default='cherry')
    group = parser.add_mutually_exclusive_group()
    group.add_argument('--blog', help='Which blog to load. Available are: %s or \'all\'' % list(blogs.keys()))
    group.add_argument('--feed', help='Load atom data from feed')


    try:
        args = vars(parser.parse_args())
    except:
        exit(1)

    if args['blog']:
        urls = list(blogs.values()) if args['blog'] == 'all' else [blogs[args['blog']]]
        for url in urls:
            consume(url, args['server'], args['toindex'])
    else:
        consume(args['feed'], args['server'], args['toindex'])
