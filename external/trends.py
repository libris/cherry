from twitter import Twitter as TwitterClient, OAuth

class Twitter:
    def __init__(self, access_token, access_token_secret, consumer_key, consumer_secret):
        self.twittclient = TwitterClient(auth = OAuth(access_token, access_token_secret, consumer_key, consumer_secret))

    def trends(self, woe_id = 23424954):
        results = self.twittclient.trends.place(_id = 23424954)

        topics = [t["name"][1:] if t["name"].startswith("#") else t["name"] for t in results[0]["trends"]]

        return topics


import requests
from lxml import etree

class Google:
    google_trend_url = "http://www.google.com/trends/hottrends/atom/feed?pn={country_id}"

    def trends(self, country_id='p42'):
        res = requests.get(self.google_trend_url.format(country_id=country_id), stream=True, timeout=3600, headers={'Accept': 'application/atom+xml'})
        xml = etree.parse(res.raw)

        topics = [entry.text for entry in xml.getroot().findall("./channel/item/title")]

        return topics

def all_trends(*args):
    topics = []
    for service in args:
        for t in service.trends():
            topics.append(t.lower())

    return set(topics)

