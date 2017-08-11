const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack-stream');
const connect = require('gulp-connect');
const pug = require('gulp-pug');


gulp.task('scripts', () => {
  return gulp.src('./src/scripts/**/*')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('connect', () => {
  connect.server({
    port: 3000,
    root: 'dist',
    livereload: true
  });
});

// compiler and compress less
gulp.task('styles', () => {
  gulp.src('./src/styles/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(autoprefixer())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(connect.reload());
});

// compress images
gulp.task('images', () => {
  gulp.src('./src/images/**/*')
  .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
  .pipe(gulp.dest('./dist/images/'))
  .pipe(connect.reload());
});

// diff views
gulp.task('html', () => {
  gulp.src('./src/index.pug')
  .pipe(pug())
  .pipe(gulp.dest('./dist'))
  .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch('./src/styles/**/*.less', ['styles']);
  gulp.watch('./src/images/**/*', ['images']);
  gulp.watch('./src/**/*', ['html']);
});


gulp.task('default', ['connect', 'html', 'styles', 'images', 'scripts', 'watch']);
gulp.task('build', ['styles', 'images', 'scripts']);
