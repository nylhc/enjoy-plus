Page({
  data: {
    repairList: [],
    current: 1,
    pageSize: 5,
    isOver: false,
    isEmpty: false,
    isLoading: false, // 节流阀
  },

  async getRepairList() {
    this.setData({ isLoading: true })
    const { rows, total } = await wx.http.get('/repair', {
      current: this.data.current,
      pageSize: this.data.pageSize,
    })

    const curList = [...this.data.repairList, ...rows]
    this.setData({
      repairList: curList,
      isOver: curList.length === total,
      isEmpty: curList.length === 0,
      isLoading: false,
    })
    console.log('获取保修列表成功', rows, total)
  },

  onScrollTolower() {
    if (this.data.isOver) return wx.utils.toast('没有更多数据了')
    if (this.data.isLoading) return
    this.setData({
      current: this.data.current + 1,
    })
    this.getRepairList()
  },

  onLoad() {
    this.getRepairList()
  },

  goDetail(e) {
    wx.navigateTo({
      url: '/repair_pkg/pages/detail/index?id=' + e.mark.id,
    })
  },
  addRepair() {
    wx.navigateTo({
      url: '/repair_pkg/pages/form/index',
    })
  },
})
