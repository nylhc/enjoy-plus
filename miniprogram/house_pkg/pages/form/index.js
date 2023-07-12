// \u4e00-\u9fa5] 中文验证规则
// 导入表单验证插件
import wxValidate from 'wechat-validate'
Page({
  behaviors: [wxValidate],
  data: {
    point: '',
    building: '',
    room: '',
    name: '',
    gender: 1,
    mobile: '',
    idcardFrontUrl: '',
    idcardBackUrl: '',
  },
  rules: {
    name: [
      { required: true, message: '业主姓名不能为空!' },
      {
        pattern: /^[\u4e00-\u9fa5]{2,5}$/,
        message: '业主姓名只能为中文!',
      },
    ],
    mobile: [
      { required: true, message: '业主手机号不能为空!' },
      {
        pattern: /^1[3-8]\d{9}$/,
        message: '请填写正确的手机号!',
      },
    ],
    idcardFrontUrl: [{ required: true, message: '请上传身份证照片面!' }],
    idcardBackUrl: [
      {
        required: true,
        message: '请上传身份证国徽面!',
      },
    ],
  },

  async onSumbit() {
    if (!this.validate()) return
    // eslint-disable-next-line no-unused-vars
    const { __webviewId__, status, ...data } = this.data
    await wx.http.post('/room', data)
    wx.reLaunch({
      url: '/house_pkg/pages/list/index',
    })
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    console.log(type)
    this.setData({ [type]: '' })
  },

  async onUpLoad(e) {
    const type = e.mark.type
    const res = await wx.chooseMedia({
      count: 1, // 每次只能选一张图片
      mediaType: ['image'], // 只能选择图片
      sizeType: ['compressed'], // 选择压缩图片
    })
    console.log(res)
    wx.uploadFile({
      url: 'https://live-api.itheima.net/upload',
      filePath: res.tempFiles[0].tempFilePath,
      name: 'file',
      header: {
        Authorization: 'Bearer ' + getApp().token?.token,
      },
      success: (res) => {
        console.log(res)
        if (res.statusCode === 413) {
          return wx.utils.toast('上传文件过大,请重新上传')
        }
        const data = JSON.parse(res.data)
        // 检测接口是否调用成功
        if (data.code !== 10000) return wx.utils.toast('上传数据失败!')
        this.setData({
          [type]: data.data.url,
        })
      },
      fail: (err) => {
        return Promise.reject(new Error(err.errMsg))
      },
      complete: () => {},
    })
  },

  onLoad({ point, building, item, id }) {
    if (id) {
      this.getHouseDetail(id)
      wx.setNavigationBarTitle({
        title: '编辑房屋信息',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '添加房屋信息',
      })
      this.setData({
        point,
        building,
        room: item,
      })
    }
  },

  async getHouseDetail(id) {
    const data = await wx.http.get('/room/' + id)
    console.log('获取房屋详情成功', data)
    this.setData({
      ...data,
    })
  },
})
