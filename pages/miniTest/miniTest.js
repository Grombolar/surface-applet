// pages/miniTest/miniTest.js
var app = getApp();
var _fn=require('./fn.js');
var _util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: null,//导航
    temp:'number_one_scholar',//默认使用状元考模板
    navBar:null,//导航条
    tempData:null,//模板数据
    showToast: false//默认为隐藏提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化导航
    this.navBar = [
      {
        day:'状元榜',
        id:'zyk',
        selected:true
      },
      {
        day: '考试规则',
        id: 'rule',
        selected: false
      },
      {
        day: '错题本',
        id: 'wnote',
        selected: false
      }
      ]
 
    //获取用户id
    this.uid = app.globalData.uid;
    //第一页
    this.pagenum=1;
    //一次加载20个
    this.pagesize=20;
    //默认为不可分页
    this.page=false;
    //默认为可以滑动时加载更多
    this.canScroll=true
    //默认导航为状元榜
   // this.nid ='zyk';
    //获取mini考导航
    _fn.getMiniTestNav(this);
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
    try{
      var nid=wx.getStorageSync('barid');
      if(nid)
      {
        //设置是否为分页
        this.page = false;                
        _fn.getNavList(nid, this.uid, this);
        wx.removeStorage({
          key: 'barid',
          success: function(res) {},
        })
      }
    }
    catch(e)
    {

    }
    //修改导航
    _util.upDateNav(2, app.globalData.tabbar, app)
    this.setData({
      tabbar: app.globalData.tabbar
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.canScroll = true;
   
    this.pagenum = 1;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.canScroll = true;
    
    this.pagenum = 1;
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
  //加载更多
  scrollLoadMore:function(){
    //this.canScroll 
    if (!this.canScroll || this.nid == 'zyk' || this.nid == 'rule' || this.nid == 'wnote'){

      return 
    }
    //设置为分页
    this.page=true;
    this.canScroll=false;
    //设置是否为分页
    this.pagenum += 1;
    _fn.getNavList(this.nid, this.uid, this);
  },
  //navBar选择
  selectNabBar:function(e){
    var id=e.currentTarget.dataset.id;
    //设置全局加载更多
    this.nid=id;
    //储存导航id
    wx.setStorage({
      key: 'barid',
      data: id,
    })
    //设置是否为分页
    this.page = false;
    this.pagenum = 1;
    _fn.getNavList(id,this.uid,this);  
  },
  //导航选择
  selectBar: function (e) {
    app.selectTabbar(this.data.tabbar, e.currentTarget.id);
    this.setData({
      tabbar: this.data.tabbar
    })
  }
})