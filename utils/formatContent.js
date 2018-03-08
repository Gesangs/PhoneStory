import { format } from './date-utils.js';

export const handleCon = (item, banPictrue = false) => {
  const html = item.content
    .replace(/(<|<\/)(figure|noscript)>/g, '')
    .replace(/\ssrc="(https:\/\/pic\d.zhimg.com\/v\d-[a-z0-9]{10,}_\w\.((jpg)|(png)))"/g, '<img>$1</img>');
  const pattern = /([^>]*)(<([a-z/][-a-z0-9_:.]*)[^>/]*(\/*)>)([^<]*)/g;
  let matchArr;
  const nodes = [];
  while ((matchArr = pattern.exec(html))) {
    switch (matchArr[3]) {
      case 'img':
        if (!banPictrue) {
          nodes.push({
            name: 'img',
            attrs: {
              class: 'imgStyle',
              src: matchArr[5],
              width: '100%'
            }
          });
        }
        break;
      case 'p':
        nodes.push({
          name: 'p',
          attrs: {
            class: (true ? 'textStyle' : ''),
          },
          children: [{
            type: 'text',
            text: matchArr[5]
          }]
        });
        break;
      case 'br':
        nodes.push({
          name: 'br'
        });
        break;
      case 'h2':
        nodes.push({
          name: 'h2',
          attrs: {
            class: 'h2Style',
          },
          children: [{
            type: 'text',
            text: matchArr[5]
          }]
        });
        break;
    }
  }

  return {
    nodes: nodes,
    Title: item.title,
    titleImage: item.titleImage,
    author: item.author.name,
    timer: format(item.publishedTime)
  };
}