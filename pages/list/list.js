import { handleText } from '../../base/class.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textList: '',
    listNum: 0,
    listType: ''
  },
  goDetail: function (event) {
    const Id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../post/post?id=${Id}`,
      success: function (res) { },
      fail: function (res) { console.log(res) },
      complete: function (res) { },
    })
  },
  handleList(list) {
    const List = [];
    list.forEach((item) => {
      let text = handleText(item)
      List.push(text);
    });
    return List;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    this.data.listType = options.topic;
    wx.setNavigationBarTitle({
      title: options.topicname,
    })
    wx.request({
      url: 'https://zhuanlan.zhihu.com/api/columns/timer365/posts',
      data: {
        limit: 5,
        topic: that.data.listType
      },
      success: function (res) {
        const con = {
          textList: that.handleList(res.data),
        };
        that.data.listNum += 5;
        that.setData(con);
      }
    })
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
    const that = this;
    wx.request({
      url: 'https://zhuanlan.zhihu.com/api/columns/timer365/posts',
      data: {
        limit: 5,
        offset: that.data.listNum,
        topic: that.data.listType
      },
      success: function (res) {
        that.data.listNum += 5;
        const moreCon = that.data.textList.concat(that.handleList(res.data))
        const con = {
          textList: moreCon,
        };
        that.setData(con);
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    const imgUrl = res.target.dataset.img;
    const title = res.target.dataset.title;
    const path = `/pages/post/post?id=${res.target.dataset.id}`;
    return {
      title: title,
      path: path,
      imageUrl: imgUrl,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    }
  }
})