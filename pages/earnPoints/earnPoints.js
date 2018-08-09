// earnPoints.js
var app=getApp();
var _fn=require('./fn.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sign:null,
    answer:null,
    lucky:null,
    isShow:false,//是否显示答题
    hiddenPage:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //获取用户id
    this.uid = app.globalData.uid;
    //获取用户权限
    this.power = app.globalData.power;
    //获取用户是否认证
    this.status = app.globalData.status;
    if (this.power == 2 || this.status==1)
    {
      var game=false;//隐藏
      if(options.game=='true')
      {
        game = true;//显示
      }
      else
      {
        game = false;//隐藏
      }
      this.setData({
        isShow:true,
        game: game
      })
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
    if (this.uid!='')
    {
      //获取用户获取积分情况
      _fn.getUserIntegral(this.uid, this)
    }
    
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
  
  }*/
})