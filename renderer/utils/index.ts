import cookie from 'cookie';

export const parseCookies = (req: any, options = {}) => {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);
};

export const formatText = (text: string | null) => {
  if (text) {
    const reg = /((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g;
    const newText = text.replace(reg, (a) => {
      if (!a.indexOf('http')) {
        return `<a href="${a}">${a}</a>`;
      }
      return `<a href="http://${a}">${a}</a>`;
    });
    return newText;
  }
  return text;
};

export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});
