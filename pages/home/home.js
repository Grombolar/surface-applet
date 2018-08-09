// pages/home/home.js
var app = getApp();
//引入fn
var _fn=require('fn.js');
var _util=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:null,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular:true,
    scrollwidth:0,
    indicatorColor:'rgba(0, 0, 0, .4)',
    indicatorActiveColor:'#fff',
    hotgifts:null,//热门
    recommend:null,//推荐
    tabbar: null,//导航
    showPages:false,
    isAE:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.uid = app.globalData.uid;

    //设置导航条
    this.setData({
      tabbar: app.globalData.tabbar,
      imgUrl: app.globalData.imgUrl
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.startWifi({
    //   success: function (res) {
    //     // wx.getWifiList({
    //     //   success:function(result){
    //     //     console.log("成功");
    //     //     console.log(result)
    //     //   }
    //     // })

    //     wx.onGetWifiList(function (result) {
    //         console.log("成功");
    //         console.log(JSON.stringify(result))
    //     })
    //     wx.getWifiList()
    //   },
    //   fail: function (res) {
    //     console.log("失败");
    //     console.log(res.errMsg)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var status=app.globalData.status;//是否申请经销员
    var power =app.globalData.power;//用户权限
    wx.showLoading({
      title: '加载中...',
    })
    //判断用户授权
    _util.getUserPowerNew('scope.userInfo', true, () => {

      app.getUserInfo(null, (res) => {

        wx.showLoading({
          title: '正在登录...',
        })
        //获取用户id
        this.uid = res.userId;
        //获取首页相关信息
        _fn.getIndexInfo(this.uid, this);
        if (res.type <= 0) {//普通用户
          //获取导航条
          _util.upDateNav(0, app.globalData.tab_b, app)
        }
        else if (res.type <= 2) {//经销员or管理员

          _util.upDateNav(0, app.globalData.tab_a, app)
        }
        else if (res.type == 3) {

          _util.upDateNav(0, app.globalData.tab_c, app)
          _fn.getIndexExam(this);
          _fn.getTopExam(this);

          this.setData({
            isAE: true
          })

        }
        //渲染导航条
        this.setData({
          tabbar: app.globalData.tabbar
        })
      });
    }, () => {
      //加载首页信息
      _fn.getIndexInfo(this.uid, this);
    })
  
    _util.upDateNav(0, app.globalData.tabbar, app)
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
   
  onPullDownRefresh: function () {
  
  },*/

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
  //跳转到每日签到页面或如何赚取积分页面
  toNavPage:function(e){
    var url = e.currentTarget.dataset.url;
    if (this.uid=='')
    {
      return 
    }
    wx.navigateTo({
      url: url
    })
  },
  //跳转至全部礼品
  toAllGifts:function(){
    // app.selectTabbar(this.data.tabbar, '1');
    wx.navigateTo({
      url: '../allGifts/allGifts',
    })
  },
  //跳转到详细
  navGiftDetail:function(e){
    //获取礼品id
    var toUrl = e.currentTarget.dataset.url;;
    //跳转礼品详情
    wx.navigateTo({
      // url: `../giftDetail/giftDetail?id=${gid}`,
      url: toUrl
    })
  },
  //提示框
  alert:function(){
    wx.showModal({
      title: '',
      content: '近期上线，敬请期待',
      showCancel:false
    })
  },
  //导航选择
  selectBar: function (e) {
    app.selectTabbar(this.data.tabbar, e.currentTarget.id);
    this.setData({
      tabbar:this.data.tabbar
    })
  },
  //通过邮件获取PDF文件
  getPDF: function () {
    wx.showLoading({
      title: '请等待...',
      mask: true
    })
    _fn.sendLastPDF(this.uid, this);
  }
})