// 导入表单验证插件
import wxValidate from 'wechat-validate'
Page({
  behaviors: [wxValidate],
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    repairItem: [],
    attachment: [],
    houseInfo: '',
    houseId: '',
    repairItemName: '',
    repairItemId: '',
    mobile: '',
    appointment: '',
    description: '',
  },

  rules: {
    houseId: [{ required: true, message: '请选择报修房屋!' }],
    repairItemId: [{ required: true, message: '请选择维修的项目!' }],
    mobile: [
      { required: true, message: '请填写手机号码!' },
      { pattern: /^1[3-8]\d{9}$/, message: '请填写正确的手机号码!' },
    ],
    appointment: [{ required: true, message: '请选择预约日期!' }],
    description: [{ required: true, message: '请填写问题描述!' }],
  },

  onLoad({ id }) {
    if (id) {
      // 如果有id表明是修改操作
      this.getRepairDetail(id)
      wx.setNavigationBarTitle({
        title: '修改报修信息',
      })
    } else {
      this.getHouseList()
      this.getRepairItem()
      wx.setNavigationBarTitle({
        title: '填写报修信息',
      })
    }
  },

  // 获取房屋列表（必须是通过审核的房屋）
  async getHouseList() {
    // 调用接口
    const houseList = await wx.http.get('/house')
    // 渲染数据
    this.setData({ houseList })
  },

  // 获取维修项目
  async getRepairItem() {
    // 调用接口
    const repairItem = await wx.http.get('/repairItem')
    // 渲染数据
    this.setData({ repairItem })
  },

  // 获取待修改的报修信息
  async getRepairDetail(id) {
    // 调用接口
    const repairDetail = await wx.http.get('/repair/' + id)
    console.log('获取保修详情成功', repairDetail)
    // 渲染数据
    this.setData({ ...repairDetail })
  },

  onSelect(e) {
    const { name, id } = e.detail
    this.setData({
      [e.mark.name]: name,
      [e.mark.id]: id,
    })
  },

  onConfirm(e) {
    this.setData({
      appointment: wx.utils.formartDate(e.detail),
    })
    this.closeDateLayer()
  },

  // 问题附件
  onUpload(e) {
    const filePath = e.detail.file.tempFilePath
    wx.uploadFile({
      url: 'https://live-api.itheima.net/upload',
      filePath,
      name: 'file',
      header: {
        Authorization: 'Bearer ' + getApp().token?.token,
      },
      success: (res) => {
        if (res.statusCode === 413) {
          return wx.utils.toast('上传文件过大,请重新上传')
        }
        const data = JSON.parse(res.data)
        console.log(data)
        if (data.code !== 10000) return wx.utils.toast('上传失败', 'error')
        this.data.attachment.push(data.data)
        this.setData({
          attachment: this.data.attachment,
        })
      },
      fail: (err) => {
        return Promise.reject(new Error(err.errMsg))
      },
    })
  },
  onDelete(e) {
    this.data.attachment.splice(e.detail.index, 1)
    this.setData({
      attachment: this.data.attachment,
    })
  },

  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  async goList() {
    // 验证表单数据
    if (!this.validate()) return
    // 提取接口需要的数据
    const {
      id,
      houseId,
      repairItemId,
      mobile,
      appointment,
      description,
      attachment,
    } = this.data
    // 调用接口
    await wx.http.post('/repair', {
      id,
      houseId,
      repairItemId,
      mobile,
      appointment,
      description,
      attachment,
    })
    // 跳转到报修列表页面
    wx.redirectTo({
      url: '/repair_pkg/pages/list/index',
    })
  },
})
