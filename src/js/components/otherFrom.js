var React = require('react')
var Query = require('query-string')
var search = require('../collections').get('search')
var Data = require('../data')
var CardItem = require('./cardItem')
var _ = require('underscore')


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

    var content = (_.isArray(titles) ? titles : []).map(function(item, i) {
    	if (item.coverArt)
      	return <CardItem key={i+':'+item['@id']} data={item} />
    })

    if(content.length > this.props.limit)
    	content.length = this.props.limit

    return content
	},
  render: function() {
    
		var classNames = ['otherFrom']

		if (this.state.limit >= 4)
    	classNames.push('full')

    return (
      <div className={classNames.join(' ')}>
      	<div className="text-container">
        	<h1>Andra titlar från:</h1>
      		{ this.renderItems() }
      	</div>
      </div>
    )
  }
})
