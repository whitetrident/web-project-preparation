const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const postcss = require('gulp-postcss')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const del = require('del')
const htmlmin = require('gulp-htmlmin')
const gzip = require('gulp-gzip')
const runSequence = require('run-sequence')
const autoprefixer = require('autoprefixer')
const merge = require('merge-stream')

// 构建前先删除dist文件里的旧版本
gulp.task('del', function() {
  del('build')
})

// css处理，增加兼容前缀，压缩，加min
gulp.task('css', function() {
  return (
    gulp
      .src('src/css/*.css')
      // css增加兼容前缀,如果需要兼容pc，可以改为'> 0.1% in CN','ie >= 6'
      .pipe(
        postcss([autoprefixer({ browsers: ['Android >= 2.2', 'ios >=4'] })])
      )
      //css压缩
      .pipe(cleanCSS())
      .pipe(
        rename(function(path) {
          var basename = path.basename
          // 已经是min的不需要加上min
          if (!/.min$/.test(basename)) {
            path.basename += '.min'
          }
        })
      )
      .pipe(gulp.dest('build/css'))
  )
})

// js处理，压缩，加min
gulp.task('js', function() {
  return gulp
    .src('src/js/*.js')
    .pipe(uglify())
    .pipe(
      rename(function(path) {
        var basename = path.basename
        // 已经是min的不需要加上min
        if (!/.min$/.test(basename)) {
          path.basename += '.min'
        }
      })
    )
    .pipe(gulp.dest('build/js'))
})

// html处理，压缩
gulp.task('html', function() {
  return gulp
    .src('src/view/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        customAttrCollapse: '',
        maxLineLength: false,
        minifyCSS: true, //uses minify.css settings if true
        minifyJS: true, //uses minify.js settings if true
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        quoteCharacter: '"'
      })
    )
    .pipe(gulp.dest('build/view'))
})

// gzip打包
function gzipTask(src) {
  return gulp
    .src('build/' + src +'/*.*')
    .pipe(gzip({ threshold: 10240 }))
    .pipe(gulp.dest('build/' + src))
}

// gzip任务
gulp.task('gzip', function() {
  const stream1 = gzipTask('js')
  const stream2 = gzipTask('css')
  const stream3 = gzipTask('view')
  return merge(stream1, stream2, stream3)
})

// 真正需要执行的，不需要执行哪步可以自己删
gulp.task('default', function() {
  runSequence('del', ['css', 'js', 'html'], 'gzip', function() {
    console.log('success')
  })
})
