export const deepEqual = function (x,y) {
    if (x === y) return true;
    else if ((typeof x === "object" && x != null) && (typeof y === "object" && y != null)){
        if (Object.keys(x).length !== Object.keys(y).length){
            return false;
        }
        for (let prop in x) {
            if(y.hasOwnProperty(prop)) {
                if(!deepEqual(x[prop], y[prop])) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}

export const getExploreName = function () {
    let explorer = window.navigator.userAgent;
    let ua = window.navigator.userAgent;
    let isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
    //判断是否为IE浏览器
    if (explorer.indexOf("MSIE") >= 0) {
      return "IE";
    }
    //判断是否为Firefox浏览器
    else if (explorer.indexOf("Firefox") >= 0) {
      return "Firefox";
    }
    //判断是否为Chrome浏览器
    else if (explorer.indexOf("Chrome") >= 0) {
      return "Chrome";
    }
    //判断是否为Opera浏览器
    else if (explorer.indexOf("Opera") >= 0) {
      return "Opera";
    }
    //判断是否为Safari浏览器
    else if (isSafari) {
      return "Safari";
    } else return "Unknown";
}

export const judgeWap = function () {
  let bodyWidth = document.body.clientWidth;
  let bodyHeight = document.body.clientHeight;

  if (bodyHeight > bodyWidth || !IsPC()) {
    return true;
  }
  return false;
}

export const IsPC = function () {
  let userAgentInfo = navigator.userAgent;
  let Agents = new Array(
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  );
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

  