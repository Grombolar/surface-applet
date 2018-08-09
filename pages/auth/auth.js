// pages/auth/auth.js
var app = getApp();
var _util = require('../../utils/util.js');
var _fn=require('./fn.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scene = decodeURIComponent(options.scene);

    if (String(scene).indexOf('ae-') != -1 ){
      this.isAe = true;      //判断是否为 ae印证 ，默认为否
      this.get_id = scene.substring(3,scene.length);
    }else{
      this.isAe = false;
      this.get_id = scene;
    }
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
    _util.getUserPowerNew('scope.userInfo', true, () => {
      wx.showLoading({
        title: '正在登录...',
      })
      app.getUserInfo(null, (res) => {
        wx.hideLoading();
        this.uid = res.userId;
        if( this.isAe ){
          _fn.authAe(this);
        }else{
          _fn.authUser(this);
        }
        this.setData({
          show:true
        })
      });
    }, () => {
     
    })
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
  
  }*/
})