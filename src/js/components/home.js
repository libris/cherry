var React = require('react')
var Router = require('../router')
var Data = require('../data')
var collections = require('../collections')
var HitComponent = require('./hit')
var $ = require('jquery')
var Tick = require('next-tick')
var _ = require('underscore')
var Promise = require('promise')
var Query = require('query-string')

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
      loading: true,
      section: 'home'
    }
  },
  plant: function(topic) {
    var hits = collections.get('hits')
    return new Promise(function(resolve, reject) {
      collections.get('hits').load({ q: topic }, { append: true }).then(function(response) {
        if ( !response.items.length || !response.query.relatedWords.length ) {
          hits.remove(hits.at(hits.length-1))
          reject(topic+' was not suitable for planting')
        } else {
          resolve(topic)
        }
      })
    })
  },
  getQueryFromRoute: function(route) {
    var query = Query.parse(route.params[1])
    return query.hasOwnProperty('q') ? query.q : ''
  },
  componentWillReceiveProps: function(nextProps) {
    var next = this.getQueryFromRoute(nextProps.route)
    var old  = this.getQueryFromRoute(this.props.route)
    if ( this.state.section !== nextProps.route.name )
      this.setState({
        section: nextProps.route.name
      })
    if ( next && next !== old ) {
      // check if we are appending or reloading
      if ( !old || next.substr(0, old.length) != old )
        collections.get('hits').reset()
      this.loadSequence(next)
    }
  },
  sow: function(topics) {
    return new Promise(function(resolve, reject) {
      var plant = function(topic) {
        this.plant(topic).then(resolve).catch(function(e) {
          topics.shift()
          topics.length ? plant(topics[0]) : reject('No more topics :(')
        })
      }.bind(this)
      if ( _.isArray(topics) )
        plant(topics[0])
      else
        this.plant(topics).then(resolve)
    }.bind(this))
  },
  loadSequence: function(q) {
    var sequence = q.split('|')
    var i = 0
    var part = sequence[i]
    var saw = function() {
      console.log('sowing', part.replace(/\+/g,' '))
      this.sow(part.replace(/\+/g,' ')).then(function() {
        part = sequence[++i]
        part && saw()
      })
    }.bind(this)
    saw()
  },
  dataDidLoad: function() {
    this.setState({
      loading: false
    }, function() {
      var q = this.getQueryFromRoute(this.props.route)
      if ( q )
        this.loadSequence(q)
      else {
        var topics = collections.get('trending').map(function(model) {
          return model.get('topic')
        })
        this.sow( chopArray(topics, 1) ).then(function(topic) {
          console.log('sawed topic', topic)
        }.bind(this))
      }
    })
  },
  grow: function() {
    var hits = collections.get('hits')
    var last = hits.at(hits.length-1)
    var related = last.get('query').relatedWords.splice(0, 3)
    var q = this.getQueryFromRoute(this.props.route) + '|' + related.join('+')
    Router.navigate('/'+this.state.section+'/?' + Query.stringify({q: q}), true)
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
    var trends = collections.get('trending').map(function(model, i) {
      var topic = model.get('topic')
      var href = '/trends/?' + Query.stringify({ q: topic })
      return <a href={href} key={i+topic}>{topic}</a>
    })
    return (
      <div>
        <header>
          <nav className="categories">
            <a className="top" href="">Topplistor</a>
            <a className="winners" href="">Prisvinnare</a>
            <a className="trends" href="">Trender</a>
          </nav>
          <nav className="trendbar">
            {trends}
          </nav>
        </header>
        <div ref="container">{content}</div>
        <button onClick={this.grow}>Plant some more</button>
      </div>
    )
  }
})