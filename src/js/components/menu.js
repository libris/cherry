var React = require('react')
var _ = require('underscore')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      selected : 'winners'
    }
  },

  render: function() {

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
                <li>frö</li>
                <li>ninjor</li>
                <li>frö</li>
                <li>frö</li>
                <li>ninjor</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>ninjor</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>ninjor</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>ninjor</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
                <li>frö</li>
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
