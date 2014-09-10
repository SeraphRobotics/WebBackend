'use strict';

var
  fs        = require('fs'),
  gulp      = require('gulp'),
  wait      = require('gulp-wait'),
  mocha     = require('gulp-mocha'),
  watch     = require('gulp-watch'),
  stylus    = require('gulp-stylus'),
  concat    = require('gulp-concat'),
  nodemon   = require('gulp-nodemon'),
  reload    = require('gulp-livereload'),
  lbng      = require('loopback-sdk-angular')
;

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['stylus', 'nodemon', 'watch']);

// Copy all static images
gulp.task('test', function () {
  gulp.src('./test/*.js')
    .pipe(mocha({
      ignoreLeaks: false,
      reporter: 'nyan'
    }));
});

//stylus to css
gulp.task('stylus', function () {
  gulp.src(['stylesheets/*.styl'])
    .pipe(stylus())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/css'))
  ;
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: ['./public/**', './node_modules/**'],
    env: {
      'NODE_ENV': 'development',
      'PORT': 9000
    },
    nodeArgs: ['--debug=9999']
  })
    .on('restart', function () {})
  ;
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.src(['*.js','routes/*.js', 'models/*.js', 'config/*.js'], { read: true })
   .pipe(watch({ emit: 'all' }))
  ;
  gulp.src(['views/*.jade', 'public/css/style.css'])
    .pipe(watch())
    .pipe(wait(1000))
    .pipe(reload())
  ;
  gulp.watch(['stylesheets/*.styl'], ['stylus']);
});

gulp.task('mockDataDev', function () {
  nodemon({
    script: './config/mockData.js',
    env: {
      'NODE_ENV': process.env.NODE_ENV || 'development',
      'PORT': process.env.PORT || 9000
    },
    nodeArgs: ['--debug=9999']
  })
  ;
});

gulp.task('lbServices', function generateLoopBackServices(callback) {
  try {
    var app = require('./app.js');
    var content = lbng.services(app, 'lbServices', '/api');
    fs.writeFile('public/js/lbServices.js', content, 'utf-8', callback);
  } catch(err) {
    callback(err);
  }
});

gulp.task('test', function () {
  gulp.src('test/**/*.spec.js', { read: false })
    .pipe(watch({ emit: 'all' }, function(files) {
      files
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', function(err) {
          if (err && err.stack && !/tests? failed/.test(err.stack)) {
            console.log(true);
            console.log(err.stack);
          }
          console.log('----------Done-----------');
        })
      ;
    }))
  ;
});

gulp.task('watchTest', function () {
});
