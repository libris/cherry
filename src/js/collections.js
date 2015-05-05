var Backbone = require('backbone')
var CollectionFactory = require('./collectionfactory')

module.exports = CollectionFactory({
  trending: {
    dataUrl: '/api/trending',
    cacheTTL: 5,
    listKey: 'items'
  }
})