export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};

export function getUrlParam(currentUrl) {
  if (currentUrl.indexOf('?') === -1) {
    return {};
  }
  var result = {};
  currentUrl = currentUrl.replace(/.*\?/g, '');
  var arr = currentUrl.match(/[^&]+?=[^&]*/g).join('=').split('=');
  for (var i = 0; i < arr.length; i += 2) {
    result[arr[i]] = arr[i + 1];
  }
  return result;
};
