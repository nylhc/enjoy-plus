import validate from 'wechat-validate'
const appInst = getApp()

Page({
  data: {
    countDownVisible: false,
    mobile: '15037775766',
    code: '',
  },

  onLoad({ redirectURL, ...queryObj }) {
    console.log(redirectURL, queryObj)
    this.redirectURL = redirectURL
    this.query = queryObj
  },

  behaviors: [validate],
  // 定义表单数据的验证规则
  rules: {
    mobile: [
      {
        required: true,
        message: '请填写手机号码!',
      },
      {
        pattern: /^1[3-8]\d{9}$/,
        message: '请检查手机号码是否正确!',
      },
    ],
    code: [
      {
        required: true,
        message: '请填写短信验证码!',
      },
      {
        pattern: /^\d{6}$/,
        message: '请检查短信验证码是否正确!',
      },
    ],
  },

  async onCode() {
    const res = this.validate('mobile')
    console.log(res)
    if (!res.valid) {
      return wx.utils.toast(res.message)
    }
    // 点击后启用倒计时组件
    this.setData({
      countDownVisible: true,
    })
    const code = await wx.http.get('/code', {
      mobile: this.data.mobile,
    })
    console.log(code)
  },

  onFinish() {
    this.setData({
      countDownVisible: false,
    })
  },

  async onSubmit() {
    const res = this.validate()
    console.log(res)
    if (!res) return
    const token = await wx.http.post('/login', {
      mobile: this.data.mobile,
      code: this.data.code,
    })
    console.log('登录成功', token)
    appInst.setToken(token)

    // 重定向只针对非tabbar页面
    if (this.redirectURL) {
      wx.switchTab({
        url: this.redirectURL,
        fail: () => {
          const query = Object.keys(this.query)
            .map((key) => `${key}=${this.query[key]}`)
            .join('&')
          wx.redirectTo({
            url: `${this.redirectURL}?${query}`,
          })
        },
      })
    }
  },
})
