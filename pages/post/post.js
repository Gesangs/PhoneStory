import { handleCon } from '../../utils/formatContent.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    textCon: {
      nodes: [],
      titleImage: '',
      Title: '',
      author: '',
      timer: ''
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
  // anima: function () {
  //   console.log("g")
  //   let num = 16;
  //   const ctx = wx.createCanvasContext('myCanvas')
  //   const circleArr = [];
  //   function Circle(x, y, r, color) {
  //     // this.ctx = ctx;
  //     this.x = x;
  //     this.y = y;
  //     this.r = r;
  //     // 颜色的取值范围
  //     this.color = `rgb(${parseInt(Math.random() * 240) + 9},${parseInt(Math.random() * 220) + 18},203)`;

  //     //随机方向
  //     this.dx = Math.random() * 12 - 7;
  //     this.dy = Math.random() * 12 - 7;
  //   }


  //   //渲染
  //   Circle.prototype.render = function () {
  //     //创建一个圆
  //     ctx.beginPath()
  //     ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
  //     //设置样式颜色
  //     ctx.setFillStyle(this.color);
  //     //通过填充路径的内容区域生成实心的图形
  //     ctx.closePath()
  //     ctx.fill();
  //   }

  //   //更新
  //   Circle.prototype.update = function () {
  //     this.x += this.dx;
  //     this.y += this.dy;
  //     this.r -= 1;
  //     if (this.r < 0) {
  //       for (var i = 0; i < circleArr.length; i++) {
  //         if (circleArr[i] === this) {
  //           circleArr.splice(i, 1);
  //         };
  //       }
  //       return false;
  //     }
  //     return true;
  //   }
  //   while (num--) {
  //     circleArr.push(new Circle(100, 100, 10, "red"));
  //   }
  //     clearInterval(this.time)
  //     this.time = setInterval(function () {
  //       ctx.clearRect(0,0,200,200)
  //       ctx.draw()
  //       for (let i = 0; i < circleArr.length; i++) {
  //         circleArr[i].update() && circleArr[i].render();
  //       };
  //       ctx.draw()
  //     }, 30);   
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const conId = options.id;
    const share = options.share;
    const that = this;
    if (wx.getStorageSync(`DZ${conId}`)) {
      this.setData({
        DZStyle: `../../image/guzhang.png`
      })
    }
    wx.request({
      url: `https://zhuanlan.zhihu.com/api/posts/${conId}`,
      success: function (res) {
        const con = {
          textCon: handleCon(res.data, wx.getStorageSync("banPictrue")),
          id: conId
        };
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