const config = require('config');

const stylesSassSourceFolder = config.get('gulp.styles.sass.source');
const stylesSassDestinationFolder = config.get('gulp.styles.sass.destination');
const stylesCssFilename = config.get('gulp.styles.css.filename');
const stylesCssSourceFolder = config.get('gulp.styles.css.source');
const stylesCssDestinationFolder = config.get('gulp.styles.css.destination');

folders = new Array();
folders.push({
  src: stylesSassSourceFolder,
  dest: stylesSassDestinationFolder,
  name: ''
});

module.exports.folders = folders;
