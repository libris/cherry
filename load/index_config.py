#!/usr/bin/env python
# -*- coding: utf-8 -*-
from collections import OrderedDict

def create_config(index, ctype):
    mappings = OrderedDict()
    mappings['book'] = {
        "properties": {
            '@id': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
            '@type': { 'type' : 'string',  'index' : 'no',           'store' : 'true', 'include_in_all' : 'false' },
            'creator': {
                'type' : 'object',
                'properties' : {
                    '@type': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                    'familyName': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'true', 'fields' : {'raw': {'type': 'string', 'index':'not_analyzed'}}},
                    'givenName': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'true', 'fields' : {'raw': {'type': 'string', 'index':'not_analyzed'}}},
                    'name': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'true', 'fields' : {'raw': {'type': 'string', 'index':'not_analyzed'}}},
                    'birthYear': { 'type' : 'date', 'format': 'year',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                    'deathYear': { 'type' : 'date', 'format': 'year', 'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                }
            },
            'isbn': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'true', 'fields' : {'raw': {'type': 'string', 'index':'not_analyzed'}}},
            'title': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'true', 'fields' : {'raw': {'type': 'string', 'index':'not_analyzed'}}},
            'subject': {
                'type' : 'object',
                'properties' : {
                    '@type': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                    'broader': {
                        'type' : 'object',
                        'properties' : {
                            '@id': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                            'prefLabel': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                        }
                    },
                    'inScheme': {
                        'type' : 'nested',
                        'properties' : {
                            '@type': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                            '@id': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                            'notation': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                        }
                    },
                    '@id': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                }
            },
            'classification': {
                'type' : 'object',
                'properties' : {
                    '@type': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                    'notation': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                    'prefLabel': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                    '@id': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                    'inScheme': {
                        'type' : 'nested',
                        'properties' : {
                            '@type': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                            '@id': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                            'notation': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                        }
                    },
                },
            },
        }
    }
    mappings['annotation'] = {
        "properties": {
            '@type' : { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
            'annotationSource': {
                'type': 'object',
                'properties' : {
                    'name' : { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'true', 'fields' : {'raw': {'type': 'string', 'index':'not_analyzed'}}},# difference name/label?
                }
            },
            "text": { #call this information text for all types, and differentiate by type field
                     "type": "string",
                     "term_vector": "with_positions_offsets_payloads",
                     "store" : "true",
                     "index_analyzer" : "fulltext_analyzer"
                    },
        },
        "_parent": {"type": "book"}
    }
    if ctype == "mappings":
        return mappings
    if ctype == "settings":
        return {
            'analysis':{
                'analyzer':{
                    "fulltext_analyzer": {
                        "type": "custom",
                        "tokenizer": "standard",
                        "filter": [
                            "standard",
                            "lowercase",
                            "type_as_payload"
                        ]
                    },
                    "autocomplete": {
                        "type":      "custom",
                        "tokenizer": "standard",
                        "filter": ['standard', "lowercase", "autocomplete_filter"]
                    }
                },
                'filter':{
                    "autocomplete_filter": {
                        "type":     "edge_ngram",
                        "min_gram": 2,
                        "max_gram": 50
                    }
                }
            }
        }
