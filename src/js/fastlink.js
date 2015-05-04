
var React = require('react')
var Tick = require('next-tick')
var $ = require('jquery')

var preventDefault = function(e) {
  e.preventDefault()
}

var listeners = []

var addListeners = function(obj) {
  for ( var type in obj ) {
    document.addEventListener(type, obj[type], false)
    listeners.push({
      type: type,
      fn: obj[type]
    })
  }
}

var removeListeners = function() {
  Tick(function() {
    listeners.forEach(function(obj) {
      document.removeEventListener(obj.type, obj.fn)
    })
  })
}

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  timer: null,

  getInitialState: function() {
    return {
      type: null,
      evObj: null,
      coords: { x:0, y:0 },
      modified: false
    }
  },

  getDefaultProps: function() {
    return {
      nodeName: 'div',
      className: 'link'
    }
  },

  componentWillUnmount: function() {
    removeListeners()
    this.getDOMNode().removeEventListener('select', preventDefault)
    clearTimeout(this.timer)
  },

  trigger: function(type) {
    var fn = this.props['on'+type.charAt(0).toUpperCase()+type.substr(1)]
    typeof fn == 'function' && fn(this.state.evObj)
  },

  getCoords: function(e) {
    if ( e.touches && e.touches.length ) {
      var touch = e.touches[0]
      return {
        x: touch.pageX,
        y: touch.pageY
      }
    } else {
      return {
        x: e.pageX,
        y: e.pageY
      }
    }
  },

  cancel: function() {
    this.destroy()
    this.trigger('cancel')
  },

  destroy: function() {
    removeListeners()
    this.getDOMNode().removeEventListener('select', preventDefault)
  },

  onMouseDown: function(e) {

    if ( this.state.type == 'touch' )
      return e.preventDefault()

    if ( e.button !== 0 || !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) ) {
      return this.setState({
        modified: true
      })
    }

    addListeners({
      mousemove: this.onMove,
      mouseup: this.onUp,
      dragend: this.cancel,
      contextmenu: this.destroy
    })
    
    this.getDOMNode().addEventListener('select', preventDefault)
    this.setState({
      evObj: $.extend(true, {}, e),
      type: 'mouse'
    }, function() {
      this.trigger('down')
    })
  },

  onTouchStart: function(e) {
    if ( this.state.type == 'mouse' )
      return e.preventDefault()
    addListeners({
      touchmove: this.onMove,
      touchend: this.onUp
    })
    this.setState({
      type: 'touch',
      evObj: $.extend(true, {}, e)
    }, function() {
      this.trigger('down')
    })
  },

  onMove: function(e) {
    var node = this.getDOMNode()
    if ( e.type == 'mousemove' ) {
      this.getDOMNode().contains(e.target) || this.cancel()
    } else {
      var coords = this.getCoords(e)
      var distance = Math.max( 
        Math.abs(this.state.coords.x - coords.x), 
        Math.abs(this.state.coords.y - coords.y) 
      )
      if ( distance > 6 ) {
        this.cancel()
      } else {
        this.setState({
          coords: coords
        })
      }
    }
  },

  onUp: function(e) {
    if ( this.state.modified )
      return
    this.timer = setTimeout(function() {
      this.setState({ type: null })
    }.bind(this), 400)
    this.destroy()
    this.trigger('up')
  },

  onClick: function(e) {
    if ( this.state.modified ) {
      this.setState({
        modified: false
      })
      return
    }
    e.preventDefault()
  },

  render: function() {
    var nodeName = this.props.nodeName
    var classNames = [this.props.className]

    var props = {
      className: classNames.join(' '),
      onTouchStart: this.onTouchStart,
      onMouseDown: this.onMouseDown,
      onClick: this.onClick
    }

    if ( nodeName == 'a' )
      props.href = this.props.href

    return React.createElement(nodeName, props, this.props.children)
  }
})