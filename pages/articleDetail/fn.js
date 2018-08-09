var _util = require('../../utils/util.js')
var config = require('../../config.js')

//获取mini刊列表
function getArticleDetail(uid, jid, that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    news_id: jid,
    member_id: uid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();

    if (res.encode == 0) {
      var data = res.data;
      // var rich = data.detail;

      let articleType = data.type; //文章类型

      let oldarticle = data.detail;

      let regv = /<\/iframe><\/(p|div)>/
      let article = oldarticle.split(regv);

      // console.log(article.length);

      article = article.filter( art =>{
        if(art.length > 4){
          return art;
        }
      })

      let articleArray =  article.map((fragement) =>{
        let fragArray = fragement.split(/<(div|p) style="text-align: center;"><iframe/gi);

        // console.log(JSON.stringify(fragArray))

          let fragArticle = fragArray[0];
          let fragVideoStr = fragArray[2];

          fragArticle = mangeArticle(fragArticle, articleType);
          let fragVideoId = fragVideoStr != undefined ? fragVideoStr.substring(fragVideoStr.indexOf('?vid=') + 5, fragVideoStr.indexOf('&tiny')) : '';

          let fragObj = {
            'fragArticle': fragArticle,
            'fragVideoId': fragVideoId
          }
          return fragObj;
      });

      // data.detail = `<div style="position:relative">` + rich;
      // data.detail += `<div style="position:absolute;left:0;top:0;bottom:0;right:0;background-color:rgba(0,0,0,0)">
      // ${data.type == 1 ? makeMark(that.username, that.company) : ''}
      // </div></div>`;

      // //改变img样式
      // var reg = /<img/g;
      // var restring = '*img style="width:100%; vertical-align:bottom;"'
      // data.detail = _util.richTextImg(reg, data.detail, restring);
      // reg = /\*/g;
      // data.detail = _util.richTextImg(reg, data.detail, '<');

      // data.detail = replace(/<section>/g, '<div>', data.detail );
      // data.detail = replace(/<\/section>/g,'</div>', data.detail);
      // data.create_at = _util.formatTime(new Date(Number(data.create_at) * 1000), '-', false);
      // data.files = res.doc.length ? res.doc : 0;
      // data.type = data.type;//type=1为保密2为公开
      // data.username = that.username;//经销商姓名
      // data.expire_time = Number(data.expire_time) == 1 ? '永久' : '保密期：' + _util.formatTime(new Date(Number(data.expire_time) * 1000), '-', false);
      
      console.log(articleArray.length);
      
      that.setData({
        articleDetail: data,
        // video_url: data.video_url,
        articleDetailList: articleArray,
        company: that.company,
        showPages: true
      })
      setTimeout(() => {
        that.setData({
          video_url: data.video_url
        })
      }, 1000)
    }
  }, (err) => {
    wx.hideLoading()
  }, 'news/detail', undefined, undefined)

}

//处理文章字符串
function mangeArticle(rich,arType){
  let detail = '';
  detail = `<div style="position:relative">` + rich +`</div>`;
  //改变img样式
  var reg = /<img/g;
  var restring = '*img style="width:100%; vertical-align:bottom;"'
  detail = _util.richTextImg(reg, detail, restring);
  reg = /\*/g;
  detail = _util.richTextImg(reg, detail, '<');

  return detail;
}

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
              mask: true
            })
          }
        })
      }
      else {
        wx.showToast({
          title: '打开文件失败',
          image: '../../images/notice_1.png',
          mask: true
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
        mask: true
      })
    }
    else {
      wx.showToast({
        image: '../../images/send_err.png',
        title: '发送失败',
        mask: true
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
  getArticleDetail,
  viewPDFFile,
  sendEmail
};