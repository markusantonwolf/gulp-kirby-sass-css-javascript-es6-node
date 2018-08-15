process.env.NODE_CONFIG_DIR = './_config'

const gulp = require('gulp');
const config = require('config');

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

const imagesPath = './application/images/**/*.{jpg, jpeg, png, svg, gif}';

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
  // More details to autoprefixer and browser definitions: https://github.com/browserslist/browserslist
  const stylesbundle = require('./_gulp/stylesbundle');
  return stylesbundle.folders.forEach((obj)=>{
    return gulp.src(obj.src)
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
      .pipe(gulp.dest(obj.dest))
      .pipe(livereload())
  });
});

gulp.task('scripts', () => {
  const scriptsbundle = require('./_gulp/scriptsbundle');
  return scriptsbundle.folders.forEach((obj)=>{
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
});

gulp.task('clean', () => {
  const cleanbundle = require('./_gulp/cleanbundle');
  return del.sync(cleanbundle.folders);
});

gulp.task('copy', () => {
  const copybundle = require('./_gulp/copybundle');
  return copybundle.folders.forEach((obj)=>{
    return gulp.src(obj.src)
      .pipe(gulp.dest(obj.dest));
  });
});

gulp.task('default', ['clean', 'scripts', 'styles', 'copy'], () => {
  console.info('...default...');
});

gulp.task('watch', () => {
  console.log('Watching you...');
  require('./server');
  livereload.listen();
  const watchbundle = require('./_gulp/watchbundle');
  watchbundle.folders.forEach((obj)=>{
    gulp.watch(obj.src, obj.tasks);
  })
})
