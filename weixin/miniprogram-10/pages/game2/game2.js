// pages/game/game.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pointnum1:1,
        pointnum2:1,
        dis1:false,
        dis2:false,
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
      wx.showToast({
        title: '请您先手',
        icon:'none',
        duration:2000
        
      })
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
      }, 500);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //摇出数字，并将组件点击状态设置为真，摇数状态置位假
    getnum1(){
      this.flip1()
    },
    getnum2(){
        // this.setData({
        //     pointnum2:Math.ceil(Math.random()*6),
        // })
        this.flip2()
    },
    //
    change1(){
      if(this.selectComponent('.chess1').data.check_click==true){
      this.setData({
        dis1:true
      })
      this.selectComponent('.chess1').setData({
        check_click:false
      })
      this.setData({
        total1:this.data.total1+1
      })
      this.del_point(2,this.selectComponent('.chess2'),this.selectComponent('.chess1').data.click_index)
      if(this.data.total1==9){
        this.overgame()
        return
      }
      this.getnum2() 
      
    }
    
    },
  //检测棋盘状况，如果发现同一列上对方有相同的则消除之
  del_point(checked,child,idx){
    var show=child.data.point_arry
    var pointnum= checked==1?this.data.pointnum2:this.data.pointnum1
    var change_on=child.data.is_on
    idx=idx%3
    // console.log("更前",show)
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
    // console.log("更后",child.data.point_arry)
  },
  //人机策略
  stragry(pointnum2){
    var chess2=this.selectComponent('.chess2')
    var chess1=this.selectComponent('.chess1')
    //AI对战所需参数及其调用函数
    var ownBoard=chess2.data.point_arry
    var otherBoard=chess1.data.point_arry
    var idx=this.nextStep(ownBoard,otherBoard,pointnum2);
    // console.log(idx)
    //数据更新
    var show=chess2.data.point_arry
    var new_on=chess2.data.is_on
    show[idx]=pointnum2
    new_on[idx]=1
    chess2.setData({
        point_arry:show,
        is_on:new_on
    })
    console.log(idx,pointnum2)
    return idx
    //原生成落点代码
    // while(1){
    // var idx=parseInt(Math.random()*9)
    // var show=chess2.data.point_arry
    // var new_on=chess2.data.is_on
    // if(new_on[idx]==1)continue
    // show[idx]=pointnum2
    // new_on[idx]=1
    // // console.log(show,new_on)
    // chess2.setData({
    //   point_arry:show,
    //   is_on:new_on
    // })
    // return idx
    // }
  },
  overgame(){
    this.setData({
      dis1:0,
      dis2:0
    })
    var point1=this.selectComponent(".chess1").data.point_arry
    var point2=this.selectComponent(".chess2").data.point_arry
    var tpoint1=this.count(point1)
    console.log(tpoint1)
    var tpoint2=this.count(point2)
    console.log(tpoint2)
    this.setData({
      total1:tpoint1,
      total2:tpoint2
    })
    for(var i=0;i<9;i++){
      tpoint1+=point1[i]
      tpoint2+=point2[i]
    }
    // if(tpoint2>tpoint1){
    //   this.setData({
    //     people:"绿"
    //   })
    // }
    if(tpoint1>tpoint2){
      wx.showToast({
        title: '您已获胜!!',
        duration:3000
      })
    }
    else{
        wx.showToast({
          title: 'AI获胜~~',
          duration:3000
        })
    }
    this.setData({
      over_flg:false
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
  flip1(){
    //按钮不允许状态为真则无法掷骰子
    if(this.data.dis1==true)return
    //随机设置旋转时间
    var times=Math.ceil(Math.random()*200)+100
    var cnt=0;
    var myVal=setInterval(() => {
      cnt+=5;
      var num=Math.ceil(Math.random()*6);
      var url="../../imgs/point_"+String(num)+".jpg"
      this.setData({
          baseurl1:url
      })
      //次数到达限制，骰子旋转结束
      if (cnt >= times) {
        clearInterval(myVal)
        this.setData({
          point_now: num
        })

          this.setData({
            pointnum1: this.data.point_now,
            dis1: true
          })
          this.selectComponent('.chess1').setData({
            temp_point: this.data.pointnum1,
            is_click: true
          })
      }
    }, 20);
},
flip2(){
    if(this.data.dis2==true)return
  var times=Math.ceil(Math.random()*200)+100
  var cnt=0;
  var myVal=setInterval(() => {
    cnt+=5;
    var num=Math.ceil(Math.random()*6);
    var url="../../imgs/point_"+String(num)+".jpg"
      this.setData({
        baseurl2:url
    })
    if (cnt >= times) {
      clearInterval(myVal)
      this.setData({
        point_now: num
      })
        this.setData({
          pointnum2: this.data.point_now,
          dis1: true
        })
        this.selectComponent('.chess2').setData({
          temp_point: this.data.pointnum2,
          is_click: true
        })
        var idx
        var that=this
        
        setTimeout(function(){
          idx=that.stragry(that.data.pointnum2)
          that.del_point(1,that.selectComponent('.chess1'),idx)
          that.setData({
            dis1:false
          })
          wx.showToast({
            title: '你的的回合',
            icon:'none'
          })
        },1000)
        this.setData({
          total2:this.data.total2+1
        })
        if(this.data.total2==9){
          this.overgame()
        }
    }
  }, 20);
},
//ownboard为AI，otherBoard为用户
nextStep(ownBoard,otherBoard,figure){
  //如果是1,2这样的小点数，去看对方有没有，有则避开
  var on=[0,0,0]//每一列上面的占用情况
  //maxidx用于记录最大占用列
  //minidx用于记录最小占用列
  var maxidx=0,minidx=0
  var max=0,min=0
  // console.log(ownBoard)
  for(var j=0;j<3;j++){
    if(ownBoard[j]!=0)on[j]+=1
    if(ownBoard[j+3]!=0)on[j]+=1
    if(ownBoard[j+6]!=0)on[j]+=1
    if(j==0){
      max=min=on[0]
      maxidx=minidx=0
    }
    if(on[j]>max)
    {
      max=on[j]
      maxidx=j
    }
    if(on[j]<min)
    {min=on[j]
      minidx=j
    }
  }
  console.log("idx",maxidx,minidx)
  //都相等
  if(maxidx==minidx){
    maxidx=2
    minidx=0
  }
  
  // console.log(max,min)
    //记录相同的点数
    var arr=[0,0,0]
    var num=0
    //存放相同点数点最多的那一列
    var col=0
    for(var i=0;i<9;i++){
      if(otherBoard[i]==figure){
        arr[i%3]+=1
      }
    }
    for(var i=0;i<3;i++){
      if(arr[i]>num){
        num=arr[i]
        col=i
      }
    }
    if(figure<=3){
    // 对方无小点数
    if(arr[0]+arr[1]+arr[2]==0){
      // console.log(arr[0]+arr[1]+arr[2]==0,minidx==col)
      if(ownBoard[minidx]==0)return minidx
      if(ownBoard[minidx+3]==0)return minidx+3
      if(ownBoard[minidx+6]==0)return minidx+6
    }
    var temp=[minidx,3-minidx-maxidx,maxidx]
    //本方具有最小占有列的地方刚刚好就是存放小点最多的列
    // console.log("temp1",)
    if(minidx==col)temp=[3-minidx-maxidx,maxidx,minidx]
    //若本方具有最小占有列的地方不是就是存放小点最多的列
    else temp=[minidx,3-minidx-maxidx,maxidx]
    console.log("temp2",temp)
    for(var i=0;i<3;i++){
      if(ownBoard[temp[i]]==0)return temp[i]
      if(ownBoard[temp[i]+3]==0)return temp[i]+3
      if(ownBoard[temp[i]+6]==0)return temp[i]+6
    }
    }
   //若用户有一列3个有3点，或者两个以上的4点及以上则放置消除
   else if(figure>3){
     // 对方无大点数
    if(arr[0]+arr[1]+arr[2]==0){
      // console.log(arr[0]+arr[1]+arr[2]==0,minidx==col)
      if(ownBoard[minidx]==0)return minidx
      if(ownBoard[minidx+3]==0)return minidx+3
      if(ownBoard[minidx+6]==0)return minidx+6
    }
    //直接消除，若有空位的话
    if(ownBoard[col]==0)return col
    if(ownBoard[col+3]==0)return col+3
    if(ownBoard[col+6]==0)return col+6
    // 若无空位
    var temp;
  temp=[minidx,3-minidx-maxidx,maxidx]
    for(var i=0;i<3;i++){
      if(ownBoard[temp[i]]==0)return temp[i]
      if(ownBoard[temp[i]+3]==0)return temp[i]+3
      if(ownBoard[temp[i]+6]==0)return temp[i]+6
    }
   }
   
}
  
})