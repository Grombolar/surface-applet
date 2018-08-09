var _util = require('../../utils/util.js');
//获取我的订单列表
function getMyOrderList(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    member_id: that.uid,
    type: that.filter,
    page_num: that.pagenum,
    page_size: that.pagesize
  }
  //获取现在有的订单列表
  var myOrderList = that.data.myOrder;

  _util.Ajax(sendData, (res) => {

    wx.hideLoading();
   // var res = res.getMyorderList;
    if (res.encode==0) {
      
      var data=res.list;
    
      if (!data.length)
      { 
        if (!that.loaderTotal)
        {
          
          wx.showToast({
            title: '没有更多数据', 
            image: '../../images/notice_2.png',
            mask: true
            })
          //_util.showNotice(that,'没有更多')
        }
        //如果没有信息，则显示没有更多盒子
        if (!myOrderList.length) {
          that.setData({
            noPage: false
          })
        }
        return 
      }
      that.loaderTotal = false;
      //转换时间格式
      var reg = /:|- /g;
      for (let i = 0; i < data.length; i++) {
        if (Number(data[i].create_at)) {
          data[i].create_at = _util.formatTime(new Date(Number(data[i].create_at) * 1000),'-', true)
        }
      }
      myOrderList.push(...data)
      //更新页面显示
      that.setData({
        myOrder: myOrderList
      })
    }

  }, (err) => {
    wx.hideLoading()
    }, 'order/list', undefined, undefined)
}
//导航筛选条件
function navFilter(filter,that){
  var filterNav = that.data.filterNav;
  for (let i = 0; i < filterNav.length;i++){
    if (filterNav[i].filter == filter)
    {
      filterNav[i].selected=true;
      that.filter = filter;//设置筛选条件
      getMyOrderList(that)
    }
    else
    {
      filterNav[i].selected = false;
    }
  }
  that.setData({
    filterNav
  })
}

module.exports = {
  getMyOrderList,
  navFilter
};