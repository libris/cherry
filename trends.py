from twitter import *

def twitter(config):
    SWEDEN_WOE_ID = 23424954

    twitter = Twitter(auth = OAuth(config['TWITTER_ACCESS_TOKEN'], config['TWITTER_ACCESS_TOKEN_SECRET'], config['TWITTER_CONSUMER_KEY'], config['TWITTER_CONSUMER_SECRET']))

    results = twitter.trends.place(_id = 23424954)

    topics = [t["name"][1:] if t["name"].startswith("#") else t["name"] for t in results[0]["trends"]]

    return topics


