# vue 项目填坑(基于 vue-cli@2.9.2,webpack@3.6.0)

不定时更新

## vue-cli、webpack 相关

### vue-cli 构建的项目在打包后良好，开发环境低版本的浏览器白屏

这是因为"webpack-dev-server"版本更新后引入新模块的缘故，在
webpack.base.conf.js 中，配置 babel-loadel
**注:新版的 vue-cli 中已经解决这个问题**

```js
{
  test: /\.js$/,
  loader: 'babel-loader',
  include: [resolve('src'), resolve('test'), resolve('/node_modules\/webpack-dev-server/')]
}
```

---

### 让其他设备访问到开发环境的项目

首先知道自己本地 ip 地址，然后在 config 目录下 index.js 文件，配置

```js
host:'192.168.0.54',
port: 9494
```

---

### 通过本地代理解决跨域

仅限开发模式，可以配置一个本地的 node 代理编辑 config/index.js 文件中的 dev.proxyTable 选项

```js
proxyTable: {
  // 代理所有以/api开始的请求到jsonplaceholder
  '/api': {
    target: 'http://192.168.0.98', //服务器ip
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
}
```

---

### vue 打包后 js 和 css、图片不显示，引用的字体找不到问题

[原文地址](https://www.xiuyuan.info/?p=88)
用 ExtractTextWebpackPlugin 的 publicPath 配置就可以。更改工程 build/utils.js 文件中 ExtractTextPlugin 插件的 options 配置，重新打包：

```javascript
if (options.extract) {
  return ExtractTextPlugin.extract({
    use: loaders,
    publicPath: '../../', // 这里是/static/css/static/img/img@2x.c634efc.png 所以跳出两层../../； 注意配置这一部分，根据目录结构自由调整
    fallback: 'vue-style-loader'
  });
} else {
  return ['vue-style-loader'].concat(loaders);
}
```

---

### 压缩代码并移除 console

使用 UglifyJsPlugin 插件来压缩代码和移除 console。

```javascript
new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    drop_console: true,
    pure_funcs: ['console.log']
  },
  sourceMap: false
});
```

---

## aixos 相关

### 常见配置

```js
//让ajax携带cookie
axios.defaults.withCredentials = true;
//设置请求baseURL,仅开发环境用于代理
axios.defaults.baseURL = '/api';
//设置请求超时时间
axios.defaults.timeout = 5000;
//设置请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8';
```

---

### get 和 post 两种请求要注意的地方

get 请求官方的两种写法,参数形式的，记得 params 要带上，post 那里不用带

```js
// Make a request for a user with a given ID
axios
  .get('/user?ID=12345')
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

// Optionally the request above could also be done as
axios
  .get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

post 请求的参数数据格式默认不是 form-data,需要转码,官方的说明是引入 qs 来编码

```js
import qs from 'qs';
//注意，这里的params又不用加params这个键了
axios.post('/foo', qs.stringify({ bar: 123 }));
```

---
