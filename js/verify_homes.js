function Verify(){
    var Session=Verify_getCookie("sess");
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
				    document.getElementById("AuthenticatingForm").style.display="none";
				    document.getElementById("IndexContainer").style.display="";
				    Verify_LoadHomes();
				}else{
					window.location.href = "https://mc.agatha.org.cn/accounts/login.html";
				}
				
			}
		};
}

function Verify_getCookie(name){
		 var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		 if (arr != null) return unescape(arr[2]); return null;
	}
function Verify_LoadHomes(){
    var Session=Verify_getCookie("sess");
		var respond;
		var url="https://api-openid.agatha.org.cn/info/homes";
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
				    if(respond.existence=="1"){
				        
				        
				        dataShowInnerHTML =
			//"<table width='550px' style='font-size:20px;'>"
			"<table class=\"table\">"
			+"<thead><tr>"
			+"<th scope=\"col\">名称</td>"
			+"<th scope=\"col\">坐标</td>"
			+"<th scope=\"col\">世界</td>"
			+"</tr></thead>";
			
for (const [homeName, homeData] of Object.entries(respond.homes)) {
    // 注意：这里使用homeData[1]是因为你的y坐标的key是数字1
    var worldname="未知世界";
    if(homeData["world-name"]=="world")worldname="主世界";
    if(homeData["world-name"]=="world_the_end")worldname="末地";
    if(homeData["world-name"]=="world_nether")worldname="下界";
    dataShowInnerHTML +=
					"<tr>"
					+"<td>"+ homeName +"</td>"
					+"<td>"+Math.round(homeData.x)+"," + Math.round(homeData.y) + ","+Math.round(homeData.z)+"</td>"
					+"<td>" +worldname+"</td>"
					+"</tr>";
}
			
		dataShowInnerHTML += "</table>";
		document.getElementById("resultContainer").innerHTML=dataShowInnerHTML;
		    
				    }
				    else{
				        document.getElementById("resultContainer").innerHTML="未查询到您的Home数据，请先登录一次服务器。";
				    }
				        
				}else{
				    document.getElementById("resultContainer").innerHTML="发生了未知的错误。";
				}
				
			}
		};
}