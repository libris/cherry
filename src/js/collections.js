var Backbone = require('backbone')
var CollectionFactory = require('./collectionfactory')

module.exports = CollectionFactory({
  trending: {
    dataUrl: '/api/trending',
    cacheTTL: 0
  },
  hits: {
    dataUrl: '/api/flt_records_with_related',
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