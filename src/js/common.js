import axios from "axios";
import qs from "qs";

var apiUrl = 'https://cha1.iweiji.cc/';
// var apiUrl = 'https://cha.iweiji.cc/';


var yuanAjax = function (app, url, body, successCallback, errorCallback) {
	if (!getCookie('chaUID' ||  getCookie('chaUID') == 'login')) {
		window.location.href = '/login';
	}
	axios.post(apiUrl + url, qs.stringify(body)).then(function (res) {
		successCallback(res.data);
	}).catch(function (err) {
		// console.log(err);
	});
};


//getCookie
var getCookie = function (name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

/*删除cookie方法*/
function delCookie(name) {
	setCookie(name, '', 'h-1')
}

/*设置cookie 参数为小时*/
var setCookie = function (c_name, value, expiredays) {
	//写cookies
	var exdate = new Date();
	exdate.setHours(exdate.getHours() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

export {
	yuanAjax,
	setCookie,
	delCookie,
	getCookie
}
