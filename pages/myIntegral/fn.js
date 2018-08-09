var _util = require('../../utils/util.js');
//获取积分记录列表
function getIntegralRecord(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    member_id: that.uid,
    type: that.filter,
    page_num:that.pagenum,
    page_size:that.pagesize
  }
  var recordList = that.data.recordList == null ? [] : that.data.recordList;
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    //var res = res.getIntegralRe;
    if (res.encode==0) {
      var data=res.list;
      //判断是否为空数组
      if (!data.length && Array.isArray(data))
      {// this.loaderTotal = true;
        //如果第一次加载没有数据则不执行提示
        if (!that.loaderTotal)
        {
         // _util.showNotice(that, '没有更多')
          
         wx.showToast({
            title: '没有更多数据',
            image: '../../images/notice_2.png',
            mask: true
            }) 
        }
        
        //如果没有信息，则显示没有更多盒子
        if (!recordList.length) {
          that.setData({
            noPage: false
          })
        }
        return 
      }
      //赋值为假
      that.loaderTotal = false;
      //转换时间格式
      var reg = /:|-/g;
      for(let i=0;i<data.length;i++){
        if (!reg.test(data[i].create_at))
        {
          data[i].create_at = _util.formatTime(new Date(Number(data[i].create_at) * 1000),'-', true)
        }
      }
      recordList.push(...data);
      
      //刷新页面
      that.setData({
        recordList: recordList
      });
      that.canScroll=true
    }

  }, (err) => {
    that.canScroll = true
    wx.hideLoading()
    }, 'integral/log', undefined, undefined)
}
//积分记录筛选
function recordFilter(filter,that){
  var filterNav = that.data.filterNav;
  for (let i = 0; i < filterNav.length;i++){
    if (filterNav[i].filter==filter)
    {
      filterNav[i].selected=true;
      that.filter = filter;
      //根据筛选条件获取积分记录列表
      getIntegralRecord(that)
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
  getIntegralRecord,
  recordFilter
};