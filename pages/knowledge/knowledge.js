// pages/knowledge/knowledge.js
var _util = require('../../utils/util.js');
var app = getApp();
var _fn = require('./fn.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleContent: '',
    top: 40,
    articleDetail: null,
    video_url: '',
    company: '',
    showPages: false,
    show_video:false
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
    _fn.getArticleDetail(this.uid, this.jid, this)

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
  //查看pdf文件
  viewPDF: function (e) {
    var downsrc = e.currentTarget.dataset.href.slice(1);
    _fn.viewPDFFile(downsrc)
  },
  //发送邮件
  sendEmailPDF: function (e) {
    if (this.email == '') {
      wx.showToast({
        title: '没有填写邮箱!',
        image: '../../images/notice.png',
        mask: true
      })
      return
    }
    var docId = e.currentTarget.id;
    _fn.sendEmail(docId, this)
  },



  showVideo:function(){
    var isShow = this.data.show_video;
    this.setData({
      show_video:!isShow
    });
  }
})