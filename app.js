

App({
    globalData: {
      banPictrue: wx.getStorageSync("banPictrue"),
      winHeight: wx.getSystemInfoSync().screenHeight
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