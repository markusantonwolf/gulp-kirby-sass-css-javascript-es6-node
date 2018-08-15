const config = require('config');

const copyFolders = config.get('gulp.copy');

folders = new Array();
copyFolders.forEach((element)=>{
  folders.push({
    src: element.source,
    dest: element.destination
  });
})


module.exports.folders = folders;
