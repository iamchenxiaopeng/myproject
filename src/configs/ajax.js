// export default (type='POST', url='', data={}, async=true) => {
// 	return new Promise((resolve, reject) => { //定义一个promise
// 		type = type.toUpperCase();

// 		let requestObj;
// 		if (window.XMLHttpRequest) {
// 			requestObj = new XMLHttpRequest();
// 		} else {
// 			requestObj = new ActiveXObject;
// 		}

// 		if (type == 'GET') {
// 			let dataStr = ''; //数据拼接字符串
// 			Object.keys(data).forEach(key => {
// 				dataStr += key + '=' + data[key] + '&';
// 			})
// 			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
// 			url = url + '?' + dataStr;
// 			requestObj.open(type, url, async);
// 			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 			requestObj.send();
// 		}else if (type == 'POST') {
// 			requestObj.open(type, url, async);
// 			requestObj.setRequestHeader("Content-type", "application/json");
// 			requestObj.send(JSON.stringify(data));
// 		}else {
// 			reject('error type');
// 		}

// 		requestObj.onreadystatechange = () => {
// 			if (requestObj.readyState == 4) {
// 				if (requestObj.status == 200) {
// 					let obj = requestObj.response
// 					if (typeof obj !== 'object') {
// 						obj = JSON.parse(obj);
// 					}
// 					resolve(obj);
// 				}else {
// 					reject(requestObj);
// 				}
// 			}
// 		}
// 	})
// }

// export default (otherUrl,data,method) =>{
// 	return new Promise((resolve, reject)=>{
// 		// 异步对象
// 		var ajax = new XMLHttpRequest();
// 		let url = baseUrl + otherUrl;
// 		if (window.XMLHttpRequest){
// 			ajax=new XMLHttpRequest();
// 		}else {
// 			ajax=new ActiveXObject("Msxm12.XMLHTTP");
// 		}
// 		method = method.toUpperCase();
// 		if (method=='GET') {
// 			// get请求
// 			if (data) {
// 				// 如果有值
// 				url+='?';
// 				url+=data;
// 			}else{

// 			}
// 			// 设置 方法 以及 url
// 			ajax.open(method,url);
// 			ajax.send();
// 		}else{
// 			// post请求 url 是不需要改变
// 			ajax.open(method,url);
// 			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
// 			if (data) {
// 				//解决发送 + 号变成空格的问题
// 				data = data.replace(/\+/g,"%2B");
// 				ajax.send(data);
// 			}else{
// 				ajax.send();
// 			}
// 		}
// 		// 注册事件
// 		ajax.onreadystatechange = function () {
// 			if (ajax.readyState==4) {
// 				if (ajax.status == 200) {
// 					let obj =  ajax.responseText;
// 					if(typeof obj != 'object'){
// 						obj = JSON.parse(obj);
// 					}
// 					resolve(obj);
// 				}else {
// 					reject(ajax);
// 				}
// 			}
// 		}
// 	})
// }

export default (otherUrl,data,method) =>{
	return new Promise((resolve, reject)=>{
		// 异步对象
		var ajax = new XMLHttpRequest();
		let baseUrl = '';
		let url = baseUrl + otherUrl;

		let dataStr = ''; //数据拼接字符串
		if(data){
			// data['noCache'] = Math.random();//防止从缓存中读取
			Object.keys(data).forEach(key => {
				dataStr += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
			})
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
		}
		

		if (window.XMLHttpRequest){
			ajax=new XMLHttpRequest();
		}else {
			ajax=new ActiveXObject("Msxm12.XMLHTTP");
		}
		
		method = method.toUpperCase();
		if (method=='GET') {
			// get请求
			if (data) {
				// 如果有值
				url+='?';
				url+=dataStr;
			}else{

			}
			// 设置 方法 以及 url
			ajax.open(method,url);
			ajax.send();
		}else{
			// post请求 url 是不需要改变
			ajax.open(method,url);
			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			// ajax.setRequestHeader("abcd","ddddd");
			if (data) {
				//解决发送 + 号变成空格的问题
				dataStr = dataStr.replace(/\+/g,"%2B");
				ajax.send(dataStr);
			}else{
				ajax.send();
			}
		}
		// 注册事件
		ajax.onreadystatechange = function () {
			if (ajax.readyState==4) {
				if (ajax.status == 200) {
					let obj =  ajax.responseText;
					if(typeof obj != 'object'){
						obj = JSON.parse(obj);
					}
					resolve(obj);
				}else {
					reject(ajax);
				}
			}
		}
	})
}