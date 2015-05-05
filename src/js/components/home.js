var React = require('react')
var Data = require('../data')
var trending = require('../collections').get('trending')
var CardItem = require('./carditem')
var KeywordBar = require('./keywordbar')
var Masonry = require('../masonry')
var $ = require('jquery')
var Tick = require('next-tick')


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
    }, function() {
      this.masonry.init(this.refs.container.getDOMNode(), function() {
        var evt = document.createEvent('MouseEvent')
        evt.initMouseEvent('scroll', true, true)
        window.dispatchEvent(evt)
      })
    })
  },
  componentWillUnmount: function() {
    // Destroy masonry
    this.masonry.destroy()
  },
  componentDidMount: function() {
    this.masonry = new Masonry({
      transitionDuration: 0
    })
  },
  render: function() {
    if ( this.state.loading ) {
      return <p>Loading trending topics_</p>
    }
    var trends = trending.map(function (trend) {
      return <CardItem key={trend.cid} data={trend} />
    })
    return (
      <div>
        <KeywordBar />
        <div ref="container">{trends}</div>
      </div>
      )
  }
})