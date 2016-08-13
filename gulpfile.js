var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build-styles', function() {
  gulp.src('./bower_components/bulma/bulma.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'));
    
  gulp.src('./src/lux.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'));
  
  return gulp.src(['./dist/bulma.css', './dist/lux.css'])
    .pipe(concat('lux.combined.css'))
    .pipe(gulp.dest('./dist/'));
}); 
 
gulp.task('watch-styles', function () {
  gulp.watch('./src/lux.sass', ['build-styles']);
});

gulp.task('build-jquery', function() {
  gulp.src([
      './src/jquery/Lux.js',
      './src/jquery/Button.js',
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
      './src/vue/Lux.js',
      './src/vue/Button.js'
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
      './src/angular/Lux.js',
      './src/angular/Button.js'
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