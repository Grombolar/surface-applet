// giftDetail.js
var app=getApp();
var _fn=require('./fn.js');
var _util=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    giftDetail: '',
    giftDetailData:null,
    giftbase:null,
    imgUrl: app.globalData.imgUrl,
    animationData: {},//动画对象
    showMask:false,//遮罩层默认为隐藏
    total: 1,//购买数量，默认为1
    cardInfo: null,
    address: null,//地址信息,
    hiddenHeader:false,
    disabledBtn:false,//默认为可以兑换
    showPages:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户id
    this.uid = app.globalData.uid;
    //获取礼品id
    this.gid=options.id;
    //获取礼品类别
    this.gifttype = options.gifttype;
    //获取礼品详情
    _fn.getGiftDetail(this.gid,this);
    //实例动画
    this.animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 100,
      timingFunction: "linear",
      delay: 0
    })
    this.app = app;
    this.screenHeight = app.globalData.screenHeight;
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
   
    //this.hideAddress()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.hideAddress()
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
  //弹出立即兑换页面
  toExchangePage:function(e){
    //不可点击兑换
    if (e.currentTarget.id == 'false') {
      return
    }
    /*
    wx.navigateTo({
      url: "../exchangeGift/exchangeGift?id=" + this.gid,
    })*/
    //获取用户默认地址信息
    _fn.getDefaultAddress(this);
    //获取可以兑换的信息
    _fn.getGiftOtherDetail(this)
    //显示确认兑换信息
    
     var h = this.screenHeight*0.17
  
      this.animation.opacity(1).step({ duration: 1 }).bottom(0).step();
     
    setTimeout(()=>{
      //渲染页面
      this.setData({
        animationData: this.animation.export(),
        showMask: true
      })
    },700)
   
  },
  //隐藏地址
  hideAddress:function(){
    this.animation.bottom(-460).step().opacity(0).step({ duration: 1 });
    this.setData({
      animationData: this.animation.export(),
      showMask: false
    })
  },
  //添加地址
  addAddress:function () {
    _fn.getUserPower('scope.address', () => {
      wx.chooseAddress({
        success: (res) => {
          //储存地址
          wx.setStorage({
            key: 'address',
            data: res
          });
          //刷新页面
          this.setData({
            address: res
          })
          //获取用户地址
          this.address = res;
        }
      })
    })
  },
  //修改购买数量
  updateTotal:function (e) {
    //按钮类型
    var types = e.currentTarget.dataset.type;
    //还剩下可以兑换的数
    this.stock = parseInt(e.currentTarget.id);
    _fn.updateGiftTotal(types, this);
  },
  //确认兑换
  confirmExchange:function (e) {

    //不可点击兑换
    if (e.currentTarget.id=='false')
    {
      return 
    }

    //判断是否添加地址且不为礼券2
    if (!this.address&&this.type!='2') {
      wx.showToast({
        title: '请填写收货地址',
        image: '../../images/notice_2.png',
        mask: true
      })
      return
    }
    else 
    {
      _fn.exchangeGift(this.gid, this.uid, this)
    }

  }
})