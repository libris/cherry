var _ = require('underscore')


module.exports = {

  splitTextApprox: function (text, approxLength) {
    var split = []
    var marker = approxLength
    while(marker < text.length && text[marker] !== ' ')
      marker++;
    split.push(text.substr(0, marker))
    split.push(text.substr(marker))
    return split
  },
  getCreatorList: function (creatorObj) {
  	
  	if(typeof creatorObj === 'undefined') return null

		var composeName = function (author) {
      if(author['@type'] == 'Person'){
        if (!author.givenName && !author.familyName)
          return ''

        return [author.givenName, author.familyName].join(' ');
      } else if(author['@type'] == 'Organization'){
        return author.name;
      }
    }

    var creatorList = []

    if(_.isArray(creatorObj)){
      _.each(creatorObj, function (item) {
        creatorList.push(composeName(item))
      })
    } else {
      creatorList.push(composeName(creatorObj))
    }

    return creatorList;
  }
  
}