var _util = require('../../utils/util.js')
//引入配置文件
var config = require('../../config.js')

function getActivityList(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })

  let sendData = {
    member_id: that.uid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    // res = JSON.parse(res.data);
    if (res.encode == 0) {
      let acList = res.data;
      for (let i = 0; i < acList.length; i++) {
        let data = acList[i];

        let start_time = data.start_time;
        let end_time = data.end_time;

        //判断是否报名
        let isSing = 0;
        if (that.nowDate - end_time > 0) {
          isSing = 0 //已结束
        } else if (that.nowDate - start_time < 0) {
          isSing = 1 //未开始
        } else {
          isSing = 2 //活动开始
        }

        start_time = _util.formatTime(new Date(Number(data.start_time) * 1000), '-', true);
        end_time = _util.formatTime(new Date(Number(data.end_time) * 1000), '-', true);

        if (start_time.substring(0, 10) === end_time.substring(0, 10)) {
          data.end_time = end_time.substring(11, end_time.length);
        } else {
          data.end_time = end_time;
        }

        data.start_time = start_time;
        data.isSing = isSing;

        acList[i] = data;

      }

      that.setData({
        activityList: acList
      });

    }
  }, (res) => { wx.hideLoading(); }, 'activity/list');

};

module.exports = {
  getActivityList
};