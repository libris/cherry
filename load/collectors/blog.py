#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests
import lxml.html
from lxml.html.clean import Cleaner
import base64
from lxml import etree
from ..save_data import *

ATOM = "{http://www.w3.org/2005/Atom}"
CHERRY_ES_URL = "http://localhost:9200/cherry/blog/_bulk"

def consume(url, headers={}):
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
            bulk_store(docs, CHERRY_ES_URL)
            break

        res = requests.get(next_page, stream=True, timeout=3600, headers=headers)

        xml_root = etree.parse(res.raw)

        blog_name = xml_root.findtext("{0}title".format(ATOM))
        blog_subtitle = xml_root.findtext("{0}subtitle".format(ATOM))

        blog_url= xml_root.findall("{0}link[@rel='alternate'][@type='text/html']".format(ATOM))[0].get("href")

        entries = xml_root.findall("{0}entry".format(ATOM))
        print("Found {0} entries on page {1}".format(len(entries), next_page))

        next_link_elements = xml_root.findall("{0}link[@rel='next']".format(ATOM))
        next_page = next_link_elements[0].get("href") if len(next_link_elements) > 0 else None

        if len(entries) == 0:
            print("All posts consumed. Saving ...")
            bulk_store(docs, CHERRY_ES_URL)
            break

        for entry in entries:
            try:
                entry_title = lxml.html.document_fromstring(entry.findtext("{0}title".format(ATOM))).text_content()
                back_link_elements = entry.findall("{0}link[@rel='alternate']".format(ATOM))
                entry_id = back_link_elements[0].get("href") if len(next_link_elements) > 0 else entry.findtext("{0}id".format(ATOM))
                content = entry.find("{0}content".format(ATOM)).text

                html_elements = lxml.html.document_fromstring(cleaner.clean_html(content))
                entry_content = " ".join(t.strip() for t in html_elements.xpath('//text()'))

                categories = [c.get("term") for c in entry.findall("{0}category".format(ATOM))]

                jsonld = {}
                jsonld['@type'] = "BlogPosting"
                jsonld['name'] = entry_title
                jsonld['url'] = entry_id
                jsonld['text'] = entry_content
                if categories:
                    jsonld['keywords'] = categories
                jsonld['isPartOf'] = {'url' : blog_url, '@type':"Blog",'name': blog_name }
                if blog_subtitle:
                    jsonld['isPartOf']['subTitle'] = blog_subtitle

                elastic_id = bytes.decode(base64.urlsafe_b64encode(bytes(entry_id, 'UTF-8')))

                docs[elastic_id] = jsonld
            except lxml.etree.XMLSyntaxError as ex:
                print("Problem on page {0}: {1}".format(page, ex))

