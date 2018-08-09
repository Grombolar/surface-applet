// pages/authorization/authorization.js
var app = getApp();
Page({
  data: {
    lastPage: '../home/home'
  },
  onLoad: function () {

  },
  onShow: function (options) {
    // this.getUserInfoFun()；
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]

    var lastPage = prevPage.route;

    //url后面的参数;
    var postfix = '';
    var options = prevPage.options;

    let canshu = '';
    for (let key in options) {
      canshu += key + '=' + options[key] + '&'
    }
    postfix = '?' + canshu
    postfix = postfix.substr(0, postfix.length - 1);

    var lp = '..' + lastPage.substr(5, lastPage.length - 1) + postfix;

    this.setData({
      lastPage: lp
    });

  },
  getUserInfoFun: function () {

    var that = this;

    app.getUserInfo(
      function () {
        wx.navigateTo({
          url: that.data.lastPage,
        })
        // wx.navigateBack({

        // })
      }
    );
  },
})