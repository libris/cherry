var Backbone = require('backbone')
var Router = require('./router')
var PubSub = require('ainojs-pubsub')
var Tick = require('next-tick')

var getLink = function(target) {
  while ( target.parentNode && target.nodeName != 'A' )
    target = target.parentNode
  return target.nodeName && target.nodeName == 'A' ? target : null
}

module.exports.onDeviceUp = function(e) {
  var link = getLink(e.target)
  if ( !link )
    return
  
  link.removeAttribute('data-active')
  var href = link.getAttribute('href')
  if ( !href || href == '#' )
    href = link.getAttribute('data-href')

  if ( href ) {
    if ( link.getAttribute('target') == '_blank' )
      window.open(href)
    else if ( link.hostname !== window.location.hostname || link.protocol !== window.location.protocol)
      window.location = href
    else {
      var fake = document.createElement('a')
      fake.href = href
      link.setAttribute('data-href', href)
      link.setAttribute('href', '#')
      if ( fake.href == window.location.href ) {
        Backbone.history.loadUrl(href)
      } else {
        PubSub.trigger('clicknav')
        Tick(function() { Router.navigate(href, true) })
      }
    }
    e.preventDefault()
  }
}

module.exports.onDeviceDown = function(e) {
  var link = getLink(e.target)
  link && link.setAttribute('data-active', '')
}

module.exports.onDeviceCancel = function(e) {
  var link = getLink(e.target)
  link && link.removeAttribute('data-active')
}
