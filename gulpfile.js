'use strict';

var gulp    = require('gulp'),
  mocha     = require('gulp-mocha'),
  watch     = require('gulp-watch'),
  concat    = require('gulp-concat'),
  nodemon   = require('gulp-nodemon'),
  reload    = require('gulp-livereload'),
  sass      = require('gulp-ruby-sass')
;


// Copy all static images
gulp.task('test', function () {
  gulp.src('./test/*.js')
    .pipe(mocha({
      ignoreLeaks: false,
      reporter: 'nyan'
    }));   
});

//sass to css
gulp.task('sass', function () {
  gulp.src(['stylesheets/*.sass'])
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/css'))
  ;
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    watch: 'app.js',
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
    .pipe(reload())
  ;
  gulp.watch(['stylesheets/*.sass'], ['sass']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass', 'nodemon', 'watch']);