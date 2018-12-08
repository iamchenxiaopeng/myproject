const usefulFn = {};
//获取当前url参数
usefulFn.GetUrlParam = function(paraName) {
    var url = window.location.href;
    var arrObj = url.split("?");

    if (arrObj.length > 1) {
  　var arrPara = arrObj[1].split("&");
  　var arr;
  　　　　for (var i = 0; i < arrPara.length; i++) {
  　　　arr = arrPara[i].split("=");
  　　　if (arr != null && arr[0] == paraName) {
  　　　　　return arr[1];
  　　　}
  　  }
        return "";
        }
    　else {
    　　　return "";
    　}　
}

export default usefulFn;