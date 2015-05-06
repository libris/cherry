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
  loadHits: function(word, cb) {
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
      var trending = collections.get('trending')
      var hits = collections.get('hits')
      var plant = function(index) {
        var seedModel = trending.at(index)
        if ( !seedModel )
          throw new Error('Seed models ran out')
        var topic = seedModel.get('topic')
        if ( !topic )
          throw new Error('Seed topic was empty at '+index)
        this.loadHits(topic, function(response) {
          if ( !response.items.length ) {
            console.info('No items found for '+topic+', planting another tree...')
            trending.remove(seedModel)
            hits.remove(hits.at(hits.length-1))
            plant(++index)
          } else {
            this.masonry.init(this.refs.container.getDOMNode())
            this.masonry.update(this.triggerLazyLoad)
          }
        })
      }.bind(this)
      plant(0)
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
  renderItems: function(hits) {
    var content = null
    if ( hits && hits.length ) {
      content = hits.map(function(model) {
        var items = model.get('items')
        return (_.isArray(items) ? items : []).map(function(item, i) {
          return <CardItem key={i+':'+item['@id']} data={item} />
        })
      })
    }
    return content
  },
  render: function() {
    var content = null
    var hits = collections.get('hits')
    if ( this.state.loading ) {
      content = <p>Loading trending topics_</p>
    } else {
      content = this.renderItems(hits) || <div>Loading...</div>
    }
    return (
      <div>
        <KeywordBar />
        <div ref="container">{content}</div>
      </div>
    )
  }
})