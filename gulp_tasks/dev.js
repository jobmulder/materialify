let gulp = require('gulp'),
  util = require('gulp-util'),
  watch = require('gulp-watch'),
  js = require('./js'),
  css = require('./css'),
  font = require('./font'),
  config = require('../config');

module.exports = () => {
  util.env.type = 'development';

  // Watch and compile JS
  watch([`${config.SRC_PATH_JS}/**/*.js`], js);

  // Watch and compile SCSS
  watch([`${config.SRC_PATH_CSS}/**/*.scss`], css);

  // Watch and copy fonts
  watch([`${config.SRC_PATH_FONT}/**/*`], font);
  
};
