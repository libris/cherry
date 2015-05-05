var Backbone = require('backbone')
var _ = require('underscore')

var handlers = {
  home: require('./components/home'),
  post: require('./components/detail'),
  404: require('./components/404')
}

var Router = Backbone.Router.extend({
  initialize: function() {
    this.route(/(.*)\/+$/, "trailFix", function (id) {
      // remove all trailing slashes if more than one
      this.navigate(id.replace(/(\/)+$/, ''), true);
    })
  },
  routes: {
    "": "home",
    "post/:id" : "post",
    "*404": '404'
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
  },
  getRouteHandler: function(name) {
    if ( name in handlers )
      return handlers[name]
    return null
  }
})

module.exports = new Router()