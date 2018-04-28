App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
  },
  globalData: {
    userInfo: null
  },
  onShow: function(options) {
    console.log('onShow', options)
  },
  onHide: function() {
    console.log('onHide')
  },
  onError: function() {

  }
})