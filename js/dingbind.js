function Bind(){
    if(Bind_GetUrlParam("action")=="2")window.location.href = "https://mc.agatha.org.cn/accounts/login.html?action=2&ding="+Login_GetUrlParam("ding");
    return 0;
}
function Bind_GetUrlParam(key){
		var url = window.location.search;
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		var result = url.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	}