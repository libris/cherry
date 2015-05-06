var React = require('react')

module.exports = React.createClass({
  render: function() {

    var links = this.props.keywords.map(function(topic,i) {
      return <a className="btn" key={i+topic}>{topic}</a>
    })

    return (
      <div className="keywordBar">{links}</div>
    )
  }
})
