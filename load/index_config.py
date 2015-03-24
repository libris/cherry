#!/usr/bin/env python
# -*- coding: utf-8 -*-

def create_config(index, shards=10, replicas=1):
    return {
        "mappings": {
            "record": {
                "properties": {
                    "description": {
                        "type": "string",
                        "term_vector": "with_positions_offsets_payloads",
                        "store" : "true",
                        "index_analyzer" : "fulltext_analyzer"
                    },
                    "summary": {
                        "type": "string",
                        "term_vector": "with_positions_offsets_payloads",
                        "store" : "true",
                        "index_analyzer" : "fulltext_analyzer"
                    },


                    '@id'        : { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                    '@type'      : { 'type' : 'string',  'index' : 'no',           'store' : 'true', 'include_in_all' : 'false' },
                    'created' : { 'type' : 'date', 'format' : 'date_time', 'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },

                    'modified' : { 'type' : 'date', 'format' : 'date_time', 'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                    'encodedId'        : { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },


                    'attributedTo': {
                        'type' : 'object',
                        'properties' : {
                            '@type': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                            'familyName': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'true', 'fields' : {'raw': {'type': 'string', 'index':'not_analyzed'}}},
                            'givenName': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'true', 'fields' : {'raw': {'type': 'string', 'index':'not_analyzed'}}},
                            'birthYear': { 'type' : 'date', 'format': 'year',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                            'deathYear': { 'type' : 'date', 'format': 'year', 'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                            'controlledLabel': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'true', 'fields' : {'raw': {'type': 'string', 'index':'not_analyzed'}}},
                        }},
                    'author' : {
                        'type' : 'object',
                        'properties' : {
                            '@id': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                        }
                    },

                    'instanceTitle': {
                        'type' : 'object',
                        'properties' : {
                            '@type': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                            'titleValue': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'true', 'fields' : {'raw': {'type': 'string', 'index':'not_analyzed'}}},
                            'subtitle': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'true', 'fields' : {'raw': {'type': 'string', 'index':'not_analyzed'}}},
                            'partTitle': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'true', 'fields' : {'raw': {'type': 'string', 'index':'not_analyzed'}}},
                            'partEnumeration': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                        }
                    },
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
            },
            "annotation" : {
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
                    "parentCandidate": {
                        'type': 'object',
                        'properties' : {
                            'title': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'false'},
                            'creator': { 'type' : 'string', 'store' : 'true', 'include_in_all' : 'false'},
                            'year': { 'type' : 'date', 'format': 'year',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                            '@id': { 'type' : 'string',  'index' : 'not_analyzed', 'store' : 'true', 'include_in_all' : 'false' },
                        }
                    },
                    "_parent": {"type": "record"}
                }
            }

        },
        "settings" : {
            'index':{
                #'number_of_shards': 6,
                #'number_of_replicas': 2,
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
        }



    }
