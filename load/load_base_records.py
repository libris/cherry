#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests
from slugify import slugify

def load_records():
    url = "http://hp01.libris.kb.se:9200/libris_index/bib/_search?pretty"
    query = {
        "_source": [
            "about.@id",
            "about.creator.*",
            "about.title",
            "about.classification.*",
            "about.subject.*",
            "about.isbn",
            "about.publication.*",
        ],
        "query": {
            "term" : { "about.identifier.identifierScheme.@id" : "/def/identifiers/isbn" },
        },

        "filter" : {
            "exists" : { "field" : ["about.creator", "about.title"] }
        }

    }
    ret = requests.post(url, data=json.dumps(query))
    jres = json.loads(ret.text)
    for hit in jres['hits']['hits']:
        #print("source", hit['_source'])
        about = hit.get('_source').get('about', {})
        #print("about", about)
        #print("creator:", about.get('creator'))
        creator = about.get('creator', {})

        name = "{0} {1}".format(creator.get('givenName', ''), creator.get('familyName', '')) if creator.get('familyName') else "{0}".format(creator.get('name', ''))
        birthYear = creator.get("birthYear", "")
        slugName = slugify("{0} {1}".format(name, birthYear), to_lower=True, separator='')
        print("title", about.get('title'))
        title = slugify(about.get('title', {}).get('titleValue',''), to_lower=True, separator='')

        derivedFrom = 1
        slugId = "{name}{title}".format(name=slugName, title=title)
        print("slugId: {0}".format(slugId))




        # Load recordslug from elastic
        # Check fatvalue: count number of fields in new record and old record - enrich fattest record with any new fields in thinnest record§
        # Combine record and save it
        # Poppa popcorn
        # Vin
        # Yeah!


if __name__ == "__main__":
    load_records()
{
    "constant_score" : {
        "filter" : {
            "exists" : { "field" : "user" }
        }
    }
}
