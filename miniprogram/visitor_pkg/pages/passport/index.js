Page({
  data: {
    passport: {},
  },

  onLoad({ id, encryptedData }) {
    // 通过id获取分享
    this.getPassport(id)
    // 通过encryptedData获取分享
    this.getPassportShare(encryptedData)
  },
  // 获取访客详情（通行证）
  async getPassport(id) {
    // 检测是否存在 id
    if (!id) return
    // 调用接口
    const passport = await wx.http.get('/visitor/' + id)
    console.log(passport)
    // 渲染数据
    this.setData({ passport })
  },
  async getPassportShare(encryptedData) {
    // 检测是否存在 encryptedData
    if (!encryptedData) return
    // 调用接口
    const passport = await wx.http.get('/visitor/share/' + encryptedData)
    console.log(passport)
    // 渲染数据
    this.setData({ passport })
  },

  // 自定义分享
  onShareAppMessage() {
    // 获取加密数据
    const { encryptedData } = this.data.passport
    return {
      title: '查看通行证',
      path: '/visitor_pkg/pages/passport/index?encryptedData=' + encryptedData,
      imageUrl:
        'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/images/share_poster.png',
    }
  },

  // 保存二维码
  async saveQRCode() {
    try {
      // 读取图片信息
      const { path } = await wx.getImageInfo({
        // 二维码的图片路径
        src: this.data.passport.url,
      })
      // 保存图片到相册
      wx.saveImageToPhotosAlbum({ filePath: path })
    } catch (err) {
      wx.utils.toast('保存图片失败，稍后重试!')
    }
  },
})
