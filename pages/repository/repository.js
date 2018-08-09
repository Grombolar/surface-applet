// pages/repository/repository.js
var app = getApp();
var _fn = require('./fn.js');
var _util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: null,//导航
    journalNav: [{ jtype: '', btnname: '全部', selected: true }],//mini刊导航
    journalList: [],//mini刊列表
    imgUrl: app.globalData.imgUrl,
    keyWords: '',

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取用户id
    this.uid = app.globalData.uid;
    //默认为第一页
    this.pagenum = 1;
    //一次加载多少条信息
    this.pageSize = 20;
    //默认筛选条件
    this.categoryid = '';
    //获取mini刊列表
    _util.getUserPowerNew('scope.userInfo', true, () => {
      app.getUserInfo(null, (res) => {
        //获取用户id
        this.uid = res.userId;
        // //获取首页相关信息
        if (res.type <= 0) {//普通用户
          _util.upDateNav(1, app.globalData.tab_b, app)
        }
        else if (res.type <= 2) {//经销员or管理员
          _util.upDateNav(5, app.globalData.tab_a, app)
        }
        else if (res.type == 3) {
          _util.upDateNav(5, app.globalData.tab_c, app)
        }

        _fn.getNav(this, false);
        _fn.getKnowledgeList(this.uid, this.pagenum, this.pageSize, this.categoryid, this.data.keyWords, this);
      });
    }, () => {

    })

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
    this.canScroll = true;//默认为可以滚动
    //刷新页面
    this.setData({
      tabbar: app.globalData.tabbar,
      // filterBtn: this.filterBar,
      myIntegral: app.globalData.myIntegral
    })
  },

  //滚动分页
  scrollBottom: function () {
    if (!this.canScroll) {
      return
    }
    this.canScroll = false;
    this.pagenum += 1;
    //获取mini刊列表
    // _fn.getMiniJourInfo(this.uid, this.pagenum, this.pageSize, this.categoryid, this.data.keyWords, true, this)
    _fn.getKnowledgeList(this.uid, this.pagenum, this.pageSize, this.categoryid, this.data.keyWords, this)
  },
  //mini刊导航
  selectNav: function (e) {
    var id = e.currentTarget.id;
    var journalNav = this.data.journalNav;
    this.pagenum = 1;
    this.setData({
      journalList: []
    });
    for (let i = 0; i < journalNav.length; i++) {
      if (journalNav[i].jtype == id) {
        journalNav[i].selected = true;
        this.pagenum = 1;
        this.categoryid = id;
        if (!('secMenu' in journalNav[i])){
          _fn.getKnowledgeList(this.uid, this.pagenum, this.pageSize, this.categoryid, '', this);
        }
        else if (journalNav[i].secMenu.length <= 0) {
          wx.showToast({
            title: '没有更多数据',
            image: '../../images/notice_2.png',
            mask: true
          })
          // return 
        }
      }
      else {
        journalNav[i].selected = false;
        if (('secMenu' in journalNav[i]) && journalNav[i].secMenu.length > 0) {
          for (let j = 0; j < journalNav[i].secMenu.length; j++) {
            journalNav[i].secMenu[j].secSelected = false;
          }
        }
      }
    }
    this.setData({
      journalNav
    })
  },

  //选择二级菜单
  selectMenu: function (e) {
    var that = this;

    var index = e.target.dataset.index;
    var secId = e.target.dataset.id;
    var parentIndex = e.target.dataset.parent;

    var journalNav = this.data.journalNav;

    for (let i = 0; i < journalNav.length; i++) {
      if (journalNav[i].jtype == parentIndex) {
        for (let j = 0; j < journalNav[i].secMenu.length; j++) {
          if (journalNav[i].secMenu[j].secType == index) {
            journalNav[i].secMenu[j].secSelected = true;

            _fn.getKnowledgeList(this.uid, this.pagenum, this.pageSize, secId, this.data.keyWords, that);
          } else {
            journalNav[i].secMenu[j].secSelected = false;
          }
        }
      }
    }
    this.setData({
      journalNav
    })

  },

  // 搜索栏
  formSubmit: function (e) {
    this.setData({
      journalList: []
    })
    // let jType,secondId;
    let selectCatefory; //分为两级：搜索全部和搜索二级目录
    this.pagenum = 1;

    let journalNav = this.data.journalNav;
    for (let i = 0; i < journalNav.length; i++) {
      let navEle = journalNav[i]
      if (navEle.selected) {
        // jType = navEle.jtype;
        if ('secMenu' in navEle) {
          let secondMenu = navEle.secMenu;
          if (navEle.secMenu.length > 0) {
            for (let j = 0; j < secondMenu.length; j++) {
              if (secondMenu[j].secSelected) {
                selectCatefory = secondMenu[j].secId
              }
            }
          }

        } else {
          selectCatefory = null
        }
      }
    }
    let keyWords = e.detail.value.keyWords;
    this.categoryid = selectCatefory;
    _fn.getKnowledgeList(this.uid, this.pagenum, this.pageSize, this.categoryid, keyWords, this)
  },

  //回车搜索
  enterSubmit: function (e) {
    let keyWords = e.detail.value;
    e.detail.value = { 'keyWords': keyWords };
    this.formSubmit(e)
  },

  //打开
  clickTab: function (e) {
    let id = e.currentTarget.id;
    let list = this.data.nairTabList;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      nairTabList: list
    });
  },

  //导航选择
  selectBar: function (e) {
    app.selectTabbar(this.data.tabbar, e.currentTarget.id);
    this.setData({
      tabbar: this.data.tabbar
    })
  }
})