let gulp = require('gulp'),
  js = require('./js'),
  css = require('./css'),
  font = require('./font'),
  util = require('gulp-util'),
  config = require('../config');

module.exports = () => {

  // Compile JS
  js();

  // Compile SCSS
  css();

  // Copy fonts
  font();

};
