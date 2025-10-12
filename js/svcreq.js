function ShowSvcReqs(){
    var Session=ShowSvcReqs_getCookie("sess");
		var httpRequest3 = new XMLHttpRequest();//第一步：创建需要的对象
		var url="https://api-openid.agatha.org.cn/info/serviceRequirements";
		httpRequest3.open('POST' , url , true); //第二步：打开连接
		httpRequest3.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
		httpRequest3.send('session=' + Session);//发送请求 将情头体写在send中
		/**
		 * 获取数据后的处理程序
		 */
		var respond3;
		httpRequest3.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
			if (httpRequest3.readyState == 4 && httpRequest3.status == 200) {//验证请求是否发送成功
				respond3 = JSON.parse(httpRequest3.responseText);//获取到服务端返回的数据
				console.log(JSON.stringify(respond3));
				if(respond3.status=="ok"){
                    if(respond3.bili == null || respond3.bili == ""){
                        document.getElementById("P_Buid").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">哔哩哔哩UID</a>未设置";
                    }
                    else{
                        document.getElementById("P_Buid").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">哔哩哔哩UID</a>" + respond3.bili;
                    }
                    if(respond3.postloc == null || respond3.postloc == ""){
                        document.getElementById("P_Postloc").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">邮寄地址</a>未设置";
                    }
                    else{
                        document.getElementById("P_Postloc").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">邮寄地址</a>" + respond3.postloc;
                    }
                    if(respond3.mail == null || respond3.mail == ""){
                        document.getElementById("P_Mail").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">电子邮箱</a>未设置";
                    }
                    else{
                        document.getElementById("P_Mail").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">电子邮箱</a>" + respond3.mail;
                    }
				}
			}
		};
}


function ShowSvcReqs_getCookie(name){
		 var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		 if (arr != null) return unescape(arr[2]); return null;
	}