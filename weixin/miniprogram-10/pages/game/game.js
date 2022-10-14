// pages/game/game.js
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
        people:"红",
        over_flg:true,
        alert_flg:false,
      //骰子的属性
        baseurl1:"../../imgs/point_1.jpg",
        baseurl2:"../../imgs/point_1.jpg",
        status:0,
        point_now:0,
        dis:false,
        times:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var dis=parseInt(Math.random()*2)
        if(dis==1){
          this.setData({
            dis1:false,
            dis2:true
          })
          wx.showToast({
            title: '红方先手\n请在落子后确认',
            icon:'none',
            duration:2000
          })
        }
        else{
          this.setData({
            dis1:true,
            dis2:false,
            people:"绿"
          })
          wx.showToast({
            title: '绿方先手\n请在落子后确认',
            icon:'none',
            duration:2000
          })
        }
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
      if(this.selectComponent('.chess1').data.check_click==true){
      this.setData({
        dis1:true,
        dis2:false
      })
      this.selectComponent('.chess1').setData({
        check_click:false
      })
      this.del_point(2,this.selectComponent('.chess2'),this.selectComponent('.chess1').data.click_index)
    }
      this.setData({
        total1:this.data.total1+1
      })
        wx.showToast({
        title: '绿方回合',
        icon:'none'
      })
      var temp=this.count(this.selectComponent('.chess1').data.point_arry)
      var on=this.selectComponent('.chess1').data.point_arry
      this.setData({
        total1:temp
      })
      var num=0
      var on=this.selectComponent('.chess1').data.point_arry
      for(var i=0;i<9;i++)
      {
        if(on[i]!=0){
          num+=1
        }
      }
      if(num==9){
        this.overgame()
      }
    
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
    var num=0
    var on=this.selectComponent('.chess2').data.point_arry
    for(var i=0;i<9;i++)
    {
      if(on[i]!=0){
        num+=1
      }
    }
    if(num==9){
      this.overgame()
    }



  },
  //消除逻辑，去落子点的取余3，去与对方取余3相同的格子比较，若相同则消除
  del_point(checked,child,idx){
    var show=child.data.point_arry
    var pointnum= checked==1?this.data.pointnum2:this.data.pointnum1
    var change_on=child.data.is_on
    idx=idx%3
    console.log("更前",show)
    for(var i=0;i<3;i++){
      var temp=idx+3*i
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
  //游戏结束后，需要将双方点击状态设置不允许，并且计算双方点数，判断输赢结果
  overgame(){
    this.setData({
      dis1:0,
      dis2:0
    })
    var point1=this.selectComponent(".chess1").data.point_arry
    var point2=this.selectComponent(".chess2").data.point_arry
    var tpoint1=this.count(point1)
    var tpoint2=this.count(point2)
    this.setData({
      total1:tpoint1,
      total2:tpoint2
    })
    if(tpoint2>tpoint1){
      wx.showToast({
        title: '绿方获胜',
        duration:3000
      })
    }
    else if(tpoint1>tpoint2){
      wx.showToast({
        title: '红方获胜',
        duration:3000
      })
    }
    else {
      wx.showToast({
        title: '平手',
        duration:3000
      })
    }
  },
  //计算某一方的总点数
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
  //游戏结束后，结束标志设为真
  lookchess(){
    this.setData({
      over_flg:true
    })
  },
  //骰子执行函数,在骰子执行前要检测该方的点击状态是否被允许，
  //若允许则随机生成骰子，随机一个时间，每过固定时间骰子就会随机生成一个数字
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
        // console.log("from dice"+num)
        // console.log(this.data.point_now)
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
}
})