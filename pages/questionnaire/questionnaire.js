// pages/questionnaire/questionnaire.js
var _fn = require('./fn.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSubmit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.uid = app.globalData.uid;
    //测试题id 
    this.tid = options.exam_id;

    //获取试题类型 0未开始考试1通过2未通过
    // this.teststatus = parseInt(options.teststatus);

    //判断是否参与活动
    this.examStatus = parseInt(options.examStatus);

    this.setData({
      examStatus: this.examStatus
    })

    // let exam_id = options.exam_id;
    let title = options.title;
    let fType = options.type;
    wx.setNavigationBarTitle({
      title: `${fType + title}`
    })
    _fn.getNaire(this);
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
    let isSubmit = this.data.isSubmit;
    if (isSubmit) {
      let animation1 = wx.createAnimation({ duration: 200 });
      animation1.translateX(-750).step();
      this.setData({
        animationShow: animation1.export(),
      })
    }
  },

  //单选
  radioChange: function (e) {
    if (this.examStatus != 0) {
      return
    }
    var qid = e.currentTarget.id;//问题题目id
    var aid = e.detail.value;//选择答案id

    _fn.radioSelect(qid, this.data.testList, aid, this)
  },
  //多选
  checkboxChange: function (e) {
    if (this.examStatus != 0) {
      return
    }
    var qid = e.currentTarget.id;
    var aidArr = e.detail.value;
    _fn.radioSelect(qid, this.data.testList, aidArr, this)

  },
  //问答题
  textChange: function (e) {
    if (this.examStatus != 0) {
      return
    }
    let qid = e.currentTarget.id;
    let text = e.detail.value;
    _fn.inputText(qid, this.data.testList, text, this)
  },
  //提交
  formSubmit: function (e) {

    //获取总共有多少题
    this.total = this.data.testList.length;
    let list = e.detail.value;

    // console.log(JSON.stringify(list))
    //判断是否全部答题
    let isOk = _fn.checkUser(list);

    if (isOk) {
      wx.showToast({
        title: `${isOk}道题未答`,
        image: '../../images/answer.png',
        mask: true
      })
      return
    }
    _fn.submitAnswer(e.detail.value, this);

    //储存导航id
    wx.setStorage({
      key: 'barid',
      data: this.nid
    })
  },

  // //测试用，打开完成页
  // openHidden:function(){
  //   console.log("11111111111");
  //   let that = this;
  //   let animation1 = wx.createAnimation({ duration: 200 });
  //   setTimeout(function () {
  //     animation1.translateX(-wx.getSystemInfoSync().windowWidth).step();
  //     that.setData({
  //       animationShow: animation1.export(),
  //     })
  //   }.bind(that), 200)
  // },

  //复制到剪切板
  copyUrl: function () {
    let that = this;
      wx.setClipboardData({
        data: that.data.moreUrl,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showModal({
                content: '相关内容已复制到剪切板，请复制到浏览器中查看',
                success: function (res) {}
              })
            }
          })
        }
      })
  },
  //返回首页
  goHome:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})