var Backbone = require('backbone')
var _ = require('underscore')

var Router = Backbone.Router.extend({
  initialize: function() {

    this.route(/.*/, '404')
    this.route(/^post\/([^\/]+)$/, 'post')
    this.route(/^trends(\/\?(.*))?$/, 'trends')
    this.route(/^improve(\/\?(.*))?$/, 'improve')
    this.route(/^derail(\/\?(.*))?$/, 'derail')
    this.route(/^ord(\/\?(.*))?$/, 'ord')
    this.route(/^$/, 'trends')

    this.route(/(.*)\/+$/, "trailFix", function (id) {
      // remove all trailing slashes if more than one
      this.navigate(id.replace(/(\/)+$/, ''), true)
    })
  },
  history: [],
  crumbs: [],
  backbutton: false,
  getRouteProps: function(loc) {
    loc = loc || window.location
    var fragment = decodeURI(loc.pathname + (loc.search || ''))
    var match = null
    var routes = _.keys( _.result(this, 'routes') )
    var props = {
      name: '',
      params: []
    }
    var i = -1
    fragment = fragment.replace(/^[#\/]|\s+$/g, '').replace(/^\//,'')
    
    while( match === null && ++i<routes.length ) {
      match = fragment.match(this._routeToRegExp(routes[i]))
    }
    if (match) {
      props.name = this.routes[routes[i]]
      props.params = match.slice(1, match.length-1)
    }
    return props
  }
})

var router = new Router()
console.log('router', router)
module.exports = router
