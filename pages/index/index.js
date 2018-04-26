const Room = require('../../lib/room.js')


let app = getApp()

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
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
      width: '50vw',
      height: '50vw'
    },
    client:null
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
    let self = this
    wx.setKeepScreenOn({
      keepScreenOn: true
    })

    wx.getUserInfo({
      success: function(res){
        var user = res.userInfo.nickName
        self.setData({
          user: user
        })

        self.connect()
      }
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
  
  },

  connect: function() {

    let self = this
    let user = this.data.user

    let client = new Room.Client(user, 'http://localhost:3000/',{
      onJoined: function(){
        console.log('onJoined')
      },
      onClose: function() {
        console.log('onClose')
      },
      onDisconnect: function() {
        console.log('onDisconnect')
      },
      onReconnect: function(count) {
        console.log('onReconnect', count)
      },
      onError: function(err) {
        console.error('error', err)
      },
      onPusherAdded: function(data) {
        console.log('onPusherAdded', data)
      },
      onPushers: function(data) {
        console.log('onPushers', data)
      },
      onPusherLeaved: function(data) {
        console.log('onPusherLeaved', data)
      }
    })
  }
})