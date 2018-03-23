// vue项目对aixos的封装
import Vue from 'vue'
import store from '../../store'
// 引入qs模块处理，指定传递的参数数据格式为Form Data
import qs from 'qs'
// 引入ajax插件axios
import axios from 'axios'
require('es6-promise').polyfill()
// 让ajax携带cookie
axios.defaults.withCredentials = true
// 设置请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8'
// 设置请求超时时间
axios.defaults.timeout = 5000
// 设置已经存好的登录验证token
if (sessionStorage.getItem('token')) {
  axios.defaults.headers['Token'] = sessionStorage.getItem('token')
}
let cancel
let promiseArr = {}
const CancelToken = axios.CancelToken
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]('操作取消')
      promiseArr[config.url] = cancel
    } else {
      promiseArr[config.url] = cancel
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
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
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = '连接到服务器失败'
    }
    Vue.$vux.toast.show({
      text: err.message,
      time: 2000,
      type: 'warn',
      width: '12em'
    })
    return Promise.resolve(err.response)
  }
)

export default {
  // 必选参数url，可选参数params，callback
  get (url, param, callback, errcallback) {
    if (param && typeof param === 'function') {
      if (callback) {
        errcallback = callback
      }
      callback = param
      param = undefined
    }
    store.commit('updateLoadingStatus', {
      isLoading: true
    })
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      })
        .then(res => {
          setTimeout(() => {
            store.commit('updateLoadingStatus', {
              isLoading: false
            })
          }, 200)
          resolve(res)
          if (callback && typeof callback === 'function') {
            callback(res)
          }
        })
        .catch(err => {
          store.commit('updateLoadingStatus', {
            isLoading: false
          })
          reject(err)
          if (errcallback && typeof errcallback === 'function') {
            errcallback()
          }
        })
    })
  },
  post (url, param, callback, errcallback) {
    if (param && typeof param === 'function') {
      if (callback) {
        errcallback = callback
      }
      callback = param
      param = undefined
    }
    store.commit('updateLoadingStatus', {
      isLoading: true
    })
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: qs.stringify(param),
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      })
        .then(res => {
          setTimeout(() => {
            store.commit('updateLoadingStatus', {
              isLoading: false
            })
          }, 200)
          resolve(res)
          if (callback && typeof callback === 'function') {
            callback(res)
          }
        })
        .catch(err => {
          store.commit('updateLoadingStatus', {
            isLoading: false
          })
          reject(err)
          if (errcallback && typeof errcallback === 'function') {
            errcallback()
          }
        })
    })
  },
  changeToken (token) {
    sessionStorage.setItem('token', token)
    axios.defaults.headers['Token'] = token
  }
}
