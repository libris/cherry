var React = require('react')
var Masonry = require('../masonry')
var CardItem = require('./carditem')
var KeywordBar = require('./keywordbar')
var _ = require('underscore')

module.exports = React.createClass({
  componentWillUnmount: function() {
    // Destroy masonry
    this.masonry.destroy()
  },
  componentDidMount: function() {
    this.masonry = new Masonry({
      transitionDuration: 0
    })
    this.masonry.init(this.refs.container.getDOMNode())
    this.masonry.update(this.triggerLazyLoad)
  },
  triggerLazyLoad: function() {
    var evt = document.createEvent('MouseEvent')
    evt.initMouseEvent('scroll', true, true)
    window.dispatchEvent(evt)
  },
  render: function() {
    var model = this.props.model
    var items = model.get('items')
    var related = model.get('query').executed.split(' ')
    var cards = (_.isArray(items) ? items : []).map(function(item, i) {
      return <CardItem key={i+':'+item['@id']} data={item} query={related} />
    })
    var bar = this.props.hideKeywords ? null : <KeywordBar keywords={related} />
    return (
      <div className="hit">
        {bar}
        <div className="cards">
          <div className="cards-inner" ref="container">
            {cards}
          </div>
        </div>
      </div>
    )
  }
})