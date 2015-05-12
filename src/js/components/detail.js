var React = require('react')
var posts = require('../collections').get('posts')
var Data = require('../data')
var ImageComponent = require('ainojs-react-image')
var CreatorName = require('./creatorname')
var Opinion = require('./opinion')
var KeywordBar = require('./keywordbar')

module.exports = React.createClass({

	
	mixins: [ Data.mixin ],

	getDataDependencies: function() {
		return [{
			collection: 'posts',
			query: { q: this.props.route.params[0] }
		}]
	},

	getInitialState: function() {
		return {
      loading: true,
      coverFolded: true
		}
	},

	dataDidLoad: function() {
		this.setState({
			loading: false
		})
	},

  toggleFold: function () {
    this.setState({
      coverFolded: !this.state.coverFolded
    })
  },

  render: function() {
  	
  	if ( this.state.loading ) {
      return <p>loading</p>
  	}
  	var post = posts.getModel({
  		'identifier': this.props.route.params[0]
  	})

    var postMock = {
      title : 'Testpost',
      creator : {
        givenName : 'Test',
        familyName : 'Testsson'
      },
      coverArt : {
        url : "http://galleria.io/static/i/s2013/2m.jpg",
        width : 220,
        height : 160
      },
      publication : {
        providerDate : 2054
      }
    }
    var coverArt = post.get('coverArt')[0]
    var annotation = post.get('annotation')[0];

    var coverClasses = ['cover']
    this.state.coverFolded && coverClasses.push('folded')

    var blogPosts = post.get('annotation').filter(function (item){
      return item['@type'] == 'BlogPosting'
    })

    var opinions = blogPosts.map(function (item, i) {
      if (item['@type'] === 'BlogPosting') {
        return <Opinion key={i} data={item} />
      }
    })
    var opinionClasses = ['opinionList']
    if(blogPosts.length < 1) {
      opinionClasses.push('hidden')
    }
    var related = ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet']

    return (
    	<div className="detailView">
    		<div className="info-section summary">
          <div className="container">
            <KeywordBar keywords={related} />
            <div className={coverClasses.join(' ')} onClick={this.toggleFold}>
              <ImageComponent src={ coverArt.coverArt } lazy={true} ratio={ coverArt.height / coverArt.width} />
            </div>
            <div className="text-container">
    			    <h1>{ post.get('title') }</h1>
    			    <h2>
                <CreatorName creator={ post.get('creator') } />
              </h2>
              <p className="providerDate">{ post.get('publication')[0].providerDate }</p>
              <i className="fa fa-2x fa-quote-right"></i>
              <p className="quote">
                {annotation.text}
                <button className="taste">
                  Kolla ett smakprov!
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="info-section opinion-extra">
          <div className="container">
            <div className={opinionClasses.join(' ')}>
              <div className="text-container">
                <h1>Vad tycker andra?</h1>
              </div>
              {opinions}
            </div>
            <div className="extraList">
              <div className="text-container">
                <h1>Andra titlar från:</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="info-section related">
          <div className="container">
            <div className="text-container">
              <h1>Relaterade titlar</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>
    	</div>
    	)
  }
})