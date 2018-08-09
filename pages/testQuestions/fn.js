var _util = require('../../utils/util.js');
//获取测试题库
function getTest(tid, that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    exam_id: tid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode) {
      var data = formData(res.list, that);
      that.setData({
        examstatus: parseInt(res.info.type),
        testList: data,
        hiddenPage: false,
        remark: res.info.remark == null ? '' : res.info.remark//备注信息
      })
    }
  }, (err) => {
    wx.hideLoading()
  }, 'exam/detail', undefined, undefined)
}
//数据转换格式
function formData(list, that) {
  var data = {
    testtype: that.teststatus,//0未开始考试1通过2未通过
  }
  var testlist = [];
  for (let i = 0; i < list.length; i++) {
    var answer = {
      qid: list[i].id,
      testtile: list[i].name,//测试问题
      radio: list[i].type == 'checkbox' ? false : true,//true未单选false未多选题,
    }
    var option = list[i].option;
    answer.selectitems = [];
    for (let j = 0; j < option.length; j++) {
      if (option[j].name != '') {
        answer.selectitems.push({
          id: option[j].id,//选项对应的id 
          item: option[j].name,//选项内容,
          isselect: option[j].is_select == undefined ? false : option[j].is_select,//用户选择的
          answeris: option[j].is_answer == undefined ? false : option[j].is_answer
        })
      }

    }
    testlist.push(answer)
  }
  data.testlist = testlist;

  return data
}
//获取答题详情
function getAnswerDetail(tid, that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    exam_id: tid,
    member_id: that.uid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode) {
      var data = formData(res.list, that);
      that.setData({
        testList: data,
        result: {
          fail: res.fail,
          score: res.score,
          success: res.success
        },
        hiddenPage: false,
        examstatus: parseInt(res.info.type)
      })
    }
  }, (err) => {
    wx.hideLoading()
  }, 'exam/history', undefined, undefined)
}
//用户单选
function radioSelect(qid, testListQ, aid, that) {
  var testList = testListQ.testlist
  for (let i = 0; i < testList.length; i++) {
    //找到相应的问题
    if (qid == testList[i].qid) {
      var qlist = testList[i].selectitems;
      for (let k = 0; k < qlist.length; k++) {
        //判断aid是否是数组，如果是数组，则是多选，
        if (Array.isArray(aid) && aid.length != 0) {
          if (aid.includes(qlist[k].id)) {
            qlist[k].isselect = true;
          }
          else {
            qlist[k].isselect = false
          }
        }
        else//否则为单选
        {
          if (aid == qlist[k].id) {
            qlist[k].isselect = true
          }
          else {
            qlist[k].isselect = false
          }
        }

      }
    }
  }
  that.setData({
    testList: testListQ
  })
}
//用户多选
function checkboxSelect(qid, testListQ, aidArr, that) {
  var testList = testListQ.testlist;
  for (let i = 0; i < testList.length; i++) {
    if (qid == testList[i].qid) {
      var qlist = testList[i].selectitems;
    }
  }

}
//提交答案
function submitAnswer(answers, that) {
  wx.showLoading({
    title: '正在提交...',
    mask: true
  })
  var answerlist = [];
  for (let key in answers) {
    var obj = {
      question_id: key
    }
    var option = [];
    //判断是否是数组
    if (Array.isArray(answers[key])) {
      //对多选答案进行升序排序
      obj.option = answers[key].sort((a, b) => {
        return Number(a) - Number(b)
      });

    }
    else {
      obj.option = [answers[key]];
    }
    answerlist.push(obj)

  }
  var sendData = {
    member_id: that.uid,
    exam_id: that.tid,
    question: answerlist
  }

  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode) {
      //设置是否通过 is_succsee 1通过 0未通过
      if (parseInt(res.is_success)) {
        //0未开始考试1通过2未通过
        that.teststatus = 1;
      }
      else {
        that.teststatus = 2;
      }
      //调用查看结果，重新渲染页面
      getAnswerDetail(that.tid, that)
    }
  }, (err) => {
    wx.hideLoading()
  }, 'exam/commit', undefined, undefined)
}
//判断用户有多少题没答
function checkUser(list) {
  let total = 0;//统计回答多少道题
  let totals = 0;//统计总共有多少道题
  for (let key in list) {

    if (Array.isArray(list[key])) {
      //判断多选有没有回答
      if (list[key].length) {
        total++
      }
    }
    //判断是否是单选
    if (typeof list[key] == 'string') {
      if (list[key] != '') {
        total++
      }
    }
    totals++;
  }

  return totals - total

}
module.exports = {
  getTest,
  radioSelect,
  submitAnswer,
  getAnswerDetail,
  checkUser
};