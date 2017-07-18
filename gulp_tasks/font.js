let gulp = require('gulp'),
  rimraf = require('rimraf'),
  config = require('../config');

module.exports = () => {
  let src = config.SRC_PATH_FONT+'/**/*',
    dest = config.BUILD_PATH_FONT;

  if (config.CLEAN) {
    rimraf.sync(`${dest}/*`);
  }

  gulp.src(src)
    .pipe(gulp.dest(dest));
};
