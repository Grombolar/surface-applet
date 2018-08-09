// exchangeGift.js
var app=getApp();
var _fn=require('./fn.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag:true,
    warning:1,
    address:null,
    giftDetail:null,//礼品详情信息
    total:1,//购买数量，默认为1
    cardInfo:null,
    imgUrl: app.globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    //获取礼品id
    this.gid=options.id;
    //获取用户id
    this.uid = app.globalData.uid;
    //获取用户默认地址信息
    _fn.getDefaultAddress(this)
    //获取礼品详情
    _fn.getGiftDetail(this.gid,this);
    this.app=app;
    */
    //显示成功
    try {
      var value = wx.getStorageSync('exchangeResult')
      if (value) {
        this.setData(value)
      }
    } catch (e) {
      // Do something when catch error
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
  //添加地址
  addAddress:function(){
    _fn.getUserPower('scope.address',()=>{
      wx.chooseAddress({
        success:  (res)=>{
          //储存地址
          wx.setStorage({
            key: 'address',
            data: res
          });
          //刷新页面
          this.setData({
            address:res
          })
          //获取用户地址
          this.address=res;
        }
        })
    })
  },
  //修改购买数量
  updateTotal:function(e){
    //按钮类型
    var types = e.currentTarget.dataset.type;
    //还剩下可以兑换的数
    this.stock=parseInt(e.currentTarget.id);
    _fn.updateGiftTotal(types, this);
  },
  //确认兑换
  confirmExchange:function(){
   
    if (!this.address)
    {
      wx.showToast({
        title: '请填写收货地址',
        image: '../../images/notice.png',
        mask: true
      })
      return 
    }
    else
    {
      _fn.exchangeGift(this.gid,this.uid,this)
    }
    
  }
})