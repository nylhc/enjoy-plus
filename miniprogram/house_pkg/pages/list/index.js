Page({
  data: {
    houseList: [],
    isEmpty: false,
    dialogVisible: false,
  },

  // 用户房屋列表
  async getHouseList() {
    // 调用接口
    const houseList = await wx.http.get('/room')
    console.log('获取房屋列表成功', houseList)
    // 渲染数据
    this.setData({
      houseList,
      isEmpty: houseList.length === 0,
    })
  },

  onShow() {
    this.getHouseList()
  },

  swipeClose(ev) {
    console.log(ev)
    const { position, instance } = ev.detail

    if (position === 'right') {
      this.id = ev.mark.id
      this.index = ev.mark.index
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
      })

      // swiper-cell 滑块关闭
      instance.close()
    }
  },

  async dialogClose(e) {
    if (e.detail === 'confirm') {
      console.log(e)
      await wx.http.delete('/room/' + this.id)
      wx.utils.toast('删除成功', 'success')
      this.data.houseList.splice(this.index, 1)
      this.setData({
        houseList: this.data.houseList,
      })
    }
  },

  goDetail(e) {
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index?id=' + e.mark.id,
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
})
