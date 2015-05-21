var _ = require('underscore')


module.exports = {

  splitTextApprox: function (text, approxLength) {
  	// Returns an array of strings with the text parameter split at approximately the approxLength parameter.
  	// Will only split between words

    var split = []
    var marker = approxLength
    while(marker < text.length && text[marker] !== ' ')
      marker++;
    split.push(text.substr(0, marker))
    split.push(text.substr(marker))
    return split
  },
  getCreatorList: function (creatorObj) {
  	// Returns an array of strings with the creator name(s).

  	if(typeof creatorObj === 'undefined') return null
		var composeName = function (author) {
      if(author['@type'] == 'Person'){
        if (!author.givenName && !author.familyName)
          if(author.name)
            return [author.name]
          else
            return ''
        return [author.givenName, author.familyName].join(' ');
      } else if(author['@type'] == 'Organization')
        return author.name;
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
  },
  hasDefinedItems: function(array) {
    for( var i = 0; i < array.length ; i++)
      if (typeof array[i] !== 'undefined') return true

    return false
  },
  
}