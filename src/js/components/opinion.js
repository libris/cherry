var React = require('react')
var utils = require('../utils')

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

    var opinion = this.props.data;
    var opinionTexts = utils.splitTextApprox(opinion.text, 250)
    var opinionClasses = ['opinionText']
    this.state.opinionFolded && opinionClasses.push('folded')

    return (
      <div className="opinion">
        <h2><a href={opinion.isPartOf.url} target="_blank">{ opinion.isPartOf.name } <i className="fa fa-external-link-square"></i></a></h2>
        <div className={opinionClasses.join(' ')}>
          <span className="beginning">{ opinionTexts[0] }</span>
          <span className="rest">{ this.state.opinionFolded ? '...' : opinionTexts[1] }</span>
          <button className="btn readMore" onClick={this.toggleFold}>Läs hela</button>
        </div>
      </div>
    )
  }
})
