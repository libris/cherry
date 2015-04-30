#!/usr/bin/env python
# -*- coding: utf-8 -*-

import requests
import base64
import urllib

twitter_oauth_url="https://api.twitter.com/oauth2/token"
twitter_trends_url="https://api.twitter.com/oauth2/token?id=23424954"

def encode_auth_token(consumer_key, consumer_secret):
    key_string = "{key}:{secret}".format(key=urllib.parse.quote(consumer_key), secret=urllib.parse.quote(consumer_secret))
    return bytes.decode(base64.urlsafe_b64encode(bytes(key_string, 'UTF-8')))

def get_bearer_token(auth_token):
    headers = {
        "Authorization": "Basic %s" % auth_token,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
    res = requests.post(twitter_oauth_url, data='grant_type=client_credentials', headers=headers)
    return res.text

def list_trends(bearer_token):
    headers = {
        "Authorization": "Bearer %s" % bearer_token,
    }
    res = requests.get(twitter_oauth_url, headers=headers)
    print("res", res)
    return res.text

