// pages/mine/changeinfo/changeinfo.js
const app = getApp()
const AV = require('../../../libs/av-weapp-min')
const Todo = require('../../../model/todo')
var temp_name = 'null'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name:app.globalData.userinfo.Nickname,
    index:0,
    array:['男','女'],
  },
  bindPickerChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  input_name(e){
    this.setData({
      user_name:e.detail.value
    })
    wx.setStorageSync('tempname', this.data.user_name)
    temp_name = wx.getStorageSync('tempname')
  },
  changeinfo:function(){ 
    console.log(temp_name)
     const todo = new Todo({
      Nickname:temp_name,
      sex:this.data.array[this.data.index],
    });
 todo.save()
    .then("保存成功！")
    .catch(console.error)

  },
 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})