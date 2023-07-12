// house_pkg/pages/building/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    size: 0,
    point: '',
    type: '',
  },

  fake(point) {
    // 生成楼栋数（用于上课）
    const size = Math.floor(Math.random() * 4) + 3
    // 楼栋名称（xx小区 / xx栋）
    const type = size > 4 ? '号楼' : '栋'
    // 数据渲染
    this.setData({ size, type, point })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ point }) {
    this.fake(point)
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
