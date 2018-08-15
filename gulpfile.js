const gulp = require('gulp');
const fs = require('fs');
const es = require("event-stream");

const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const del = require('del');
const gulpBrowserify = require('gulp-browserify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const scriptsPath = './application/js/**/*.js';
const stylesPath = './application/css/**/*.css';
const imagesPath = './application/images/**/*.{jpg, jpeg, png, svg, gif}';

const sassSource = './application/styles/**/*.scss';
const styleSource = './application/styles/**/*.css';
const scriptsSource = './application/scripts/**/*.js';
const scriptsDestination = './public/js/';
const stylesDestination = './public/css/';

const styleSourceFolder = './application/styles/';
const scriptsSourceFolder = './application/scripts/';
const scriptsDestinationFolder = './public/js/';
const stylesDestinationFolder = './public/css/';

// gulp.task('styles', () => {
//   console.info('Running gulp styles...');
//   console.info('More details to autoprefixer and browser definitions: https://github.com/browserslist/browserslist')
//   return gulp.src(['./application/styles/reset.css', stylesPath])
//     .pipe(plumber(function(error) {
//       console.info('Styles ERROR');
//       console.info(error);
//       this.emit('end')
//     }))
//     .pipe(sourcemaps.init({
//       largeFile: true
//     }))
//     .pipe(concat('styles.css'))
//     .pipe(autoprefixer())
//     .pipe(cleanCSS())
//     .pipe(sourcemaps.write('/maps'))
//     .pipe(gulp.dest('./public/css/'))
//     .pipe(livereload())
// });

gulp.task('images', () => {
  console.info('Running gulp images...');
  return gulp.src(imagesPath)
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest('./public/images/'))
});

gulp.task('modules', () => {
  console.info('Running gulp modules...');

  // gulp.src('./application/scripts/modules/*.js')
  //   .pipe(plumber(function (error) {
  //     console.info('Styles ERROR');
  //     console.info(error);
  //     this.emit('end')
  //   }))
  //   .pipe(sourcemaps.init({
  //     largeFile: true
  //   }))
  //   .pipe(gulpBrowserify({
  //     insertGlobals: true,
  //     debug: true
  //   }))
  //   .pipe(uglify())
  //   .pipe(sourcemaps.write('/maps'))
  //   .pipe(gulp.dest('./public/scripts/modules/js/'))

});

gulp.task('styles', () => {
  console.info('Running gulp styles...');
  console.info('More details to autoprefixer and browser definitions: https://github.com/browserslist/browserslist')
  return gulp.src(sassSource)
    .pipe(plumber(function (error) {
      console.info('Styles ERROR');
      console.info(error);
      this.emit('end')
    }))
    .pipe(sourcemaps.init({
      largeFile: true
    }))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(stylesDestination))
    .pipe(livereload())
});

gulp.task('scripts', () => {
  console.info('Running gulp scripts...');
  scriptsBundle = new Array();
  scriptsBundle.push({
    src: scriptsSourceFolder + '*.js',
    dest: scriptsDestinationFolder,
    name: 'main.js',
  });
  filesInScriptsFolder = fs.readdirSync(scriptsSourceFolder);
  filesInScriptsFolder.forEach(function (element) {
    fileInScriptsFolder = fs.statSync('./application/scripts/' + element);
    if(fileInScriptsFolder.isDirectory()) {
      scriptsBundle.push({
        src: scriptsSourceFolder + element + '/*.js',
        dest: scriptsDestinationFolder,
        name: element + '.js',
      });
    }
  });

  return scriptsBundle.forEach(function(obj){
    return gulp.src(obj.src)
    .pipe(plumber(function (error) {
      console.info('Styles ERROR');
      console.info(error);
      this.emit('end')
    }))
    .pipe(sourcemaps.init({
      largeFile: true
    }))
    .pipe(concat(obj.name))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(obj.dest))
    .pipe(livereload())
  });


  // console.log(scriptsCollection);

  //   for (var i=0; i<items.length; i++) {
  //     file = fs.statSync('./application/scripts/' + items[i]);
  //     if (file.isDirectory()) {
  //       scriptsCollection.push({src: scriptsSourceFolder + '/' + items[i] + '*.js', dest: scriptsDestinationFolder});
  //       console.info(`directory: ${items[i]}`);
  //     }
  //       // console.log(file);
  //   }
  // });
  // console.log(testReturn);
  //
  // return gulp.src(scriptsSource)
  //   .pipe(plumber(function (error) {
  //     console.info('Styles ERROR');
  //     console.info(error);
  //     this.emit('end')
  //   }))
  //   .pipe(sourcemaps.init({
  //     largeFile: true
  //   }))
  //   .pipe(concat('scripts.js'))
  //   .pipe(babel({
  //     presets: ['env']
  //   }))
  //   .pipe(uglify())
  //   .pipe(sourcemaps.write('/maps'))
  //   .pipe(gulp.dest(scriptsDestination))
  //   .pipe(livereload())
});

gulp.task('clean', () => {
  console.info('Running gulp delete...');
  return del.sync([
    scriptsDestination,
    stylesDestination
  ]);
});

gulp.task('default', ['clean', 'scripts', 'styles'], () => {
  console.info('Running default...');
});

gulp.task('watch', () => {
  console.log('Watching you...');
  require('./server.js');
  livereload.listen();
  gulp.watch(scriptsSource, ['scripts']);
  gulp.watch(sassSource, ['styles']);
})
