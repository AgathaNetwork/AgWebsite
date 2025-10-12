function ShowLogin(){
    var respond2;
		url="https://api-openid.agatha.org.cn/info/getLoginHistory";
		httpRequest2 = new XMLHttpRequest();//第一步：创建需要的对象
		httpRequest2.open('POST' , url , true); //第二步：打开连接
		httpRequest2.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
		httpRequest2.send('session=' + Login_getCookie("sess"));//发送请求 将情头体写在send中
		/**
		 * 获取数据后的处理程序
		 */
		httpRequest2.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
			if (httpRequest2.readyState == 4 && httpRequest2.status == 200) {//验证请求是否发送成功
				respond2 = JSON.parse(httpRequest2.responseText);//获取到服务端返回的数据
				console.log(JSON.stringify(respond2));
				if(respond2.status=="ok"){
				    
					document.getElementById("L_LastIP").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">上次登录IP</a>"+respond2.ip;
				    var Http = new XMLHttpRequest();
                    var url='https://api-openid.agatha.org.cn/info/geoIp?ip='+respond2.ip;
                    Http.open("GET", url);
                    Http.send();
                    Http.onreadystatechange = (e) => {
					    document.getElementById("L_LastIP").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">上次登录IP</a>"+respond2.ip+" "+Http.responseText;
                    }
				}else{
					document.getElementById("L_LastIP").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">上次登录IP</a>"+"数据获取错误";
				}
				
			}
		};
}
function Login_getCookie(name){
		 var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		 if (arr != null) return unescape(arr[2]); return null;
	}
function Logout(){
		var respond;
		var Session=Login_getCookie("sess");
		var url="https://api-openid.agatha.org.cn/account/logout";
		var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
		httpRequest.open('POST' , url , true); //第二步：打开连接
		httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
		httpRequest.send('session=' + Session);//发送请求 将情头体写在send中
		/**
		 * 获取数据后的处理程序
		 */
		httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
				respond = JSON.parse(httpRequest.responseText);//获取到服务端返回的数据
				console.log(JSON.stringify(respond));
				if(respond.status=="ok"){
					
                                        window.location.href = "https://mc.agatha.org.cn/accounts/";
				}
			}
		};
}	