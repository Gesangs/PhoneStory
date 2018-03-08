// pages/likePost/liskePost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  goDetail: function (event) {
    const Id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../post/post?id=${Id}`,
      fail: function (res) { console.log(res) },
    })
  },
  removePost: function (event) {
    const that = this
    const id = event.currentTarget.dataset.id;
    wx.removeStorage({
      key: id,
      success: function (res) {
        wx.removeStorageSync(`DZ${id}`);
        const list = that.data.list.filter(item => {
            if (item.id !== id) return item;
          });
        that.setData({ list });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const likePost = wx.getStorageInfoSync().keys;
    const len = Math.ceil(likePost.length / 2) + 1;
    const list = [];
    for (let i = 0; i < len; i++) {
      if (/\b\d+\b/g.test(likePost[i])) {
        const post = {
          id: likePost[i],
          title: wx.getStorageSync(likePost[i]),
          count: wx.getStorageSync(`DZ${likePost[i]}`)
        }
        list.push(post);
      }
    }
    this.setData({ list });

    // console.log(list)
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