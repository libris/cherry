var React = require('react')
var collections = require('./collections')
var Link = require('./fastlink')
var PubSub = require('ainojs-pubsub')
var ClickHandlers = require('./clickhandlers')
var Router = require('./router')
var NotFound = require('./components/404')


// Contains the skeleton of the App
module.exports = React.createClass({
  componentDidMount: function() {
    collections.each(function(collection) {
      collection.on('add change remove reset', function() {
        this.forceUpdate()
      }, this)
    }, this)
  },
  render: function() {
    var Handler = Router.getRouteHandler(this.props.route.name) || <NotFound />
    return (
      <Link onUp={ClickHandlers.onDeviceUp} onDown={ClickHandlers.onDeviceDown} onCancel={ClickHandlers.onDeviceCancel} >
        <header>
          <a className="top" href="">Topplistor</a>
          <a className="winners" href="">Prisvinnare</a>
          <a className="trends" href="">Trender</a>
        </header>
        <Handler route={this.props.route} ref="handler" />
      </Link>
    )
  }
})