var React = require('react')
var Query = require('query-string')

module.exports = React.createClass({
  render: function() {

    var links = this.props.keywords.map(function(topic,i) {
      return <a className="btn keyword" href={'/ord/?' + Query.stringify({ q: topic })} key={i+topic}>{topic}</a>
    })

    return (
      <div className="keywordBar">{links}</div>
    )
  }
})
