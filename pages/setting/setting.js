const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banPictrue: app.globalData.banPictrue
  },
  setBanPicture: function(e) {
    const value = e.detail.value
    wx.setStorageSync("banPictrue", value)
    app.globalData.banPictrue = value
    wx.reLaunch({
      url: '../index/index',
    })
  },
  goToAboutUs: function() {
    wx.navigateTo({
      url: `../aboutUs/aboutUs`,
      success: function (res) { },
      fail: function (res) { console.log(res) },
      complete: function (res) { },
    })
  },
  goToLikeList: function () {
    wx.navigateTo({
      url: `../likePost/liskePost`,
      success: function (res) { },
      fail: function (res) { console.log(res) },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.clearStorageSync()
    // console.log(app.globalData.banPictrue)
    console.log(wx.getStorageInfoSync().keys)
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