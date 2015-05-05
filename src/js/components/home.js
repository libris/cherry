var React = require('react')
var Data = require('../data')
var trending = require('../collections').get('trending')
var CardItem = require('./carditem')
var MasonryMixin = require('react-masonry-mixin')
var $ = require('jquery')
var Tick = require('next-tick')

var masonryOptions = {
    transitionDuration: 0
};

module.exports = React.createClass({
  displayName: 'HomeComponent',
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
      if ( this.masonry )
        return
      var mix = MasonryMixin('masonryContainer', masonryOptions)
      for( var prop in mix ) {
        if ( !this.hasOwnProperty(prop) )
          this[prop] = mix[prop]
      }
      this.initializeMasonry()
      this.performLayout()
      Tick(function() {
        var evt = document.createEvent('MouseEvent')
        evt.initMouseEvent('scroll', true, true)
        window.dispatchEvent(evt)
      })
    })
  },
  componentWillUnmount: function() {
    // Destroy masonry
  },
  componentDidMount: function() {

  },
  render: function() {
    if ( this.state.loading ) {
      return <p>Loading trending topics_</p>
    }
    var trends = trending.map(function (trend) {
      return <CardItem key={trend.cid} data={trend} />
    })
    return <div ref="masonryContainer">{trends}</div>
  }
})