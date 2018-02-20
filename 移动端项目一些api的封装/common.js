// 入口函数
function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn, false)
  }
}

ready(function() {
  // fastclick实例化
  FastClick.attach(document.body)
})

var common = {
  // 配置的请求地址的域名
  baseUrl: 'http://192.168.0.70:777',
  // 接口地址
  ajaxUrl: {
    //直播列表
    getLiveList: '/api/SiSi/getLive',
    //登录
    login: '/api/SiSi/login'
  },
  ajaxErr: function(err) {
    if (err) {
      switch (err.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = '连接错误'
      }
    } else {
      err.message = '连接到服务器失败'
    }
    // 错误的提示，这里可以换成自己的toast、alert动画
    alert(err.message)
  }
}
