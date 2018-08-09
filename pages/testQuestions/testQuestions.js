// testQuestions.js
var _fn=require('./fn.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testList:null,//测试题信息
    imgUrl: app.globalData.imgUrl,
    hiddenPage:true,
    testname:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取标题信息
    let title=options.title;
    let month = options.month;//考试月份
    let testname = options.testname;//考试题目
    let examstatus = options.examstatus;//考试类型
    if (testname == '' || testname == null || testname == undefined)
    {
      testname=null
    }
    this.setData({
      testname,
      examstatus
    })
    wx.setNavigationBarTitle({
      title: `${month + title}`
    })
    this.uid = app.globalData.uid;
   
    //测试题id 
    this.tid=options.id;
    //获取试题类型 0未开始考试1通过2未通过
    this.teststatus = parseInt(options.teststatus);
    //获取上一页面导航id
    this.nid = options.nid;
    //获取测试题库
    if (this.teststatus==0)
    {
      _fn.getTest(this.tid, this)
    }
    else
    {
      _fn.getAnswerDetail(this.tid, this)
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
   
  onShareAppMessage: function () {
  
  },*/
  //单选
  radioChange:function(e){
    if (this.teststatus != 0) {
      return
    }
    var qid = e.currentTarget.id;//问题题目id
    var aid = e.detail.value;//选择答案id
    _fn.radioSelect(qid, this.data.testList, aid, this)
  },
  //多选
  checkboxChange:function(e){
    if (this.teststatus != 0)
    {
        return 
    }
    var qid = e.currentTarget.id;
    var aidArr = e.detail.value;
    _fn.radioSelect(qid, this.data.testList, aidArr, this)

  },
  //提交
  formSubmit:function(e){

    //获取总共有多少题
    this.total = this.data.testList.length;
    let list = e.detail.value;
    //判断是否全部答题
    let isOk=_fn.checkUser(list);

    if(isOk){
      wx.showToast({
        title: `${isOk}道题未答`,
        image: '../../images/answer.png',
        mask: true
      })
      return 
    }
    _fn.submitAnswer(e.detail.value,this);
    //储存导航id
    wx.setStorage({
      key: 'barid',
      data: this.nid
    })
  }
})