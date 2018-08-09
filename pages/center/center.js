// center.js
var app=getApp();
var _util=require('../../utils/util.js');
var _fn=require('./fn.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    tabbar: null,
    managername:0,//用户权限
    myIntegral:0,//我的积分
    manage:false,//默认不显示经销商管理员，只有power为2才显示
    conpany:'',
    giftnum: 0,//实物订单
    giftcardnum: 0,//礼券订单
    auditing: 0,//待审核
    Auditinged: 0,//已审核
    showUserInfo:false,//显示登录时的界面
    company:'',
    isAuditing:0,
    gender:true,
    imgUrl: app.globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    //获取用户id
    this.uid = app.globalData.uid;
    if (this.uid != '') {
      
      //默认为普通用户
      var managername =0
      //权限为1且通过则为经销员
      if (app.globalData.power == 1 && app.globalData.status==1)
      {
        managername=1;
      }
      if (app.globalData.power==0)
      {
        managername = 0;
      }
      if (app.globalData.power==2)
      {
        managername = 2;
      }
      if (app.globalData.power == 3) {
        managername = 3;
      }
      this.setData({
        showUserInfo: true,
        managername: managername,
        myIntegral: app.globalData.myIntegral,
        manage: app.globalData.power == 2 ? true : false,
        company: app.globalData.company,
        // isAuditing: 0
        isAuditing: app.globalData.status//是否审核通过
      })
      //获取用户的订单和管理员审核的数量
      
        _fn.getNumber(this.uid, this);
      
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
    
    //获取标识
    try{
      var mark=wx.getStorageSync('save');
      //if(mark)//如果有操作过个人信息和申请，则重新登录
     // {
        app.getUserInfo(null,(data)=>{
          app.globalData.uid = data.userId;//用户id
          
          app.globalData.myIntegral = data.integral;//用户几分
          app.globalData.email = data.email;//用户邮件
          app.globalData.company = data.company_name || '';//公司名称
          app.globalData.status = data.status;//是否申请经销员
          app.globalData.power = data.type;//用户权限
          app.globalData.username = data.username;//经销员姓名

          //默认为普通用户
          var managername = 0
          //权限为1且通过则为经销员
          if (app.globalData.power == 1 && app.globalData.status == 1) {
            managername = 1;
          }
          if (app.globalData.power == 0) {
            managername = 0;
          }
          if (app.globalData.power == 2) {
            managername = 2;
          }
          if (app.globalData.power == 3) {
            managername = 3;
          }
          this.setData({
            showUserInfo: true,
            managername: managername,
            myIntegral: app.globalData.myIntegral,
            manage: app.globalData.power == 2 ? true : false,
            company: app.globalData.company,
            // isAuditing: 0
            isAuditing: app.globalData.status//是否审核通过
          })
          //获取用户的订单和管理员审核的数量

          if (app.globalData.power == 2) {
            _fn.getNumber(this.uid, this);
          }
          
          if (data.type <= 0 )
          {
            _util.upDateNav(4, app.globalData.tab_b, app)
         
          }
          else if (data.type <= 2) {

            _util.upDateNav(4, app.globalData.tab_a, app)
          }
          else if (data.type == 3) {

            _util.upDateNav(4, app.globalData.tab_c, app)

          }
          this.setData({
            tabbar: app.globalData.tabbar,
            userInfo: app.globalData.userInfo
          })
          if (data.userId == '') {
            this.setData({
              showUserInfo: false
            })
          
          }
          //清除缓存
          wx.removeStorage({
            key: 'save',
            success: function(res) {
              
            },
          })
        })
    }
    catch(e)
    {

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
  
  },*/
  //跳转至我的全部订单/我的收藏/地址管理
  toNavigate:function(e){
    var url = e.currentTarget.dataset.url;
    if (_authorization== "") {
      _util.getUserPower(app, 'scope.userInfo',(res)=> {
        if (res==null) {
          return 
        }
        else 
        {
          //当用户取消授权时，把userI置为空
          this.onShow();
          _authorization = res.access_token;
          wx.navigateTo({
            url: url
          })
        }

      });
      return
    }
    else
    {
      wx.navigateTo({
        url: url
      })
    }
  },
  //用户登录
  getUserInfo:function(e){
    _util.getUserPowerNew('scope.userInfo', false, () => {
      
      //设置头像信息
      app.getUserInfo((userinfo)=>{
        this.setData({
          userInfo: userinfo
        })
      }, (res) => {
        wx.showLoading({
          title: '正在登录...',
        })
        //获取用户id
        this.uid = res.userId;
        //获取用户的订单和管理员审核的数量
        _fn.getNumber(this.uid, this);
        // if (res.type == 0) {//普通用户

        //   app.globalData.tabbar = _fn.setNavBar(4, app.globalData.tab_b) ;
        // }
        // else if (res.status == 1) {
        //   app.globalData.tabbar = _fn.setNavBar(4, app.globalData.tab_a);
        // }
        if (res.type <= 0) {//普通用户
          //获取导航条
          app.globalData.tabbar = _fn.setNavBar(4, app.globalData.tab_b);
        }
        else if (res.type <= 2 && res.status == 1 ) {//经销员or管理员

          app.globalData.tabbar = _fn.setNavBar(4, app.globalData.tab_a);
        }
        else if (res.type == 3) {
          app.globalData.tabbar = _fn.setNavBar(4, app.globalData.tab_c);
        }

        this.setData({
          tabbar: app.globalData.tabbar,
          showUserInfo: true,
          managername: res.type,
          myIntegral: res.integral,
          manage: res.type == 2 ? true : false,
          company: res.company_name,
          // isAuditing: 0
          isAuditing: res.status//是否审核通过
        })
      });
    }, () => {
      wx.hideLoading();
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