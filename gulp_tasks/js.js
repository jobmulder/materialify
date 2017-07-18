let gulp = require('gulp'),
  concat = require('gulp-concat'),
  eslint = require('gulp-eslint'),
  babel = require('gulp-babel'),
  minify = require('gulp-minify'),
  rename = require('gulp-rename'),
  path = require('path'),
  rimraf = require('rimraf'),
  config = require('../config');

module.exports = () => {
  let src = config.SRC_PATH_JS_FILES,
    dest = config.BUILD_PATH_JS;

  if (config.CLEAN) {
    rimraf.sync(`${dest}/*`);
  }

  gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(concat(config.BUILD_NAME_JS))
    .pipe(gulp.dest(dest))
    // Compile minified
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
    }))
    .pipe(gulp.dest(dest));

};
