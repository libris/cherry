var Masonry = require('masonry-layout')
var Tick = require('next-tick')

module.exports = function(options) {
  this.options = options
}

module.exports.prototype = {
  
  constructor: module.exports,
  
  masonry: false,
  
  domChildren: [],

  init: function(node) {
    this.node = node
    this.initializeMasonry()
  },

  update: function(cb) {
    this.node && this.performLayout()
    typeof cb == 'function' && Tick(cb)
  },

  initializeMasonry: function(force) {
    if (!this.masonry || force) {
      this.masonry = new Masonry(this.node, this.options)
      this.domChildren = this.getNewDomChildren()
    }
  },

  getNewDomChildren: function () {
    var children = this.options.itemSelector ? this.node.querySelectorAll(this.options.itemSelector) : this.node.children
    return Array.prototype.slice.call(children)
  },

  diffDomChildren: function() {
    var oldChildren = this.domChildren
    var newChildren = this.getNewDomChildren()

    var removed = oldChildren.filter(function(oldChild) {
      return !~newChildren.indexOf(oldChild)
    })

    var added = newChildren.filter(function(newChild) {
      return !~oldChildren.indexOf(newChild)
    })

    var moved = []

    if (removed.length === 0) {
      moved = oldChildren.filter(function(child, index) {
        return index !== newChildren.indexOf(child)
      })
    }

    this.domChildren = newChildren

    return {
      'old': oldChildren,
      'new': newChildren, // fix for ie8
      'removed': removed,
      'added': added,
      'moved': moved
    };
  },

  performLayout: function() {
    var diff = this.diffDomChildren()

    if (diff.removed.length > 0) {
      this.masonry.remove(diff.removed)
      this.masonry.reloadItems()
    }

    if (diff.added.length > 0) {
      this.masonry.appended(diff.added)
    }

    if (diff.moved.length > 0) {
      this.masonry.reloadItems()
    }

    this.masonry.layout()
  },

  destroy: function() {
    this.masonry = null
    // TODO: Destroy for realz
  }
}