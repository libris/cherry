var React = require('react')
var Query = require('query-string')
var search = require('../collections').get('search')
var Data = require('../data')
var CardItem = require('./cardItem')
var _ = require('underscore')
var utils = require('../utils')


module.exports = React.createClass({
	
	mixins: [ Data.mixin ],

	getDataDependencies: function() {
		return [{
			collection: 'search',
			query: { c: this.props.author }
		}]
	},
	getInitialState: function() {
		return {
      loading: true,
      limit: this.props.limit
		}
	},
	dataDidLoad: function() {
		this.setState({
			loading: false
		})
	},
	renderItems: function () {

  	if ( this.state.loading ) {
      return <p>Laddar titlar från { this.props.author }...</p>
  	}
		var titles
		if (search && search.length) {
      titles = search.map(function(model, i) {
        return model.get('items')
      }, this)
    }
    titles = titles[0]

    keywords = this.props.keywords

    parentBook = this.props.current
    var content = (_.isArray(titles) ? titles : []).map(function(item, i) {
    	// if (item.identifier === parentBook) console.log('dupe', parentBook, item.identifier)
    	if (item.coverArt && item.identifier !== parentBook) {
    		return <CardItem key={i+':'+item['@id']} data={item} query={keywords} />
    	}
    })

    if(content.length > this.props.limit)
    	content.length = this.props.limit

    return content
	},
  render: function() {

		var classNames = ['otherFrom']

		var renderedItems = this.renderItems()
		if (!this.state.loading && !utils.hasDefinedItems(renderedItems))
			classNames.push('hidden')

		if (this.state.limit >= 4)
    	classNames.push('full')

    return (
      <div className={classNames.join(' ') }>
      	<div className="text-container">
        	<h1>Andra titlar från:</h1>
      		{ renderedItems }
      	</div>
      </div>
    )
  }
})
