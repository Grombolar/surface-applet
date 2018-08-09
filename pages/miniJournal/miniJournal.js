// pages/miniJournal/miniJournal.js
var app=getApp();
var _fn=require('./fn.js');
var _util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: null,//导航
    journalNav: [{ jtype: '', btnname: '全部', selected:true}],//mini刊导航
    journalList:[],//mini刊列表
    imgUrl: app.globalData.imgUrl
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    //获取mini刊导航
   // _fn.getJournalNav(this,()=>{
    //  _fn.getJournalList('all',this)
   // })
    //获取用户id
    this.uid = app.globalData.uid;
    //默认为第一页
    this.pagenum=1;
    //一次加载多少条信息
    this.pageSize=20;
    //默认筛选条件
    this.categoryid='';
    //获取mini刊列表
    _fn.getMiniJourInfo(this.uid, this.pagenum, this.pageSize,this.categoryid,false,this)
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
    this.canScroll=true;//默认为可以滚动
    //修改导航
    _util.upDateNav(3, app.globalData.tabbar, app)
    this.setData({
      tabbar: app.globalData.tabbar
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
  
  }, */
  //滚动分页
  scrollBottom:function(){
    if (!this.canScroll)
    {
      return 
    }
    this.canScroll=false;
    this.pagenum += 1;
    //获取mini刊列表
    _fn.getMiniJourInfo(this.uid, this.pagenum, this.pageSize, this.categoryid, true, this)
  },
  //mini刊导航
  selectNav:function(e){
    var id=e.currentTarget.id;
    var journalNav = this.data.journalNav;
    this.pagenum = 1;
    this.setData({
      journalList:[]
    });
    for (let i = 0; i < journalNav.length;i++){
      if (journalNav[i].jtype==id)
      {
        journalNav[i].selected=true;
        this.pagenum=1;
        this.categoryid = id;
        //获取mini刊列表
        _fn.getMiniJourInfo(this.uid, this.pagenum, this.pageSize, this.categoryid, true, this)
      }
      else
      {
        journalNav[i].selected = false;
      }
    }
    this.setData({
      journalNav
    })
  },
  //导航选择
  selectBar: function (e) {
    app.selectTabbar(this.data.tabbar, e.currentTarget.id);
    this.setData({
      tabbar: this.data.tabbar
    })
  }
})