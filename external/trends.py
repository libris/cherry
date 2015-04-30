from twitter import Twitter as TwitterClient, OAuth

class Twitter:
    def __init__(self, access_token, access_token_secret, consumer_key, consumer_secret):
        self.twittclient = TwitterClient(auth = OAuth(access_token, access_token_secret, consumer_key, consumer_secret))

    def trends(self, woe_id = 23424954):
        results = self.twittclient.trends.place(_id = 23424954)

        topics = [t["name"][1:] if t["name"].startswith("#") else t["name"] for t in results[0]["trends"]]

        return topics


class Google:
    def __init__(self):
        self.initialized = True
