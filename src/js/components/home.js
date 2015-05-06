var React = require('react')
var Data = require('../data')
var collections = require('../collections')
var CardItem = require('./carditem')
var KeywordBar = require('./keywordbar')
var Masonry = require('../masonry')
var $ = require('jquery')
var Tick = require('next-tick')
var _ = require('underscore')
var Promise = require('promise')

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
  triggerLazyLoad: function() {
    var evt = document.createEvent('MouseEvent')
    evt.initMouseEvent('scroll', true, true)
    window.dispatchEvent(evt)
  },
  plant: function(topic) {
    var hits = collections.get('hits')
    return new Promise(function(resolve, reject) {
      collections.get('hits').load({q: topic}).then(function(response) {
        if ( !response.items.length || !response.query.relatedWords.length ) {
          hits.remove(hits.at(hits.length-1))
          reject(topic+' was not suitable for planting, trying another seed...')
        } else {
          resolve(topic)
        }
      })
    })
  },
  sow: function(topics) {
    return new Promise(function(resolve, reject) {
      var plant = function(topic) {
        this.plant(topic).then(function(topic) {
          resolve(topic)
        }).catch(function() {
          topics.shift()
          topics.length ? plant(topics[0]) : reject('No more topics :(')
        })
      }.bind(this)
      plant(topics[0])
    }.bind(this))
  },
  dataDidLoad: function() {
    this.setState({
      loading: false
    }, function() {
      // load first seed
      var topics = collections.get('trending').map(function(model) {
        return model.get('topic')
      })
      this.sow(topics).then(function(response) {
        this.masonry.init(this.refs.container.getDOMNode())
        this.masonry.update(this.triggerLazyLoad)
      }.bind(this)).catch(function(e) {
        throw new Error(e)
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
    if ( this.state.loading )
      content = <p>Loading trending topics_</p>
    else
      content = this.renderItems(hits) || <div>Loading...</div>
    return (
      <div>
        <KeywordBar />
        <div ref="container">{content}</div>
      </div>
    )
  }
})