const config = require('config');

const cleanFolders = config.get('gulp.clean');

folders = new Array();
cleanFolders.forEach((element) => {
  folders.push(element);
})

module.exports.folders = folders;
