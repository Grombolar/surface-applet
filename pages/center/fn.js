var _util = require('../../utils/util.js')
//引入配置文件
var config = require('../../config.js')
//获取我的订单和经销商管理员的数量
function getNumber(userId, that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    member_id: userId
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode) {
      var data = res.data
      that.setData(data)
    }

  }, (err) => {
    wx.hideLoading()
  }, 'member/my-center')
}

//修改导航位置
function setNavBar(index, navBar) {
  for (let i = 0; i < navBar.length; i++) {
    if (navBar[i].index == index) {
      navBar[i].selected = true
    }
    else {
      navBar[i].selected = false
    }
  }
  return navBar
}

module.exports = {
  getNumber,
  setNavBar
};