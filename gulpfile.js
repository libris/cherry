var browserify = require('browserify')
var buffer = require('vinyl-buffer')
var concat = require('gulp-concat')
var es = require('event-stream')
var fs = require('fs')
var gulp = require('gulp')
var gulpif = require('gulp-if')
var gutil = require('gulp-util')
var map = require('vinyl-map')
var minifycss = require('gulp-minify-css')
var path = require('path')
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var source = require('vinyl-source-stream')
var sourcemaps = require('gulp-sourcemaps')
var streamqueue = require('streamqueue')
var uglify = require('gulp-uglify')
var watch = require('gulp-watch')
var jshint = require('gulp-jshint')
var stylish = require('jshint-stylish')
var react = require('gulp-react')
var debug = require('gulp-debug')
var filter = require('gulp-filter')
var reactify = require('reactify')
var babelify = require('babelify')
var newer = require('gulp-newer')
var hasher = require('./hasher').hasher
var hashes = require('./hasher').hashes

var env = process.env.NODE_ENV || 'development'

var external = [
  'jquery',
  'backbone',
  'react',
  'underscore'
]

var scripts = [
  'es5-shim/es5-shim.js',
  'es5-shim/es5-sham.js',
  'html5shiv/dist/html5shiv.js',
]

var styles = [
  'normalize.css/normalize.css',
  'font-awesome/css/font-awesome.css',
]

var errFile = 'static/error.js'

var error = {
  initialized: false,
  init: function(cb) {
    var html = 'var err=[];setTimeout(function(){if(!err.length)return;document.body.innerHTML="'+
               '<div style=\'font-family:monaco,courier,monospace;color:#777;font-size:12px;line-height:1.6;margin: 0 auto;padding:20px;max-width:1600px;\'>'+
               '"+err.join("<div style=\'padding:1px 0 20px 0;border-top:1px solid #ddd;margin-top:20px\'></div>")+"</div>";},10);'
    fs.writeFile(errFile, html, function (err) {
      if ( err )
        throw err
      typeof cb == 'function' && cb()
    })
  },
  raise: function(e) {
    var raise = function() {
      gutil.log(gutil.colors.bgRed.black('Error'))
      gutil.log(gutil.colors.red(e))
      var file = e.file || e.fileName
      var line = e.line || e.lineNumber
      var msg = ['<pre style=\'font-weight:700;font-size:16px;line-height:20px;color:#000;margin:0;white-space:pre-wrap;\'>'+e.message+'</pre>']
      file && msg.push('File: '+file)
      line && msg.push('Line: '+line)
      e.column && msg.push('Column: '+e.column)
      fs.appendFile(errFile, 'err.push("'+msg.join('<br>')+'");', function (err) {
        if ( err )
          throw err
      })
    }
    if ( !this.initialized ) {
      this.initialized = true
      return this.init(raise)
    }
    raise()
  }
}

var gulpBrowserify = function(options) {
  gutil.log(gutil.colors.blue('Browserifying'))
  var ext = []
  if ( options.excludeExternal ) {
    ext = external
    delete options.excludeExternal
  }
  var b = browserify(options)
  if ( ext.length ) {
    ext.forEach(function(lib) {
      gutil.log(gutil.colors.grey('Excluding: '+lib))
      b.external(lib)
    })
  }
  b.transform(reactify) // Instead of reactify, Babel has built-in support for React
  return b.bundle().on('error', function(e) {
    error.raise(e)
  })
}



 //////////////
// JS TASKS //
var task = {}

task.hint = function() {
  gutil.log(gutil.colors.yellow('Hinting js code'))

  return gulp.src('src/js/**/*.js')
    .pipe(react())
    .on('error', function(e) {
      error.raise(e)
    })
    .pipe(jshint({
      asi: true,
      boss: true,
      expr: true,
      loopfunc: true,
      curly: false
    }))
    .pipe(jshint.reporter(stylish))
}


task.copy = function( from, to ) {
  if( typeof to == 'undefined' )
    to = from
  return gulp.src(from)
    .pipe(newer(to))
    .pipe(debug({title: 'Copying: '}))
    .pipe(gulp.dest(to))
}


task.sass = function(minify) {
  return gulp.src('src/scss/main.scss')
    .pipe(gulpif(env == 'development', sourcemaps.init()))
    .pipe(sass({
      onError: function(e) {
        error.raise(e)
      }
    }))
    .pipe(rename('main.css'))
    .pipe(gulpif(env == 'production', minifycss()))
    .pipe(hasher())
    .pipe(gulp.dest('static'))
}


task.js = function(minify) {
  gutil.log( gutil.colors.yellow('Rebuilding js') )
  return gulpBrowserify({
      entries: ['./src/js/index.js'],
      excludeExternal: true,
      debug: true
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulpif(env == 'development', sourcemaps.init({loadMaps: true})))
    .pipe(rename('main.js'))
    .pipe(gulpif(env == 'production', uglify()))
    .pipe(hasher())
    .pipe(gulpif(env == 'development', sourcemaps.write('./')))
    .pipe(gulp.dest('static'))
}


task.libs = function() {
  var pth = function(p) {return path.resolve('node_modules', p)}
  return es.concat(
    task.copy('./node_modules/font-awesome/fonts/*', 'static'),
    streamqueue({ objectMode: true },
      gulp.src(scripts.map(pth)).pipe(newer('static/lib.js')),
      gulpBrowserify({
        noparse: ['jquery', 'underscore', 'backbone'],
        require: external
      }).pipe(source('lib.js')).pipe(buffer())
    )
      .pipe(concat('lib.js'))
      .pipe(gulpif(env == 'production', uglify()))
    .pipe(hasher())
      .pipe(gulp.dest('static')),
    gulp.src(styles.map(pth))
      .pipe(newer('static/lib.css'))
      .pipe(map(function(data) {
        var css = data.toString()
        return css.replace(/\.\.\/fonts\//g,'')
      }))
      .pipe(concat('lib.css'))
      .pipe(gulpif(env == 'production', minifycss()))
      .pipe(hasher())
      .pipe(gulp.dest('static'))
  )
}


task.icons = function() {
  gutil.log( gutil.colors.yellow('Componentizing icons') )
  return gulp.src('src/icons/*.svg')
    .pipe(map(function(data, name) {
      name = name.replace(/^.*\/([\w-_]+)\.svg$/, '$1')
      data = data.toString().replace(/\n|\r|\t/g, '')
                 .replace(/^.*<svg[^>]+>/, '<span className="icon '+name+'"><svg viewBox="0 0 32 32" width="32" height="32" dangerouslySetInnerHTML={{__html:\'')
                 .replace(/<\/svg>.*$/, '\'}}/></span>')
      var comp = 'module.exports["'+name+'"]=React.createClass({render:function(){return('
      return comp + data + ')}})'
    }))
    .pipe(concat('icons.js'))
    .pipe(map(function(data) {
      return 'var React=require("react");'+data.toString()
    }))
    .pipe(gulp.dest('src/js'))
}


task.assets = function() {
  return task.copy('src/assets/**/*', 'static')
}

task.watch = function() {
  return es.concat(
    watch('src/js/**/*.js', function() {
      error.init(function() {
        task.js()
      })
    }),
    watch(['*.js', '!gulpfile.js'], function() {
      //task.reload()
    }),
    gulp.src(['src/assets/**/*'])
      .pipe(watch(['src/assets/**/*']))
      .pipe(filter(function(file) {
        return file.event == 'add' || file.event == 'change'
      }))
      .pipe(debug({ title: 'Moving:' }))
      .pipe(gulp.dest('static')),
    watch('src/icons/*.svg', function() {
      task.icons()
    }),
    watch('src/scss/**/*.scss', function() {
      error.init(function() {
        task.sass()
      })
    })
  )
}



 ////////////////
// GULP TASKS //
gulp.task( 'default', function() {
  gutil.log( gutil.colors.green('Gulp listening for changes') )
  return task.watch()
})

gulp.task( 'hint', function() {
  task.hint()
})

gulp.task( 'build', function() {
  error.init()
  gutil.log( 'Gulp building for', gutil.colors.underline(env) )
  return es.concat(
    task.icons(),
    task.sass(),
    task.js(),
    task.assets(),
    task.libs(),
    task.hint()
  )
})

gulp.task( 'js', function() {
  task.js()
})
