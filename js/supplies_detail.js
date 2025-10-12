var playerData,playerPrefixes,playerOnline;
	function GetPlayerData(){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200){
				playerData = JSON.parse(this.responseText);
				console.log("playerData: " + JSON.stringify(playerData));
			}
		}
		xmlhttp.open("GET", "https://mc.agatha.org.cn/info/getList", false);
		xmlhttp.send();
	}
	function ShowData(){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200){
				console.log("responseText: "+this.responseText);
				if(this.responseText){
					document.getElementById("InfrastructureName").innerText = JSON.parse(this.responseText).content;
					document.getElementById("IMessage").innerText = "备注："+JSON.parse(this.responseText).message;
					document.getElementById("IConfirmation").innerText = JSON.parse(this.responseText).confirmation;
					document.getElementById("IMaintainer").innerHTML = "<a href=\"https://mc.agatha.org.cn/players/?q="+JSON.parse(this.responseText).maintainer+"\">"+JSON.parse(this.responseText).maintainer+"</a>";
					document.getElementById("IUnitDescriptionDetail").innerText = JSON.parse(this.responseText).efficiency;
					if(JSON.parse(this.responseText).type == "producer"){
					    document.getElementById("IUnitDescription").innerText = "效率";
					}
					else document.getElementById("IUnitDescription").innerText = "总量";
					if(JSON.parse(this.responseText).status == "1"){
					    document.getElementById("InfrastructureStatus").innerHTML = "<span class=\"badge badge-primary me-1\" style=\"margin-right:1rem\">"+GetUrlParam("id")+"</span>当前可用";
					}
					else document.getElementById("InfrastructureStatus").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">该资源目前不可用</div>";
					var loc="";
					if(JSON.parse(this.responseText).world=="world")loc="主世界"+JSON.parse(this.responseText).x+","+JSON.parse(this.responseText).y+","+JSON.parse(this.responseText).z;
					if(JSON.parse(this.responseText).world=="world_nether")loc="下界"+JSON.parse(this.responseText).x+","+JSON.parse(this.responseText).y+","+JSON.parse(this.responseText).z;
					if(JSON.parse(this.responseText).world=="world_the_end")loc="末地"+JSON.parse(this.responseText).x+","+JSON.parse(this.responseText).y+","+JSON.parse(this.responseText).z;
					document.getElementById("IPosition").innerHTML = "位置：<a href=\"https://map.agatha.org.cn/index.html#" + JSON.parse(this.responseText).world + ":"+JSON.parse(this.responseText).x+":100:"+JSON.parse(this.responseText).z+":200:0:0:0:1:flat"+"\">"+loc+"</a>";
					
		            document.title=JSON.parse(this.responseText).content+" | Agatha纯净生存 资源管理";
				}
			}
		}
		xmlhttp.open("GET", "https://api-openid.agatha.org.cn/supply/getSupplyDetail?id="+GetUrlParam("id"), false);
		xmlhttp.send();
	}
	
	
	function CheckOnline(name){
		for(var i=0;i<Object.keys(playerOnline.data).length;i++){
			if(playerOnline.data[i].name == name){
				if(playerOnline.data[i].online==1) return "在线";
				else return "";
			}
		}
		return "";
	}
	
	function GetTimer(stringTime) {
		var second = 1000;
		var minute = second * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var week = day * 7;
		var month = day * 30;
		var time1 = new Date().getTime();
		var time2 = Date.parse(new Date(stringTime));
		var time = time1 - time2;
		
		var result = null;
		if (time < 0) {
			result = "未来";
		} else if (time / day >= 10) {
			result = "" + parseInt(time / day) + "天前";
		} else if (time / day >= 3) {
			result = "" + parseInt(time / day) + "天 " + parseInt(time / hour % 24) + "小时 " + parseInt(time / minute % 60) + "分钟前";
		} else if (time / hour >= 1) {
			result = "" + parseInt(time / hour) + "小时 " + parseInt(time / minute % 60) + "分钟前";
		} else if (time / minute >= 1) {
			result = "" + parseInt(time / minute) + "分 " + parseInt(time / second % 60) + "秒前";
		} else {
			result = parseInt(time / second) + "秒前";
		}
		return result;
	}
	function GetImage(name){
		var uuid;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200){
				console.log("responseText: "+this.responseText);
				if(this.responseText){
					uuid = JSON.parse(this.responseText).id;
					console.log(JSON.stringify("uuid is "+uuid));
					document.getElementById("image").src="https://crafatar.com/renders/body/"+uuid+"?scale=6&overlay";
					document.getElementById("image").style="padding:0px 60px 0px 0px;";
				}else{
					document.getElementById("image").src="";
					document.getElementById("image").style="display:none;";
				}
			}
		}
		xmlhttp.open("GET", "https://api-minecraft.agatha.org.cn/uuid_svc?name="+name, false);
		xmlhttp.send();
	}
	function GetUrlParam(key){
		var url = window.location.search;
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		var result = url.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	}
	function PageLoad(){
//		document.title="Agatha Network 等级排行榜";
		
//		document.getElementById("bgImg").src="https://mc.agatha.org.cn/files/bg/" + GetRndInteger(1,23) + ".png";
//		console.log("Background loaded from " + document.getElementById("bgImg").src);
		
		GetPlayerData();
		ShowData();
	}
	function ShowMap(){
		document.getElementById("mapFrameDiv").style="";
		console.log("https://map.agatha.org.cn/index_new.html#" + showMapWorld + ":"+showMapx+":"+showMapy+":"+showMapz+":200:0:0:0:1:flat");
		document.getElementById("mapFrame").src="https://map.agatha.org.cn/index_new.html#" + showMapWorld + ":"+showMapx+":"+showMapy+":"+showMapz+":200:0:0:0:1:flat";
		document.getElementById("toFullMap").href="https://map.agatha.org.cn/#" + showMapWorld + ":"+showMapx+":"+showMapy+":"+showMapz+":200:0:0:0:1:flat";
	}
	function GetRndInteger(min, max){
		return Math.floor(Math.random() * (max - min + 1) ) + min;
	}
	
	function GetStringTimes(string,aim){
		var times=(string.split(aim)).length-1;
		return times;
	}
	function McFormatting(string){
		if(string){
			var n,newStr=string;
			newStr = "<span class='mc'>" + newStr + "</span>";
			
			n = GetStringTimes(string,"&a");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&a", "<span class='mc-a'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&b");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&b", "<span class='mc-b'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&c");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&c", "<span class='mc-c'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&d");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&d", "<span class='mc-d'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&e");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&e", "<span class='mc-e'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&f");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&f", "<span class='mc-f'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&g");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&g", "<span class='mc-g'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&0");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&0", "<span class='mc-0'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&1");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&1", "<span class='mc-1'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&2");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&2", "<span class='mc-2'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&3");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&3", "<span class='mc-3'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&4");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&4", "<span class='mc-4'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&5");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&5", "<span class='mc-5'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&6");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&6", "<span class='mc-6'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&7");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&7", "<span class='mc-7'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&8");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&8", "<span class='mc-8'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&9");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&9", "<span class='mc-9'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&k");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&k", "<span class='mc-k'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&l");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&l", "<span class='mc-l'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&m");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&m", "<span class='mc-m'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&n");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&n", "<span class='mc-n'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&o");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&o", "<span class='mc-o'>");
				newStr = newStr + "</span>";
			}
			n = GetStringTimes(string,"&r");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&r", "<span class='mc-r'>");
				newStr = newStr + "</span>";
			}
			
			console.log("Prefix shown " + newStr);
			return newStr;
		}
		return "";
	}
	
	function ChangeURLStatic(name, value) {
		var url = location.href;
		var reg = eval('/([\?|&]'+name+'=)[^&]*/gi');
		value = value.toString().replace(/(^\s*)|(\s*$)/g,"");
		if(!value){
			var url2 = url.replace(reg , '');
		}else{
			if(url.match(reg)){
				var url2 = url.replace(reg , '$1' + value);
			}else{
				var url2 = url + (url.indexOf('?') > -1 ? '&' : '?') + name + '=' +value;
			}
		}
		history.replaceState(null,null, url2);
	}