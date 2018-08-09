var _util = require('../../utils/util.js')
//引入配置文件
var config = require('../../config.js')

//获取文章详情
function getArticle(did, that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    id: did
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();

    console.log(JSON.stringify(res));

    if (res.encode == 0) {

      //修改文本信息
      var article = res.data;
      manageArticle(article, that);

      if (that.arType == 0 ){
        //生成目录信息
        var bookInfo = res.book;

        if (that.data.bookNav.length <= 0) {
          manageMenu(bookInfo, that);
        }
      }
    }
  }, (err) => {
    wx.hideLoading()
  }, 'play/detail')

}

//处理文章
function manageArticle(article, that) {
  var rich = article.detail;

  article.detail = `<div style="position:relative">` + rich;
  article.detail += `<div style="position:absolute;left:0;top:0;bottom:0;right:0;background-color:rgba(0,0,0,0)">
     
      </div></div>`;

  //改变img样式
  var reg = /<img/g;
  var restring = '*img style="width:100%; vertical-align:bottom;"'
  article.detail = _util.richTextImg(reg, article.detail, restring);
  reg = /\*/g;
  article.detail = _util.richTextImg(reg, article.detail, '<');
  article.create_at = _util.formatTime(new Date(Number(article.create_at) * 1000), '-', false);
  that.setData({
    articleDetail: article,
    showPages: true
  })
}

//处理目录
function manageMenu(bookInfo, that) {
  
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  // var bookName = bookInfo.name;
  that.setData({
    bookInfo: bookInfo
  })
  var sendData = {
    bookID: bookInfo.id
  }
  // var journalList_all = that.data.journalList || [];
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode == 0) {
      var category = res.chaperlist;

      let categoryArr = that.data.bookNav  || [];

      for (let key in category) {

        var secMenu = [];
        if ("article" in category[key]) {
          var firCategory = category[key].article;
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

      // let bookMenu = {
      //   bookId:bookInfo.id,
      //   bookName:bookName,
      //   bookNav: categoryArr
      // }

      that.setData({
        bookNav: categoryArr
      })
    }
    // that.canScroll = true;

  }, (res) => {
    // that.canScroll = true;
    wx.hideLoading()
    }, 'play/listbook');

}

module.exports = {
  getArticle
};