// personalData.js
var app=getApp();
var _fn=require('./fn.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    issale:false,//默认为普通用户
    info:null,
    authentication: 0,//0为没有认证
    index:0,//下标,
    photoImg:null,
    isShowConpany:false,//默认不显示公司选择
    isShowApplyTip:false,//默认为不显示申请提示
    conpanySelect:true,//默认为不可以选择
    gender:true,//默认为 2女false 1男true
    conpanylist:[],//公司列表
    company_name:'company_name',
    index:0,
    padding:false,
    src:undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取是否审核通过 app.globalData.status
    this.isAuditing = app.globalData.status;
    //获取用户id
    this.uid = app.globalData.uid;
    //获取用户权限app.globalData.power;
    this.power = app.globalData.power;
    this.src=options.src;
    if (this.src !='person')
    {
      //设置标题
      wx.setNavigationBarTitle({
        title: '申请经销员身份认证'
      })
      this.setData({
        src: this.src
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
    this.setData({
      conpanylist: []
      
    })
    //个人资料
    if (this.src == 'person') {
      //获取用户个人资料
      _fn.personData(this);
    }
    else {
      //申请经销商或查看申请状态
      _fn.getApplySaleInfo(this, (res) => {
        _fn.getConpanyList(res, this);

      });
    }
  
    if (app.globalData.sysInfo.model.indexOf('iPhone')==-1)
    {
      this.setData({
        padding:true
      })
    }
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      conpanylist: []

    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      conpanylist: []

    })
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
  //性别选择
  radioChange:function(e){
    var selectid = e.detail.value;
    
    var gender=true;
    if (parseInt(selectid)==1)
    {
      gender = true;
    }
    else if (parseInt(selectid) == 2)
    {
      gender = false;
      
    }
    this.setData({
      gender: gender
    })

  },
  //公司选择
  pickerChange:function(e){   

   var value= this.conpanyId[e.detail.value];
    this.setData({
      index: e.detail.value,
      value: value
    })
  },
  //保存用户信息和提交认证
  formSubmit:function(e){
 
    //提交认证
    if (this.src != 'person')
    {
        //邮件手机号验证
      if (!_fn.check(e.detail.value,true))
      {
        return
      }
      //提交的内容
      this.form = e.detail.value;

      _fn.getConpayName(this,()=>{
        //提交申请认证
        _fn.applyAuthentication(this, () => {
          wx.showToast({
            title: '提交成功',
            mask: true,
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)

        });
      })
      /*
      //提交申请认证
      _fn.applyAuthentication(this,()=>{
        wx.showToast({
          title: '提交成功',
          mask:true,
          duration:2000
        })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
        },2000)
        
      });*/
    }
    else//保存个人资料
    {
      //邮件手机号验证
      if (!_fn.check(e.detail.value, false)) {
        return
      }
      //提交的内容
      this.form = e.detail.value
     
      //提交保存
      _fn.saveInfo(this);
    }
    
  }
})