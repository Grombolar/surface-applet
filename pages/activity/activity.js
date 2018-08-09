// pages/activity/activity.js
var app = getApp();
var _fn = require('./fn.js');
var _util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp: 'detial',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: false
    })
    //获取用户id
    this.uid = app.globalData.uid;

    //获取活动id
    this.activity_id = options.activity_id;
    //获取当前时间戳（到秒）
    this.nowDate = parseInt(Date.parse(new Date()).toString().substring(0, 10));
    //获取底部tabbar
    _util.getUserPowerNew('scope.userInfo', true, () => {
      app.getUserInfo(null, (res) => {
        wx.showLoading({
          title: '正在登录...',
        })
        //获取用户id
        this.uid = res.userId;
        this.utype = res.type;
        let that = this;
        _fn.getActivityDetial(that, function (res) {
          if (res.encode === 0) {
            let activityType = res.activity.type;
            if (activityType === '1' && that.utype === 0) {
              //普通用户无法参与该活动，跳转到首页
              wx.showModal({
                content: "您不是经销商无法参与该活动",
                success: function (res) {
                  app.selectTabbar(app.globalData.tabbar, 0);
                  that.setData({
                    tabbar: app.globalData.tabbar
                  })
                }
              })
              return;
            } 
            else {
              _fn.selectActivity(that, res);
            }
          } 
          // else {
          //   wx.showModal({
          //     content: res.msg,
          //     success: function (res) {
          //       app.selectTabbar(app.globalData.tabbar, 0);
          //       that.setData({
          //         tabbar: app.globalData.tabbar
          //       })
          //     }
          //   })
          // }
          wx.hideLoading();
        });
      });
    }, () => {

    })

  },
  /**
   * 报名
   */
  singUp: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    _fn.UserSingUp(this);
  },
  /**
   * 签到
   */
  singIn: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    _fn.UserSingIn(this);
  },

  //判断状态，跳转到详情页
  goDetail: function () {
    let tempData = this.data.tempData
    let title = tempData.activity.type === "1" ? "测试卷: " : "调查问卷:";
    let url = '';
    if (tempData.activity.type === "1") {
      url = '../testQuestions/testQuestions?id=' + tempData.activity.exam_id + '&teststatus=' + tempData.exam_status + '&title=' + tempData.activity.name + '&month=' + title
    } else {
      url = '/pages/questionnaire/questionnaire?exam_id=' + tempData.activity.exam_id + '&examStatus=' + tempData.exam_status + '&title=' + tempData.activity.name + '&type=' + title
    }
    wx.navigateTo({
      url: url
    })
  }
})