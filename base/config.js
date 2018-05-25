
// 分类页面初始化数据

export const breandData = [{
  title: 'Timer周报',
  topic: '科技资讯',
  img: '../../image/TimerPaper@2x.png',
  text: '聚焦本周科技资讯，新鲜的内容加上毒辣的短评，只需3分钟，帮你在周末轻松回顾本周重点。',
  postsCount: ""
},
{
  title: 'Windows应用测评',
  topic: '通用 Windows 平台（UWP）',
  img: '../../image/UWP@2x.png',
  text: '体验千奇百怪的 Windows 应用程序，在桌面端及移动端的效率神器到小众精选，帮你更加透彻的了解应用之美。',
  postsCount: ""
},
{
  title: '热评文章',
  topic: '数码',
  img: '../../image/Diss@2x.png',
  text: '针对当下的科技数码大事件作出评论，对新鲜产品第一时间上手体验，分享第一手的观点与感受，既有深度又有风度。',
  postsCount: ""
}]


// 渐变色
export const colorArr = [
  "#6956ec, #56b2ba",
  "#3023ae, #c86dd7",
  "#bd4de8, #ff2366",
  "#fd4935, #fad414",
  "#72afd3, #37ecba"
]



const apiBase = 'https://zhuanlan.zhihu.com/api/'

export const api = {
  // timer365的文章列表数据
  postUrl: apiBase + 'columns/timer365/posts',
  // 认知日志的文章列表数据
  learnPostUrl: apiBase + 'columns/leaninglog/posts',
  // 文章详情
  postDetail: apiBase + 'posts/',
  // 专栏详情（获取话题的文章数）
  postCount: apiBase + 'columns/timer365',
}