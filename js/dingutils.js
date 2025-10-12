function ShowDing(id){
    
    httpRequest4 = new XMLHttpRequest();//第一步：创建需要的对象
		var url="https://api-openid.agatha.org.cn/info/dingBind";
		httpRequest4.open('POST' , url , true); //第二步：打开连接
		httpRequest4.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
		httpRequest4.send('session=' + Ding_getCookie("sess"));//发送请求 将情头体写在send中
		/**
		 * 获取数据后的处理程序
		 */
		var respond4;
		httpRequest4.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
			if (httpRequest4.readyState == 4 && httpRequest4.status == 200) {//验证请求是否发送成功
				respond4 = JSON.parse(httpRequest4.responseText);//获取到服务端返回的数据
				console.log(JSON.stringify(respond4));
				if(respond4.status=="ok"){
				    
			        document.getElementById("D_Bind").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">钉钉UserID</a>"+respond4.ding;
				}else {
			        document.getElementById("D_Bind").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">钉钉UserID</a>未绑定";
                }
			}
		};
}

function Ding_getCookie(name){
		 var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		 if (arr != null) return unescape(arr[2]); return null;
	}