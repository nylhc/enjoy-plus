// house_pkg/pages/room/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    point: '',
    building: '',
    rooms: [],
  },

  fake(point, building) {
    // 生成多少个房间
    const size = Math.floor(Math.random() * 5) + 4
    const rooms = []
    for (let i = 0; i < size; i++) {
      // 楼层号生成 1 ~ 19
      const floor = Math.floor(Math.random() * 19) + 1
      // 具体的房间号生成 1 ~ 2
      const No = Math.floor(Math.random() * 2) + 1
      const room = [floor, 0, No].join('')
      // 检测是否有重复的房间号
      if (rooms.includes(room)) break
      // 记录生成完整的房间号
      rooms.push(room)
    }
    // 渲染数据
    this.setData({ rooms, point, building })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ point, building }) {
    // 创建房间
    this.fake(point, building)
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
