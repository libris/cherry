var Backbone = require('backbone')
var Promise = require('promise')
var request = require('superagent')
var _ = require('underscore')
var isNode = require('detect-node')

var BaseCollection = Backbone.Collection.extend({

  cacheTTL: 60, // in minutes

  dataUrl: null, 

  getCollectionList: function(result) {
    return result.items
  },

  cache: [],

  model: Backbone.Model.extend({}),

  initialize: function() {
    Backbone.Collection.prototype.initialize.apply(this, arguments)
    this.cache = []
    this._loading = false
    this._empty = false
  },

  isCached: function(query) {
    this.invalidateCache()
    var q = query ? JSON.stringify(query) : ''
    return !!_.findWhere(this.cache, { q:q })
  },

  insertData: function(result) {
    if ( !result ) 
      throw 'No JSON data found in response'
    var list = this.getCollectionList(result)
    this._empty = !list.length
    this.reset(list)
    this._loading = false
    this.trigger('change')
    return result
  },

  invalidateCache: function() {
    if ( isNode )
      return
    this.cache = this.cache.filter(function(c) {
      return c.ttl > Date.now()
    })
  },

  load: function(query) {

    return new Promise(function(resolve, reject) {

      this._loading = true
      this._empty = false
      this.reset()

      var q = query ? JSON.stringify(query) : ''

      this.invalidateCache()
      var cache = _.findWhere(this.cache, { q:q })

      if ( cache ) {
        var result = this.insertData(cache)
        return resolve(result)
      }

      var url = isNode ? 'http://localhost:7000' + this.dataUrl : this.dataUrl

      request
        .get(url)
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1')
        .query(query)
        .end(function(err, res) {
          if ( err )
            return reject(err.code)
          if ( res.ok ) {
            var result = this.insertData(res.body)
            resolve(result)
            this.cache.push(_.extend(result, {
              q: q,
              ttl: Date.now() + (this.cacheTTL*1000*60)
            }))
          } else {
            reject(res.text)
          }
      }.bind(this))

    }.bind(this))
  },

  isLoading: function() {
    return !!this._loading
  },

  isEmpty: function() {
    return !!this._empty
  },

  comparator: function(model) {
    var position = model.get('position')
    return typeof position != 'undefined' ? position : model.get('name')
  },

  getModel: function(needle) {
    var model = this.findWhere(needle)
    if ( model )
      return model
    if ( this._loading )
      return new this.model() // return empty model so react can still render
  },
})

module.exports = function(collections) {

  var locals = {}
  var externals = {}
  var init = function(){}
  var i

  for( i in collections ) {
    locals[i] = BaseCollection.extend(collections[i])
  }

  // on the client, just expose the local object
  if ( !isNode ) {
    for( i in locals ) {
      externals[i] = new locals[i]()
    }
  } else {
    // on the server, expose an init method so we can attach the collections to the session
    init = function(session) {
      session.collections = {}
      for( var i in locals ) {
        session.collections[i] = new locals[i]()
      }
      externals = session.collections
    }
  }

  return {
    
    init: init,

    get: function(name) {
      return externals[name]
    },

    each: function(cb, context) {
      return _.each(externals, cb, context || this)
    }
  }
}