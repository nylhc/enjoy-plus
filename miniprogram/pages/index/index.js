Page({
  data: {
    announcementlist: []
  },

  onLoad() {
    this.getAnnouncement()
  },

  async getAnnouncement() {
    const announcementlist = await wx.http.get('/announcement')
    this.setData({
      announcementlist
    })
    console.log('获取社区公告列表成功', announcementlist);
  }
})