var React = require('react')
var _ = require('underscore')

module.exports = React.createClass({

  render: function() {

    var composeName = function (obj) {
      if(obj['@type'] == 'Person'){
        if (!obj.givenName && !obj.familyName)
          return ""

        return [obj.givenName, obj.familyName].join(' ');
      } else if(obj['@type'] == 'Organization'){
        return obj.name;
      }
    }

    var creatorList = []
    var creator = this.props.creator

    if(typeof creator === 'undefined') return ''

    if(_.isArray(creator)){
      _.each(creator, function (item) {
        creatorList.push(composeName(item))
      })
    } else {
      creatorList.push(composeName(creator))
    }

    return (
        <div>
            { creatorList.join(', ') }
        </div>
    )
  }
})
