#!/usr/bin/env python
# -*- coding: utf-8 -*-

from external import Twitter, Google, all_trends
from search import *
from elasticsearch import Elasticsearch

CONFIG_FILE = 'config.cfg'

def verify_trends(trends, es):
    hot_trends = []
    for trend in trends:
        results = do_flt_query(es, size=1, q=trend['topic'])
        if results["hits"]["total"] > 0:
            hot_trends.append(trend)

    return hot_trends

if __name__ == "__main__":
    exec(open(CONFIG_FILE).read())
    es = Elasticsearch(ELASTIC_HOST, sniff_on_start=True, sniff_on_connection_fail=True, sniff_timeout=60, sniffer_timeout=300, timeout=30)
    twitter = Twitter(access_token=TWITTER_ACCESS_TOKEN,
                      access_token_secret=TWITTER_ACCESS_TOKEN_SECRET,
                      consumer_key=TWITTER_CONSUMER_KEY,
                      consumer_secret=TWITTER_CONSUMER_SECRET)
    google = Google()
    trends = all_trends(google, twitter)
    hot_trends = verify_trends(trends, es)
    with open('trending_topics.txt', 'w') as f:
        f.write(str(hot_trends))
