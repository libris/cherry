from twitter import Twitter as TwitterClient, OAuth

class Twitter:
    def __init__(self, access_token, access_token_secret, consumer_key, consumer_secret):
        self.twittclient = TwitterClient(auth = OAuth(access_token, access_token_secret, consumer_key, consumer_secret))

    def trends(self, woe_id = 23424954):
        results = self.twittclient.trends.place(_id = 23424954)

        topics = [t["name"][1:] if t["name"].startswith("#") else t["name"] for t in results[0]["trends"]]

        return topics

    def __repr__(self):
        return str("Twitter")


import requests
from lxml import etree

class Google:
    google_trend_url = "http://www.google.com/trends/hottrends/atom/feed?pn={country_id}"

    def trends(self, country_id='p42'):
        res = requests.get(self.google_trend_url.format(country_id=country_id), stream=True, timeout=3600, headers={'Accept': 'application/atom+xml'})
        #xml = etree.parse(res.raw)
        xml = etree.fromstring(res.content)

        #topics = [entry.text for entry in xml.getroot().findall("./channel/item/title")]
        topics = [entry.text for entry in xml.findall("./channel/item/title")]

        return topics

    def __repr__(self):
        return str("Google")


def all_trends(*args):
    topics = []
    taken_topics = []
    for service in args:
        for t in service.trends():
            # Eliminate duplicates
            if t not in taken_topics:
                topics.append({"service":service.__repr__(), "topic":t})
            taken_topics.append(t.lower())

    return topics





