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
var Menu = require('./menu')

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
          reject(topic+' was not suitable for planting')
        } else {
          resolve(topic)
        }
      })
    })
  },
  getQuery: function(route) {
    route = route || this.props.route
    if (typeof route.params != 'object')
      throw new Error('Could not get query, route is invalid')
    return Query.parse(route.params[route.params.length-1])
  },
  componentWillReceiveProps: function(nextProps) {
    var next = this.getQuery(nextProps.route)
    var old  = this.getQuery()
    var hits = collections.get('hits')
    if ( this.state.section !== nextProps.route.name )
      this.setState({
        section: nextProps.route.name
      })
    if ( (old.q || next.q) && next.q !== old.q ) {
      hits.reset()
    }
    if ( next.q !== old.q || next.more !== old.more )
      this.loadSequence(next)
  },
  // tries an array of seeds
  sow: function(topics) {
    return new Promise(function(resolve, reject) {
      var plant = function(topic) {
        this.plant(topic).then(resolve).catch(function(e) {
          topics.shift()
          hits.remove(hits.at(hits.length-1))
          topics.length ? plant(topics[0]) : reject('No more topics :(')
        })
      }.bind(this)
      plant(topics[0])
    }.bind(this))
  },
  loadSequence: function(query) {
    query = query || this.getQuery()
    console.info('Loading sequence', query)
    var topic = query.q
    var more = Math.min((parseInt(query.more, 10) || 0), 10)
    var i = 0
    if ( !topic ) {
      console.warn('Cannot load sequence - no topic provided')
      return
    }
    var hits = collections.get('hits')
    var saw = function() {
      if ( hits.at(i) ) // If we already have a model in the same sequence order, skip loading
        return next()
      console.info('Planting topic: '+topic)
      this.plant(topic).then(next).catch(function(e) {
        console.warn('No more seeds available')
      })
    }.bind(this)
    saw()
    function next() {
      if ( i<more ) {
        var hit = hits.at(hits.length-1)
        console.log('QUERY', hit.get('query'))
        topic = hit.get('query').relatedWords.splice(0,3).join(' ')
        i++
        saw()
      }
    }
  },
  dataDidLoad: function() {
    this.setState({
      loading: false
    }, function() {
      var q = this.getQuery().q
      if ( q )
        this.loadSequence()
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
  grow: function(e) {
    e.preventDefault()
    var query = this.getQuery()
    query.more = ( parseInt(query.more) || 0 ) + 1
    Router.navigate('/'+this.state.section+'/?' + Query.stringify(query), true)
  },
  renderItems: function() {
    var content = null
    var hits = collections.get('hits')
    if ( hits && hits.length ) {
      content = hits.map(function(model, i) {
        return <HitComponent key={model.cid} hideKeywords={this.state.section != 'ord' && i === 0} model={model} />
      }, this)
    }
    return content
  },
  render: function() {
    var content = null
    var hits = collections.get('hits')
    if ( this.state.loading )
      content = <p>Laddar ämnen...</p>
    else
      content = this.renderItems() || <div>Loading...</div>
    return (
      <div>
        <Menu section={this.state.section} query={this.getQuery()} />
        <div ref="container">{content}</div>
        <button onClick={this.grow}>Visa fler</button>
      </div>
    )
  }
})