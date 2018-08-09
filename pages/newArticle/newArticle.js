// pages/newArticle/newArticle.js
//引入配置文件
var _util = require('../../utils/util.js')
var config = require('../../config.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取文章id
    this.jid = options.id;
    //获取用户id
    this.uid = app.globalData.uid;
    //获取用户邮件
    this.email = app.globalData.email;
    //获取经销员姓名
    this.username = app.globalData.username;
    //获取经销商的名字
    this.company = app.globalData.company;
    //获取文章详情

    var source = config.url + 'news/detailv2?id=' + options.id + '&member_id=' + app.globalData.uid ;
    var that = this;

    this.setData({
      showUrl: source
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
})