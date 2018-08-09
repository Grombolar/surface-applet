//引入配置文件
var config = require('../config.js')
//测试假数据引入
var datas = require('./data.js');
var addresslist = require('./addressList.js');
//把时间戳转换成正常时间
function formatTime(date, str, showTime) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  //转换成yyyy-m-d
  var format = [year, month, day].map(formatNumber).join(str);
  if (showTime) {
    //转换成yyyy-m-d h:m
    format = [year, month, day].map(formatNumber).join(str) + ' ' + [hour, minute].map(formatNumber).join(':');
  }
  return format
}
//时间补位
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//随机生产字符串
function RandomString() {
  var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var n = 5, s = "";
  for (var i = 0; i < n; i++) {
    var rand = Math.floor(Math.random() * str.length);
    s += str.charAt(rand);
  }
  return s
}
//AJAX请求
/*
  data:请求参数
  succ:返回成功函数
  fail:返回失败函数
  text：加载时显示内容
  reqtype:请求方式
  contentType：请求内容的类型
*/
function Ajax(data, succ, fail, path, reqtype, contentType) {
  const requestTask = wx.request({
    url: config.url + path,
    data: data,
    method: reqtype || 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
       "Content-Type": contentType == undefined ? "application/json":"application/x-www-form-urlencoded"
        },
    dataType:'JSON',
    success: function (res) {
      if (res.statusCode == 200) {
        var res = res.data;
        if (typeof res == "string" && res!='')
        {
          res=JSON.parse(res.trim())
        }
        succ(res);
      }
      else
      {
        //测试
        succ(datas);
        fail()
      }
      // 取消请求任务
      if (requestTask) {
        requestTask.abort()
      }
    },
    fail: function (res) {
      //wx.hideLoading()
      fail(res);
      //测试
      succ(datas);
    },
    complete: function (res) {
      
    }
  });

}

// //本地发送ajax
// function AjaxLocal(data, succ, fail, path, reqtype, contentType) {
//   const requestTask = wx.request({
//     url: config.secondApi + path,
//     data: data,
//     method: reqtype || 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
//     header: {
//       "Content-Type": contentType == undefined ? "application/json" : "application/x-www-form-urlencoded"
//     },
//     dataType: 'JSON',
//     success: function (res) {
//       if (res.statusCode == 200) {
//         var res = res.data;
//         if (typeof res == "string" && res != '') {
//           res = JSON.parse(res.trim())
//         }
//         succ(res);
//       }
//       else {
//         //测试
//         succ(datas);
//         fail()
//       }
//       // 取消请求任务
//       if (requestTask) {
//         requestTask.abort()
//       }
//     },
//     fail: function (res) {
//       //wx.hideLoading()
//       fail(res);
//       //测试
//       succ(datas);
//     },
//     complete: function (res) {
//
//     }
//   });
//
// }

//上传图片
function uploadFileImage(tempFilePaths,path,cb,fail) {
  wx.uploadFile({
   url: config.url + path, 
    filePath: tempFilePaths,
    name: 'file',
    header: { 'content-Type': 'multipart/form-data' },
    success:cb,
    fail: fail
  })
}
//授权判断
function getUserPower(app,authSetting,cb) {
  if (wx.getSetting) {
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting[authSetting]) {
          wx.showModal({
            title: '提示',
            content: '您尚未登录，请重新登录',
            success: function (res) {
              if (res.confirm) {
                //调研授权函数
                if (authSetting == 'scope.userInfo')
                {
                  power(app, cb);
                }
              } else if (res.cancel) {
                cb(null)
              }
            }
          })
        }
      }
    })
  }
  else {
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试',
      showCancel: false
    })
  }

}

//个人信息授权函数
function power(app, cb) {
  wx.openSetting({
    success: (res) => {
      // console.log(res.authSetting)
      var authSetting = res.authSetting['scope.userInfo']
      if (authSetting) {
        app.getUserInfo(null, cb, '')
      }
    }
  })
}

/*新版授权*/
function getUserPowerNew(auth, one,cb,fail) {
  //获取用户的当前设置。
  wx.getSetting({
    success(res) {

      // console.log("判断授权");

      //判断当前用户设置是否为真
      if (!res.authSetting[auth]) {//不为真

      // console.log("没授权");
      
        //提前向用户发起授权请求
        // wx.authorize({
        //   scope: auth,
        //   success:(r)=> {//用户勾选了直接执行回调
        //     cb()
        //   },
        //   fail:()=> {
        //     //调起客户端小程序设置界面，返回用户设置的操作结果。
        //     if (one)
        //     {
        //       fail()
        //     }
        //   }
        // })
        cb();

      // wx.navigateTo({
      //   url: '../authorization/authorization'
      // });

      }
      else//如果为真，则执行
      {
        cb()
      }
    }
  })
}

//判断组件是否兼容（1.2.1开始）
function checkComponent(str) {//'picker.mode.region'
  return wx.canIUse(str)
}
//获取省份列表
function getProvince() {
  var prolist = ['--请选择--'];
  for (var i = 0; i < addresslist.length; i++) {
    prolist.push(addresslist[i].name)
  }
  // console.log(prolist)
  return prolist
}
//获取市列表
function getCity(proStr) {
  var citylist = ['--请选择--'];
  for (var i = 0; i < addresslist.length; i++) {
    if (addresslist[i].name === proStr) {
      for (var k = 0; k < addresslist[i].city.length; k++) {
        citylist.push(addresslist[i].city[k].name);
      }
      break;
    }

  }
  return citylist
}
//获取区县
function getCountry(proStr, cityStr) {
  var countrylist = ['--请选择--'];
  for (var i = 0; i < addresslist.length; i++) {
    if (addresslist[i].name === proStr) {
      for (var k = 0; k < addresslist[i].city.length; k++) {
        if (addresslist[i].city[k].name == cityStr) {
          countrylist = countrylist.concat(addresslist[i].city[k].area)
          return countrylist
        }
      }
    }
  }
}
//处理富文本相关样式
/*
reg：正则
string:替换的标签名
replaceString:标签名
*/
function richTextImg(reg, strings, replaceString) {
  var arr = null;
  while (arr = reg.exec(strings) != null) {
    strings = strings.replace(reg, replaceString);
  }
  return strings
}
//限制上传图片大小
function imageSize(imageArray){
  var isOK=false;
  if (imageArray instanceof Array&& imageArray.length)
  {
    isOK= imageArray.every(function(item){
      return item.size <= config.imageSize
    })
  }
  return isOK
}
//修改当前主页的导航条
function upDateNav(nid,nlist,app){
  for (let i = 0; i < nlist.length;i++){
    if(nid==nlist[i].index){
      nlist[i].selected=true;
    }
    else
    {
      nlist[i].selected = false;
    }
  }
  app.globalData.tabbar=nlist;
} 
//显示提示功能
function showNotice(that,title){
  that.setData({
    showToast: true,
    title:title
  });
  setTimeout(() => {
    that.setData({
      showToast: false
    });
    wx.hideLoading()
  }, 2000)
}
module.exports = {
  RandomString: RandomString,
  Ajax: Ajax,
  // AjaxLocal: AjaxLocal,
  getUserPower: getUserPower,
  getUserPowerNew: getUserPowerNew,
  formatTime: formatTime,
  checkComponent: checkComponent,
  getProvince: getProvince,
  getCity: getCity,
  getCountry: getCountry,
  richTextImg: richTextImg,
  uploadFileImage: uploadFileImage,
  imageSize: imageSize,
  upDateNav: upDateNav,
  showNotice: showNotice
}
