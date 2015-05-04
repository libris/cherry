var React = require('react')
var collections = require('./collections')
var Link = require('./fastlink')
var PubSub = require('ainojs-pubsub')
var ClickHandlers = require('./clickhandlers')
var Router = require('./router')
var NotFound = require('./components/404')


// Contains the skeleton of the App
module.exports = React.createClass({
  render: function() {
    var Handler = Router.getRouteHandler(this.props.route.name) || <NotFound />
    return (
      <Link onUp={ClickHandlers.onDeviceUp} onDown={ClickHandlers.onDeviceDown} onCancel={ClickHandlers.onDeviceCancel} >
        <header>
          <a href="/">Home</a>
          <a href="/detail">Detail</a>
        </header>
        <Handler route={this.props.route} ref="handler" />
      </Link>
    )
  }
})