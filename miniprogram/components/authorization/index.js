// components/authorization/index.js
const appInst = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false,
  },

  lifetimes: {
    attached() {
      const isLogin = !!appInst.token
      this.setData({
        isLogin,
      })

      const pages = getCurrentPages()
      // const curPage = pages[pages.length - 1]
      const curPage = pages.pop()

      if (!isLogin) {
        // 使用空白函数覆盖原生的生命周期 onLoad onShow
        curPage.onLoad = () => {}
        curPage.onShow = () => {}
        wx.redirectTo({
          url: '/pages/login/index?redirectURL=/' + curPage.route,
        })
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {},
})
