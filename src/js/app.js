var React = require('react')
var collections = require('./collections')
var Link = require('./fastlink')
var PubSub = require('ainojs-pubsub')
var ClickHandlers = require('./clickhandlers')
var Router = require('./router')
var NotFound = require('./components/404')

var HomeComponent = require('./components/home')
var PostComponent = require('./components/post')
var NotFoundComponent = require('./components/404')

var handlers = {
  trends: HomeComponent,
  improve: HomeComponent,
  derail: HomeComponent,
  ord: HomeComponent,
  post: PostComponent,
  404: NotFoundComponent 
}

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
    var Handler = handlers[this.props.route.name] || <NotFound />
    return (
      <Link onUp={ClickHandlers.onDeviceUp} onDown={ClickHandlers.onDeviceDown} onCancel={ClickHandlers.onDeviceCancel} >
        <Handler route={this.props.route} ref="handler" />
      </Link>
    )
  }
})