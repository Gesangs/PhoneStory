import { handleText } from '../../base/class.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData: [{
      title: 'Timer周报',
      topic: '科技资讯',
      img: '../../image/TimerPaper@2x.png',
      text: '聚焦本周科技资讯，新鲜的内容加上毒辣的短评，只需3分钟，帮你在周末轻松回顾本周重点。',
      total: "137",
      time: "上次更新：2日前"
    },
    {
      title: 'Windows应用测评',
      topic: '科技资讯',
      img: '../../image/UWP@2x.png',
      text: '体验千奇百怪的 Windows 应用程序，在桌面端及移动端的效率神器到小众精选，帮你更加透彻的了解应用之美。',
      total: "",
      time: ""
    },
    {
      title: '热评文章',
      topic: '科技资讯',
      img: '../../image/Diss@2x.png',
      text: '针对当下的科技数码大事件作出评论，对新鲜产品第一时间上手体验，分享第一手的观点与感受，既有深度又有风度。',
      total: "",
      time: ""
    }],
    textList: [],
    listNum: 0
  },
  getMoreList() {
    const that = this;
    wx.request({
      url: 'https://zhuanlan.zhihu.com/api/columns/leaninglog/posts',
      data: {
        limit: 5,
        offset: that.data.listNum
      },
      success: function (res) {
        that.data.listNum += 5;
        const moreCon = [...(that.data.textList), ...(that.handleList(res.data))]
        const con = {
          textList: moreCon,
        };
        that.setData(con);
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
  goToMore: function (event) {
    const con = this.data.listData[0]
    wx.navigateTo({
      url: `../list/list?topic=${con.topic}&topicname=Latest Posts`,
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
    wx.request({
      url: 'https://zhuanlan.zhihu.com/api/columns/leaninglog/posts',
      data: {
        limit: 5
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})