const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const scriptsPath = './application/scripts/**/*.js';

gulp.task('styles', () => {
  console.info('asdas');
});

gulp.task('scripts', () => {
  console.info('running gulp scripts...');
  return gulp.src(scriptsPath)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts'));
});

gulp.task('default', () => {
  console.info('default');
});

gulp.task('watch', ()=>{
  console.log('Watching you...');
  require('./server.js');
  gulp.watch(scriptsPath, ['scripts']);
})
