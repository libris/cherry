var React = require('react')
var _ = require('underscore')

module.exports = React.createClass({
  render: function() {
    var creatorList = [];
    var creator = this.props.creator;

    if(_.isArray(creator)){
      _.each(creator, function (item) {
        creatorList.push(item.givenName + " " + item.familyName);   
      })
    } else {
      creatorList.push(creator.givenName + " " + creator.familyName);
    }

    return (
        <div>
            { creatorList.join(', ') }
        </div>
    )
  }
})
