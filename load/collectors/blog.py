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

def consume(url, headers={}):
    page = 0
    docs = {}
    url = url + "?paged={page}"
    cleaner = Cleaner()
    cleaner.javascript = True
    cleaner.style = True
    while True:
        page += 1
        res = requests.get(url.format(page=page), stream=True, timeout=3600, headers=headers)

        xml_root = etree.parse(res.raw)

        blog_title = xml_root.findtext("{0}title".format(ATOM))
        blog_subtitle = xml_root.findtext("{0}subtitle".format(ATOM))

        entries = xml_root.findall("{0}entry".format(ATOM))
        if len(entries) == 0 or page == 2:
            bulk_store(docs, "http://localhost:9200/cherry/blog/_bulk")
            break

        print("Found {0} entries on page {1}".format(len(entries), page))
        for entry in entries:
            try:
                entry_title = lxml.html.document_fromstring(entry.findtext("{0}title".format(ATOM))).text_content()
                #entry_id = entry.findtext("{0}id".format(ATOM))
                # TODO: Fix this! Find a common way to extract referred url
                entry_id = entry.find("{0}link".format(ATOM)).get("href")
                content = entry.find("{0}content".format(ATOM))
                entry_content = lxml.html.document_fromstring(cleaner.clean_html(content.text)).text_content()
                categories = [c.get("term") for c in entry.findall("{0}category".format(ATOM)) if c.get("term") != "Uncategorized"]

                jsonld = {}
                jsonld['@type'] = "BlogPosting"
                jsonld['name'] = entry_title
                jsonld['derivedFrom'] = {'url' : entry_id, '@type':"Blog",'name': blog_title, 'subTitle': blog_subtitle}
                jsonld['text'] = entry_content
                if categories:
                    jsonld['keywords'] = categories

                elastic_id = bytes.decode(base64.urlsafe_b64encode(bytes(entry_id, 'UTF-8')))

                docs[elastic_id] = jsonld
            except lxml.etree.XMLSyntaxError as ex:
                print("Problem on page {0}: {1}".format(page, ex))


