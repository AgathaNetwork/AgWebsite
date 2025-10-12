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
				    Verify_LoadStats();
				}else{
					window.location.href = "https://mc.agatha.org.cn/accounts/login.html";
				}
				
			}
		};
}
function formatMilliseconds(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const remainingSeconds = totalSeconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const pad = (num) => String(num).padStart(2, '0');
  return `${hours}小时${pad(minutes)}分${pad(seconds)}秒`;
}
function Verify_getCookie(name){
		 var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		 if (arr != null) return unescape(arr[2]); return null;
	}
function Verify_LoadStats(){
    var Session=Verify_getCookie("sess");
		var respond;
		var url="https://api-openid.agatha.org.cn/info/playTime";
		var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
		httpRequest.open('POST' , url , true); //第二步：打开连接
		httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
		httpRequest.send('session=' + Session);//发送请求 将情头体写在send中
		/**
		 * 获取数据后的处理程序
		 */
		httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
			
				console.log(httpRequest.responseText);
				respond = JSON.parse(httpRequest.responseText);//获取到服务端返回的数据
				
				if(respond.status=="ok"){
				    const data = respond;
				    const dailyTime = formatMilliseconds(data.info.daily_play_time);
				    const weeklyTime = formatMilliseconds(data.info.weekly_play_time);
				    const monthlyTime = formatMilliseconds(data.info.monthly_play_time);
				    const totalTime = formatMilliseconds(data.info.total_play_time);
				    document.getElementById("I_Total").innerHTML = '<a class="text-black-50" style="margin-right:1rem">总时长</a>' + totalTime;
				    document.getElementById("I_Daily").innerHTML = '<a class="text-black-50" style="margin-right:1rem">当日时长</a>' + dailyTime;
				    document.getElementById("I_Weekly").innerHTML = '<a class="text-black-50" style="margin-right:1rem">本周时长</a>' + weeklyTime;
				    document.getElementById("I_Monthly").innerHTML = '<a class="text-black-50" style="margin-right:1rem">本月时长</a>' + monthlyTime;
				    
				        
				}else{
				    document.getElementById("resultContainer").innerHTML="发生了未知的错误。";
				}
				
			}
		};
}