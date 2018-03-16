

App({
    globalData: {
      banPictrue: wx.getStorageSync("banPictrue")
    },
  },
  {
  onLaunch: function (options) {
    
  },
  onShow: function (options) {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  }
})