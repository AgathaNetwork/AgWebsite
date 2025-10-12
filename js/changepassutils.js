function ChangePass(){
		var respond;
		var Session=ChangePass_getCookie("sess");
		var Pass=document.getElementById("passInput").value;
		var url="https://api-openid.agatha.org.cn/account/changePassword";
		var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
		httpRequest.open('POST' , url , true); //第二步：打开连接
		httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
		httpRequest.send('sess=' + Session+'&pass='+Pass);//发送请求 将情头体写在send中
		/**
		 * 获取数据后的处理程序
		 */
		httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
				respond = JSON.parse(httpRequest.responseText);//获取到服务端返回的数据
				console.log(JSON.stringify(respond));
				if(respond.status=="ok"){
                    document.getElementById("Alert_UpdateFailed").className="alert alert-danger alert-dismissible fade";
					document.getElementById("Alert_UpdateSuccess").className="alert alert-success alert-dismissible fade show";
                    document.getElementById("Alert_UpdateFailed").style.display="none";
					document.getElementById("Alert_UpdateSuccess").style.display="";
				}else {
                    document.getElementById("Alert_UpdateFailed").className="alert alert-danger alert-dismissible fade show";
					document.getElementById("Alert_UpdateSuccess").className="alert alert-success alert-dismissible fade";
                    document.getElementById("Alert_UpdateFailed").style.display="";
					document.getElementById("Alert_UpdateSuccess").style.display="none";
                }
			}
		};
}

function ChangePass_getCookie(name){
		 var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		 if (arr != null) return unescape(arr[2]); return null;
	}