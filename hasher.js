var gutil = require('gulp-util')
var map = require('vinyl-map')
var md5 = require('MD5')
var fs = require('fs')

// Handle cachebusting
var hashes
try {
  hashes = require('./hashes.json')
} catch(e) {
  hashes = {

  }
}
var updateHashes = function(name, value) {
  gutil.log(name, gutil.colors.yellow('changed, updating hashfile.'))
  hashes[name] = value
  fs.writeFile('./hashes.json', JSON.stringify(hashes))
}

var hasher = function() {
  return map(function(file, fileName) {
    var dest = fileName.replace(/^.*(\\|\/)/, '').replace(/\./, '')
    var oldhash = hashes[dest] || ''
    var newhash = md5(file.toString())
    if (newhash != oldhash) {
      updateHashes(dest, newhash)
    }
  });
};

module.exports.hasher = hasher
module.exports.hashes = hashes