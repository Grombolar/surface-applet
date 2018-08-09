var _util = require('../../utils/util.js');
//获取申请人列表 0全部 1待审核 2已审核
function getManagerList(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    member_id: that.uid,
    page_num:that.pagenum,
    page_size:that.pagesize,
    type: that.filter
  }
  //获取现有的列表
  var applyList = that.data.auditingList;
  
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode==0) {
      var data = res.list;
     
      //查看是否有数据
      if (!data.length && Array.isArray(data))
      {
        if (!that.loaderTotal)
        {
          
           wx.showToast({
            title: '没有更多数据',
            image: '../../images/notice_2.png',
            mask: true
            }) 
        
        }
       
        //如果没有信息，则显示没有更多盒子
        if (!applyList.length) {
          that.setData({
            noPage: false
          })
        }
        return 
      }
      that.loaderTotal = false;
      applyList.push(...data);
    
      //渲染页面
      that.setData({
        auditingList: applyList
      })
      //重新设置为可以下拉
      that.canscroll=true;
    }

  }, (err) => {
    that.canscroll = true;
    wx.hideLoading()
    }, 'member/sales-list', undefined, undefined)
}


module.exports = {
  getManagerList
};