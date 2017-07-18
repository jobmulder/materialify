const BASE_PATH = `${__dirname}`,
  DEST_PATH = `${BASE_PATH}/dest`,
  NPM_PATH = `${BASE_PATH}/node_modules`,
  SRC_PATH = `${BASE_PATH}/src`,
  SRC_PATH_CSS = `${SRC_PATH}/scss`,
  SRC_PATH_FONT = `${SRC_PATH}/fonts`,
  SRC_PATH_JS = `${SRC_PATH}/js`,
  SRC_PATH_JS_FILES = [
    `${SRC_PATH_JS}/settings.js`,
    `${SRC_PATH_JS}/utility.js`,
    `${SRC_PATH_JS}/components/card.js`,
    `${SRC_PATH_JS}/components/fab.js`,
    `${SRC_PATH_JS}/components/dropdown.js`,
    `${SRC_PATH_JS}/components/collapsible.js`,
    `${SRC_PATH_JS}/components/input.js`,
    `${SRC_PATH_JS}/components/select.js`,
    `${SRC_PATH_JS}/components/range.js`,
    `${SRC_PATH_JS}/components/layout.js`
  ],
  BUILD_PATH_CSS = `${DEST_PATH}/css`,
  BUILD_PATH_JS = `${DEST_PATH}/js`,
  BUILD_PATH_FONT = `${DEST_PATH}/fonts`,
  ENTRY_POINT_CSS = `main.scss`,
  BUILD_NAME_JS = `materialify.js`,
  BUILD_NAME_MIN_JS = `materialify.min.js`,
  BUILD_NAME_CSS = `materialify.css`;
  BUILD_NAME_MIN_CSS = `materialify.min.css`;

let config = {
  BASE_PATH,
  DEST_PATH,
  NPM_PATH,
  SRC_PATH,
  SRC_PATH_CSS,
  SRC_PATH_FONT,
  SRC_PATH_JS,
  SRC_PATH_JS_FILES,
  BUILD_PATH_CSS,
  BUILD_PATH_JS,
  BUILD_PATH_FONT,
  ENTRY_POINT_CSS,
  BUILD_NAME_JS,
  BUILD_NAME_MIN_JS,
  BUILD_NAME_CSS,
  BUILD_NAME_MIN_CSS,
  CLEAN: true
};

module.exports = config;
