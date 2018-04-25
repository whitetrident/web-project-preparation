# gulp 处理(包括 html、css、js 的加兼容前缀，压缩一步到位)

### 使用说明

首先下载依赖

```bash
npm i
```

然后该目录新建一个 src 文件夹，里面存放三个文件夹 view(存放 html 文件)
之后执行

```bash
gulp
```

打包后的就会在 build 里

### 注意

这个命令建立在 html 引入的 css、js 已经加了.min 的情况，如果不需要，可以去掉

```js
 .pipe(
      rename(function(path) {
        var basename = path.basename
        // 已经是min的不需要加上min
        if (!/.min$/.test(basename)) {
          path.basename += '.min'
        }
      })
    )
```
