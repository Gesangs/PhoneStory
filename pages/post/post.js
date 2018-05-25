const app = getApp()
import { handleCon } from '../../utils/formatContent.js';
import { api } from '../../base/config.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 屏幕可用高度
    winHeight: app.globalData.winHeight,
    // 头图模糊度
    backBlur: 0,
    // 头图缩放比例
    scale: 1,
    id: '',
    textCon: {
      nodes: [],
      titleImage: '',
      Title: '',
      author: '',
      headPic: '',
      timer: '',
    },
    styles: 'textStyle',
    animation1: '',
    animation2: '',
    timer: '',
    DZStyle: `../../image/guzhang1.png`,
  },
  DianZan: function () {
    this.animation1.scale3d(1.2, 1.2, 1).step()
    this.animation1.scale3d(1, 1, 1).step()

    // 把点赞次数存储到本地
    let count = parseInt(wx.getStorageSync(`DZ${this.data.id}`)) || 0;
    if (count > 65) count = 65;
    if (count === 0) wx.setStorageSync(this.data.id, this.data.textCon.Title)
    this.setData({
      animation1: this.animation1.export(),
      counts: count + 1,
      DZStyle: `../../image/guzhang.png`
    })
    wx.setStorageSync(`DZ${this.data.id}`, count + 1)

    // 获取节点的下边界坐标
    wx.createSelectorQuery().select('.dianZan2').boundingClientRect(function (rect) {
      rect.bottom
    }).exec((res) => {
      console.log(res[0].bottom)
      // 如果不在悬浮状态就往上走
      // 用bottom判断是否为悬浮状态
      if (Number.parseInt(res[0].bottom) !== 461) {
        this.animation2.opacity(1).translate3d(0, -120, 0).step()
        this.DianZan2();
      } else {
        // 如果是悬浮状态就原地放大
        this.animation2.scale3d(1.2, 1.2, 1).step({ duration: 100 })
        this.animation2.scale3d(1, 1, 1).step({ duration: 100 })
        this.DianZan2();
      }
    })
  },
  DianZan2: function () {
    this.setData({
      animation2: this.animation2.export()
    })
    clearTimeout(this.timer1);
    this.timer1 = setTimeout(() => {
      this.DianZan3()
    }, 1000)
  },
  DianZan3: function () {
    this.animation2.translate3d(0, -140, 0).opacity(0).step()
    this.animation2.translate3d(0, -180, 0).step()
    this.animation2.translate3d(0, 0, 0).step({ duration: 0 })
    this.setData({
      animation2: this.animation2.export()
    })
  },
  bindScroll: function(e) {
    const scrollTop = e.detail.scrollTop
    if (scrollTop < 180) {
      const precent = scrollTop / 3600;
      this.setData({ backBlur: scrollTop > 0 ? scrollTop / 300 : 0, scale: 1 - precent})
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const conId = options.id;
    const share = options.share;
    if (wx.getStorageSync(`DZ${conId}`)) {
      this.setData({
        DZStyle: `../../image/guzhang.png`
      })
    }
    wx.request({
      url: api.postDetail + conId,
      success: (res) => {
        const con = {
          textCon: handleCon(res.data, wx.getStorageSync("banPictrue")),
          id: conId
        };
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
    const animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in',
    })
    const animation2 = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-in',
    })
    this.animation2 = animation2
    this.animation1 = animation;
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
    
    wx.redirectTo({
      url: '../index/index',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
    console.log("sss")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: "一起来看吧",
      success: function (res) {
        // 转发成功
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