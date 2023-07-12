Page({
  data: {
    houseDetail: {},
  },

  editHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index?id=' + this.data.houseDetail.id,
    })
  },

  onLoad({ id }) {
    this.getHouseDetail(id)
  },

  async getHouseDetail(id) {
    const houseDetail = await wx.http.get('/room/' + id)
    console.log('获取房屋详情成功', houseDetail)
    this.setData({
      houseDetail,
    })
  },
})
