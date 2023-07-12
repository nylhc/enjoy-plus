// 导入 http 模块
import http from 'wechat-http'
// 基础路径
http.baseURL = 'https://live-api.itheima.net'

// 请求拦截器
http.intercept.request = (options) => {
  // 指定默认的头信息
  const defaultHeader = {}
  // 权限认证
  defaultHeader.Authorization = 'Bearer ' + getApp().token?.token
  // 合并头信息
  options.header = Object.assign({}, defaultHeader, options.header)
  // 拦截器处理后的请求参数
  return options
}

// 响应拦截器
http.intercept.response = async ({ statusCode, data, config }) => {
  if (statusCode === 200) {
    if (data.code === 10000) {
      console.log(config)
      return data.data
    } else {
      wx.utils.toast(data.message, 'error')
      return Promise.reject(new Error(data.message))
    }
  } else {
    if (statusCode === 401) {
      if (config.url.includes('/refreshToken')) {
        wx.utils.toast('请登录')
        // 清除token
        getApp().setToken('')
        // 跳转到登录页
        const curPage = getCurrentPages().pop()
        const query = Object.keys(curPage.options)
          .map((key) => `${key}=${curPage.options[key]}`)
          .join('&')
        console.log('重定向-----------', curPage)
        wx.redirectTo({
          url: `/pages/login/index?redirectURL=/${curPage.route}&${query}`,
        })
        return Promise.reject(new Error('token已失效'))
      }

      // token失效,通过通过refreshToken获取新token
      const refreshToken = getApp()?.token.refreshToken
      const data = await http({
        url: '/refreshToken',
        method: 'post',
        header: {
          Authorization: 'Bearer ' + refreshToken,
        },
      })
      console.log('token失效,通过refreshToken获取新token', data)
      // 更新token
      getApp().setToken(data)
      // config里的请求头依然是无效的，需要修正
      config.header.Authorization = 'Bearer ' + data.token
      // 修正后，重新调用http,传config,即可重新发起请求
      return http(config)
    }
    wx.utils.toast('网络错误', 'error')
    return Promise.reject(new Error('网络错误'))
  }
}

// 挂载到全局对象
wx.http = http
// 普通的模块导出
export default http
