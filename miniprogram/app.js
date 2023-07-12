// app.js
// 在入口中执行 utils.js
import './utils/utils.js'
import './utils/http.js'

App({
  globalData: {},
  onLaunch() {
    // 读取本地存储的 token 数据
    this.getToken()
  },
  getToken() {
    // 将 token 数据记到应用实例中
    this.token = wx.getStorageSync('token')
  },
  setToken(data) {
    this.token = data
    wx.setStorageSync('token', data);
  }
})