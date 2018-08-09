// pages/searchPlayBook/searchPlayBook.js
var app = getApp();
var _fn = require('./fn.js');
var _util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultKeyWordList:[
      'Surface Pro',
      'Surface Studio',
      '产品',
      '解决方案',
      '金融业',
    ],
    searchList: [], //mini刊列表
    imgUrl: app.globalData.imgUrl,
    keyWords: '',
    isDefault:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户id
    this.uid = app.globalData.uid;
    //默认为第一页
    this.pagenum = 1;
    //一次加载多少条信息
    this.pageSize = 20;
    //默认筛选条件
    this.categoryid = '';
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

  // 搜索栏
  formSubmit: function (e) {
    this.setData({
      searchList: []
    })
    // let jType,secondId;
    let selectCatefory; //分为两级：搜索全部和搜索二级目录
    this.pagenum = 1;

    let keyWords = e.detail.value.keyWords;

    this.categoryid = selectCatefory;
    // _fn.getKnowledgeList(this.uid, this.pagenum, this.pageSize, this.categoryid, keyWords, this)
    _fn.getPlayBookList(keyWords,this);
  },

  //回车搜索
  enterSubmit: function (e) {
    let keyWords = e.detail.value;
    e.detail.value = {
      'keyWords': keyWords
    };
    this.formSubmit(e)
  },

  //选择默认搜索关键词
  searchDefault:function(e){
    //获取关键词索引
    let index = e.target.dataset.index;
    
    let defaultKeyWordList = this.data.defaultKeyWordList;

    let keyWord = defaultKeyWordList[index];

    let that = this;

    this.setData({
      keyWords: keyWord
    })
    
    _fn.getPlayBookList(keyWord, this);
    
  }

})