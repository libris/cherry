var Backbone = require('backbone')
var CollectionFactory = require('./collectionfactory')

module.exports = CollectionFactory({
  trending: {
    dataUrl: '/api/trending',
    cacheTTL: 0
  },
  hits: {
    dataUrl: '/api/hits',
    cacheTTL: 10,
    getCollectionList: function(result) {
      return [result]
    }
  }
})