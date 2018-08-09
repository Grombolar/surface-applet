// game.js
var app = getApp();
var _fn = require('./fn.js');
var TimeAni = require('../../utils/timeAnimation.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: null,
    lucyList: [],//积分列表
    myIntegral: 0,
    canStart:true,  //判断是否可以抽奖
    screenHeight: app.globalData.screenHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //用户id
    this.uid = app.globalData.uid;
    //默认角度为0
    this.deg = 0;
    //默认为可以开始抽奖
    this.startGameFlag = true;
    //创建动画实例
    this.animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 3000,
      timingFunction: "ease",
      delay: 0
    })
    //获取我的积分
    this.myIntegral = app.globalData.myIntegral;
    //获取抽奖列表
    _fn.getGameInfo(this);
    this.predeg = 0;
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
    // this.lastIntegal = this.data.myIntegral;
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
  //开始抽奖

  startGame: function () {
    if (!this.startGameFlag) {
      return
    }
    this.startGameFlag = false;
    //开始抽奖
    let startclick = null;
    startclick = _fn.startLucy(this, (pos, integal) => {
      //修改扣除后的积分
      var integral = this.data.myIntegral - this.consume;
      this.setData({
        myIntegral: integral
      })
      this.deg += 720 + (pos * 45);
      this.deg -= this.predeg;
      //储存上一个角度值
      this.predeg = pos * 45;
      var animation = this.animation;
      animation.rotate(this.deg - 22.5 + 360).step({ timingFunction: "ease" });
      //开始抽奖
      this.setData({
        animationData: animation.export(),
        canStart:false
      })

      let showMsg = null;

      showMsg = setTimeout(() => {
        let addIntegal = parseInt(integal) - parseInt(this.data.myIntegral);
        this.aniObj = new TimeAni.TimeAnimation(this.data.myIntegral, integal, this);
        let msg = '';
        let that = this;
        if (addIntegal <= 0) {
          msg = '很遗憾您没有中奖';

        } else {
          msg = '恭喜您获得' + addIntegal + '点积分！';
        }
        wx.showModal({
          title: msg,
          showCancel: false,
          success: function (res) {
            // that.lastIntegal = that.data.myIntegral;
            that.setData({
              canStart:true
            })
          }
        })
        this.aniObj.init((res) => {
          //渲染页面
          this.setData({
            myIntegral: Math.round(res)
          })
          //设置全局我的积分
          app.globalData.myIntegral = integal;
        });
        this.startGameFlag = true;
      }, 3000)
    }, (msg) => {
      this.startGameFlag = true;
      wx.showToast({
        title: msg,
        mask: true,
        image: '../../images/coin_1.png'
      })
    })


  }
})