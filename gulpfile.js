let gulp = require('gulp'),
  util = require('gulp-util'),
  sequence = require('gulp-sequence'),
  config = require('./config'),
  build = require('./gulp_tasks/build'),
  js = require('./gulp_tasks/js'),
  css = require('./gulp_tasks/css'),
  font = require('./gulp_tasks/font'),
  dev = require('./gulp_tasks/dev');

gulp.task('js', js);
gulp.task('css', css);
gulp.task('font', font);

gulp.task('dev', dev);

gulp.task('build', build);
