const config = require('config');

const watchFolders = config.get('gulp.watch');

folders = new Array();
watchFolders.forEach((element) => {
  folders.push({
    src: element.source,
    tasks: element.tasks
  });
})

module.exports.folders = folders;
