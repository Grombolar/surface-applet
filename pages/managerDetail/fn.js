var _util = require('../../utils/util.js');
//获取已申请或待申请人的基本信息
function getManageDetail(that,cb) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    member_id: that.uid,
    sales_id:that.sid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    // var res = res.indexInfo;
    if (res.encode==0) {
      cb(res.info)
    }

  }, (err) => {
    wx.hideLoading()
    }, 'member/sales-detail', undefined, undefined)
}
//申请通过
function doApplyPass(that){

  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    member_id: that.uid,
    sales_id: that.sid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    // var res = res.indexInfo;
    if (res.encode) {
      wx.navigateBack({
        delta:1
      })
    }

  }, (err) => {
    wx.hideLoading()
    }, 'member/agree', undefined, undefined)
}
//拒绝和移除
function refuseApplyAndRemove(that){
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    member_id: that.uid,
    sales_id: that.sid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    // var res = res.indexInfo;
    if (res.encode) {
      wx.navigateBack({
        delta: 1
      })
    }

  }, (err) => {
    wx.hideLoading()
    }, 'member/refuse', undefined, undefined)
}


module.exports = {
  getManageDetail,
  refuseApplyAndRemove,
  doApplyPass
};