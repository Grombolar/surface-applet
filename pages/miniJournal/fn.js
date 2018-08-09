var _util=require('../../utils/util.js')
//获取mini刊导航列表
function getJournalNav(that,cb) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {

  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    var res = res.getNavBar;
    if (res.encode) {
      var data = res.data;
      for(let i=0;i<data.length;i++){
        if(i==0)
        {
          data[i].selected=true;
        }
        else
        {
          data[i].selected = false;
        }
      }
      that.setData({
        journalNav: data
      })
      //判断是否有回调
      if(typeof cb == "function" )
      {
        cb()
      }
     
    }
  }, (err) => {
    wx.hideLoading()
    }, 'news/listss', undefined, undefined)

}
//获取mini刊列表
function getJournalList(jid,that)
{
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    jid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    var res = res.getMiniList;
    if (res.encode) {
      var data = res.data;
      that.setData({
        journalList: data
      })
    }
  }, (err) => {
    wx.hideLoading()
  }, 'journalNavddd', undefined, undefined)

}
//获取minik刊列表和导航
function getMiniJourInfo(uid, pageNum, pageSize,categoryid,hasNav,that){

  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    member_id:uid,
    page_num: pageNum,
    page_size: pageSize,
    category_id: categoryid
  }
  var journalList_all = that.data.journalList||[];//获取当前页面的列表（分页）
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();

    if (res.encode==0) {
      //如果没有设置导航
      if (!hasNav)
      {
        var category = res.category;
        var categoryArr = that.data.journalNav;
        for (let key in category) {
          var obj = {
            jtype: key,
            btnname: category[key],
            selected: false
          }
          categoryArr.push(obj)
        }
        that.setData({
          journalNav: categoryArr
        })
      }
      //获取Mini刊列表
      var journalList=res.list;
      if (!journalList.length)
      {
        wx.showToast({
          title: '没有更多数据',
          image: '../../images/notice_2.png',
          mask: true
        })
       // return 
      }
      //修改时间
      for (let k = 0; k < journalList.length;k++){
        var date = new Date(Number(journalList[k].create_at)*1000);
        journalList[k].create_at=_util.formatTime(date, '-',false)
      }

      journalList_all.push(...journalList);
      that.setData({
        journalList: journalList_all
      })
      that.canScroll = true;
    }
  }, (err) => {
    that.canScroll=true;
    wx.hideLoading()
    }, 'news/list', undefined, undefined)
}
module.exports = {
  getJournalNav,
  getJournalList,
  getMiniJourInfo
};