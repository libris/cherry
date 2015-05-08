var React = require('react')
var ImageComponent = require('ainojs-react-image')
var CreatorName = require('./creatorname')

module.exports = React.createClass({
  getSlug: function() {
    return '/post/'+this.props.data['@id'].replace(/\//g, '')
  },
  render: function() {
    var data = this.props.data
    // return <div>{data['@id']}</div>
    
    return (
      <a className="cardItem" href={ this.getSlug() }>
      	<ImageComponent src={ data.coverArt.url } lazy={true} ratio={ data.coverArt.height / data.coverArt.width} />
      	<div className="information">
      		<h1>{ data.title }</h1>
          <h2><CreatorName creator={data.creator} /></h2>
      	</div>
      </a>
    )
  }
})
