var _util = require('../../utils/util.js')
//引入配置文件
var config = require('../../config.js')

function getPlayBookList(keyWords, that){
  let sendData = {
    key_words: keyWords
  }

  var searchList_all = [];//获取当前页面的列表（分页）
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode == 0) {

      //获取知识库列表
      var searchList = res.list;

      if (!searchList.length) {
        wx.showToast({
          title: '没有更多数据',
          image: '../../images/notice_2.png',
          mask: true
        })
        // return 
        that.setData({
          isDefault: true
        })
      }else{
        //修改时间
        for (let k = 0; k < searchList.length; k++) {
          let create_at = Number(searchList[k].create_at);
          if (create_at <= 0) {
            create_at = parseInt(Date.parse(new Date()).toString().substring(0, 10));
          }
          var date = new Date(create_at * 1000);
          searchList[k].create_at = _util.formatTime(date, '-', false)
        }

        searchList_all.push(...searchList);

        console.log(JSON.stringify(searchList_all))
        
        that.setData({
          // keyWords: "",
          searchList: searchList_all,
          isDefault: false
        })
        that.canScroll = true;
      }
    }
  }, (res) => {
    that.canScroll = true;
    wx.hideLoading()
  }, 'play/list');
}

module.exports = {
  getPlayBookList
};