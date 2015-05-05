var React = require('react')
var ImageComponent = require('ainojs-react-image')


module.exports = React.createClass({
  render: function() {
    return (
        <div className="cardItem">
        	<ImageComponent src="http://galleria.io/static/i/s2013/2m.jpg" lazy={true} ratio={114/200} />
        	<div className="information">
        		{this.props.data.get('topic')}
        	</div>
        </div>
    )
  }
})
