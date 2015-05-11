var React = require('react')
var ImageComponent = require('ainojs-react-image')
var CreatorName = require('./creatorname')
var _ = require('underscore')
var utils = require('../utils')

module.exports = React.createClass({
  getSlug: function() {
    return '/post/'+this.props.data['@id'].replace(/\//g, '')
  },
  render: function() {
    var data = this.props.data
    var summary = ''
    // return <div>{data['@id']}</div>
    var filtered = data.annotation.filter(function (item){
      return item['@type'] == 'Summary'
    })
    if (filtered[0]) {
      var splitAt = 250
      console.log(filtered[0])
      if(filtered[0].text.length > splitAt)
        summary = utils.splitTextApprox(filtered[0].text, splitAt)[0] + "..."
      else
        summary = filtered[0].text
    }
    
    return (
      <a className="cardItem" href={ this.getSlug() }>
      	<ImageComponent src={ data.coverArt.url } lazy={true} ratio={ data.coverArt.height / data.coverArt.width} />
      	<div className="information">
      		<h1>{ data.title }</h1>
          <p>{ summary }</p>
      	</div>
      </a>
    )
  }
})
