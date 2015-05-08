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

    var trends = collections.get('trending').map(function(model, i) {
      var topic = model.get('topic')
      var href = '/trends/?' + Query.stringify({ q: topic })
      return <li><a href={href} key={i+topic}>{topic}</a></li>
    })

    return (
        <div className="menu">
          <ul className="main-nav">
            <li className="">
              Andra läser
              <ul className="sub-nav">
                <li>frö</li>
                <li>frö</li>
              </ul>
            </li>
            <li className="active">
              Förkovra dig
              <ul className="sub-nav">
                {trends}
              </ul>
            </li>
            <li className="">
              Spåra ur
              <ul className="sub-nav">
                <li>frö</li>
                <li>frö</li>
              </ul>
            </li>
          </ul>
        </div>
    )
  }
})
