# Automatically-add-version-number-js-css-

**自动给 css、js 加上版本号**

借助 gulp 的一个自动给 css、js 文件名加上版本号，并且给 html 中的 js、css 链接加上对应版本号

---

### 文件名-hash 字符串.后缀版本

这种版本 github 在用

执行前

```html
<link rel="stylesheet" type="text/css" href="../css/base.min.css" />
<link rel="stylesheet" href="../css/livelist.min.css">
<script src="../js/common.min.js"></script>
<script src="../js/livelist.min.js"></script>
```

```bash
gulp
```

执行后

```html
<link rel="stylesheet" type="text/css" href="../css/base-a9659f52d1.min.css" />
<link rel="stylesheet" href="../css/livelist-45b4e2b9cc.min.css">
<script src="../js/common-3722f25240.min.js"></script>
<script src="../js/livelist-60da8c1e04.min.js"></script>
```

---

### ?v=的形式

这种版本国内各大网站比较普遍

需要修改下 node_modules 包

```bash
打开node_modules\gulp-rev\index.js
manifest[originalFile] = revisionedFile
更新为: manifest[originalFile] = originalFile + '?v=' + file.revHash
```

```bash
打开node_modules\rev-path\index.js
return modifyFilename(pth, (filename, ext) => ${filename}-${hash}${ext})
更新为: return modifyFilename(pth, (filename, ext) => `${filename}${ext}`)
```

```bash
打开node_modules\gulp-rev-collector\index.js
var cleanReplacement = path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' )
更新为: var cleanReplacement = path.basename(json[key]).split('?')[0]

regexp: new RegExp(prefixDelim + pattern, 'g')
更新为: regexp: new RegExp(prefixDelim + pattern + '(\\?v=\\w{10})?','g')
```

执行后

```html
<link rel="stylesheet" type="text/css" href="../css/base.min.css?v=a9659f52d1" />
<link rel="stylesheet" href="../css/livelist.min.css?v=45b4e2b9cc">
<script src="../js/common.min.js?v=3722f25240"></script>
<script src="../js/livelist.min.js?v=60da8c1e04"></script>
```

---

### 使用方法

先当前文件夹执行 npm i 下载好依赖包，然后把项目整个放在 src 目录下（只放 view、js、css 也行，自己看着改），然后当前文件夹执行 gulp 命令，生成的在 build 文件夹中
