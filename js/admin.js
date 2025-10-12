function Enable(){
        var Session=OP_getCookie("sess");
		var respond;
		var url="https://api-openid.agatha.org.cn/op/set";
		var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
		httpRequest.open('POST' , url , true); //第二步：打开连接
		httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
		httpRequest.send('sess=' + Session);//发送请求 将情头体写在send中
}
function Disable(){
        var Session=OP_getCookie("sess");
		var respond;
		var url="https://api-openid.agatha.org.cn/op/remove";
		var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
		httpRequest.open('POST' , url , true); //第二步：打开连接
		httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
		httpRequest.send('sess=' + Session);//发送请求 将情头体写在send中
}

function OP_getCookie(name){
		 var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		 if (arr != null) return unescape(arr[2]); return null;
	}