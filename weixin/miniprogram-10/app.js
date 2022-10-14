// app.js
let io = wx.connectSocket({
  url: 'ws://119.23.234.124',
})
App({
  onLaunch() {

  },
  globalData: {
    io,
    handleMessage(callback){
      io.onMessage((msg)=>{
        callback(msg)
      })
    }
  }
})