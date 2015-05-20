var React = require('react')
var posts = require('../collections').get('posts')
var Data = require('../data')
var ImageComponent = require('ainojs-react-image')
var Opinion = require('./opinion')
var KeywordBar = require('./keywordbar')
var utils = require('../utils')
var collections = require('../collections')
var _ = require('underscore')

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
      coverFolded: true,
      summaryFolded: true
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
  toggleSummary: function () {
    this.setState({
      summaryFolded: !this.state.summaryFolded
    })
  },

  render: function() {
  	
  	if ( this.state.loading ) {
      return <p>loading</p>
  	}
  	var post = posts.getModel({
  		'identifier': this.props.route.params[0]
  	})

    // Excerpt
    var excerpt = _.find(post.get('excerpt'), function (item) {
      return item.annotationSource.name === 'Smakprov'
    })
    var tasteClasses = ['taste']
    if(typeof excerpt !== 'undefined') {
      var urlParts = excerpt.annotationSource.url.split('/')
      var id = urlParts[urlParts.length - 1]
      var tasteUrl = 'http://www.smakprov.se/smakprov/visa/' + id
    } else {
      tasteClasses.push('hidden')
    }

    // Summary
    var annotation = _.find(post.get('annotation'), function (item){
      return item['@type'] === 'Summary'
    })
    var summaryClasses = ['quote']
    var summaryTexts = []
    if(typeof annotation !== 'undefined' && typeof annotation.text !== 'undefined') {
      var splitAt = 750
      summaryTexts = utils.splitTextApprox(annotation.text, splitAt)
      if (annotation.text.length > splitAt)
        this.state.summaryFolded && summaryClasses.push('folded')
    } else {
      summaryTexts = ['','']
    }

    // Cover
    var coverArt = post.get('coverArt')[0]
    var coverClasses = ['cover']
    this.state.coverFolded && coverClasses.push('folded')

    // Blog posts
    var blogPosts = post.get('annotation').filter(function (item){
      return item['@type'] === 'BlogPosting'
    })
    var opinions = blogPosts.map(function (item, i) {
      return <Opinion key={i} data={item} />
    })
    var opinionClasses = ['opinionList']
    if(blogPosts.length < 1) {
      opinionClasses.push('hidden')
    }

    // Related words
    var related = ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet']
    console.log(this.props.route)


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
                <div className="creatorName">
                { utils.getCreatorList(post.get('creator')).join(', ') }
                </div>
              </h2>
              <p className="providerDate">{ post.get('publication')[0].providerDate }</p>
              <i className="fa fa-2x fa-quote-right"></i>
              <p className={ summaryClasses.join(' ') }>
                <span className="beginning">{ summaryTexts[0] }</span>
                <span className="rest">{ this.state.summaryFolded ? '' : summaryTexts[1] }</span>
                
                <span className="readMore">...<a href="#" onClick={this.toggleSummary}> Läs mer</a></span>
                
                <a href={tasteUrl} target="_blank" className={tasteClasses.join(' ')}>
                  Kolla ett smakprov!
                </a>
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