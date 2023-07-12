Page({
  data: {
    current: 1,
    pageSize: 5,
    visitorList: [],
    isOver: false,
    isEmpty: false,
    isLoading: false, // 节流阀
  },

  async getvisitorList() {
    this.setData({
      isLoading: true,
    })
    const { rows, total } = await wx.http.get('/visitor', {
      current: this.data.current,
      pageSize: this.data.pageSize,
    })
    const curList = [...this.data.visitorList, ...rows]
    this.setData({
      visitorList: curList,
      isOver: curList.length === total,
      isEmpty: curList.length === 0,
      isLoading: false,
    })
    console.log('获取访客记录列表成功', rows, total)
  },

  onScrollTolower() {
    if (this.data.isOver) return wx.utils.toast('没有更多数据了')
    if (this.data.isLoading) return
    this.setData({
      current: this.data.current + 1,
    })
    this.getvisitorList()
  },

  goPassport(e) {
    wx.navigateTo({
      url: '/visitor_pkg/pages/passport/index?id=' + e.mark.id,
    })
  },

  onLoad() {
    this.getvisitorList()
  },
})
