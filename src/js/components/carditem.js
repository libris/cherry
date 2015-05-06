var React = require('react')
var ImageComponent = require('ainojs-react-image')
var CreatorName = require('./creatorname')


module.exports = React.createClass({
  render: function() {
    var data = this.props.data
    // return <div>{data['@id']}</div>
    
    return (
        <a className="cardItem" href={ 'post' + data['@id']}>
        	<ImageComponent src="http://galleria.io/static/i/s2013/2m.jpg" lazy={true} ratio={114/200} />
        	<div className="information">
        		<h1>{ data.title }</h1>
                <h2><CreatorName creator={data.creator} /></h2>
        	</div>
        </a>
    )
  }
})
