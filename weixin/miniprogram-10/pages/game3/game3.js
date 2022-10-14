// pages/game/game.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pointnum1:1,
      pointnum2:1,
      dis1:true,
      dis2:true,
      total1:0,
      total2:0,
      over_flg:true,
    //骰子的属性
      baseurl1:"../../imgs/point_1.jpg",
      baseurl2:"../../imgs/point_1.jpg",
      status:0,
      point_now:0,
      dis:false,
      times:0,
      //房间号
      roomid:-1,
      roomman:0,
      mycolor:"red",
      othercolor:"green"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //监听服务器发过来的信息
    var that=this
    app.globalData.handleMessage((msg)=>{
      var temp=JSON.parse(msg.data)
      if(temp.type==3){
        wx.showToast({
          title: '游戏开始！',
          icon:"none",
          duration:3000
        })
        wx.showToast({
          title: '红方先！',
          icon:"none",
          duration:3000
        })
        //玩家2进入房间，玩家一，解除禁用状态
        if(this.data.roomman==1){
          this.setData({
            dis1:false
          })
        }
      }
      else if(temp.type==4){
        // 非自己发送的信息
          if(temp.roomman!=this.data.roomman){
            this.setAllData(temp)
          }
      }
      else if(temp.type==5){
        this.setData({
          dis1:true,
          dis2:true
        })
        var my=Number(this.data.roomman)
        console.log(temp.winner,my)
        if(temp.winner==0){
          wx.showToast({
            title: '平手啦',
            duration:3000
          })
        }
        else if(temp.winner!=my){
          wx.showToast({
            title: '你失败了哦',
            duration:3000
          })
        }
        else{
          wx.showToast({
            title: '你获胜啦',
            duration:3000
          })
        }
      }
    })
    
    //设置房间id与玩家是第几个
    var temp=options.roomid
    var temp2=options.roomman
    if(temp2==1){
      wx.showToast({
        title: '等待好友进入',
        duration:3000
      })
    }
    this.setData({
      roomid:temp,
      roomman:temp2
    })

      //根据roomman的值变化颜色
      //一红二绿，初始均不能点
      //只有在双方均进入房间的时候才能点击骰子
      if(this.data.roomman==1){
        this.setData({
          dis1:true,
          dis2:true,
          mycolor:"red",
          othercolor:"green"
        })
      }
      else{
        this.setData({
          dis1:true,
          dis2:true,
          mycolor:"green",
          othercolor:"red"
        })
      }
      
      //组播通知游戏开始
      this.begin()


      //检测点击状态，点击完成进行轮换
      var cnt=0;
      var val2=setInterval(() => {
        cnt+=100
        if(cnt>=2000){
          this.setData({
            alert_flg:true
          })
          clearInterval(val2)
        }
      }, 200);
      setInterval(() => {
        if(this.selectComponent('.chess1').data.check_click==true){
          this.change1()
        }
        if(this.selectComponent('.chess2').data.check_click==true){
            this.change2()
          }
      }, 500);
  },


  //摇出数字，并将组件点击状态设置为真，摇数状态置位假
  getnum1(){
      this.flip(1)
  },
  getnum2(){
     this.flip(2)
  },
     //在落子确定以后，设置摇骰子区域的可点击状态
     //并且调用函数将同一列上的相同点数消除
  change1(){
    //在本方的落子结束后，使得自己disabled为真，对方为假，改变可点击状态
    if(this.selectComponent('.chess1').data.check_click==true){
    this.setData({
      dis1:true,
      dis2:false
    })
    this.selectComponent('.chess1').setData({
      check_click:false
    })
    //将棋局双方棋局数组传给del进行消除逻辑
    this.del_point(2,this.selectComponent('.chess2'),this.selectComponent('.chess1').data.click_index)
  }
    // this.setData({
    //   total1:this.data.total1+1
    // })
      wx.showToast({
      title: '敌方回合',
      icon:'none'
    })
    //计算当前本方的棋局中点数
    var temp=this.count(this.selectComponent('.chess1').data.point_arry)
    this.setData({
      total1:temp
    })
    var num=0
    var on=this.selectComponent('.chess1').data.point_arry
    //计算本方棋局数组非零个数，若到达9，则游戏结束进入结算
    for(var i=0;i<9;i++)
    {
      if(on[i]!=0){
        num+=1
      }
    }
      console.log(num)
    if(num==9){
    //游戏结算
      this.overgame()
    }
    this.sendAllOpts()
  },
  change2(){
    if(this.selectComponent('.chess2').data.check_click==true){
    this.setData({
      dis1:false,
      dis2:true
    })
    this.selectComponent('.chess2').setData({
      check_click:false
    })
    this.del_point(1,this.selectComponent('.chess1'),this.selectComponent('.chess2').data.click_index)
  }
  this.setData({
    total2:this.data.total2+1
  })
  wx.showToast({
    title: '红方回合',
    icon:'none'
  })
  var temp=this.count(this.selectComponent('.chess2').data.point_arry)
  this.setData({
    total2:temp
  })
  if(this.data.total2==9){
    this.overgame()
  }
},
del_point(checked,child,idx){
  //对被检查方进行检查
  var show=child.data.point_arry
  //获得检查方获得的点数
  var pointnum= checked==1?this.data.pointnum2:this.data.pointnum1
  var change_on=child.data.is_on
  //检查方落子点对3取余
  idx=idx%3
  console.log("更前",show)
  for(var i=0;i<3;i++){
    var temp=idx+3*i
    //相同就进行消除
    if(show[temp]==pointnum){
      show[temp]=0
      change_on[temp]=0
      if(checked==1){
      this.setData({
        total1:this.data.total1-1
      })
    }
      else{
        this.setData({
          total2:this.data.total2-1
        })
      }
    }
  }
  child.setData({
    point_arry:show,
    change_on:0
  })
  console.log("更后",child.data.point_arry)
},
overgame(){
  this.setData({
    dis1:true,
    dis2:true
  })
  var point1=this.selectComponent(".chess1").data.point_arry
  var point2=this.selectComponent(".chess2").data.point_arry
  var tpoint1=this.count(point1)
  var tpoint2=this.count(point2)
  this.setData({
    total1:tpoint1,
    total2:tpoint2
  })
  //记录获胜方
  var who=0
  if(tpoint1>tpoint2){
    who=1
    wx.showToast({
      title: '您获胜啦',
      duration:3000
    })
  }
  else if(tpoint2>tpoint1){
    who=2
    wx.showToast({
      title: '你失败了哦',
      duration:3000
    })
  }
  else {
    who=0
    wx.showToast({
      title: '平手啦',
      duration:3000
    })
  }
  var content={
    type:5,
    winner:who,
    roomid:this.data.roomid
  }
  app.globalData.io.send({
    data:JSON.stringify(content)
    })
},
count(arr){
  console.log(arr)
  var ret=0
  for(var i=0;i<3;i++){
    //i为余数
    if(arr[i+3]==arr[i+6]&&arr[i]==arr[i+3]){
      ret+=3*3*arr[i]
    }
    else if(arr[i+3]!=arr[i+6]&&arr[i]!=arr[i+3]&&arr[i+3]!=arr[i+6]){
      ret=ret+arr[i+3]+arr[i+6]+arr[i]   
    }
    else if(arr[i]==arr[i+3]){
      ret=ret+arr[i]*4+arr[i+6]
    }
    else if(arr[i]==arr[i+6]){
      ret=ret+arr[i]*4+arr[i+3]
    }
    else if(arr[i+3]==arr[i+6]){
      ret=ret+arr[i]+arr[i+3]*4
    }
  }
  return ret
},
lookchess(){
  this.setData({
    over_flg:true
  })
},
//骰子执行函数
flip(man){
  if(man==1){
    if(this.data.dis1==true)return
  }
  else if(man==2){
    if(this.data.dis2==true)return
  }
  var times=Math.ceil(Math.random()*200)+100
  var cnt=0;
  var myVal=setInterval(() => {
    cnt+=5;
    var num=Math.ceil(Math.random()*6);
    var url="../../imgs/point_"+String(num)+".jpg"
    if(man==1){
    this.setData({
        baseurl1:url
    })}
    else{
      this.setData({
        baseurl2:url
    })}
    
    if (cnt >= times) {
      clearInterval(myVal)
      this.setData({
        point_now: num
      })

      if (man == 1) {
        this.setData({
          pointnum1: this.data.point_now,
          dis1: true
        })
        this.selectComponent('.chess1').setData({
          temp_point: this.data.pointnum1,
          is_click: true
        })
      }
      else if(man==2){
        this.setData({
          pointnum2: this.data.point_now,
          dis1: true
        })
        this.selectComponent('.chess2').setData({
          temp_point: this.data.pointnum2,
          is_click: true
        })
      }
    }
  }, 20);
},
begin(){
  if(this.data.roomman==2){
    wx.showToast({
      title: '游戏开始！',
      icon:"none",
      duration:3000
    })
    var content={
      type:3,
      roomid:this.data.roomid,
      roomman:this.data.roomman
    }
    app.globalData.io.send({
      data:JSON.stringify(content)
      })
  }
},
sendAllOpts(){
  // 将棋局状态传给对方
  let chess1=this.selectComponent('.chess1').data
  let chess2=this.selectComponent('.chess2').data
  var content={
    type:4,
    roomid:this.data.roomid,
    roomman:this.data.roomman,
    main:{
      //禁用状态直接在接收方接受到信息的时候把自己设为不禁用，对方设为禁用即可
      pointnum1:this.data.pointnum1,
      pointnum2:this.data.pointnum2,
      total1:this.data.total1,
      total2:this.data.total2,
      over_flg:this.data.over_flg,
    //骰子的属性
      baseurl1:this.data.baseurl1,
      baseurl2:this.data.baseurl2,
      point_now:this.data.point_now,
      dis:this.data.dis,
    },
    chess1:{
      point_arry:chess1.point_arry,
      is_on:chess1.is_on,
      is_click:chess1.is_click,
      temp_point:chess1.temp_point,
      check_click:chess1.check_click
    },
    chess2:{
      point_arry:chess2.point_arry,
      is_on:chess2.is_on,
      is_click:chess2.is_click,
      temp_point:chess2.temp_point,
      check_click:chess2.check_click
    }
  }
  app.globalData.io.send({
    data:JSON.stringify(content)
    })
},
setAllData(temp){
  // 将棋盘数据更新
  this.setData({
    pointnum1:temp.main.pointnum1,
    pointnum2:temp.main.pointnum2,
    //总数的放置位置也是想法的
    total1:temp.main.total2,
    total2:temp.main.total1,
    over_flg:temp.main.over_flg,
  //骰子的属性
  //图片的放置位置相反
    baseurl1:temp.main.baseurl2,
    baseurl2:temp.main.baseurl1,
    point_now:temp.main.point_now,
    dis:temp.main.dis,
    dis1:false,
    //对面永远是true
    dis2:true
  })
  let chess1=this.selectComponent('.chess1')
  let chess2=this.selectComponent('.chess2')
  chess1.setData({
    point_arry:temp.chess2.point_arry,
    is_on:temp.chess2.is_on,
    is_click:temp.chess2.is_click,
    temp_point:temp.chess2.temp_point,
    check_click:temp.chess2.check_click
  })
  chess2.setData({
    point_arry:temp.chess1.point_arry,
    is_on:temp.chess1.is_on,
    is_click:temp.chess1.is_click,
    temp_point:temp.chess1.temp_point,
    check_click:temp.chess1.check_click
  })
}
})