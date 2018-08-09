var _util = require('../../utils/util.js');
//获取礼品详情
function getGiftDetail(gid,that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData={
    good_id:gid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    //更新页面
    if (res.encode==0) {
     var data=res.data;
     var reg = /<img/g;
      var restring = '*img style="width:100%; vertical-align:bottom;"'
      data.detail = _util.richTextImg(reg, data.detail, restring);
      reg = /\*/g;
      data.detail = _util.richTextImg(reg, data.detail, '<');
      data.img_url = that.data.imgUrl+data.img_url
      that.setData({
        giftDetailData: data,
        giftbase: data.base.length==0?0:data.base,
        disabledBtn: parseInt(data.stock) ? true : false,
        showPages:true
      })
    }

  }, (err) => {
    wx.hideLoading()
    }, 'good/detail', undefined, undefined)
}
//地址授权
function getUserPower(auth, cb) {
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
                if (res.authSetting[auth]) {
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
//获取本地默认地址
function getDefaultAddress(that) {
  wx.getStorage({
    key: 'address',
    success: function (res) {
      that.address = res.data;
      that.setData({
        address: res.data
      })
    },
    fail: () => {
      that.address = null;
      that.setData({
        address: null
      })
    }
  })
}
//兑换礼品
function exchangeGift(gid, uid, that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = that.address||{};
  sendData.good_id = gid;
  sendData.num = that.data.total;
  sendData.member_id = uid;
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();

    if (res.encode) {
      //修改全局我的积分
      that.app.globalData.myIntegral = res.integral;
      //兑换结果
      var exchangeResult=null;
      var data = res.data;
      if (data.warning)//1为实物
      {

        exchangeResult = {
            warning: data.warning,
            showFlag: false
          }
      }
      else//0为礼券
      {
        try {
          var cardId = JSON.parse(data.cardinfo.cardid);
        }
        catch (e) {
          var cardId = [];
        }
        var cardInfo = [];
        //cardId为数组且非空
        if (Array.isArray(cardId) && cardId.length) {

          for (let i = 0; i < cardId.length; i++) {
            cardInfo.push({
              cardid: cardId[i],
              cardname: data.cardinfo.cardname,
              cardvalue: data.cardinfo.cardvalue
            })
          }
        }
        exchangeResult = {
          warning: data.warning,
          cardInfo: cardInfo,
          showFlag: false
        }
      }
      wx.setStorage({
        key: 'exchangeResult',
        data: exchangeResult,
        success: () => {
          wx.navigateTo({
            url: "../exchangeGift/exchangeGift",
          })
        }
      })
    }
    else//积分不足
    {
      if (res.msg =='库存不足')
      {
        wx.showToast({
          title: res.msg||'',
          image: '../../images/no_store.png',
          mask: true,
          duration: 2000
        })
      }
      else if (res.msg =='用户积分不足')//
      {
        wx.showToast({
          title: res.msg||'',
          image: '../../images/coin_1.png',
          mask: true,
          duration: 2000
        })
      }
      else
      {
        wx.showToast({
          title: res.msg||'',
          image: '../../images/no_ticket.png',//
          mask: true,
          duration: 2000
        })
      }
      

    }

  }, (err) => {
    wx.hideLoading()
  }, 'good/pay', undefined, undefined)
}
//修改礼品数量
function updateGiftTotal(types, that) {
  var total = that.data.total;
  if (types == 'reduce') {
    if (total > 1) {
      total--
    }
  }
  else {
    //兑换数量不能超过剩余的数两
    if (total >= that.stock) {
      wx.showToast({
        title: '库存不足',
        image: '../../images/no_store.png',
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
//获取礼品简单信息
function getGiftOtherDetail(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    good_id: that.gid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    //var res = res.getExchangeDetail;

    var scrollwidth = 0;
    var hiddenHeader=false;
    if (res.encode == 0) {
      var data = res.data;

      data.price = parseInt(data.price);
      //设置礼品类型
      that.type = data.type;
      //礼券
      if(data.type=='2')
      {
        hiddenHeader=true
      }
      that.setData({
        giftDetail: data,
        warning: parseInt(data.type),
        stock: parseInt(data.stock),
        hiddenHeader: hiddenHeader,
        total:1,
        disabledBtn: parseInt(data.stock) ? true : false
      })
    }

  }, (err) => {
    wx.hideLoading()
  }, 'good/buy', undefined, undefined)
}
module.exports = {
  getGiftDetail,
  getUserPower,
  getDefaultAddress,
  exchangeGift,
  updateGiftTotal,
  getGiftOtherDetail
};