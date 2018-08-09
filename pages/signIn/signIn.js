// signIn.js
var app=getApp();
var _fn=require('./fn.js');
var TimeAni = require('../../utils/timeAnimation.js');
var _util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signInfo:null,
    imgUrl: app.globalData.imgUrl,
    hiddenPage:true,//默认为隐藏
    padding:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.uid = app.globalData.uid;

    var that = this;

    _util.getUserPowerNew('scope.userInfo', true, () => {
      app.getUserInfo(null, (res) => {
        //获取用户id
        that.uid = res.userId;
      //获取用户签到
        _fn.getSignInfo(that.uid, that);
        if (app.globalData.sysInfo.model.indexOf('iPhone') == -1) {
          that.setData({
            padding: true
          })
        }
      });
    }, () => {

    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   
  onShareAppMessage: function () {
  
  },*/
  //用户签到
  toSignIn:function(){
    if (this.data.signInfo.todaysign)
    {
      return 
    }
    if(this.uid!='')
    {
      //获取更改之前的积分
      var nowIntegral = this.data.myIntegral;
      _fn.signIn(this.uid, this, (res)=>{
        app.globalData.myIntegral = res;
        var ta = new TimeAni.TimeAnimation(nowIntegral, res, this);
        ta.init((increase) => {
          this.setData({
            myIntegral: Math.round(increase)
          });
        })
      
      })
    }
  }
})