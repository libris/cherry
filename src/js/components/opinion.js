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

  splitTextApprox: function (text, approxLength) {
    var split = []
    var marker = approxLength
    while(marker < text.length && text[marker] !== ' ')
      marker++;
    split.push(text.substr(0, marker))
    split.push(text.substr(marker))
    return split
  },

  render: function() {

    var opinion = this.props.data;
    var opinionTexts = this.splitTextApprox(opinion.text, 250)
    var opinionClasses = ['opinionText']
    this.state.opinionFolded && opinionClasses.push('folded')

    return (
      <div className="opinion">
        <h2><a href="#">{ opinion.annotationSource.name } <i className="fa fa-external-link-square"></i></a></h2>
        <div className={opinionClasses.join(' ')}>
          <span className="beginning">{ opinionTexts[0] }</span>
          <span className="rest">{ this.state.opinionFolded ? '...' : opinionTexts[1] }</span>
          <button className="btn readMore" onClick={this.toggleFold}>Läs hela</button>
        </div>
      </div>
    )
  }
})
