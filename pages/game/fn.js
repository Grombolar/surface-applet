var _util = require('../../utils/util.js');
//获取抽奖列表项和规则
function getGameInfo(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode) {
      var data=res.data;
      //游戏规则
      var rule=[];
      for (let key in res.rule){
        rule.push(res.rule[key])
      }
      that.setData({
        lucyList: data.reverse(),
        myIntegral: that.myIntegral,
        rule: rule
      })
      that.consume=res.consume
    }

  }, (err) => {
    wx.hideLoading()
    }, 'lucky/index', undefined, undefined)
}
//开始抽奖
function startLucy(that,cb,fail){
  var sendData={
    member_id:that.uid
  }
  _util.Ajax(sendData, (res) => {
    if (res.encode>0) {
      //执行回调函数 cb(pos, res.integral)
      cb(parseInt(res.lucky_id), res.integral)
    }
    else
    {
      fail(res.msg)
    }

  }, (err) => {
    wx.hideLoading()
    }, 'lucky/roll', undefined, undefined)
}
//判断转盘停止在哪个位置
function stopPos(lucyList,lucky_id){
  for (let i = 0; i < lucyList.length;i++){
    if (lucky_id == lucyList[i].id)
      {
        return (i+1)
      }
  }
}
module.exports = {
  getGameInfo,
  startLucy
};