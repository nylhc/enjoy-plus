// 导入验证插件
import wxValidate from 'wechat-validate'
Page({
  behaviors: [wxValidate],
  data: {
    currentDate: Date.now(),
    maxDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
    dateLayerVisible: false,
    houseLayerVisible: false,
    houseList: [],
    houseId: '',
    houseInfo: '',
    name: '张三',
    gender: 1,
    mobile: '15077778888',
    visitDate: '', // 3天以内
  },
  rules: {
    houseId: [{ required: true, message: '请选择到访的房屋!' }],
    name: [
      { required: true, message: '访客姓名不能为空!' },
      { pattern: /[\u4e00-\u9fa5]{2,5}/, message: '访客姓名只能为中文!' },
    ],
    mobile: [
      { required: true, message: '访客手机号不能为空!' },
      { pattern: /^1[3-8]\d{9}$/, message: '请填写正确的手机号码!' },
    ],
    visitDate: [{ required: true, message: '请选择到访的日期!' }],
  },

  onLoad() {
    // 获取房屋列表
    this.getHouseList()
  },

  // 获取房屋列表
  async getHouseList() {
    // 调用接口
    const houseList = await wx.http.get('/house')
    // 渲染数据
    this.setData({ houseList })
  },
  // 获取用户选择的房屋
  selectHouseInfo(ev) {
    // 记录获取的数据
    this.setData({
      houseId: ev.detail.id,
      houseInfo: ev.detail.name,
    })
  },

  onConfirm(e) {
    this.setData({
      visitDate: wx.utils.formartDate(e.detail),
    })
    this.closeDateLayer()
  },

  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },

  // 提交表单数据
  async goPassport() {
    // 验证表单数据
    if (!this.validate()) return
    // 获取接口需要的数据
    const { name, gender, mobile, houseId, visitDate } = this.data
    // 调用接口
    const { id } = await wx.http.post('/visitor', {
      name,
      gender,
      mobile,
      houseId,
      visitDate,
    })
    console.log(id)
    // 跳转到访客详情页面
    wx.reLaunch({
      url: '/visitor_pkg/pages/passport/index?id=' + id,
    })
  },
})
