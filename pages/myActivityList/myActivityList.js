// pages/myActivityList/myActivityList.js
var _fn = require('./fn.js');
var _util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: false
    })
    this.loaderTotal = true;
    //获取用户id
    this.uid = app.globalData.uid;
    //获取当前时间戳（到分钟）
    this.nowDate = parseInt(Date.parse(new Date()).toString().substring(0, 10));
    // start_time = _util.formatTime(new Date(Number(data.start_time) * 1000), '-', true);
    // end_time = _util.formatTime(new Date(Number(data.end_time) * 1000), '-', true);

    // if (start_time.substring(0, 10) === end_time.substring(0, 10)) {
    //   data.end_time = end_time.substring(11, end_time.length);
    // }
    _fn.getActivityList(this)
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
   */
  onShareAppMessage: function () {

  }
})