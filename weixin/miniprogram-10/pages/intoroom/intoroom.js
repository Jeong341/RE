// pages/intoroom/intoroom.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'',
    newroom:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    app.globalData.handleMessage((msg)=>{
      var temp=JSON.parse(msg.data)
      if(temp.type==1){
        if(temp.search==true){
          if(temp.roomfull==true){
            wx.showToast({
              title: '房间人满',
              icon:"none"
            })
            return
          }
          console.log(temp)
          this.togame(temp.roomid,temp.roomman)
        }
        else{
          wx.showToast({
            title: '房间不存在',
            icon:"none"
          })
          return
        }
      }
      else if(temp.type==2){
          that.setData({
            newroom:temp.roomid
          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    app.globalData.handleMessage((msg)=>{
      console.log(msg)
    })
  },

  getid(e){
    this.setData({
      text:e.detail.value
    })

  },
  enterroom(){
    if(isNaN(this.data.text))return
    var content={
        type:1,
        id:Number(this.data.text)
    }
    app.globalData.io.send({
      data:JSON.stringify(content)
      }
    )
  },
  getcontent(e){
    this.setData({
      text:e.detail.value
    })
  },
  getid(){
    var content={
        type:2,
        id:-1
    }
    app.globalData.io.send({
      data:JSON.stringify(content)
      }
    )
  },
  togame(roomid,roomman){
    console.log("进入房间")
     console.log(roomman)
    roomid=Number(roomid)
    roomman=Number(roomman)
   
    wx.navigateTo({
      url: `../../pages/game3/game3?roomid=${roomid}&roomman=${roomman}`,
    })
  }
})