
module.exports = {
  userInfo: {
    encode:1,//返回状态
    msg:'',//提示信息
    data:{
      uid: 'cbghxy',//用户id
      power: 0,//权限
      integral: 2000//积分
    }
   
  },
  //加载首页
  indexInfo:{
      encode: 1,
      msg:'',
      data: {
        swiper: [
          {
            img:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            id:'1'
          },
          {
            img:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            id: '2'
          },
          {
            img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
            id: '3'
          }
        ],
        hotgifts: [
          {
            img:'../imgs/phone.png',//图片地铁
            id:'1',//礼品id 
            integral:100,//礼品积分
            name:'电脑保护壳',//礼品名称
            gifttype:'1'//礼品类型（1，礼品卷，2，实物）
          }, {
            img: '../imgs/1.png',
            id: '2',
            integral: 200,
            name: 'iphone7耳机',
            gifttype: '2'
          }, {
            img: '../imgs/2.png',
            id: '3',
            integral: 300,
            name: '手表',
            gifttype: '2'
          }, {
            img: '../imgs/1.png',
            id: '4',
            integral: 400,
            name: '手机壳',
            gifttype: '2'
          }
        ],
        recommend: [
          {
            img: '../imgs/phone.png',
            id: '1',
            integral: 100,
            name: '电脑保护壳',
            gifttype: '2'
          }, {
            img: '../imgs/1.png',
            id: '2',
            integral: 200,
            name: 'iphone7耳机',
            gifttype: '2'
          }, {
            img: '../imgs/1.png',
            id: '3',
            integral: 300,
            name: '手表',
            gifttype: '1'
          }, {
            img: '../imgs/2.png',
            id: '4',
            integral: 400,
            name: '苹果7保护壳模塑了',
            gifttype: '2'
          }, {
            img: '../imgs/2.png',
            id: '4',
            integral: 400,
            name: '苹果7保护壳模塑了',
            gifttype: '1'
          }
        ]
      }
  },
  //获取用户赚取积分情况
  getHowScore:{
    encode: 1,
    msg: '',
    data:{
      //每日签到
      sign:{
        issign:true,//是否签到，true:签到，false:没有签到
        getscore:5//积分
      },
      //答题获取积分
      answer:{
        isanswer: true,
        getscore: 100
      },
      //抽奖获取积分
      lucky:{
        islucky: true,
        getscore: 50
      }
    }
  },
  //获取礼品详情
  getGiftDetail:{
    encode: 1,
    msg: '',
    data: {
      giftDetail:{
        img:'../imgs/2.png',
        title:'300元携程酒店券',
        price:303,
        integral:340,
        giftbase:[
          {
            key:'品牌',
            value:'携程'
          },
          {
            key: '使用城市',
            value: '北京／上海'
          },
          {
            key: '适用范围',
            value: '在携程官网购买机票／酒店'
          },
          {
            key: '有效期',
            value: '2020年12月31日'
          },
          {
            key: '有效期',
            value: '2020年12月31日'
          },
          {
            key: '有效期',
            value: '2020年12月31日'
          }
        ],
        richstring: "<p><br/><br/><!--StartFragment--><img src=\"https://img.alicdn.com/imgextra/i3/711044780/TB2ZvhctUhnpuFjSZFEXXX0PFXa_!!711044780.jpg\"/><!--EndFragment--><br/><br/></p>"
      }
    }

  }
  ,
  //兑换礼品页面的礼品详情
  getExchangeDetail:{
    encode:1,
    msg:'',
    data:{
      img:'../imgs/2.png',
      integral:100
    }
  },
  //立即兑换
  exchangSucc:{
    encode:1,
    msg:'',
    data:{
      warning: 0,//0兑换礼券成功 1兑换实物成功(cardinfo位null)
      cardinfo:{
        cardname:'携程代金券',
        cardid:'ADRV-3665-DTFY',
        cardvalue:'300'
      }
    }
  },
  //每日签到，获取用户签到信息
  getSignInfo:{
    encode: 1,
    msg: '',
    data:{
      hassigned:3,//已签到多少天
      day:4,//第几天
      integral:20,//签到获取多少积分
      todaysign:false,//今天是否签到
      myintegral:2000,//我的积分
      signdays:[//五天签到情况
        {
          integral: 5,//获取积分
          day: 1,//连续第几天
          issign:true,//是否签到
        },
        {
          integral: 5,//获取积分
          day: 2,//连续第几天
          issign: true,//是否签到
        },
        {
          integral: 10,//获取积分
          day: 3,//连续第几天
          issign: true,//是否签到
        },
        {
          integral: 5,//获取积分
          day: 4,//连续第几天
          issign: false,//是否签到
        },
        {
          integral: 5,//获取积分
          day: 5,//连续第几天
          issign: false,//是否签到
        }
      ]

    }

  },
  //用户签到成功返回
  signSucc:{
    encode:1,
    msg:'签到成功',
    data:{
      hassigned: 4,//已签到多少天
      day: 4,//第几天
      integral: 20,//签到获取多少积分
      todaysign: true,//今天是否签到
      myintegral: 2050,//我的积分
      signdays: [//五天签到情况
        {
          integral: 5,//获取积分
          day: 1,//连续第几天
          issign: true,//是否签到
        },
        {
          integral: 5,//获取积分
          day: 2,//连续第几天
          issign: true,//是否签到
        },
        {
          integral: 10,//获取积分
          day: 3,//连续第几天
          issign: true,//是否签到
        },
        {
          integral: 20,//获取积分
          day: 4,//连续第几天
          issign: true,//是否签到
        },
        {
          integral: 5,//获取积分
          day: 5,//连续第几天
          issign: false,//是否签到
        }
      ]
    }
  },
  //礼品种类（全部分类）
  allGiftType:{
    encode:1,
    msg:'',
    data:[
      {
        btnname:'全部',//礼品类名
        gtype:'all',//礼品类型
      },
      {
        btnname: '携程礼券',//礼品类名
        gtype: '1',//礼品类型
      },
      {
        btnname: '购物券',//礼品类名
        gtype: '2',//礼品类型
      },
      {
        btnname: '商务用品',//礼品类名
        gtype: '3',//礼品类型
      },
       {
        btnname: '生活用品',//礼品类名
        gtype: '4',//礼品类型
      }
    ]

  },
  //礼品列表
  getgiftlist:{
    encode:1,
    msg:'',
    data: [
      {
        img: '../imgs/phone.png',//图片地铁
        id: '1',//礼品id 
        integral: 100,//礼品积分
        name: '电脑保护壳',//礼品名称
        gifttype: '1'//礼品类型（1，礼品卷，2，实物）
      }, {
        img: '../imgs/1.png',
        id: '2',
        integral: 200,
        name: 'iphone7耳机',
        gifttype: '2'
      }, {
        img: '../imgs/2.png',
        id: '3',
        integral: 300,
        name: '手表',
        gifttype: '2'
      }, {
        img: '../imgs/1.png',
        id: '4',
        integral: 400,
        name: '手机壳',
        gifttype: '2'
      }
    ]
  },
  //mini刊导航栏
  getNavBar:{
    encode:1,
    msg:'',
    data: [
      {
        btnname: '全部',//礼品类名
        jtype: 'all',//礼品类型
      },
      {
        btnname: '最新资讯',//礼品类名
        jtype: '1',//礼品类型
      },
      {
        btnname: '最新政策',//礼品类名
        jtype: '2',//礼品类型
      },
      {
        btnname: '销售宝典',//礼品类名
        jtype: '3',//礼品类型
      },
      {
        btnname: '常见问题',//礼品类名
        jtype: '4',//礼品类型
      }
    ]

  },
  //mini刊列表
  getMiniList:{
    encode:1,
    msg:'',
    data:[
      {
        img:'../imgs/1.png',//图片地址
        title:'经销商销售分成策略1',//标题
        navname:'最新资讯',//mini刊种类
        time:'2010-10-18',//发表时间
        id:'1'//mini刊id
      },
      {
        img: '../imgs/phone.png',//图片地址
        title: '经销商销售分成策略2',//标题
        navname: '最新政策',//mini刊种类
        time: '2010-10-16',//发表时间
        id: '2'//mini刊id
      },
      {
        img: '../imgs/1.png',//图片地址
        title: '经销商销售分成策略3',//标题
        navname: '常见问题',//mini刊种类
        time: '2010-10-14',//发表时间
        id: '3'//mini刊id
      }, 
      {
        img: '../imgs/2.png',//图片地址
        title: '经销商销售分成策略4',//标题
        navname: '销售宝典',//mini刊种类
        time: '2010-10-11',//发表时间
        id: '4'//mini刊id
      }
    ]
  },
  //mini刊详情
  getMiniJDetail:{
    encode:1,
    msg:'',
    data:{
      title: '经销商销售分成策略3',//标题
      navname: '常见问题',//mini刊种类
      time:'2010-10-14',
      secrecytype:'永久',
      secrecyconteny:'保密保密',
      vsrc:[
        
      ],
      richstring: "<p><br/><br/><!--StartFragment--><img src=\"https://img.alicdn.com/imgextra/i3/711044780/TB2ZvhctUhnpuFjSZFEXXX0PFXa_!!711044780.jpg\"/><!--EndFragment--><br/><br/></p>",
      files:[
        {
          title: '经销商销售分成策略v2.0.pdf',
          href: 'http://nokia-2017.jeemoo.com/mwcsdocs/MEC%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.pdf'
        },
        {
          title: '经销商销售分成策略v2.0.pdf',
          href: 'http://nokia-2017.jeemoo.com/mwcsdocs/MEC%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.pdf'
        }
      ]
    }
  },
  //mini考导航列表
  /*
    {
      uid:''
    }
   */
  getMiniNavList:{
    encode:1,
    msg:'',
    data:[
      {
        day:'2017年6月',
        id:'1'
      },
      {
        day: '2017年7月',
        id: '2'
      },
      {
        day: '2017年8月',
        id: '3'
      },
      {
        day: '2017年9月',
        id: '4'
      },
      {
        day: '2017年10月',
        id: '5'
      }
    ]
  },
  //获取状元考排名
  getNumberTest:{
    encode:1,
    msg:'',
    data:{
      myranking:15,
      otherranking:[
        {
          img: '../imgs/1.png',
          ranking:1,//排名
          name:'liuhui1',//名字
          conpanyname:'北京网银1'
        },
        {
          img: '../imgs/1.png',
          ranking: 2,
          name: 'liuhui2',
          conpanyname: '北京网银2'
        },
        {
          img: '../imgs/1.png',
          ranking: 3,
          name: 'liuhui3',
          conpanyname: '北京网银3'
        },
        {
          img: '../imgs/phone.png',
          ranking: 4,
          name: 'liuhui',
          conpanyname: '北京网银4'
        },
        {
          img: '../imgs/1.png',
          ranking: 5,
          name: 'liuhui5',
          conpanyname: '北京网银5'
        },
        {
          img: '../imgs/2.png',
          ranking:6,
          name: 'liuhui6',
          conpanyname: '北京网银6'
        },
        {
          img: '../imgs/2.png',
          ranking: 7,
          name: 'liuhui6',
          conpanyname: '北京网银6'
        }

      ]
    }
  },
  //获取用户测试信息
  /*
  {
    uid:'',
    day:''
  }
  */
  getTestList:{
    encode:1,
    msg:'',
    data:[
      {
        teststatus:0,//0未开始考试1通过2未通过
        examstatus:0,//0日考1周考2月考
        integral:50,//获取积分
        day:'6月1日',//日期,
        id:1
      },
      {
        teststatus: 1,//0未开始考试1通过2未通过
        examstatus: 1,//0日考1周考2月考
        integral: 50,//获取积分
        day: '6月2日',//日期
        id: 2
      },
      {
        teststatus: 2,//0未开始考试1通过2未通过
        examstatus: 2,//0日考1周考2月考
        integral: 0,//获取积分
        day: '6月3日',//日期
        id: 3
      },
      {
        teststatus: 2,//0未开始考试1通过2未通过
        examstatus: 2,//0日考1周考2月考
        integral: 0,//获取积分
        day: '6月4日',//日期
        id: 4
      }
    ]
  },
  //获取测试题库
  /*
    {
      uid:'',//用户id
      tid:''//测试id
    }
  */
  getTestKu:{
    encode:1,
    msg:'',
    data:{
      testtype:0,//0未测试1已经测试过的
      status:0,//0测试规则1测试通过2未通过
      testlist:[
        {
          qid:'1',
          testtile:'Surface Pro3发布于以下哪个日期？1',//测试问题
          radio:true,//true未单选false未多选题,
          selectitems:[//测试选项
            {
              id:'1',//详细对应的id 
              item:'2016年12月10日',//选项内容,
              isselect:false,//用户选择的
              answeris:false,
              testtype:0
            },
            {
              id: '2',
              item: '2016年12月12日',
              isselect: false,
              answeris: false,
              testtype: 0
            },
            {
              id: '3',
              item: '2016年12月14日',
              isselect: false,
              answeris: false,
              testtype: 0
            },
            {
              id: '4',
              item: '2016年12月16日',
              isselect: false,
              answeris: false,
              testtype: 0
            }
          ]
        },
        {
          qid:'2',
          testtile: 'Surface Pro3发布于以下哪个日期2？',//测试问题
          radio: false,//true未单选false未多选题,
          selectitems: [//测试选项
            {
              id: '1',//详细对应的id 
              item: '2016年12月10日',//选项内容,
              isselect: false,//用户选择的
              answeris: false,//答案（status:0时，全部为false,其他根据问题答案来显示为true）
              testtype: 0,

            },
            {
              id: '2',
              item: '2016年12月12日',
              isselect: false,
              answeris: false,
              testtype: 0
            },
            {
              id: '3',
              item: '2016年12月14日',
              isselect: false,
              answeris: false,
              testtype: 0
            },
            {
              id: '4',
              item: '2016年12月16日',
              isselect: false,
              answeris: false,
              testtype: 0
            }
          ]
        },
        {
          qid: '3',
          testtile: 'Surface Pro3发布于以下哪个日期2？',//测试问题
          radio: true,//true未单选false未多选题,
          selectitems: [//测试选项
            {
              id: '1',//详细对应的id 
              item: '2016年12月10日',//选项内容,
              isselect: false,//用户选择的
              answeris: false,//答案（status:0时，全部为false,其他根据问题答案来显示为true）
              testtype: 0,

            },
            {
              id: '2',
              item: '2016年12月12日',
              isselect: false,
              answeris: false,
              testtype: 0
            },
            {
              id: '3',
              item: '2016年12月14日',
              isselect: false,
              answeris: false,
              testtype: 0
            },
            {
              id: '4',
              item: '2016年12月16日',
              isselect: false,
              answeris: false,
              testtype: 0
            }
          ]
        },
        {
          qid:'4',
          testtile: 'Surface Pro3发布于以下哪个日期2？',//测试问题
          radio: false,//true未单选false未多选题,
          selectitems: [//测试选项
            {
              id: '1',//详细对应的id 
              item: '2016年12月10日',//选项内容,
              isselect: false,//用户选择的
              answeris: false,//答案（status:0时，全部为false,其他根据问题答案来显示为true）
              testtype: 0,

            },
            {
              id: '2',
              item: '2016年12月12日',
              isselect: false,
              answeris: false,
              testtype: 0
            },
            {
              id: '3',
              item: '2016年12月14日',
              isselect: false,
              answeris: false,
              testtype: 0
            },
            {
              id: '4',
              item: '2016年12月16日',
              isselect: false,
              answeris: false,
              testtype: 0
            }
          ]
        }
      ]
    }
  },
  //个人中心25
  getNumber:{
    encode:0,
    msg:'',
    data:{
      giftnum: 8,//实物订单
      giftcardnum: 9,//礼券订单
      auditing: 7,//待审核
      Auditinged: 10//已审核
    }
  },
  //积分记录
  getIntegralRe:{
    encode:0,
    msg:'',
    data:[
      {
        createdt: 1508914347,//时间
        channel:'积分抽奖',//渠道
        desc:'周考',//描述
        integral:180//积分
      },
      {
        createdt: 1508914347,
        channel: '积分抽奖',
        desc: '周考',
        integral: 170
      },
      {
        createdt: 1508914347,
        channel: '积分抽奖',
        desc: '周考',
        integral: 0
      }
    ]
  },
  //我的订单
  getMyorderList:{
    encode:0,
    msg:'',
    data: [
      {
        img_url: '../imgs/1.png',//图片地址
        title: '苹果7保护壳',//礼品名称
        num: '200',//积分
        total:2,//数量
        status:1,//状态1代发货2已发货3已完成
        id:1,//订单id
        createdt: 1508914347
      },
      {
        img_url: '../imgs/2.png',//图片地址
        title: '苹果7保护壳',//礼品名称
        num: '250',//积分
        total: 2,//数量
        status: 2,//状态
        id: 2,//订单id
        createdt: 1508914347
      },
      {
        img_url: '../imgs/1.png',//图片地址
        title: '苹果7保护壳',//礼品名称
        num: '220',//积分
        total: 2,//数量
        status: 3,//状态
        id: 3,//订单id
        createdt: 1508914347
      },
      {
        img_url: '../imgs/2.png',//图片地址
        title: '苹果7保护壳',//礼品名称
        num: '100',//积分
        total: 2,//数量
        status: 1,//状态
        id: 4,//订单id
        createdt: 1508914347
      }
    ]
  },
  //订单详情
  getOrderDetail:{
    encode:0,
    msg:'',
    data:{
      img_url: '../imgs/1.png',//图片地址
      title: '苹果7保护壳',//礼品名称
      num: '200',//积分
      total: 2,//数量
      status: 1,//状态1待发货2已发货3已完成
      id: 1,//订单id
      createdt: 1508914347,
      type:2,//1为礼券，2为物流
      card:[
        {
          img_url:'',
          cardvalue:'200',
          cardname:"携程3",
          cardid:232322
        },
        {
          img_url: '',
          cardvalue: '400',
          cardname: "携程3",
          cardid: 232322
        }
      ]
    }
  },
  //审核列表
  getAauditingList:{
    encode:0,
    msg:'',
    data:[
      {
        img_url: '../imgs/1.png',//图片地址
        uname:'jay',//申请人名
        id:'1',//申请详情id
        status:'1'//申请状态1为待审核2为审核
      },
      {
        img_url: '../imgs/2.png',//图片地址
        uname: 'jay zhou',//申请人名
        id: '2',//申请详情id
        status: '2'//申请状态1管理员2经销员3待审核
      },
      {
        img_url: '../imgs/1.png',//图片地址
        uname: 'jay jl',//申请人名
        id: '1',//申请详情id
        status: '3'//申请状态1为待审核2为审核
      }
    ]
  },
  //个人资料(普通用户)
  getPersonData:{
    encode:0,
    msg:'',
    data:{
      userdata: {
        username: '张三',
        userphone: '13265656565',
        useremail: '1213@qq.com',
        remark: '哈哈哈哈',
        gender: 2//1女2男
    }
    }
  },
  //个人资料(经销商)
  getPersonData1: {
    encode: 0,
    msg: '',
    data: {
      userdata:{
        authentication: 0,//0为没有认证，1为认证
        company_id: '3',
        username: '张三',
        userphone: '13265656565',
        useremail: '1213@qq.com',
        remark: '哈哈哈哈',
        gender: 2,//1女2男
      },
      managerdata:{
        cname: '王五',
        cphone: '15110098989',
        cemail: '23232@qq.com'
      }
     
      
    }
  },
  putong: {
    "encode": 1,
    "msg": "",
    "data": {
      "id": "1",
      "username": "zhangs",
      "userphone": "23241234",
      "useremail": "12341234",
      "sex": "2",
      "remark": "123412341234"
    }
  },
  经销员: {
    "encode": 1,
    "msg": "",
    "data": {
      "id": "1",
      "company_id": "9",
      "username": "zhangs",
      "userphone": "23241234",
      "useremail": "12341234",
      "sex": "2",
      "remark": "123412341234"
    }
  },
  //成功结果
  successRes: {
    StatusCode: 200, ErrorCode: "", ErrorLevel: ''
  }


}