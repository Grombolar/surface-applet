
const _util = require('../../utils/util.js');
//引入配置文件
var config = require('../../config.js')
//获取活动详情
function getActivityDetial(that, succ) {
  let sendData = {
    activity_id: that.activity_id,
    member_id: that.uid
  }
  _util.Ajax(sendData, (res) => {
    succ(res);
  }, (err) => {
    wx.showModal({
      content: '网络出现问题，请稍后重试'
    })

  }, "activity/detail", undefined, undefined)

}

//选择活动模板
function selectActivity(that, res) {
  let aType = parseInt(res.activity.type);
  let temp = "";
  if (aType === 3) {
    // if (res.data.exam_status === 0) {
    wx.redirectTo({
      url: '/pages/questionnaire/questionnaire?exam_id=' + res.activity.exam_id + '&examStatus=' + res.exam_status + '&title=' + res.activity.name + '&type=调查问卷：'

    });
  } else {
    temp = "detial";
  }

  let tempData = res;
  let data = tempData.activity;
  let rich = data.detail;
  //改变img样式
  let reg = /<img/g;
  let restring = '*img style="width:100%; vertical-align:bottom;"'
  data.detail = _util.richTextImg(reg, data.detail, restring);
  reg = /\*/g;
  data.detail = _util.richTextImg(reg, data.detail, '<');

  //开始，结束时间
  let start_time = data.start_time;
  let end_time = data.end_time;
  //签到信息
  let acme = tempData.activityMember;
  //是否显示问卷
  let show_exam = parseInt(tempData.activity.show_exam);
  let showExam = false;
  if (show_exam === 1) {
    showExam = true;
  }

  //判断是否报名
  let isSing = 0;
  if (that.nowDate - end_time > 0) {
    isSing = 0 //已结束
    showExam = true;
  } else if ((that.nowDate - start_time < 0) && (acme === null || acme === '' || acme === undefined) ){
    isSing = 1 //未开始
  } else if ((that.nowDate - start_time < 0) && (acme !== null)) {
    isSing = 5 //报名未签到
  } else if (acme === null || acme === '' || acme === undefined) {
    isSing = 2 //未报名
  } else if (acme.sign_in_time === null || acme.sign_in_time === '') {
    isSing = 3 //未签到
  }else{
    isSing = 4 //已签到
  }


  start_time = _util.formatTime(new Date(Number(data.start_time) * 1000), '-', true);
  end_time = _util.formatTime(new Date(Number(data.end_time) * 1000), '-', true);

  if (start_time.substring(0, 10) === end_time.substring(0, 10)) {
    data.end_time = end_time.substring(11, end_time.length);
  } else {
    data.end_time = end_time;
  }

  data.start_time = start_time;

  tempData.activity = data;
  tempData.isSing = isSing;
  tempData.showExam = showExam;
  that.setData({
    temp: temp,
    tempData: tempData,
    // isSing: isSing
  })
}

//用户报名
function UserSingUp(that) {
  let sendData = {
    activity_id: that.activity_id,
    member_id: that.uid
  }
  _util.Ajax(sendData, (res) => {
    let tempData = that.data.tempData;
    // 已报名，未签到;
    tempData.isSing = 3;
    that.setData({
      tempData: tempData
    });
    wx.hideLoading();
  }, (res) => {
    wx.hideLoading();
  }, "activity/signup")
}
//用户签到
function UserSingIn(that) {
  let sendData = {
    activity_id: that.activity_id,
    member_id: that.uid
  }
  _util.Ajax(sendData, (res) => {
    if (res.encode === 0) {
      let tempData = that.data.tempData;
      tempData.isSing = 4;
      that.setData({
        tempData: tempData
      });
    } else {
      wx.showModal({
        title: res.msg,
        mask: true
      })
    }
    wx.hideLoading();
  }, (res) => {
    wx.hideLoading();
  }, "activity/signin")
}
module.exports = {
  getActivityDetial,
  selectActivity,
  UserSingUp,
  UserSingIn
};