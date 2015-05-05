var React = require('react')
var Data = require('../data')
var trending = require('../collections').get('trending')

module.exports = React.createClass({
  mixins: [Data.mixin],
  getDataDependencies: function() {
    return [{
      collection: 'trending'
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
      console.log(trend)
      return <div key={trend.cid}>{trend}</div>
    })
    return <div>{trends}</div>
  }
})