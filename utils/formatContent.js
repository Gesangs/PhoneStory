import { format } from './date-utils.js';


function _returnText(text) {
  return text ? [{
    type: 'text',
    text
  }] : [];
}
export const handleCon = (item, banPictrue = false) => {
  const html = item.content
    .replace(/(<|<\/)(figure|noscript)>/g, '')
    .replace(/<img\ssrc="(https:\/\/pic\d.zhimg.com\/v\d-[a-z0-9]{10,}_\w\.((jpg)|(png)))[^>]+"/g, '<image>$1</image>')
    .replace(/<img\ssrc="([^<>]+)"\salt[^>]+>/g, '<formula>$1</formula>');
  const pattern = /([^>]*)(<([a-z/][-a-z0-9_:.]*)[^>/]*(\/*)>)([^<]*)/g;
  const nodes = [];
  let matchArr;
  let len;
  while ((matchArr = pattern.exec(html))) {
    switch (matchArr[3]) {
      case 'image':
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
      case 'formula':
        if (!banPictrue) {
          nodes.push({
            name: 'img',
            attrs: {
              class: 'fimgStyle',
              src: matchArr[5]
            }
          });
        }
        break;
      case 'p':
        nodes.push({
          name: 'p',
          attrs: {
            class: (true ? 'text-post textStyle' : ''),
          },
          children: _returnText(matchArr[5])
        });
        break;
      case 'b':
        len = nodes.length - 1;
        if (nodes[len].name != "img" && nodes[len].children)
          nodes[len].children.push({
            name: 'b',
            children: _returnText(matchArr[5])
          });
        break;
      case '/b':
        len = nodes.length - 1;
        matchArr[5] && nodes[len].children ? nodes[len].children.push({
          type: 'text',
          text: matchArr[5]
        }) : "";
        break;
      case 'i':
        len = nodes.length - 1;
        nodes[len].children.push({
          name: 'i',
          children: _returnText(matchArr[5])
        });
        break;
      case 'br':
        nodes.push({
          name: 'br'
        });
        break;
      case 'hr':
        nodes.push({
          name: 'hr',
          attrs: {
            class: 'text-hr',
          },
        });
        break;
      case 'h2':
        nodes.push({
          name: 'h2',
          attrs: {
            class: 'text-h2 h2Style',
          },
          children: _returnText(matchArr[5])
        });
        break;
      case 'li':
        nodes.push({
          name: 'li',
          attrs: {
            class: 'text-post text-li'
          },
          children: _returnText(matchArr[5])
        });
        break;
    }
  }

  return {
    nodes: nodes,
    Title: item.title,
    titleImage: item.titleImage,
    author: item.author.name,
    headPic: `https://pic2.zhimg.com/50/${item.author.avatar.id}_im.jpg`,
    timer: format(item.publishedTime)
  };
}