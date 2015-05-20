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
      section: 'home',
      q: '',
      end: false
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
    this.setState({
      q: next.q || this.state.q
    }, function() {
      if ( this.state.section !== nextProps.route.name )
        this.setState({
          section: nextProps.route.name
        })
      if ( (old.q || next.q) && next.q !== old.q ) {
        hits.reset()
      }
      if ( next.q !== old.q || next.more !== old.more )
        this.loadSequence(next)
    })
  },
  onScroll: function(e) {
    if ( collections.get('hits').length && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.grow()
    }
  },
  componentDidMount: function() {
    window.addEventListener('scroll', this.onScroll)
  },
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.onScroll)
  },
  loadSequence: function(query) {
    query = query || this.getQuery()
    console.info('Loading sequence', query)
    var topic = this.state.q
    var more = Math.min((parseInt(query.more, 10) || 0), 10)
    var i = 0
    if ( !topic ) {
      console.warn('Cannot load sequence - no topic provided')
      return
    }
    var hits = collections.get('hits')
    var sow = function() {
      if ( hits.at(i) ) // If we already have a model in the same sequence order, skip loading
        return next()
      console.info('Planting topic: '+topic)
      this.plant(topic).then(next).catch(function(e) {
        console.warn('No more seeds available')
        this.setState({ end: true })
      }.bind(this))
    }.bind(this)
    this.setState({ growing: true })
    sow()
    var self = this
    function next() {
      if ( i<more ) {
        var hit = hits.at(hits.length-1)
        // console.log('QUERY', hit.get('query'))
        topic = hit.get('query').relatedWords.splice(0,3).join(' ')
        i++
        sow()
      } else {
        self.setState({ growing: false })
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
        var topic = collections.get('trending').map(function(model) {
          return model.get('topic')
        })[0]
        this.setState({
          q: topic
        }, function() {
          // console.log('q', this.state.q)
          this.plant( topic )
        })
      }
    })
  },
  grow: function(e) {
    if ( this.state.end || this.state.growing || !this.state.q )
      return
    e && e.preventDefault()
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
      content = <div className="loader"><i className="fa fa-4x fa-circle-o-notch fa-spin"></i></div>
    else
      content = this.renderItems() || <div className="loader"><i className="fa fa-4x fa-circle-o-notch fa-spin"></i></div>
    
    var end = null
    if ( collections.get('hits').length ) {
      var endContent = this.state.growing ? <i className="fa fa-4x fa-circle-o-notch fa-spin"></i> : 'Sök vidare'
      end = this.state.end ? <div className="end">Inga fler resultat.</div> : <button className="growspin" onClick={this.grow}>{endContent}</button>
    }

    return (
      <div>
        <Menu section={this.state.section} q={this.state.q} />
        <div ref="container">{content}</div>
        { end }
      </div>
    )
  }
})