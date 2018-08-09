var _util=require('../../utils/util.js');
//获取礼品种类按钮
function getGiftType(that)
{
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  _util.Ajax({},(res)=>{
    wx.hideLoading();
    var res = res.allGiftType;
    if (res.encode)
    {
      var data=res.data;
      for(let i=0;i<data.length;i++){
        if(i==0)
        {
          data[i].selected = true
        }
        else
        {
          data[i].selected = false
        }
       
      }
      that.setData({
        giftTypeBtn: data
      })
    }

  },(err)=>{
    wx.hideLoading()
    }, 'gift', undefined, undefined)
}
//恢复积分筛选初始值
function integralDefaultBtn(btns,that)
{
  for(let i=0;i<btns.length;i++){
    if(i==0)
    {
      btns[i].selected=true;
    }
    else
    {
      btns[i].selected = false;
    }
  }
  that.oid=0;
}
//根据不同礼品和筛选条件获取礼品列表
function getGiftList(uid,pagenum,pagesize,cid,oid,hasbtn,that){
  var giftLists = that.data.giftList == null ? [] : that.data.giftList;
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData={
    member_id:uid,
    page_num:pagenum,
    page_size:pagesize,
    category_id:cid,
    option_id:oid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    //var res = res.getgiftlist;
    if (res.encode==0) {
      //判断是否生成导航按钮
      if (!hasbtn)
      {
        var giftTypeBtn = that.data.giftTypeBtn;
        var category = res.category;
        //添加分类按钮
        for (let key in category){
          giftTypeBtn.push({
            btnname: category[key],
            gtype: key,
            selected:false
          })
        }
        that.setData({
          giftTypeBtn
        });
      }
      //判断是否还有礼品列表
      if (!res.list.length && Array.isArray(res.list))
      {
        wx.showToast({
          title: '没有更多数据',
          image: '../../images/notice_2.png',
          mask: true
        })
        
        return
      }
      giftLists.push(...res.list) 
      that.setData({
        giftList: giftLists
      })
      that.scollflag=true
    }
  }, (err) => {
    wx.hideLoading()
    that.scollflag = true
    }, 'good/index', undefined, undefined)

}
module.exports = {
  getGiftType,
  integralDefaultBtn,
  getGiftList
};