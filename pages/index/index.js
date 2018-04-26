
const io = require('../../lib/weapp.socket.io.js')

const room = require('../../lib/room.js')


// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    room: '',
    config: {
      aspect: '3:4',
      minBitrate: 200,
      maxBitrate: 300,
      beauty: 8,
      muted: false,     //设置推流是否静音
      debug: false,     //是否显示log
      camera: true,     //设置前后置摄像头，true表示前置
      operate: ''       //设置操作类型，目前只有一种'stop'，表示停止
    },
    event: 0,
    styles: {           //设置cameraview的大小
      width: '30vw',
      height: '30vw'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(io)
    console.log(room)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
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