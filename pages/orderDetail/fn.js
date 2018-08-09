var _util = require('../../utils/util.js');
//获取订单详情
function getOrderDetail(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    order_id:that.gid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
   // var res = res.getOrderDetail;
    if (res.encode==0) {
      var data = res.info;
      if (Number(data.create_at))
      {
        data.create_at = _util.formatTime(new Date(Number(data.create_at) * 1000), '-', true)
      }
      /*{
          img_url:'',
          cardvalue:'200',
          cardname:"携程3",
          cardid:232322
        }*/
      var card=[];
      if (data.type=='1')//快递信息
      {
        card.push({
          cardvalue: data.express_name,
          cardname: data.express_time!=null?_util.formatTime(new Date(Number(data.express_time) * 1000), '-', false):null,
          cardid: data.express_code
        })
      }
      else//礼品卡券
      {
        //获取礼券卡号
        let code_detail = data.code_detail||'[]';
        var cardCodeList = JSON.parse(code_detail.trim()||'[]');
        for (let i = 0; i < cardCodeList.length;i++){
          card.push({
            cardvalue: data.price,
            cardname: data.name,
            cardid: cardCodeList[i]
          })
        }
      }
      data.card = card;
      that.setData({
        giftDetail: data
      })
    }

  }, (err) => {
    wx.hideLoading()
    }, 'order/detail', undefined, undefined)
}


module.exports = {
  getOrderDetail
};