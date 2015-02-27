#!/usr/bin/env python
# -*- coding: utf-8 -*-

def create_config(index, shards=10, replicas=1):
    return {
        "mappings": {
            "text": {
                "properties": {
                    "description": {
                        "type": "string",
                        "term_vector": "with_positions_offsets_payloads",
                        "store" : "true",
                        "index_analyzer" : "fulltext_analyzer"
                    },
                }
            }
        },
        "settings" : {
            "index" : {
                "number_of_shards" : 1,
                "number_of_replicas" : 0
            },
            "analysis": {
                "analyzer": {
                    "fulltext_analyzer": {
                        "type": "custom",
                        "tokenizer": "whitespace",
                        "filter": [
                            "lowercase",
                            "type_as_payload"
                        ]
                    }
                }
            }
        }
    }
