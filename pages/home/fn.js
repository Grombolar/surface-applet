var _util = require('../../utils/util.js');
//获取首页轮播图，热门礼品，为您推荐信息
function getIndexInfo(userId, that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  //发送请求字段
  var sendData = {
    member_id: userId
  }

  //ajax请求
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    var scrollwidth = 0;
    if (res.encode) {
      if (res.data.hotgifts.length && Array.isArray(res.data.hotgifts)) {
        //获取热门礼品数量
        scrollwidth = res.data.hotgifts.length;
      }
      // console.log(JSON.stringify(res.data.swiper))
      //渲染页面
      that.setData({
        imgUrls: res.data.swiper,
        hotgifts: res.data.hotgifts,
        scrollwidth: scrollwidth,
        recommend: res.data.recommend,
        game: res.data.game,
        showPages: true
      })

    }

  }, (err) => {
    wx.hideLoading()
  }, 'shop/index', undefined, undefined)
}

// AE用户 获取首页示例文章
function getIndexExam(that) {
  let sendData = {
    is_index: 1
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    let journalList_all = [];
    if (res.encode == 0) {
      let journalList = res.list;

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
        journalList: journalList_all
      })
    }
  }, (err) => {
    wx.hideLoading();

  }, 'play/list')
}

// AE用户 获取首页焦点图文章
function getTopExam(that) {
  let sendData = {
    is_top: 1
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode == 0) {
      let turnList = res.list;

      turnList = turnList.map(function(turn) {
        turn['url'] = '/pages/playBook/playBook?id=' + turn.id + '&type=' + turn.type;
        return turn;
      });

      that.setData({
        turnList: turnList
      })
    }
  }, (err) => {
    wx.hideLoading();

  }, 'play/list')
}

//发送最新PDF
function sendLastPDF(member_id, that) {

  // console.log(member_id)

  let sendData = {
    member_id: member_id
  }

  //ajax请求
  _util.Ajax(sendData, (res) => {

    console.log(JSON.stringify(res));
    wx.hideLoading();

    let encode = res.encode;

    if(encode == 1 ){
      wx.showToast({
        title: '请前往邮箱查看',
        icon: 'success',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: '邮件发送失败',
        icon: 'none',
        duration: 2000
      })
    }
  }, (err) => {
    wx.hideLoading()
  }, 'play/send')
}

module.exports = {
  getIndexInfo,
  getIndexExam,
  getTopExam,
  sendLastPDF
};