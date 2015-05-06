var React = require('react')
var Data = require('../data')
var collections = require('../collections')
var HitComponent = require('./hit')
var $ = require('jquery')
var Tick = require('next-tick')
var _ = require('underscore')
var Promise = require('promise')

var chopArray = function(array, range) {
  range = range || 3
  var ret = []
  while(array.length)
    ret.push(array.splice(0, range).join(' '))
  return ret
}

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
  plant: function(topic) {
    var hits = collections.get('hits')
    return new Promise(function(resolve, reject) {
      collections.get('hits').load({ q: topic }, { append: true }).then(function(response) {
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
        this.plant(topic).then(resolve).catch(function(e) {
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
      this.sow( chopArray(topics, 1) )
    })
  },
  findSeeds: function() {
    var hits = collections.get('hits')
    var last = hits.at(hits.length-1)
    var related = chopArray(last.get('query').relatedWords, 3)
    this.sow(related)
  },
  renderItems: function() {
    var content = null
    var hits = collections.get('hits')
    if ( hits && hits.length ) {
      content = hits.map(function(model, i) {
        return <HitComponent key={model.cid} hideKeywords={!i} model={model} />
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
      content = this.renderItems() || <div>Loading...</div>
    return (
      <div>
        <header>
          <a className="top" href="">Topplistor</a>
          <a className="winners" href="">Prisvinnare</a>
          <a className="trends" href="">Trender</a>
        </header>
        <div ref="container">{content}</div>
        <button onClick={this.findSeeds}>Plant some more</button>
      </div>
    )
  }
})