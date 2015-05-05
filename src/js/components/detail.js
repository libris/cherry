var React = require('react')
var posts = require('../collections').get('posts')
var Data = require('../data')
var ImageComponent = require('ainojs-react-image')

module.exports = React.createClass({

	/*
	mixins: [ Data.mixin ],

	getDataDependencies: function() {
		return [{
			collection: 'posts',
			query: { q: this.props.route.params[0] }
		}]
	},

	getInitialState: function() {
		return {
			loading: true
		}
	},

	dataDidLoad: function() {
		this.setState({
			loading: false
		})
	},
	*/

  render: function() {
  	/*
  	if ( this.state.loading ) {
  		return <p>loading</p>
  	}
  	var post = posts.getModel({
  		id: this.props.route.params[0]
  	})
  	console.log('title', post.get('title'))
  	*/
    return (
    	<div className="detailView">
    		<div className="cover">
        	<ImageComponent src="http://galleria.io/static/i/s2013/2m.jpg" lazy={true} ratio={160/220} />
        </div>
    		<div className="information">
    			<h1>Header</h1>
    			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    			<a className="btn">Kolla ett smakprov!</a>
    		</div>
    	</div>
    	)
  }
})