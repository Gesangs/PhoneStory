export const circleArr = [];
//圆形类
export function Circle(x, y, r, color, ctx) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.r = r;
  // 颜色的取值范围
  this.color = `rgb(${parseInt(Math.random() * 240) + 9},${parseInt(Math.random() * 220) + 18},203)`;

  //随机方向
  this.dx = Math.random() * 12 - 7;
  this.dy = Math.random() * 12 - 7;
}


//渲染
Circle.prototype.render = function () {
  //创建一个圆
  this.ctx.beginPath()
  this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
  //设置样式颜色
  this.ctx.setFillStyle(this.color);
  //通过填充路径的内容区域生成实心的图形
  this.ctx.closePath()
  this.ctx.fill();
}

//更新
Circle.prototype.update = function () {
  this.x += this.dx;
  this.y += this.dy;
  this.r--;
  if (this.r < 0) {
    for (var i = 0; i < circleArr.length; i++) {
      if (circleArr[i] === this) {
        circleArr.splice(i, 1);
      };
    }
    return false;
  }
  return true;
}
