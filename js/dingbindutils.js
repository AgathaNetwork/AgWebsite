function DingBind_PageLoad(){
//		document.title="Agatha Network";
		
		//GetBackground();
		var Session=DingBind_getCookie("sess");
		var respond;
		var url="https://api-openid.agatha.org.cn/auth/validateSession";
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
				
				if(respond.return==1){
					document.getElementById("Inf1").innerText="账号："+respond.user;
					document.getElementById("Inf2").innerText="钉钉UserID："+DingBind_GetUrlParam("ding");
				}
				
			}
		};
		
	}
	
	function DingBind_getCookie(name){
		 var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		 if (arr != null) return unescape(arr[2]); return null;
	}
	
    function DingBind_DingBind(){
    		var respond;
    		var Session=DingBind_getCookie("sess");
    		var ID=DingBind_GetUrlParam("ding");
    		var url="https://api-openid.agatha.org.cn/setdingbind.php";
    		var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    		httpRequest.open('POST' , url , true); //第二步：打开连接
    		httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    		httpRequest.send('session=' + Session+'&ding='+ID);//发送请求 将情头体写在send中
    		/**
    		 * 获取数据后的处理程序
    		 */
    		 console.log('session=' + Session+'&ding='+ID);
    		httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
    			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
    				respond = JSON.parse(httpRequest.responseText);//获取到服务端返回的数据
    				console.log(JSON.stringify(respond));
    				if(respond.status=="succ"){
    					location.href="https://mc.agatha.org.cn/accounts/settings.html"
    				}
    			}
    		};
    }
    
	function DingBind_GetUrlParam(key){
		var url = window.location.search;
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		var result = url.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	}