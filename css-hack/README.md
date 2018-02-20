# css-hack
css兼容批量一个命令行处理
### 解放你的记忆
css兼容是前端一个绕不过去的问题，我们现在有了这个工具，你可以不用去记那些莫名其妙的前缀了
#### 下载依赖
首先你得有node，什么，作为大前端你不知道node？你可以......[nodejs](https://nodejs.org/zh-cn/ "nodejs")

安装完node后,接着安装gulp，你又不知道gulp？那[gulp中文网](http://www.gulpjs.com.cn/docs/getting-started/ "gulp中文网")
全局安装gulp包
```bash
npm i -g gulp
```
在项目文件夹里下载全部的开发依赖
```bash
npm i
```
这是gulpfile.js的代码
```javascript
var gulp = require('gulp');
gulp.task('default', function () {
  var postcss      = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');

  return gulp.src('./postcss/*.css')
    .pipe(postcss([ autoprefixer({ browsers: ['last 5 versions'] }) ]))
    .pipe(gulp.dest('./dist'));
});
gulp.task('w', function () {
  var postcss      = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');

  return gulp.src('./postcss/*.css')
    .pipe(postcss([ autoprefixer({ browsers: ['Android >= 2.2','ios >=4'] }) ]))
    .pipe(gulp.dest('./dist'));
});
```
目前有两个命令，gulp和gulp w，gulp适用于pc端，gulp w适用于移动端。
gulp不知道怎么配的好好看gulp文档，css处理的兼容配置，主要填在autoprefixer()里面

原代码
```css
.artTab {
	display: flex;
	flex-direction: column;
	justify-content: center;
	justify-content: space-around;
	align-items: center;
}

.artTab>.tabBtn {
	flex: 1;
	transform: translateY(-50%);
}

```
执行gulp w后
```css
.artTab {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	        flex-direction: column;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	        justify-content: center;
	-webkit-justify-content: space-around;
	        justify-content: space-around;
	-webkit-box-align: center;
	-webkit-align-items: center;
	        align-items: center;
}

.artTab>.tabBtn {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	        flex: 1;
	-webkit-transform: translateY(-50%);
	        transform: translateY(-50%);
}

```
强劲、无敌、最强



