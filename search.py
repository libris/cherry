# -*- coding: utf-8 -*-
import time

def do_flt_query(es, size=75, q=None, i=None, doctype=None, frm=None, to=None, sort=None, t=None, n=None, f=None, page=None, index_name='cherry'):
    """Will search annotations if no other doctype is given."""
    if not doctype:
        doctype=['annotation', 'excerpt']
    n = 50
    date_filter = []
    precision = 'y'

#    print("Query:", q)

    if i:
        try:
            q = child_texts(i)
        except:
            print("no record with id: ", i)
            return {"err": 1, "msg": "Ingen post med angivet id"}

    query = {
        "sort" : [],
        "size" : size,

        "query" :  {"flt": {
            "fields": ["text"],
            "like_text": q,
            "max_query_terms": 52,
            "prefix_length": 4
        }},

        #"fields": ["_parent", "name", "isPartOf.url", "text"],
        "fields": ["_parent", "_source"],
        #"_source" :[],
        #        "highlight" : { "fields" : { "summary" : {"type": "plain"}},
        #                        "pre_tags" : ["<1>"],
        #                        "post_tags" : ["<\/1>"],
        #                       "fragment_size": 100
        #                      },

        #min doc count might decrease risk of choosing misspellings, though throwing away rare occurrences of relevant synonyms - find a good threshold
        # don't calculate aggs for flt. that is handled by related.
        "aggs" : {
            "unigrams" : {"significant_terms" : {"field" : "text.unigrams", "size": 30, "gnd": {}}},
            #"bigrams" : {"significant_terms" : {"field" : "text.shingles", "size": 10, "gnd": {}}},
            #"bigrams_gnd" : {"significant_terms" : {"field" : "text.shingles", "size": 10}},


        }
    }
    if t:
        query['query'] = {
            "filtered": {
                "query": {
                    "flt": {
                        "fields": ["text"],
                        "like_text": q,
                        "max_query_terms": 52,
                        "prefix_length": 4
                    }
                },
                "filter": {
                    "and": [{ "isPartOf.@type": { "value": t}},]
                }
            }
        }

    if n:
        n = int(n)
        query['size'] = str(n)

    if page:
        print("page")
        query['from'] = n * int(page)
        print("the from", query['from'])




    if f:
        query['_source'] = f.split(',')

    t0 = time.time()
    #app.logger.debug("about to search")
    #print("doc_type:",doctype)
    #HERE is the elastic search call
<<<<<<< HEAD
    r = es.search(body=query, index='cherry4' doc_type=doctype)
=======
    r = es.search(body=query, index=index_name, doc_type=doctype)
>>>>>>> a9268325e0eaf0b6073a4635c8a1fd22abbfd820
    #app.logger.debug("did search {0} ({1} according to es)".format(time.time() - t0, r['took']))
    #print(r)
    return r

    rtext = json.loads(r.text)
    if rtext.get('status', 0):
        #app.logger.debug('error' + rtext.get('error'))
        err = {"err": 1, "msg": "Sökningen misslyckades", "hits": {"total": 0}}
        err['exception'] = r.text
        return err
    if rtext.get('hits', {}).get('hits', None):

        return rtext

    return rtext

