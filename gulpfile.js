const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');


const scriptsPath = './application/scripts/**/*.js';
const stylesPath = './application/styles/**/*.css';

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

gulp.task('styles', () => {
  console.info('Running gulp styles...');
  console.info('More details to autoprefixer and browser definitions: https://github.com/browserslist/browserslist')
  return gulp.src(['./application/styles/*.scss'])
    .pipe(plumber(function(error) {
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
    .pipe(gulp.dest('./public/css/'))
    .pipe(livereload())
});

gulp.task('scripts', () => {
  console.info('Running gulp scripts...');
  return gulp.src(scriptsPath)
    .pipe(plumber(function(error) {
      console.info('Styles ERROR');
      console.info(error);
      this.emit('end')
    }))
    .pipe(sourcemaps.init({
      largeFile: true
    }))
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload())
});

gulp.task('default', () => {
  console.info('default');
});

gulp.task('watch', () => {
  console.log('Watching you...');
  require('./server.js');
  livereload.listen();
  gulp.watch(scriptsPath, ['scripts']);
  gulp.watch(stylesPath, ['styles']);
})
