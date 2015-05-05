var Backbone = require('backbone')
var CollectionFactory = require('./collectionfactory')

module.exports = CollectionFactory({
  trending: {
    dataUrl: '/api/trending',
    cacheTTL: 0
  },
  hits: {
    dataUrl: '/api/hits',
    getCollectionList: function(result) {
      return [result]
    }
  },
  posts: {
    dataUrl: '/api/posts',
    getCollectionList: function(result) {
      return [result]
    }
  }
})