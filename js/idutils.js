function ShowID(name){
		var respond;
        var Session=ShowID_getCookie("sess");
		var url="https://api-openid.agatha.org.cn/info/getId";
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
                                          document.getElementById("V_Type").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">证件类型</a>第二代中国居民身份证";
                                          document.getElementById("V_Bind").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">证件号码</a>"+respond.id;
                                          document.getElementById("V_Name").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">真实姓名</a>"+respond.realname;
				}else {
                                          document.getElementById("V_Type").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">证件类型</a>无数据";
                                          document.getElementById("V_Bind").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">证件号码</a>无数据";
                                          document.getElementById("V_Name").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">真实姓名</a>无数据";
                                }
			}
		};
}

function ShowID_getCookie(name){
		 var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		 if (arr != null) return unescape(arr[2]); return null;
	}