// myOrder.js
var app=getApp();
var _fn=require('./fn.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterNav: [
      {
        btnname: '全部',
        filter: '',
        selected: true
      },
      {
        btnname: '礼券订单',
        filter: '2',
        selected: false
      },
      {
        btnname: '实物订单',
        filter: '1',
        selected: false
      }
    ],
    myOrder:[],
    imgUrl: app.globalData.imgUrl,
    noPage:true,
    showToast:false//默认为隐藏提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loaderTotal = true;
    //获取用户id
    this.uid=app.globalData.uid;
    //获取筛选条件
    this.filter = options.filter == undefined?'':options.filter;
    //设置默认为第一页
    this.pagenum=1;
    //设置请求数量
    this.pagesize=10;
    //根据筛选条件获取订单列表
    _fn.navFilter(this.filter, this)
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
    this.pagenum += 1;
    //根据筛选条件获取订单列表
    _fn.navFilter(this.filter, this)
  },

  /**
   * 用户点击右上角分享
  
  onShareAppMessage: function () {
  
  }, */
  //筛选导航
  navFilter:function(e){
    //获取筛选条件
    var filter=e.currentTarget.id;
    // console.log('ddd-->', filter)
    this.pagenum = 1;
   
    this.setData({
      myOrder:[],
      noPage: true
    })
    _fn.navFilter(filter, this);
  }
})