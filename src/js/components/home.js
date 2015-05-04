var React = require('react')
var Data = require('../data')
var trending = require('../collections').get('trending')

module.exports = React.createClass({
  mixins: [Data.mixin],
  getDataDependencies: function() {
    return [{
      collection: 'trending',
      query: {foo: 'bar'}
    }]
  },
  render: function() {
    if ( trending.isLoading() ) {
      return <p>Loading trending topics...</p>
    }
    return <p>{JSON.stringify(trending)}</p>
  }
})