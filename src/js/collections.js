var Backbone = require('backbone')
var CollectionFactory = require('./collectionfactory')

module.exports = CollectionFactory({
  trending: {
    dataUrl: '/api/trending',
    cacheTTL: 0
  },
  hits: {
    dataUrl: '/api/flt',
    getCollectionList: function(result) {
      return [result]
    }
  },
  posts: {
    dataUrl: '/api/bok',
    getCollectionList: function(result) {
      return [result]
    }
  },
  search: {
    dataUrl: '/api/search',
    getCollectionList: function(result) {
      return [result]
    }
  }
})
