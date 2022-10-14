// pages/index/index.js
// const backgroundAudioManager = wx.getBackgroundAudioManager()
// backgroundAudioManager.src = '/music/backgroundmusic.mp3'
const innerAudioContext = wx.createInnerAudioContext({
  useWebAudioImplement: true // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
})
innerAudioContext.src = '/music/backgroundmusic.mp3'
innerAudioContext.play()
var that = innerAudioContext
innerAudioContext.onEnded(function() {
  innerAudioContext.src = '/music/backgroundmusic.mp3'
  innerAudioContext.play()
})
var gift = 'null';
var key = 'null';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        flg_begin:true,
        flg_rule:true,
        flg_ranking:true,
        flg_set:true,
        flg_turn:true,
        flg_eggs:true,
        flg_sup:true,
        index:0,
        array:['简体中文','全世界','都在说','中国话','没有了'],
        opvalue:1

    },
    bindPickerChange: function(e){
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
    Turn_off(){
      this.setData({
        flg_turn: false
      })
      innerAudioContext.stop()
    },
    Turn_on(){
      this.setData({
        flg_turn: true
      })
      innerAudioContext.play()
    },
    input_gift(e){
     this.setData({
       gift: e.detail.value
     });
    },
    eggs(){
      wx.setStorageSync('gift', this.data.gift)
      key = wx.getStorageSync('gift')
      console.log(key)
      if(String(key)=="kexiao")
      {
        console.log('test')
        this.setData({
          flg_sup:false,
          flg_set:true,
        })
      }
      else{
        this.setData({
          flg_eggs:false,
          flg_set:true,
        })
      }
    },
    show_mode(e){
        this.setData({
            flg_begin:false,
            opvalue:0.6
        });
    },
    show_gameset(){
        this.setData({
            flg_set:false,
            flg_eggs:true,
            flg_sup:true,
            opvalue:0.5,
        })
        
    },
    show_ranking(){
        this.setData({
            flg_ranking:false,
            opvalue:0.5
        })
    },
    show_rule(e){
        this.setData({
            flg_rule:false,
            opvalue:0.5
        })
    },
    return_chosen(e){
        this.setData({
            flg_begin:true,
            flg_rule:true,
            flg_ranking:true,
            flg_set:true,
            opvalue:1
        });
    },
    turn_on(e){
      this.setData({
          flg_begin:true,
          flg_rule:true,
          flg_ranking:true,
          flg_set:true,
          opvalue:1
      });
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    }
})