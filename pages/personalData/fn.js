var _util = require('../../utils/util.js');
//申请经销商或查看申请状态
function getApplySaleInfo(that,cb) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var reqUrl='';//请求地址
  var isSale=false;//默认为普通用户
  var hid=false;
  if (that.power!==0)//经销员和管理员
  {
    reqUrl ='member/get-auth';
    isSale = true;
    hid = false;
  }
  else//普通用户
  {
    reqUrl = 'member/get-info';
    isSale = false;
    hid = true
  }
  var sendData = {
    member_id: that.uid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode) {
      var data=res.data;
      var company_id='';//公司id
      var info='';//基本信息
      var manager='';//联系管理员信息
      var authentication=0;//默认为没有通过认证的
      var isShowApplyTip=false;//默认不显示申请提示
      var conpanySelect=true
      let gender = true;
      //非普通用户
      if (that.power !== 0)
      {
        var sexData = data.userinfo;
      }
      else//普通用户
      {
        var sexData=data;
      }
      //判断性别
      if (sexData.sex == '1')//男
      {
        gender = true
      }
      else//女
      {
        gender = false
      }
      if (that.power == 0)//普通用户
      {
        company_id = data.company_id || 0;
        info=data;
        isShowApplyTip=true;
        conpanySelect=false
      }
      else //正在申请的
      {
        company_id = data.userinfo.company_id;
        info = data.userinfo;
        manager = data.companyinfo;
        conpanySelect = true
        //判断是否申请通过
        if (that.isAuditing)//通过
        {
          authentication=1
        }
        else if (that.isAuditing==0&&that.power==1)//未认证的经销员
        {
          authentication = 1
        }
        else
        {
          authentication = 0
        }
      }
      //执行回调函数，并返回公司id
      cb(company_id)
      that.setData({
        issale: isSale,
        info: info,
        manager: manager,
        authentication: authentication,
        isShowConpany:true,
        isShowApplyTip: isShowApplyTip,
        conpanySelect: conpanySelect,
        gender:gender,
        hid:hid
      })
    }

  }, (err) => {
    wx.hideLoading()
    }, reqUrl, undefined, undefined)
}
//获取个人资料信息
function personData(that){
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData={
    member_id: that.uid
  }
  var isSale = false;//默认为普通用户
  var isShowConpany=false;//默认不显示公司
  var hid=false;
  if (that.power!=0)//非普通用户
  {
    isSale=true;
    isShowConpany = true;
    hid = false;
  }
  else
  {
    isSale = false;
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
  //  var res = res.putong;
    if (res.encode) {
     
      var data = res.data;
      
      let gender=true;
      //判断性别
      if (data.sex=='1')//男
      {
        gender=true
      }
      else//女
      {
        gender = false
      }
      if (that.power != 0) {
        //经销员和管理员可获取公司列表
        getConpanyList(data.company_id, that)
      }
      that.setData({
        info: data,
        issale: isSale,
        src: that.src == 'person'?true:false,//判断来源
        isShowConpany: isShowConpany,
        gender: gender,
        hid: hid      
      })

    }

  }, (err) => {
    wx.hideLoading()
    }, 'member/get-info', undefined, undefined)
  
}
//获取公司名称列表
function getConpanyList_X(company_id,that){
  var sendData = {
   
  }
  sendData = Object.assign(sendData, that.form);
  _util.Ajax(sendData, (res) => {

    //res不为null
    if(res!=null)
    {
      var index=0;//默认下标为0
      var conpanylist=[];
      for (let key in res){
        if (key == company_id){
          //设置用户默认地址
            that.setData({
              index: index
            })
        }
        conpanylist.push({
          company_name:res[key],//公司名称
          company_id:key//公司id
        })
        index++;
      }

      setTimeout(()=>{
        
      },500)
      //刷新页面
      that.setData({
        conpanylist
      })
    }
    else{

    }
  }, (err) => {
    }, 'member/company-list', undefined, undefined)
}
//获取公司名称列表
function getConpanyList(company_id, that) {
  var sendData = {

  }
  sendData = Object.assign(sendData, that.form);
  _util.Ajax(sendData, (res) => {

    //res不为null
    if (res != null) {
      var index = 0;//默认下标为0
      var conpanylist = [];
      that.conpanyId=[];
      for (let key in res) {
        if (key == company_id) {
          //设置用户默认地址
          that.setData({
            index: index,
            value: key
          })
        }
        conpanylist.push(res[key]);
        that.conpanyId.push(key)
        /*
        conpanylist.push({
          company_name: res[key],//公司名称
          company_id: key//公司id
        })*/
        index++;
      }

      //刷新页面
      that.setData({
        conpanylist
      })
    }
    else {

    }
  }, (err) => {
  }, 'member/company-list', undefined, undefined)
}
//普通用户保存个人信息
function saveInfo(that){
  wx.showLoading({
    title: '正在保存...',
    mask: true
  })
  var sendData={
    member_id:that.uid,
  }
//默认不选为女
  if (that.form.sex=='')
  {
    that.form.sex=2;
  }
  sendData = Object.assign(sendData, that.form);
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
  
    if (res.encode) {
    
      wx.showToast({
        title: res.msg,
        duration:2000,
        mask:true
      })  
      //调用标识
      addMark()
      setTimeout(()=>{
        wx.navigateBack({
          delta:1
        })
      },2000)
    }

  }, (err) => {
    wx.hideLoading()
    }, 'member/set-info', undefined, undefined)
}
//获取公司代号对应的公司名称
function getConpayName(that,cb){
  var sendData={
    mpn_num: that.form.mpn_num
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    
    if (res.encode==-1) {
     wx.showModal({
       content: res.msg,
       showCancel:false
     })
    }
    else if (res.encode ==1)
    {
      wx.showModal({
        content: '是否确认加入' + res.name + '?',
        success:res=>{
          if (res.confirm) {
           cb()
          } 
        }
      })
    }

  }, (err) => {
    wx.hideLoading()
    },'member/get-company', undefined, undefined)
}
//经销商申请认证
function applyAuthentication(that,cb){
  wx.showLoading({
    title: '正在提交...',
    mask: true
  })
  var sendData = {
    member_id: that.uid,
  }
  //sendData = Object.assign(sendData, that.form);
  for (let key in that.form){
    //判断性别
    if (key =='sex')
    {
      if (that.form[key]=='')//如果为空
      {
        that.form[key]='0';//默认为0
      }

    }
    //判断公司
    if (key == 'company_id') {
      if (!that.form[key])//如果为空
      {
        that.form[key] = that.conpanyId[0];//默认为0
      }

    }
    sendData[key] = that.form[key];

  }

  _util.Ajax(sendData, (res) => {
    wx.hideLoading();

    if (res.encode) {
      wx.showToast({
        title: '提交成功',
        mask:true,
        duration:2000
      })
      //调用标识
      addMark()

      cb()
    }

  }, (err) => {
    wx.hideLoading()
    }, 'member/set-auth', undefined, undefined)
}
//验证邮件和手机号
function check(formData){
  var isok=true;
  for(let key in formData){
    //经销商MPN
    if (key == 'mpn_num'&&arguments[1]) {
      if (formData[key].trim()== '') {
        wx.showToast({
          title: 'MPN不为空',
          image: '../../images/null.png',
          mask: true
        })
        isok = false;
        break;
      }
      else {
        isok = true;
      }
    }
    //姓名
    if (key =='username')
    {
      if(formData[key]=='')
      {
        wx.showToast({
          title: '姓名不为空',
          image: '../../images/null.png',
          mask: true
        })
        isok = false;
        break;
      }
      else
      {
        isok = true;
      }
    }
    //手机判断
    if (key =='userphone')
    {
      if (formData[key]=='')
      {
        wx.showToast({
          title: '手机号不为空',
          image: '../../images/null.png',
          mask: true
        })
        isok = false;
        break;
      }
      var userphone = /^1[3|5|7|8][0-9]\d{8}$/;
      if (!userphone.test(formData[key]))
      {
        wx.showToast({
          title: '手机号不正确',
          image:'../../images/err.png',
          mask:true
        })
        isok = false;
        break;
      }
      else
      {
        isok = true;
      }

    }
    //电子邮件
    if (key =='useremail')
    {
      if (formData[key] == '') {
        wx.showToast({
          title: '邮箱不为空',
          image: '../../images/null.png',
          mask: true
        })
        isok = false;
        break;
      }
      var useremail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (!useremail.test(formData[key])) {
        wx.showToast({
          title: '邮箱不正确',
          image: '../../images/err.png',
          mask: true
        })
        isok = false;
        break;
      }
      else
      {
        isok = true;
      }
    }

  }
  return isok
}
//添加是否保存个人信息和提交认证的标记，将其保存到缓存里
function addMark()
{
  wx.setStorage({
    key: 'save',
    data: 'ok',
  })
}
module.exports = {
  getApplySaleInfo,
  personData,
  saveInfo,
  applyAuthentication,
  check,
  getConpanyList,
  getConpayName
};