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
  })
} else {
  return ['vue-style-loader'].concat(loaders)
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
})
```

---

## aixos 相关

### 常见配置

```js
//让ajax携带cookie
axios.defaults.withCredentials = true
//设置请求baseURL,仅开发环境用于代理
axios.defaults.baseURL = '/api'
//设置请求超时时间
axios.defaults.timeout = 5000
//设置请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8'
// `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
axios.defaults.validateStatus = status => {
  return status
}
```

---

### get 和 post 两种请求要注意的地方

get 请求官方的两种写法,参数形式的，记得 params 要带上，post 那里不用带

```js
// Make a request for a user with a given ID
axios
  .get('/user?ID=12345')
  .then(function(response) {
    console.log(response)
  })
  .catch(function(error) {
    console.log(error)
  })

// Optionally the request above could also be done as
axios
  .get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function(response) {
    console.log(response)
  })
  .catch(function(error) {
    console.log(error)
  })
```

post 请求的参数数据格式默认不是 form-data,需要转码,官方的说明是引入 qs 来编码

```js
import qs from 'qs'
//注意，这里的params又不用加params这个键了
axios.post('/foo', qs.stringify({ bar: 123 }))
```

---

## vue

### 首屏加载动画

```html
<style>
  .vux-loading {
    z-index: 5000;
    position: relative;
  }

  .weui-mask_transparent {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .weui-toast {
    position: fixed;
    z-index: 5001;
    width: 7.6em;
    min-height: 7.6em;
    top: 180px;
    left: 50%;
    margin-left: -3.8em;
    background: rgba(17, 17, 17, 0.7);
    text-align: center;
    border-radius: 5px;
    color: #FFFFFF;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    margin-left: 0!important;
  }

  .weui-loading {
    margin: 30px 0 0;
    width: 38px;
    height: 38px;
    vertical-align: baseline;
    display: inline-block;
    -webkit-animation: weuiLoading 1s steps(12, end) infinite;
    animation: weuiLoading 1s steps(12, end) infinite;
    background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100%;
  }

  .weui-toast__content {
    margin: 0 0 15px;
    font-size: 16px;
  }

  @-webkit-keyframes weuiLoading {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }
    100% {
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }

  @keyframes weuiLoading {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }
    100% {
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
</style>
<div id="app">
  <!-- 首屏加载动画 -->
  <div class="weui-loading_toast vux-loading">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content">加载中</p>
    </div>
  </div>
</div>
  <!-- built files will be auto injected -->
```

---

### 标题更换指令

```js
// 注册标题更换全局指令
Vue.directive('title', {
  inserted(el, binding) {
    document.title = binding.value
    const iframe = document.createElement('iframe')
    iframe.style.cssText = 'display: none; width: 0; height: 0;'
    const listener = () => {
      setTimeout(() => {
        iframe.removeEventListener('load', listener)
        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 0)
      }, 0)
    }
    iframe.addEventListener('load', listener)
    document.body.appendChild(iframe)
  }
})
```

---

### 解决弹窗滑动穿透

最佳还是给 body 固定定位的方式，这里 popShow 是控制弹窗的开关，通过 watch 监听变化，打开弹窗了就把 body 已经卷去距离给记录，关闭弹窗就返还

```css
body.bodyCls {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
```

```js
//单个组件内
export default {
  data() {
    return {
      // 弹窗的开关
      popShow: false,
      // 滑动的记录值
      scrollTop: null
    }
  },
  watch: {
    popShow(newVal, oldVal) {
      if (newVal) {
        // 需要阻止滑动穿透的时候（遮罩层弹出）：
        this.scrollTop = document.scrollingElement.scrollTop
        document.body.classList.add('bodyCls')
        document.body.style.top = -this.scrollTop + 'px'
        return false
      }
      // 遮罩层隐藏后：
      document.body.classList.remove('bodyCls')
      document.scrollingElement.scrollTop = this.scrollTop
    }
  }
}
```
