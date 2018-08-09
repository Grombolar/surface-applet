var _util = require('../../utils/util.js');
var TimeAni = require('../../utils/timeAnimation.js');
//获取用户签到信息
function getSignInfo(uid,that,cb) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData={
    member_id:uid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode) {
      var data=res.data;
      //通过去5的余数，判断是第几个签到
      var hassigned = data.hassigned%5;
      for (let i = 0; i < data.signdays.length;i++){
        //如果签到未0或者取5的模不为0
      //  if (hassigned || data.hassigned==0)
        
          //小于hassign表示是已经签到
        if (i < hassigned)
        {
          data.signdays[i].issign=true;
        }
        else
        {
          data.signdays[i].issign =false;
        }
        
       if (data.hassigned>=5) //大于等于5天全部为真
        {
          data.signdays[i].issign = true;
        }
       if (data.hassigned > 5)//超过5天，最后一个元素则给我5+
       {
         //计算连续天数
         data.signdays[4].day ='5+';
       }
        
      }
      //刷新页面
      that.setData({
        signInfo:data,
        hiddenPage:false
      })
      //执行回调函数
      if (typeof cb =='function')
      {
        cb(data.myintegral)
      }
      else
      {
        //动画实例
        var ta = new TimeAni.TimeAnimation(0, data.myintegral, this)
        ta.init((res) => {
          that.setData({
            myIntegral: Math.round(res)
          });
        })
      }
     
    }
  }, (err) => {
    wx.hideLoading()
    }, 'sign/index', undefined, undefined)
}
//用户签到
function signIn(uid,that,cb){
  wx.showLoading({
    title: '正在签到...',
    mask: true
  })
  var sendData = {
    member_id:uid
  }
  _util.Ajax(sendData, (res) => {
    if (res.encode) {
      getSignInfo(uid, that, (myintegral)=>{
        cb(myintegral)
        wx.showToast({
          title: res.msg,
          mask: true,
          duration: 2000
        })
      })
       
     // },2000)
     
    }
  }, (err) => {
    //wx.hideLoading()
    }, 'sign/signin', undefined, undefined)
}

module.exports = {
  getSignInfo,
  signIn
};