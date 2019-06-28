var gulp = require('gulp')
var del = require('del')
const image = require('gulp-image');

gulp.task('del', async () => {
  await del('build') // 构建前先删除dist文件里的旧版本
})

gulp.task('image', function () {
  return gulp.src('src/*')
    .pipe(image())
    .pipe(gulp.dest('build'));
});

gulp.task('default', gulp.series('del', 'image'))
