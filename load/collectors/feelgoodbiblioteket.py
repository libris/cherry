#!/usr/bin/env python
# -*- coding: utf-8 -*-

import requests
from lxml import etree

url = "http://feelgoodbiblioteket.com/feed/atom/"
ATOM = "{http://www.w3.org/2005/Atom}"

def consume():
    res = requests.get(url, stream=True, timeout=3600)
    xml_root = etree.parse(res.raw)

    entries = xml_root.findall("{0}entry".format(ATOM))
    print("Found {0} entries".format(len(entries)))
    for entry in entries:
        print("content", entry.findtext("{0}content".format(ATOM)))

if __name__ == "__main__":
    consume()
