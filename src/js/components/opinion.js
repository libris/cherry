var React = require('react')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      opinionFolded: true
    }
  },

  toggleFold: function () {
    this.setState({
      opinionFolded: !this.state.opinionFolded
    })
  },

  render: function() {

    var opinionClasses = ['opinionText']
    this.state.opinionFolded && opinionClasses.push('folded')

    return (
      <div className="opinion">
        <h2><a href="#">BloggerDude83 <i className="fa fa-external-link-square"></i></a></h2>
        <div className={opinionClasses.join(' ')}>
          <p className="beginning">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p className="rest">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <button className="btn readMore" onClick={this.toggleFold}>Läs hela</button>
        </div>
      </div>
    )
  }
})
