# -*- coding: utf-8 -*-

#import psycopg2

class Record:
    def __init__(self, identifier, data, dataset, entry, extradata):
        self.identifier = identifier
        self.dataset = dataset
        self.data = data
        self.entry = entry
        self.extradata = extradata

    def __repr__(self):
        return "{dataset}/{identifier}".format(dataset=self.dataset, identifier=self.identifier)

class Storage:
    def __init__(self, database, host, user, password):
        self.connection = psycopg2.connect(database=database, user=user, host=host, password=password)

    def load(self, identifier, store='xinfo'):
        cursor = self.connection.cursor()
        query = "SELECT identifier,dataset,data,entry,meta FROM {table} WHERE identifier = '{identifier}'".format(table=store, identifier=identifier)
        cursor.execute(query)
        result = cursor.fetchone()
        if result:
            return Record(identifier=result[0], dataset=result[1], data=result[2], entry=result[3], extradata=result[4])
        return None

