//时间动画对象
function TimeAnimation(myintegral,integral, self){
  this.myintegral = myintegral;//我的积分
  this.integral = integral;//传入的积分
  this.self = self;
  this.time = 1000;//动画时间
  this.timer = null;
  this.steps = 300;//总步数
  this.step = 0;//步长
  this.interval = 0;//步频
  this.times = 0;//次数
}
TimeAnimation.prototype={
  init:function(cb){
    //计算每一步的距离
    this.step = (this.integral-this.myintegral )/ this.steps;
    //计算补品
    this.interval = this.steps / this.time;
    // console.log(this.interval);
    // console.log("............")
    this.move(cb);
  },
  move:function(cb){
    var me=this;
    //次数大于步数
    if (this.times >= this.steps)
    {
      //停止计时器
      clearTimeout(this.timer);
      //清空计时器返回值
      this.timer=null;
      //重新设置为0
      this.times=0
      //结束
      return;
    }
    //每次加1
    this.times++
    //时间计算器
    this.timer=setTimeout(()=>{
      //新增积分数
      this.myintegral += this.step;
      //刷新页面
      cb(this.myintegral)
      
      //自调move方法
      this.move(cb)
    }, this.interval)
  }
}

module.exports={
  TimeAnimation
}