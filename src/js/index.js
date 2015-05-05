var React = require('react')
window.Masonry = require('masonry-layout')
var Router = require('./router')
var Backbone = require('backbone')
var collections = require('./collections')
var App = require('./app')
var Link = require('./fastlink')
var PubSub = require('ainojs-pubsub')
var _ = require('underscore')

Backbone.$ = require('jquery')

// This runs in the browser

React.initializeTouchEvents(true)

var render = function(route) {
  React.render(<App route={route} />, document.getElementById('app'))
}

var didClick = false
PubSub.on('navclick', function() {
  didClick = true
})

Router.on('route', function(name, params) {

  var path = window.location.pathname
  var crumbs = Router.crumbs
  var fragment = Backbone.history.getFragment()

  Router.backbutton = !didClick && crumbs.length > 1 && crumbs[crumbs.length-2] == fragment

  Router.history.push(path)

  render({ 
    name: name, 
    params: params 
  })

  if ( Router.backbutton )
    crumbs.splice(-2,2)
  else 
    window.scrollTo(0,0)
  crumbs.push(fragment)

  didClick = false

})

Backbone.history.start({pushState: true})
