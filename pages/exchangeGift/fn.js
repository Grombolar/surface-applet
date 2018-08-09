var _util = require('../../utils/util.js');
//获取本地默认地址
function getDefaultAddress(that)
{
  wx.getStorage({
    key: 'address',
    success: function(res) {
      that.address = res.data;
      that.setData({
        address:res.data
      })
    },
    fail:()=>{
      that.address = null;
      that.setData({
        address: null
      })
    }
  })
}
//获取礼品详情信息
function getGiftDetail(gid,that){
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData={
    good_id:gid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();

    var scrollwidth = 0;
    if (res.encode==0) {
      var data=res.data;
  
      that.setData({
        giftDetail:data,
        warning: parseInt(data.type),
        stock: parseInt(data.stock),
      })
    }

  }, (err) => {
    wx.hideLoading()
    }, 'good/buy', undefined, undefined)
}
//兑换礼品
function exchangeGift(gid,uid,that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = that.address;
  sendData.good_id = gid;
  sendData.num=that.data.total;
  sendData.member_id = uid;
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();

    if (res.encode) {
      //修改全局我的积分
      that.app.globalData.myIntegral = res.integral;
      var data = res.data;
      if (data.warning)//1为实物
      {
        that.setData({
          warning: data.warning,
          showFlag: false
        })
      }
      else//0为礼券
      {
        try
        { 
          var cardId = JSON.parse(data.cardinfo.cardid);
        }
        catch(e)
        {
          var cardId=[];
        }
        var cardInfo=[];
        //cardId为数组且非空
        if (Array.isArray(cardId) && cardId.length)
        { 

          for (let i = 0; i < cardId.length;i++){
            cardInfo.push({
              cardid: cardId[i],
              cardname: data.cardinfo.cardname,
              cardvalue: data.cardinfo.cardvalue
            })
          }
        }
        
        that.setData({
          warning: data.warning,
          cardInfo: cardInfo,
          showFlag: false
        })
      }
    }
    else//积分不足
    {
      wx.showToast({
        title: res.msg,
        image:'../../images/notice.png',
        mask:true,
        duration:2000
      })
      
    }

  }, (err) => {
    wx.hideLoading()
    }, 'good/pay', undefined, undefined)
}
//修改礼品数量
function updateGiftTotal(types,that){
  var total = that.data.total;
  if (types == 'reduce') {
      if(total>1)
      {
        total--
      }
  }
  else
  {
    //兑换数量不能超过剩余的数两
    if (total>=that.stock)
    {
      wx.showToast({
        title: '超过库存',
        image: '../../images/notice.png',
        mask: true
      })
      return 
    }
    total++
  }
  that.setData({
    total
  })
}
//地址授权
function getUserPower(auth,cb){
  //获取用户的当前设置。
  wx.getSetting({
    success(res) {
      //判断当前用户设置是否为真
      if (!res.authSetting[auth]) {//不为真
        //提前向用户发起授权请求
        wx.authorize({
          scope: auth,
          success() {//用户勾选了直接执行回调
            cb()
          },
          fail() {
            //调起客户端小程序设置界面，返回用户设置的操作结果。
            wx.openSetting({
              success: (res) => {
                //选择
                if (res.authSetting[auth]){
                      cb()
                }
                else //未选择
                {

                }
              }
            })
          }
        })
      }
      else//如果为真，则执行
      {
        cb()
      }
    }
  })
}
module.exports = {
  exchangeGift,
  getDefaultAddress,
  getGiftDetail,
  updateGiftTotal,
  getUserPower
};