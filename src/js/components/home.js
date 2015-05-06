var React = require('react')
var Data = require('../data')
var collections = require('../collections')
var CardItem = require('./carditem')
var KeywordBar = require('./keywordbar')
var Masonry = require('../masonry')
var $ = require('jquery')
var Tick = require('next-tick')
var _ = require('underscore')

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
  appendHits: function(word, cb) {
    return collections.get('hits').load({q: word}).then(function(response) {
      typeof cb == 'function' && cb.call(this, response)
    }.bind(this))
  },
  triggerLazyLoad: function() {
    var evt = document.createEvent('MouseEvent')
    evt.initMouseEvent('scroll', true, true)
    window.dispatchEvent(evt)
  },
  dataDidLoad: function() {
    this.setState({
      loading: false
    }, function() {
      // load first seed
      var seed = collections.get('trending').at(0).get('title')
      this.appendHits(seed, function(response) {
        this.masonry.init(this.refs.container.getDOMNode())
        this.masonry.update(this.triggerLazyLoad)
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
  componentDidUpdate: function() {
    this.masonry && this.masonry.update()
  },
  render: function() {
    var content = null
    var hits = collections.get('hits')
    if ( this.state.loading ) {
      content = <p>Loading trending topics_</p>
    } else {
      if ( hits && hits.length ) {
        content = hits.map(function(model) {
          var items = model.get('items')
          return (_.isArray(items) ? items : []).map(function(item, i) {
            return <CardItem key={i+':'+item['@id']} data={item} />
          })
        })
      } else {
        content = <div>Loading results</div>
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