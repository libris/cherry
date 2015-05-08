
module.exports = {

  splitTextApprox: function (text, approxLength) {
    var split = []
    var marker = approxLength
    while(marker < text.length && text[marker] !== ' ')
      marker++;
    split.push(text.substr(0, marker))
    split.push(text.substr(marker))
    return split
  }
  
}