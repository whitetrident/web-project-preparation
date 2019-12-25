var gulp = require('gulp');
gulp.task('default', function () {
  var postcss      = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');

  return gulp.src('./postcss/*.css')
    .pipe(postcss([ autoprefixer({ browsers: ['last 5 versions','ie >= 6'] }) ]))
    .pipe(gulp.dest('./dist'));
});
gulp.task('w', function () {
  var postcss      = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');

  return gulp.src('./postcss/*.css')
    .pipe(postcss([ autoprefixer({ browsers: ['Android >= 2.2','ios >= 4'] }) ]))
    .pipe(gulp.dest('./dist'));
});
gulp.task('m', function () {
  var postcss      = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');

  return gulp.src('./postcss/*.css')
    .pipe(postcss([ autoprefixer({ browsers: ['Android >= 2.2','ios >=4','UCAndroid >= 7','QQAndroid >= 1','FirefoxAndroid >= 1','OperaMobile >= 1','ExplorerMobile >= 1','ExplorerMobile >= 1'] }) ]))
    .pipe(gulp.dest('./dist'));
});
//命令行 gulp 给所有加上前缀，gulp w则只加安卓跟苹果(微信端)