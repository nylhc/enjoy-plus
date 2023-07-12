Page({
  data: {
    userInfo: {},
  },

  onLoad() {
    // this.getUserInfo()
  },

  onShow() {
    this.getUserInfo()
  },

  async getUserInfo() {
    const userInfo = await wx.http.get('/userInfo')
    this.setData({
      userInfo,
    })
    console.log('获取用户信息成功', userInfo)
  },

  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
})
