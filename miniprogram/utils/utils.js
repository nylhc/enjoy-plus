// utils/utils.js
const utils = {
  /**
   * 用户消息反馈
   * @param {string} title 文字提示的内容
   */
  toast(title = '数据加载失败...', icon = 'none') {
    wx.showToast({
      title,
      mask: false,
      icon,
    })
  },
  formartDate(time) {
    const date = new Date(time)
    const yyyy = date.getFullYear()
    const MM = (date.getMonth() + 1).toString().padStart(2, '0')
    const DD = date.getDate().toString().padStart(2, '0')
    // return `${yyyy}-${MM}-${DD}`
    return [yyyy, MM, DD].join('-')
  },
}
// 挂载到全局对象 wx
wx.utils = utils
// 模块导出
export default utils
