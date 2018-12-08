//说明：本工具可以获取：shebei设备、software平台、网页被卷曲的高度scrollTop、网页宽高、视口高度、

let u = navigator.userAgent; 
let ua = navigator.userAgent.toLowerCase();
let scrollTop = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
let winHeight = window.innerHeight;//网页高
let winWidth = window.innerWidth;//网页宽
let pageWidth = document.body.clientWidth//网页可见区域的宽度(body)
let pageHeight = document.body.clientHeight;//网页可见区域高
let clientHeight = document.documentElement.clientHeight;//视口高度

const winInfo = {};



//绑定事件兼容写法
let addEvent = (element, type, callback)=>{
    if(element.addEventListener){
        element.addEventListener(type, callback, false);
    }else if(element.attachEvent){
        element.attachEvent('on' + type, callback)
    }else {
        element['on' + type] = callback;
    }
}
//解除事件兼容写法
let removeEvent = (element, type, callback)=>{
    if(element.removeEventListener){
        element.removeEventListener(type, callback, false);
    }else if(element.detachEvent){
        element.detachEvent('on' + type, callback)
    }else {
        element['on' + type] = null;
    }
}

//判断用手机是Android还是ios
if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { 
    winInfo['shebei'] = 1;
} else if (u.indexOf('iPhone') > -1) { 
    winInfo['shebei'] = 2;
} else if (u.indexOf('Windows Phone') > -1) { 
    winInfo['shebei'] = 4;
} else{
    winInfo['shebei'] = 5;
}

//判断平台1、微信 2、 qq3、微博4、其他
if(ua.match(/MicroMessenger/i)=="micromessenger") {
    winInfo['software'] = 1;
}else if(ua.match(/QQ/i) == "qq"){ 
    winInfo['software'] = 2;
}else if(ua.match(/WeiBo/i) == "weibo" ){
    winInfo['software'] = 3;
}else{
    winInfo['software'] = 4;
}

winInfo['scrollTop'] = scrollTop;
winInfo['winHeight'] = winHeight;
winInfo['winWidth'] = winWidth;
winInfo['clientHeight'] = clientHeight;
winInfo['addEvent'] = addEvent;
winInfo['removeEvent'] = removeEvent;
winInfo['pageWidth'] = pageWidth;
winInfo['pageHeight'] = pageHeight;

export default winInfo;