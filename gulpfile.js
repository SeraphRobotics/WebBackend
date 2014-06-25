'use strict';

var gulp    = require('gulp'),
  mocha     = require('gulp-mocha'),
  watch     = require('gulp-watch'),
  wait      = require('gulp-wait'),
  concat    = require('gulp-concat'),
  nodemon   = require('gulp-nodemon'),
  reload    = require('gulp-livereload'),
  stylus    = require('gulp-stylus')
;


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


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['stylus', 'nodemon', 'watch']);