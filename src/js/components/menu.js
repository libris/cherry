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

    if(this.props.section === 'trends')
        trendClasses.push('active')
    else if(this.props.section === 'improve')
        improveClasses.push('active')
    else if(this.props.section === 'derail')
        derailClasses.push('active')

    if (this.props.section == 'trends')

    var trends = collections.get('trending').map(function(model, i) {
      var topic = model.get('topic')
      var href = '/trends/?' + Query.stringify({ q: topic })
      var classNames = []
      if ( this.props.section == 'trends' && topic == this.props.q )
      	classNames.push('active')
      return <li className={classNames.join(' ')}><a href={href} key={i+topic}>{topic}</a></li>
    }, this)

    return (
        <div className="menu">
          <ul className="main-nav">
            <li className={trendClasses}>
              <a href="/trends">Andra läser</a>
              <ul className="sub-nav">
                {trends}
              </ul>
            </li>
            <li className={improveClasses}>
              <a href="/improve">Förkovra dig</a>
              <ul className="sub-nav">
                <li>frö</li>
                <li>frö</li>
              </ul>
            </li>
            <li className={derailClasses}>
              <a href="/derail">Spåra ur</a>
              <ul className="sub-nav">
                <li>frö</li>
                <li>ninja</li>
                <li>frö</li>
              </ul>
            </li>
          </ul>
        </div>
    )
  }
})
