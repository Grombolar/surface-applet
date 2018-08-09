var _util = require('../../utils/util.js')
var config = require('../../config.js')

//预览PDF文件
function viewPDFFile(href) {
  wx.showLoading({
    title: '打开中...',
    mask: true
  })
  wx.downloadFile({
    url: config.url + href,
    success: function (res) {


      if (res.statusCode == 200) {
        wx.hideLoading();
        wx.openDocument({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.hideLoading()
          },
          fail: () => {
            wx.showToast({
              title: '文件不支持阅读',
              image: '../../images/notice_1.png',
              mask: true,
              duration: 2000,
              complete: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)

              }
            })
          }
        })
      }
      else {
        wx.showToast({
          title: '打开文件失败',
          image: '../../images/notice_1.png',
          mask: true,
          duration: 2000,
          complete: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)

          }
        })
      }

    }
  })
}
//发送邮件
function sendEmail(docId, that) {
  wx.showLoading({
    title: '发送中...',
    mask: true
  })
  var sendData = {
    doc_id: docId,
    member_id: that.uid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode == 1) {
      wx.showToast({
        title: '发送完成',
        mask: true,
        duration: 2000,
        complete: function () {
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)

        }
      })
    }
    else {
      wx.showToast({
        image: '../../images/send_err.png',
        title: '发送失败',
        mask: true,
        duration: 2000,
        complete: function () {
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)

        }
      })
    }
  }, (err) => {
    wx.hideLoading()
  }, 'news/send', undefined, undefined)
}
//添加水印 
function makeMark(name, conpany) {
  var ele = '';
  for (let i = 0; i < 110; i++) {

    for (let k = 0; k < 3; k++) {
      ele += ` <div style="position:absolute;
            opacity:1;
            top:${i * 150}px;
            left:${k * 120}px;
            width:300rpx;
            height:50rpx;
            background-color:rgba(204, 204, 204, 0);
            text-align:center;
            line-height:50rpx;
            color:rgba(204, 204, 204, 0.4);
            font-size:20rpx;
            transform:rotate(-35deg) ;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            box-sizing:border-box;
            padding:0 40rpx;
            transform-origin:0 0;
            font-size:14px;
          ">${name + '' + conpany}</div>`
    }

  }
  return ele
}
//替换标签
function replace(reg, rep, ele) {

  return ele.replace(reg, rep)
}
module.exports = {
  viewPDFFile,
  sendEmail
};