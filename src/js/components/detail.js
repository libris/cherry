var React = require('react')
var posts = require('../collections').get('posts')
var Data = require('../data')
var ImageComponent = require('ainojs-react-image')
var CreatorName = require('./creatorname')

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

  getInitialState: function() {
    return {
      coverFolded: true
    }
  },

  toggleFold: function () {
    this.setState({
      coverFolded: !this.state.coverFolded
    })
  },

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

    var postMock = {
      title : 'Testpost',
      creator : {
        givenName : 'Sven',
        familyName : 'Svensson'
      },
      coverArt : {
        url : "http://galleria.io/static/i/s2013/2m.jpg",
        width : 220,
        height : 160
      }
    }

    var coverClasses = ['cover']
    this.state.coverFolded && coverClasses.push('folded')

    return (
    	<div className="detailView">
    		<div className={coverClasses.join(' ')} onClick={this.toggleFold}>
        	<ImageComponent src={ postMock.coverArt.url } lazy={true} ratio={ postMock.coverArt.height / postMock.coverArt.width} />
        </div>
    		<div className="information">
    			<h1>{ postMock.title }</h1>
    			<h2><CreatorName creator={ postMock.creator } /></h2>
    			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    			<a className="btn">Kolla ett smakprov!</a>
    			<hr />
    			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    		</div>
    	</div>
    	)
  }
})