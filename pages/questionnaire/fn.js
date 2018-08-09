const _util = require('../../utils/util.js');
//引入配置文件
var config = require('../../config.js')
//获取调查问卷
function getNaire(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  });
  if (that.examStatus === 1) {
    getAnswerDetail(that)
  } else {
    let sendData = {
      exam_id: that.tid
    }
    _util.Ajax(sendData, (res) => {
      wx.hideLoading();
      let result = res;
      if (result.encode) {
        var data = formData(result.list, that);
        var moreUrl = result.info.redirect_url;
        that.setData({
          testList: data,
          hiddenPage: false,
          moreUrl: moreUrl
        })
      }
    }, (err) => {
      wx.hideLoading()
    }, 'exam/detail')
  }

}

//数据转换格式
function formData(list, that) {
  var data = {
    // testtype: that.teststatus,//0未开始考试1通过2未通过
    testtype: that.examStatus
  }
  var testlist = [];
  for (let i = 0; i < list.length; i++) {
    let radio = "";
    let answerTxt = '';
    if (list[i].type === 'radio') {
      radio = 'radio_question'
    } else if (list[i].type === 'checkbox') {
      radio = 'multiselect_question'
    } else if (list[i].type === 'text') {
      radio = 'text_question'
      answerTxt = list[i].answer
    }
    var answer = {
      qid: list[i].id,
      testtile: list[i].name,//测试问题
      radio: radio,
      answerTxt: answerTxt
      // radio: list[i].type == 'checkbox' ? false : true,//true未单选false未多选题,
    }
    var option = list[i].option;
    if (list[i].type === 'text') {
      answer.selectitems = '';
    } else {
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
    }

    testlist.push(answer)
  }
  data.testlist = testlist;

  return data
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
//用户填写问答题
function inputText(qid, testListQ, text, that) {
  let testList = testListQ.testlist;
  for (let i = 0; i < testList.length; i++) {
    if (qid == testList[i].qid) {
      testList[i].selectitems = text;

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

    // console.log(JSON.stringify(res));
    if (res.encode) {
      that.setData({
        isSubmit: true
      });
      let animation1 = wx.createAnimation({ duration: 200 });
      setTimeout(function () {
        animation1.translateX(-wx.getSystemInfoSync().windowWidth).step();
        that.setData({
          animationShow: animation1.export(),
        })
      }.bind(that), 200)

    }
  }, (err) => {
    wx.hideLoading()
  }, 'exam/commit', undefined, undefined)
}

//获取答题详情
function getAnswerDetail(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    exam_id: that.tid,
    member_id: that.uid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode) {
      // console.log(JSON.stringify(res));
      var data = formData(res.list, that);
      that.setData({
        testList: data,
        result: {
          fail: res.fail,
          score: res.score,
          success: res.success
        },
        hiddenPage: false,
        isSubmit: true,
      })

    }
  }, (err) => {
    wx.hideLoading()
  }, 'exam/history', undefined, undefined)
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
  getNaire,
  formData,
  radioSelect,
  inputText,
  submitAnswer,
  checkUser,
  getAnswerDetail
}