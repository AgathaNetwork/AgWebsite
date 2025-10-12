var AdvStat=0;
function ShowAdv(id){
    
    httpRequest5 = new XMLHttpRequest();//第一步：创建需要的对象
		var url="https://api-openid.agatha.org.cn/advancement/getStatus?user="+id;
		httpRequest5.open('GET' , url , true); //第二步：打开连接
		httpRequest5.send();//发送请求 将情头体写在send中
		/**
		 * 获取数据后的处理程序
		 */
		var respond5;
		httpRequest5.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
			if (httpRequest5.readyState == 4 && httpRequest5.status == 200) {//验证请求是否发送成功
				respond5 = JSON.parse(httpRequest5.responseText);//获取到服务端返回的数据
				console.log(JSON.stringify(respond5));
				if(respond5.status=="enabled"){
				    AdvStat=1;
			        document.getElementById("resultBoxAdv").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">当前状态：</a>已启用";
				}else {
				    
				    AdvStat=0;
			        document.getElementById("resultBoxAdv").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">当前状态：</a>未启用";
                }
			}
		};
}
function ChangeAdv(){
    httpRequest6 = new XMLHttpRequest();//第一步：创建需要的对象
		var url;
		if(AdvStat)url="https://api-openid.agatha.org.cn/advancement/disable";
		else url="https://api-openid.agatha.org.cn/advancement/enable";
		httpRequest6.open('POST' , url , true); //第二步：打开连接
		httpRequest6.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
		httpRequest6.send('sess=' + Adv_getCookie("sess"));//发送请求 将情头体写在send中
		/**
		 * 获取数据后的处理程序
		 */
		var respond6;
		httpRequest6.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
			if (httpRequest6.readyState == 4 && httpRequest6.status == 200) {//验证请求是否发送成功
				respond6 = JSON.parse(httpRequest6.responseText);//获取到服务端返回的数据
				console.log(JSON.stringify(respond6));
				if(respond6.status=="ok"){
				    
			        document.getElementById("resultBoxAdv").innerHTML="<div class=\"alert alert-success\" role=\"alert\">您已修改此项，请刷新页面查看最新数据！</div>";
				}else {
			        document.getElementById("resultBoxAdv").innerHTML="<div class=\"alert alert-danger\" role=\"alert\">操作失败</div>";
                }
			}
		};
}
function Adv_getCookie(name){
		 var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		 if (arr != null) return unescape(arr[2]); return null;
	}