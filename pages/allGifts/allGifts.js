// pages/allGifts/allGifts.js
var app = getApp();
var _fn=require('./fn.js');
var _util = require('../../utils/util.js');
var _filterBtns = [
  {
    btnname: '全部',
    filter: 0,
    selected: true
  },
  {
    btnname: '小于我的积分',
    filter: 1,
    selected: false
  },
  {
    btnname: '500以下',
    filter: 2,
    selected: false
  },
  {
    btnname: '500~1000',
    filter: 3,
    selected: false
  },
  {
    btnname: '1000~3000',
    filter: 4,
    selected: false
  },
  {
    btnname: '3000以上',
    filter: 5,
    selected: false
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar:null,//导航按钮
    screenHeight: app.globalData.screenHeight,//获取屏幕高度
    filterBtn:null,//积分筛选按钮
    giftTypeBtn: [{ btnname: '全部', gtype: '', selected: true}],//礼品种类按钮
    myIntegral:0,//我的积分
    giftList:null,//礼品列表
    imgUrl: app.globalData.imgUrl,
    showToast: false, //默认为隐藏提示

    showNav:false  //普通用户显示导航
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户id
    this.uid = app.globalData.uid;
    //默认为第一页
    this.pagenum=1;
    //默认一页加载多少条数据
    this.pagesize=10;
    //按积分筛选按钮
    this.filterBar = [
      {
        btnname: '全部',
        filter: 0,
        selected: true
      },
      {
        btnname: '小于我的积分',
        filter: 1,
        selected: false
      },
      {
        btnname: '500以下',
        filter: 2,
        selected: false
      },
      {
        btnname: '500~1000',
        filter: 3,
        selected: false
      },
      {
        btnname: '1000~3000',
        filter: 4,
        selected: false
      },
      {
        btnname: '3000以上',
        filter: 5,
        selected: false
      }
    ]
    //默认显示全部
    this.cid='';
    //默认赛选条件为全部
    this.oid=0;
    //默认为可以滚动
    this.scollflag=true
   //获取礼品列表
    _fn.getGiftList(this.uid, this.pagenum, this.pagesize, this.cid, this.oid,false,this);

    if (app.globalData.tabbar.length <=3 ){
      this.setData({
        showNav:true
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
    let that = this;
    _util.getUserPowerNew('scope.userInfo', true, () => {
      app.getUserInfo(null, (res) => {
        //获取用户id
        this.uid = res.userId;
        //获取首页相关信息

        if (res.type <= 0) {//普通用户
          _util.upDateNav(1, app.globalData.tab_b, app);
          that.setData({
            showNav: true
          })
       
        }
        else if (res.type <= 2) {//经销员or管理员

          _util.upDateNav(1, app.globalData.tab_a, app)
         
        }
        else if (res.type == 3) {

          _util.upDateNav(1, app.globalData.tab_c, app)

        }

        this.setData({
          tabbar: app.globalData.tabbar
        })
      });
    }, () => {

    })
    //刷新页面
    this.setData({
      tabbar: app.globalData.tabbar,
      filterBtn: this.filterBar,
      myIntegral: app.globalData.myIntegral
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
  //礼品种类选择
  selectGiftType:function(e){
    var id = e.currentTarget.id;
    var gifttype = this.data.giftTypeBtn;
    for (let i = 0; i < gifttype.length;i++){
      if (gifttype[i].gtype==id)
      {
        gifttype[i].selected=true;
        //恢复积分赛选初始值
        _fn.integralDefaultBtn(this.filterBar,this);
        //清空礼品列表
        this.setData({
          giftList:null
        })
        //重置为第一页
        this.pagenum = 1;
        //初始化第一页
        this.pagenum=1;
        //设置礼品种类
        this.cid = id;
        //获取礼品列表
       // _fn.getGiftList('all', 'all', this)
        _fn.getGiftList(this.uid, this.pagenum, this.pagesize, this.cid, 0, true, this)
      }
      else
      {
        gifttype[i].selected = false
      }
    }
    this.setData({
      giftTypeBtn: gifttype,
      filterBtn: this.filterBar 
    })
  },
  //过滤条件选择
  selectFilter:function(e){
    var id=e.currentTarget.id;
    for (let i = 0; i < this.filterBar.length;i++){
      if(i==id)
      {
        this.filterBar[i].selected=true;
        //清空礼品列表
        this.setData({
          giftList: null
        })
        //重置为第一页
        this.pagenum=1;
        //设置赛选条件
        this.oid = this.filterBar[i];
        //获取礼品列表
        _fn.getGiftList(this.uid, this.pagenum, this.pagesize, this.cid, this.filterBar[i].filter, true, this)
      }
      else
      {
        this.filterBar[i].selected = false
      }
    }
    this.setData({
      filterBtn: this.filterBar
    })
  },
  //列表滚动到底部
  scrollTolower:function(){
    if (!this.scollflag)
    {
        return 
    }
    this.scollflag=false;
    this.pagenum+=1;
    _fn.getGiftList(this.uid, this.pagenum, this.pagesize, this.cid, this.oid, true, this)
  },
  //导航选择
  selectBar: function (e) {
    app.selectTabbar(this.data.tabbar, e.currentTarget.id);
    this.setData({
      tabbar: this.data.tabbar
    })
  }
})