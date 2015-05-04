var React = require('react')
var Data = require('../data')
var trending = require('../collections').get('trending')

module.exports = React.createClass({
  mixins: [Data.mixin],
  getDataDependencies: function() {
    return [{
      collection: 'trending',
      query: {q: 'apa'}
    }]
  },
  getInitialState: function() {
    return {
      loading: true
    }
  },
  dataDidLoad: function() {
    this.setState({
      loading: false
    })
  },
  render: function() {
    if ( this.state.loading ) {
      return <p>Loading trending topics_</p>
    }
    return <p>{JSON.stringify(trending)}</p>
  }
})