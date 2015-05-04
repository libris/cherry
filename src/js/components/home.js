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
    var trends = trending.map(function(trend, i) {
      return <div key={trend.cid}>{trend.get('hotBecause')}</div>
    })
    return <div>{trends}</div>
  }
})