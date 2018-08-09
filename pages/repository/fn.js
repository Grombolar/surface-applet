var _util = require('../../utils/util.js')
//引入配置文件
var config = require('../../config.js')
//获取知识库导航列表
function getJournalNav(that, cb) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  let sendData = {}
  getNaire(sendData, false, that);
}

//获取导航菜单
function getNav(that, hasNav) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })

  var sendData = '';
  var journalList_all = that.data.journalList || [];
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode == 0) {
      var category = res.category;

      var categoryArr = that.data.journalNav;


      for (let key in category) {

        var secMenu = [];
        if ("next_ca" in category[key]) {
          var firCategory = category[key].next_ca;
          for (let sec in firCategory) {
            var secondObj = {
              secId: firCategory[sec].id,
              secType: sec,
              secName: firCategory[sec].name,
              secSelected: false
            }
            secMenu.push(secondObj);
          }
        }
        var obj = {
          jtype: key,
          btnname: category[key].name,
          isSpread: false,
          selected: false,
          secMenu: secMenu
        }
        categoryArr.push(obj)
      }

      that.setData({
        journalNav: categoryArr
      })
    }
    that.canScroll = true;

  }, (res) => {
    that.canScroll = true;
    wx.hideLoading()
  }, 'knowledge/listfirst');
}

//获取知识库文章列表
function getKnowledgeList(uid, pageNum, pageSize, pid, keyWords, that) {

  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    member_id: uid,
    page_num: pageNum,
    page_size: pageSize,

    key_words: keyWords
  }
  if (pid != null || pid != '' || pid != undefined) {
    sendData.pid = pid;
  }

  getKnowLedge(sendData, that)
}

function getKnowLedge(sendData, that) {
  var journalList_all = [];//获取当前页面的列表（分页）
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode == 0) {

      //获取知识库列表
      var journalList = res.list;
      
      if (!journalList.length) {
        wx.showToast({
          title: '没有更多数据',
          image: '../../images/notice_2.png',
          mask: true
        })
        // return 
      }
      //修改时间
      for (let k = 0; k < journalList.length; k++) {
        let create_at = Number(journalList[k].create_at);
        if (create_at <= 0) {
          create_at = parseInt(Date.parse(new Date()).toString().substring(0, 10));
        }
        var date = new Date(create_at * 1000);
        journalList[k].create_at = _util.formatTime(date, '-', false)
      }

      journalList_all.push(...journalList);
      that.setData({
        keywords: "",
        journalList: journalList_all
      })
      that.canScroll = true;
    }
  }, (res) => {
    that.canScroll = true;
    wx.hideLoading()
  }, 'knowledge/list');
}

module.exports = {
  getNav,
  getKnowledgeList
};