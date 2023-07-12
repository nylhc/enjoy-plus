// house_pkg/pages/locate/index.ts
// 导入腾讯位置服务
import QQMap from '../../../utils/qqmap'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    points: [],
  },

  async onchooseLocation() {
    const { latitude, longitude } =
      await wx.chooseLocation()
    this.getPoint(latitude, longitude)
  },

  async getLocation() {
    // 调用 API,获取位置信息
    const { latitude, longitude } = await wx.getLocation({
      isHighAccuracy: true,
    })
    console.log(latitude, longitude)
    this.getPoint(latitude, longitude)
  },

  getPoint(latitude, longitude) {
    // 逆地址解析（根据经纬度来获取地址）
    QQMap.reverseGeocoder({
      location: {
        latitude,
        longitude,
      },
      success: ({ result: { address } }) => {
        // 数据数据
        this.setData({ address })
      },
    })
    // search 是实现地点搜索功能的方法
    QQMap.search({
      keyword: '住宅小区', //搜索关键词
      location: [latitude, longitude].join(','), //设置周边搜索中心点
      page_size: 10,
      success: (result) => {
        // 过滤掉多余的数据
        const points = result.data.map(
          ({ id, title, _distance }) => {
            return { id, title, _distance }
          }
        )
        // 渲染数据
        this.setData({ points })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getLocation()
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
