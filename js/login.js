function Login(){
		document.getElementById("loginButton").innerHTML = "登录中";
		//document.getElementById("loginForm").onsubmit="";
		
		var respond;
		var url="https://api-openid.agatha.org.cn/account/login";
		var user=document.getElementById("id").value;
		var pw=document.getElementById("pass").value;
		var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
		httpRequest.open('POST' , url , true); //第二步：打开连接
		httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
		httpRequest.send('user=' + user + '&pw=' + pw);//发送请求 将情头体写在send中
		httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
				respond = JSON.parse(httpRequest.responseText);//获取到服务端返回的数据
				console.log(JSON.stringify(respond));
				
				if(respond.status=="ok"){
				    
					document.getElementById("Alert_LoginSuccess").className="alert alert-success alert-dismissible fade show";
					document.getElementById("Alert_LoginFailed").className="alert alert-danger alert-dismissible fade";
					document.getElementById("loginButton").class="btn btn-outline-success";
					Login_SetCookie("sess",respond.session);
					var redirect = "https://mc.agatha.org.cn/accounts/";
					if(Login_GetUrlParam("redir") != null)redirect=Login_GetUrlParam("redir");
					else if(Login_GetUrlParam("action")=="2")window.location.href = "https://mc.agatha.org.cn/accounts/bind.html?ding="+Login_GetUrlParam("ding");
					else window.location.href = redirect;
				}else if(respond.status=="pass_failed"){
				    document.getElementById("Alert_LoginFailed").className="alert alert-danger alert-dismissible fade show";
					document.getElementById("Alert_LoginSuccess").className="alert alert-success alert-dismissible fade";
					document.getElementById("loginButton").innerHTML = "登录";
				}
				else{
					document.getElementById("Alert_LoginFailed").className="alert alert-danger alert-dismissible fade show";
					document.getElementById("Alert_LoginSuccess").className="alert alert-success alert-dismissible fade";
					document.getElementById("Alert_LoginFailed").innerHTML="<strong>您的账号已被封禁：</strong>"+respond.reason;
					document.getElementById("loginButton").innerHTML = "登录";
				}
				
			}
		};
		//document.getElementById("loginForm").onsubmit="Login();";
	}

function Login_GetUrlParam(key){
		var url = window.location.search;
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		var result = url.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	}

function Login_SetCookie(name,value){
		 var Days = 30;//此 cookie 将被保存 30 天
		 var exp = new Date();//new Date("December 31, 9998");
		 exp.setTime(exp.getTime() + Days*24*60*60*1000);
		 document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
	}