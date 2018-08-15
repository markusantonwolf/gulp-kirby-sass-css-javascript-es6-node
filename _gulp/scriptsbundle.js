const fs = require('fs');
const config = require('config');

const scriptsFilename = config.get('gulp.scripts.general.filename');
const scriptsSourceFolder = config.get('gulp.scripts.general.source');
const scriptsDestinationFolder = config.get('gulp.scripts.general.destination');
const scriptsTemplateSourceFolder = config.get('gulp.scripts.templates.source');
const scriptsTemplateDestinationFolder = config.get('gulp.scripts.templates.destination');

folders = new Array();
folders.push({
  src: scriptsSourceFolder + '*.js',
  dest: scriptsDestinationFolder,
  name: scriptsFilename,
});
filesInScriptsFolder = fs.readdirSync(scriptsSourceFolder);
filesInScriptsFolder.forEach(function (element) {
  fileInScriptsFolder = fs.statSync(scriptsSourceFolder + element);
  if(fileInScriptsFolder.isDirectory()) {
    if(element.substr(0, 1) !== '_') {
      folders.push({
        src: scriptsSourceFolder + element + '/*.js',
        dest: scriptsDestinationFolder,
        name: element + '.js',
      });
    }
  }
});

if(fs.existsSync(scriptsTemplateSourceFolder)) {
  filesInScriptsFolder = fs.readdirSync(scriptsTemplateSourceFolder);
  filesInScriptsFolder.forEach(function (element) {
    fileInScriptsFolder = fs.statSync(scriptsTemplateSourceFolder + element);
    if(fileInScriptsFolder.isDirectory()) {
      if(element.substr(0, 1) !== '_') {
        folders.push({
          src: scriptsTemplateSourceFolder + element + '/*.js',
          dest: scriptsTemplateDestinationFolder,
          name: element + '.js',
        });
      }
    }
  });
}

module.exports.folders = folders;
