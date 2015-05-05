var React = require('react')
var Data = require('../data')
var collections = require('../collections')
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
      collections.get('hits').load({q: 'deklarera'}).then(function(response) {
        this.masonry.init(this.refs.container.getDOMNode(), function() {
          var evt = document.createEvent('MouseEvent')
          evt.initMouseEvent('scroll', true, true)
          window.dispatchEvent(evt)
        })
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
    var content = null
    if ( this.state.loading ) {
      content = <p>Loading trending topics_</p>
    } else {
      var hits = collections.get('hits').getModel({ query: 'deklarera' })
      if ( hits && hits.get('items') ) {
        content = hits.get('items').map(function(item, i) {
          return <CardItem key={i+':'+item['@id']} data={item} />
        })
      } else {
        content = <p>Loading results</p>
      }
    }
    return (
      <div>
        <KeywordBar />
        <div ref="container">{content}</div>
      </div>
    )
  }
})