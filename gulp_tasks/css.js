let gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  path = require('path'),
  rimraf = require('rimraf'),
  config = require('../config');

module.exports = () => {
  let src = path.resolve(config.SRC_PATH_CSS, config.ENTRY_POINT_CSS),
    dest = config.BUILD_PATH_CSS;

  if (config.CLEAN) {
    rimraf.sync(`${dest}/*`);
  }

  gulp.src(src)
    .pipe(sass())
    .pipe(autoprefixer({
			browsers: [
        'last 2 versions',
        'Chrome >= 30',
        'Firefox >= 30',
        'ie >= 10',
        'Safari >= 8'],
			cascade: false
		}))
    .pipe(rename(config.BUILD_NAME_CSS))
    .pipe(gulp.dest(dest))
    // Compile minified
    .pipe(cleanCSS())
    .pipe(rename(config.BUILD_NAME_MIN_CSS))
    .pipe(gulp.dest(dest));
};
