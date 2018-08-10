const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
// const cleanCSS = require('gulp-clean-css');
// const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');


const scriptsPath = './application/scripts/**/*.js';
const stylesPath = './application/styles/**/*.css';

gulp.task('styles', () => {
  const autoprefixer = require('autoprefixer');
  const clean = require('postcss-clean');
  console.info('Running gulp styles...');
  return gulp.src(['./application/styles/reset.css', stylesPath])
    .pipe(plumber(function(error) {
      console.info('Styles ERROR');
      console.info(error);
      this.emit('end')
    }))
    .pipe(concat('styles.css'))
    .pipe(postcss([autoprefixer({
      browsers: ['last 2 versions', '> 1%', 'ie 8'],
      cascade: false
    }), clean()]))
    .pipe(gulp.dest('./public/css/'))
    .pipe(livereload())
});

gulp.task('scripts', () => {
  console.info('Running gulp scripts...');
  return gulp.src(scriptsPath)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts'))
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
