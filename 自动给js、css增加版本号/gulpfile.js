var gulp = require('gulp')
var rev = require('gulp-rev')
var revColletor = require('gulp-rev-collector')
var del = require('del')

gulp.task('del', function() {
  return del('build') // 构建前先删除dist文件里的旧版本
})
//revision 用来增加散列值和生成rev.manifest.json
gulp.task('revCss', function() {
  return gulp
    .src(['src/css/*.css'])
    .pipe(rev())
    .pipe(gulp.dest('build/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build/css'))
})
gulp.task('revJs', function() {
  return gulp
    .src(['src/js/*.js'])
    .pipe(rev())
    .pipe(gulp.dest('build/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build/js'))
})
gulp.task('move', function() {
  return gulp
    .src(['src/**/*', '!src/{view,js,css}/**']) // src指定了要处理的文件名
    .pipe(gulp.dest('build')) // ./dest指定了要移动到的文件夹的地址
})
gulp.task('replace', function() {
  //replace 用来热替换链接
  return gulp
    .src(['build/**/*.json', 'src/view/*.html'])
    .pipe(
      revColletor({
        replaceReved: true //必须增加这个参数，否则更改了源文件之后不会热更新
      })
    )
    .pipe(gulp.dest('build/view'))
})
gulp.task('default', gulp.series('del', 'move', gulp.parallel('revCss', 'revJs'), 'replace'))
