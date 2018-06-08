import { handleList } from '../../base/class.js';
import { api, breandData } from '../../base/config.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData: breandData,
    textList: [],
    listNum: 0,
  },
  getMoreList() {
    wx.request({
      url: api.learnPostUrl,
      data: {
        limit: 5,
        offset: this.data.listNum
      },
      success: (res) => {
        this.data.listNum += 5;
        const moreCon = [...(this.data.textList), ...(handleList(res.data))]
        const con = {
          textList: moreCon,
        };
        this.setData(con);
      }
    })
  },
  goTodetail: function (event) {
    const con = event.currentTarget.dataset.topic;
    wx.navigateTo({
      url: `../list/list?topic=${con.topic}&topicname=${con.title}`,
      fail: function (res) { console.log(res) }
    })
  },
  goToAll: function (event) {
    const con = this.data.listData[0]
    wx.navigateTo({
      url: `../list/list?columns=leaninglog&topicname=认知日志`,
      fail: function (res) { console.log(res) }
    })
  },
  goDetail: function (event) {
    const Id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../post/post?id=${Id}`,
      fail: function (res) { console.log(res) },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取话题文章数
    wx.request({
      url: api.postCount,
      success: (res) => {
        const postTopics = res.data.postTopics;
        const listData = this.data.listData;

        listData.map((item) => {
          postTopics.map((i) => {
            if(i.name === item.topic) {
              item.postsCount = i.postsCount
            }
          })
        })
        this.setData({listData})
      }
    })

    // 获取认知日志的前5篇文章
    wx.request({
      url: api.learnPostUrl,
      data: {
        limit: 5
      },
      success: (res) => {
        const con = {
          textList: handleList(res.data),
        };
        this.data.listNum += 5;
        this.setData(con);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})