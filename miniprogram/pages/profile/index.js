// pages/profile/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    nickName: '',
  },

  onAvatar(e) {
    const avatarUrl = e.detail.avatarUrl
    this.updataAvatar(avatarUrl)
  },
  updataAvatar(avatarUrl) {
    wx.uploadFile({
      url: 'https://live-api.itheima.net/upload',
      filePath: avatarUrl,
      name: 'file',
      formData: { type: 'avatar' },
      header: {
        Authorization: 'Bearer ' + getApp()?.token.token,
      },
      success: (result) => {
        // 上传后图片回填
        console.log(result)
        const data = JSON.parse(result.data)
        if (data.code !== 10000) {
          return wx.utils.toast(data.message, 'error')
        }
        this.setData({
          imgUrl: data.data.url,
        })
      },
      fail: () => {},
      complete: () => {},
    })
  },

  onBlur(e) {
    const nickname = e.detail.value.trim()
    this.updataNickName(nickname)
  },
  async updataNickName(nickName) {
    if (!nickName) return
    await wx.http.put('/userInfo', { nickName })
    wx.utils.toast('修改用户信息成功')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ nickName, avatar }) {
    this.setData({
      nickName,
      imgUrl: avatar,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
})
