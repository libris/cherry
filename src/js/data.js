var Promise = require('promise')
var collections = require('./collections')
var isNode = require('detect-node')
var PubSub = require('ainojs-pubsub')

var resolvers = []
var state = false

module.exports.mixin = {

  componentWillMount: function() {

    var deps = this.getDataDependencies()

    if ( !deps || !deps.length )
      return

    var isCached = true

    var promises = deps.map(function(dep) {
      var collection = collections.get(dep.collection)
      if ( isCached && !collection.isCached(dep.query) )
        isCached = false
      return collection.load(dep.query)
    })

    // save promises and export them on the server
    if ( isNode ) {
      this.dataDidLoad() // always simulate that data has loaded on the server
      if ( state == 'init' ) {
        Array.prototype.push.apply(resolvers, promises)
      }
    } else {
      // no need to fulfill promises if cache exists or on first load
      if ( isCached )
        this.dataDidLoad()
      else {
        PubSub.trigger('loadstart')
        Promise.all(promises).then(function() {
          this.dataDidLoad()
          PubSub.trigger('loadfinish')
        }.bind(this)).catch(function(e) { console.error(e.stack) })
      }
    }
  }
}

// expose some lifecycle methods for the server

if ( isNode ) {

  module.exports.getResolvers = function() {
    state = 'prepare'
    return resolvers
  }

  module.exports.dataReady = function() {
    state = 'ready'
    resolvers = []
  }

  module.exports.init = function() {
    state = 'init'
    resolvers = []
  }
}