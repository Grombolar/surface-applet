// pages/playBook/playBook.js
// articleDetail.js
var _util = require('../../utils/util.js');
var app = getApp();
var _fn = require('./fn.js');
// var _aside = require('./aside.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // top: 40,
    articleDetail: null,
    showPages: false,
    isOpen: false,
    bookInfo:{},
    bookNav:[],
    showMenu:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取文章ID
    this.did = options.id;

    //获取文章类型
    this.arType = options.type;
    //判断是否显示目录

    if(this.arType == 0){
      wx.setNavigationBarTitle({
        title: 'Playbook'
      })
    } else if (this.arType == 1 ){
      wx.setNavigationBarTitle({
        title: '产品'
      })
    }else if(this.arType == 2){
      wx.setNavigationBarTitle({
        title: '解决方案'
      })
    }
    if (this.arType > 0){
      this.setData({
        showMenu : false
      })
    }
    
    
    //获取屏幕宽度
    this.winWidth = wx.getSystemInfoSync().windowWidth;

    //获取文章详情
    _fn.getArticle(this.did, this)

  },

  //侧边导航开关
  controllAid: function() {
    let isOpen = this.data.isOpen;

    if (isOpen) {
      //打开状态，点击关闭
      this.closeAside();

    } else {
      //关闭状态，点击打开
      this.openAside();
    }
  },
  //打开侧边导航
  openAside: function() {
    let that = this;
    let moveRight = this.winWidth * 0.8;
    let animation1 = wx.createAnimation({ duration: 200 });

    let animation_d = wx.createAnimation({ duration: 400 });
    setTimeout(function() {
      animation1.translateX(moveRight).step();
      animation1.width(that.winWidth).step();
      animation_d.opacity(0.5).step();
      this.setData({
        isOpen: true,
        animationOpen: animation1.export(),
        animationShow: animation_d.export()
      })
    }.bind(this), 200)
  },

  //关闭侧边导航
  closeAside: function() {
    let that = this;
    let animation2 = wx.createAnimation({ duration: 200});
    let animation_d = wx.createAnimation({ duration: 400 });
    setTimeout(function() {
      animation2.translateX(0).step();
      animation2.width( (that.winWidth)*0.8 ) .step();
      animation_d.opacity(0).step();
      this.setData({
        isOpen: false,
        animationClose: animation2.export(),
        animationNone: animation_d.export()
      })
    }.bind(this), 200)
  },

  //选择导航
  selectNav: function (e) {
    var id = e.currentTarget.id;
    var bookNav = this.data.bookNav;
    this.pagenum = 1;
    // this.setData({
    //   journalList: []
    // });
    for (let i = 0; i < bookNav.length; i++) {
      if (bookNav[i].jtype == id) {
        bookNav[i].selected = true;
        this.pagenum = 1;
        this.categoryid = id;
        if (!('secMenu' in bookNav[i])) {
          // _fn.getKnowledgeList(this.uid, this.pagenum, this.pageSize, this.categoryid, '', this);
          
        } else if (bookNav[i].secMenu.length <= 0) {
          wx.showToast({
            title: '没有更多数据',
            image: '../../images/notice_2.png',
            mask: true
          })
          // return 
        }
      } else {
        bookNav[i].selected = false;
        if (('secMenu' in bookNav[i]) && bookNav[i].secMenu.length > 0) {
          for (let j = 0; j < bookNav[i].secMenu.length; j++) {
            bookNav[i].secMenu[j].secSelected = false;
          }
        }
      }
    }
    this.setData({
      bookNav
    })
  },

  //选择二级菜单
  selectMenu: function (e) {
    var that = this;

    var index = e.target.dataset.index;
    var secId = e.target.dataset.id;
    var parentIndex = e.target.dataset.parent;

    var bookNav = this.data.bookNav;

    for (let i = 0; i < bookNav.length; i++) {
      if (bookNav[i].jtype == parentIndex) {
        for (let j = 0; j < bookNav[i].secMenu.length; j++) {
          if (bookNav[i].secMenu[j].secType == index) {
            bookNav[i].secMenu[j].secSelected = true;

            // _fn.getKnowledgeList(this.uid, this.pagenum, this.pageSize, secId, this.data.keyWords, that);
            _fn.getArticle(secId , that);

            that.controllAid();
          } else {
            bookNav[i].secMenu[j].secSelected = false;
          }
        }
      }
    }
    this.setData({
      bookNav
    })

  },


})