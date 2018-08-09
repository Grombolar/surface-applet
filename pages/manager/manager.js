// manager.js
var _fn=require('./fn.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    auditingList:[],//审核列表
    imgUrl: app.globalData.imgUrl,
    noPage:true,
    showToast: false//默认为隐藏提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loaderTotal=true;
    //获取审核状态
    this.filter = options.filter == undefined ? 0: options.filter;
    //获取用户名
    this.uid = app.globalData.uid;
    //默认为第一页
    this.pagenum=1;
    //设置一次加载10条
    this.pagesize=20;
    //默认为可以下拉
    this.canscroll=true;
    this.setData({
      auditingList:[]
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
    //获取审核列表
    _fn.getManagerList(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //重置查询页为第一页
    this.pagenum = 1;
    this.setData({
      auditingList:[]
    })
    this.loaderTotal = true;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //重置查询页为第一页
    this.pagenum = 1;
    this.setData({
      auditingList: []
    })
    this.loaderTotal = true;
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
    //下拉时pagenum++
    this.pagenum+=1;

    if (!this.canscroll)
    {
      return
    }
    this.canscroll=false;
    _fn.getManagerList(this);
  },

  /**
   * 用户点击右上角分享
   
  onShareAppMessage: function () {
  
  },*/
  //跳转至详细
  toManageDetail:function(e){
    //获取跳转地址
    var url = e.currentTarget.dataset.url;

    wx.navigateTo({
      url: url 
    })
  }
})