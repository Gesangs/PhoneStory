import { format } from '../utils/date-utils.js';

export default class Text {
  constructor({
    headPic,
    name,
    time,
    title,
    titleImg,
    summary,
    id
  }) {
    this.headPic = headPic,
      this.name = name,
      this.time = time,
      this.title = title,
      this.titleImg = titleImg,
      this.summary = summary,
      this.id = id
  }
}

function handleSum(item) {
  const items = item.replace(/<[^>]+>/g, "").replace(/\s|↵↵/ig, '');
  return items.substr(0, 70).concat('......');
}

export function handleText(text) {
  return new Text({
    headPic: `https://pic2.zhimg.com/50/${text.author.avatar.id}_im.jpg`,
    name: text.author.name,
    time: format(text.publishedTime),
    title: text.title.replace(/\\s*|\t|\r|\n/g, ""),
    titleImg: text.titleImage,
    summary: handleSum(text.content),
    id: text.url.slice(3)
  })
}

export function handleList(list) {
  const List = [];
  list.forEach((item) => {
    let text = handleText(item)
    List.push(text);
  });
  return List;
}

