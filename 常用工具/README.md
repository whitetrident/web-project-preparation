# 常用工具

## 网站

### [MDN](https://developer.mozilla.org/zh-CN/)

---
### [css参考手册](http://css.doyoe.com/)

---
### [JQ参考手册](http://hemin.cn/jq/)

---
### [emmet语法](https://github.com/paddingme/Learning-HTML-CSS/issues/17)

---
### [常用正则表达式](http://www.cnblogs.com/zxin/archive/2013/01/26/2877765.html)

---
### [vscode中文文档](https://jeasonstudio.gitbooks.io/vscode-cn-doc/content/md/%E6%89%A9%E5%B1%95/%E6%A6%82%E8%BF%B0.html)

---
### [npm常用命令](http://www.cnblogs.com/PeunZhang/p/5553574.html)

---
### [markdown语法](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/markdown-basics)

---
### [常用git命令](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

---
### 如何从jq过渡到原生js
[You might not need jquery](http://youmightnotneedjquery.com/#trigger_custom)

---
### IDE注册码(你可用的是webstorm？)
[IDE注册码](http://idea.lanyus.com/)

---
### [获取键盘码](http://keycode.info/)

---
### css3动画不会写咋办？
[css3简单动画工具](https://www.w3cways.com/css3-animation-tool)

---
### [html5特殊字符编码对照表](http://www.jb51.net/onlineread/htmlchar.htm)

---
### [图片在线压缩](https://tinypng.com/)

---
### [在线制作精灵图](https://spritegen.website-performance.org/)

---
### [常用meta整理](https://segmentfault.com/a/1190000002407912)

---

## 谷歌插件

### [Chrono下载管理器](https://chrome.google.com/webstore/detail/chrono-download-manager/mciiogijehkdemklbdcbfkefimifhecn)
集下载管理、资源嗅探于一身 

---
### [Markdown Reader](https://chrome.google.com/webstore/detail/markdown-reader/gpoigdifkoadgajcincpilkjmejcaanc)
MD文档阅读工具

---
### [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)
跨域请求解除限制

---
### [捕捉网页截图 - FireShot](https://chrome.google.com/webstore/detail/take-webpage-screenshots/mcbpblocgmgfnpjjppndjkmgjaogfceg)

---

## 打造最强编辑器，vscode插件

### [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
自动重新命名配对的HTML / XML标签

![Auto Rename Tag](./img/auto-rename-tag.gif)

---

### [Autoprefixer](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-autoprefixer)
解析CSS并自动添加供应商前缀。

![Autoprefixer](./img/autoprefixer.gif)

---
### [Easy LESS](https://marketplace.visualstudio.com/items?itemName=mrcrowl.easy-less)
保存时自动编译LESS到CSS

---
### [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
代码规范检查，将ESLint集成到VS代码中。

---
### [HTMLHint](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint)
用于HTMLHint的VS代码集成 - 用于HTML的静态代码分析工具

---
### [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
为静态和动态页面启动具有实时重新加载功能的开发本地服务器
像webstorm、hbuilder一样甚至更强的本地服务器，支持热更新。

![Live Server](./img/live-server.gif)

---
### [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
Markdown实时预览
![Markdown Preview Enhanced](./img/Markdown-preview-enhanced.png)

---
### [minify](https://marketplace.visualstudio.com/items?itemName=HookyQR.minify)
使用命令进行html、css、js压缩混淆，并（可选）在保存时重新缩小。

---
### [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
自动完成文件名路径

![path-intellisense](./img/path-intellisense.gif)

---
### [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
代码格式化插件

---
### [Syncing](https://marketplace.visualstudio.com/items?itemName=nonoroazoro.syncing)
将每个设置与您自己的GitHub Gist同步。

---
### [gzip](http://www.softpedia.com/get/Compression-tools/WinGZip.shtml)
gzip压缩神器

更强的gulp版，可以批量压缩
[gulp-gzip](https://www.npmjs.com/package/gulp-gzip)

简单的gulp-file配置:
```js
var gulp = require('gulp')
var gzip = require('gulp-gzip')
gulp.task('gzip', function() {
  gulp
    .src('./lib/*.*')
    // 大于10kb的才压缩
    .pipe(gzip({ threshold: 10240 }))
    .pipe(gulp.dest('./dist'))
})

```
