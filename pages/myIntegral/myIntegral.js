// myIntegral.js
var _fn=require('./fn.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoImg:null,//用户头像
    integral:0,//用户积分
    recordList:null,
    filterNav:[
      {
        btnname:'全部',
        filter:'',
        selected:true
      },
      {
        btnname: '获取记录',
        filter: '1',
        selected: false
      },
      {
        btnname: '消费记录',
        filter: '2',
        selected: false
      }
    ],
    noPage:true,
    showToast: false,//默认为隐藏提示
    imgUrl: app.globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loaderTotal = true;
    //获用户id
    this.uid = app.globalData.uid;
    //默认为全部
    this.filter='';
    //默认为第一页
    this.pagenum=1;
    //默认为5个数据
    this.pagesize=20;
    //默认为可以滚动
    this.canScroll=true;
    //用户id不为空
    if (this.uid!='')
    {//刷新页面
      this.setData({
        photoImg: app.globalData.userInfo.avatarUrl,//获取用户头像
        integral: app.globalData.myIntegral//获取用户积分
      })
    }
    
    //获取用户积分记录列表
    _fn.getIntegralRecord(this)
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
  //积分记录筛选
  filterButton:function(e){
    var filter=e.currentTarget.id;
    //默认为第一页
    this.pagenum = 1;
    this.setData({
      recordList:[],
      noPage: true
    })
    _fn.recordFilter(filter, this)
  },
  //滚动分页
  scrollPage:function(){
    if (!this.canScroll)
    {
      return 
    }
    this.canScroll=false;
    this.pagenum += 1;
    _fn.getIntegralRecord(this)
  }
})