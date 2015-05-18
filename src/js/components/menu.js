var React = require('react')
var _ = require('underscore')
var collections = require('../collections')
var Query = require('query-string')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      selected : 'winners'
    }
  },

  render: function() {

    var trendClasses = [],
        improveClasses = [],
        derailClasses = []

    var trends = collections.get('trending').map(function(model, i) {
      var topic = model.get('topic')
      var href = '/trends/?' + Query.stringify({ q: topic })
      var classNames = []
      if ( this.props.section == 'trends' && topic == this.props.q )
        classNames.push('active')
      return <li className={classNames.join(' ')}><a href={href} key={i+topic}>{topic}</a></li>
    }, this)

    if(this.props.section === 'trends') {
      trendClasses.push('active')
      var keyWords = trends
    }
    else if(this.props.section === 'improve') {
      improveClasses.push('active')
      var keyWords = "Topics för 'Förkovra dig'"
    }
    else if(this.props.section === 'derail') {
      derailClasses.push('active')
      var keyWords = "Topics för 'Spåra ur'"
    }

    return (
        <div className="menu">
          <ul className="main-nav">
            <li className={trendClasses}>
              <a href="/trends">Andra läser</a>
            </li>
            <li className={improveClasses}>
              <a href="/improve">Förkovra dig</a>
            </li>
            <li className={derailClasses}>
              <a href="/derail">Spåra ur</a>
            </li>
          </ul>
          <div className="sub-nav-container">
            <ul className="sub-nav">
              {keyWords}
            </ul>
          </div>
        </div>
    )
  }
})
