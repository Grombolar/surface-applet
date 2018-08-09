// managerDetail.js
var app=getApp();
var _fn=require('./fn.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSalesperson:false,//是否为经销员
    isManager:false,//是否为管理者
    info:''//申请人信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取销售员类型
    this.filter = options.filter;
    //获取申请人id
    this.sid=options.id;
    //获取管理员id
    this.uid=app.globalData.uid;

    var isSalesperson=false
    var isManager=false
    if (this.filter == '2')//管理员
    {
      isSalesperson = false
      isManager = true
    }
    else if (this.filter == '1')//经销员
    {
      isSalesperson = false
      isManager = false
    }
    else if (this.filter == '0')//待审核
    {
      isSalesperson = true
      isManager = false
    }
    _fn.getManageDetail(this, (res)=>{
      this.setData({
        isSalesperson: isSalesperson,//是否为经销员
        isManager: isManager,//是否为管理者
        info:res
      })
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
  //申请通过member_id	sales_id
  applyPass:function(e){
    //获取经销员id
    this.sid = e.currentTarget.id;
    wx.showModal({
      title: '提示',
      content: '确认通过？',
      success: (res) => {
        if (res.confirm) {
          //调用函数
          _fn.doApplyPass(this)
        }
      }
      })
    
  },
  //拒绝和移除
  toRefuse:function(e){
    //获取经销员id
    this.sid=e.currentTarget.id;
    var types = e.currentTarget.dataset.type;
    this.types = types;
    if (types =='move')//移除
    {
        var node="确认要移除此经销员？"
    }
    else//拒绝
    {
        var node="确认拒绝？"
    }
    wx.showModal({
      title: '提示',
      content: node,
      success: (res)=> {
        if (res.confirm) {
          //调用函数
          _fn.refuseApplyAndRemove(this)
        }
      }
    })
    
  }
})