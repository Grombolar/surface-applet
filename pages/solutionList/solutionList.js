// pages/solutionList/solutionList.js
var app = getApp();
var _fn = require('./fn.js');
var _util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: null, //导航
    solutionNav: [{
      jtype: '',
      btnname: '全部',
      selected: true
    }], //mini刊导航
    solutionList: [], //mini刊列表
    imgUrl: app.globalData.imgUrl,
    keyWords: '',

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //产品列表即PlayBook的类型为
    this.type = 2;

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

        // _fn.getNav(this, false);
        // _fn.getKnowledgeList(this.uid, this.pagenum, this.pageSize, this.categoryid, this.data.keyWords, this);
        _fn.getSolutionList(this);
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
    this.canScroll = true; //默认为可以滚动
    
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
    var solutionNav = this.data.solutionNav;
    this.pagenum = 1;
    this.setData({
      solutionList: []
    });
    for (let i = 0; i < solutionNav.length; i++) {
      if (solutionNav[i].jtype == id) {
        solutionNav[i].selected = true;
        this.pagenum = 1;
        this.categoryid = id;
        if (!('secMenu' in solutionNav[i])) {
          _fn.getKnowledgeList(this.uid, this.pagenum, this.pageSize, this.categoryid, '', this);
        } else if (solutionNav[i].secMenu.length <= 0) {
          wx.showToast({
            title: '没有更多数据',
            image: '../../images/notice_2.png',
            mask: true
          })
          // return 
        }
      } else {
        solutionNav[i].selected = false;
        if (('secMenu' in solutionNav[i]) && solutionNav[i].secMenu.length > 0) {
          for (let j = 0; j < solutionNav[i].secMenu.length; j++) {
            solutionNav[i].secMenu[j].secSelected = false;
          }
        }
      }
    }
    this.setData({
      solutionNav
    })
  },

  //选择二级菜单
  selectMenu: function (e) {
    var that = this;

    var index = e.target.dataset.index;
    var secId = e.target.dataset.id;
    var parentIndex = e.target.dataset.parent;

    var solutionNav = this.data.solutionNav;

    for (let i = 0; i < solutionNav.length; i++) {
      if (solutionNav[i].jtype == parentIndex) {
        for (let j = 0; j < solutionNav[i].secMenu.length; j++) {
          if (solutionNav[i].secMenu[j].secType == index) {
            solutionNav[i].secMenu[j].secSelected = true;

            _fn.getKnowledgeList(this.uid, this.pagenum, this.pageSize, secId, this.data.keyWords, that);
          } else {
            solutionNav[i].secMenu[j].secSelected = false;
          }
        }
      }
    }
    this.setData({
      solutionNav
    })

  },

  //点击文字，缓存目录信息
  clickArticle: function (e) {
    var navUrl = e.currentTarget.dataset.url;
    var solutionNav = this.data.solutionNav;

    solutionNav.map(function (item) {
      if (item.selected) {
        // return item;
        // console.log(JSON.stringify(item));
        // wx.setStorageSync('bookMenu', item);
        wx.setStorage({
          key: "bookMenu",
          data: item
        })
        wx.navigateTo({
          url: navUrl,
        })
      }
    })

  },

  // 搜索栏
  formSubmit: function (e) {
    this.setData({
      solutionList: []
    })
    // let jType,secondId;
    let selectCatefory; //分为两级：搜索全部和搜索二级目录
    this.pagenum = 1;

    let solutionNav = this.data.solutionNav;
    for (let i = 0; i < solutionNav.length; i++) {
      let navEle = solutionNav[i]
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
    e.detail.value = {
      'keyWords': keyWords
    };
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