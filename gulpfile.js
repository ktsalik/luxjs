var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

gulp.task('build-styles', function() {
  gulp.src('./bulma/bulma.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'));
    
  gulp.src('./src/lux.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'));
  
  return gulp.src(['./dist/bulma.css', './dist/lux.css'])
    .pipe(concat('lux.combined.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(minifyCss())
    .pipe(rename('lux.combined.min.css'))
    .pipe(gulp.dest('./dist/'));
}); 
 
gulp.task('watch-styles', function () {
  gulp.watch('./src/lux.sass', ['build-styles']);
});

gulp.task('build-jquery', function() {
  gulp.src([
      './src/jquery/lux.js',
      './src/jquery/button.js',
      './src/jquery/tooltip.js',
    ])
    .pipe(concat('jquery.lux.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('jquery.lux.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch-jquery', function () {
  gulp.watch('./src/jquery/*.js', ['build-jquery']);
});

gulp.task('build-vue', function() {
  return gulp.src([
      './src/vue/lux.js',
      './src/vue/button.js'
    ])
    .pipe(concat('vue.lux.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('vue.lux.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch-vue', function () {
  gulp.watch('./src/vue/*.js', ['build-vue']);
});

gulp.task('build-angular', function() {
  return gulp.src([
      './src/angular/lux.js',
      './src/angular/button.js'
    ])
    .pipe(concat('angular.lux.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('angular.lux.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch-angular', function () {
  gulp.watch('./src/angular/*.js', ['build-angular']);
});

gulp.task('default', [
  'build-styles',
  'watch-styles',
  'build-jquery',
  'watch-jquery',
  'build-vue',
  'watch-vue',
  'build-angular',
  'watch-angular'
]);