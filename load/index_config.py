#!/usr/bin/env python
# -*- coding: utf-8 -*-

def create_config(index, shards=10, replicas=1):
    return {
        "mappings": {
            "book": {
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

                }
            },

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
