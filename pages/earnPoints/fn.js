var _util=require('../../utils/util.js');
//根据用户id获取用户赚取积分情况
function getUserIntegral(uid,that)
{
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData={
    member_id:uid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode) {
      var data = res.data;
      that.setData({
        sign: data.sign,
        answer: data.answer,
        lucky: data.lucky,
        hiddenPage: false
      })
    }

  }, (err) => {
    wx.hideLoading()
    }, 'integral/index', undefined, undefined)
}
module.exports = {
  getUserIntegral
};