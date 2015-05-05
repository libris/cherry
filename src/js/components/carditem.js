var React = require('react')
var ImageComponent = require('ainojs-react-image')


module.exports = React.createClass({
  render: function() {
    return (
        <a className="cardItem" href={ 'post/' + this.props.data.get('topic')}>
        	<ImageComponent src="http://galleria.io/static/i/s2013/2m.jpg" lazy={true} ratio={114/200} />
        	<div className="information">
        		<h1>{this.props.data.get('topic')}</h1>
        		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        	</div>
        </a>
    )
  }
})
