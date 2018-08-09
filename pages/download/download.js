// pages/download/download.js
//引入配置文件
var _util = require('../../utils/util.js')
var config = require('../../config.js')
var app = getApp();
var _fn = require('./fn.js');
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
    //获取用户id
    this.uid = app.globalData.uid;
    //获取用户邮件
    this.email = app.globalData.email;
    //获取经销员姓名
    this.username = app.globalData.username;
    //获取经销商的名字
    this.company = app.globalData.company;

    //获取状态0：查看，1：下载
    let type = parseInt(options.type);
    if(type == 0){
      let dowUrl = decodeURIComponent(options.dowUrl)
      _fn.viewPDFFile(dowUrl)
    }else if( type == 1){
      let dowId = parseInt(options.dowId);
      //发送邮件
      this.sendEmailPDF(dowId);
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
  
  },
  //发送邮件
  sendEmailPDF: function (docId) {
    if (this.email == '') {
      wx.showToast({
        title: '没有填写邮箱!',
        image: '../../images/notice.png',
        mask: true,
        duration:2000,
        complete:function(){
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },2000)
          
        }
      })
      return
    }
    _fn.sendEmail(docId, this)
  }
})