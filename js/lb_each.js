var playerData,playerPrefixes,playerOnline;
	function GetPlayerOnline(){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200){
				playerOnline = JSON.parse(this.responseText);
				console.log("playerOnline: " + JSON.stringify(playerOnline));
			}
		}
		xmlhttp.open("GET", "https://api-openid.agatha.org.cn/info/getOnlineStatus", false);
		xmlhttp.send();
	}
	function ShowData(){
		
		Sort();
		
		var dataShowInnerHTML;
		
		dataShowInnerHTML =
			"<table width='100%' style='font-size:15px;'>"
			+"<tr>"
			+"<td width='1%' style='padding: 0px 3px 0px 0px;'></td>"
			+"<td width='54%' style='padding: 0px 3px 0px 5px;'>玩家</td>"
			+"<td width='20%'>等级</td>"
			+"<td width='25%'>经验</td>"
			+"</tr>";
		for(var i=0;i<Object.keys(playerData.data).length;i++){
			for(var j=0;j<Object.keys(playerData.data).length;j++){
				if(i==parseInt(playerData.data[j].sort)){
					dataShowInnerHTML +=
					"<tr id='tr-"+ i +"' class='sort2'>"
					+"<td id='td-sort-"+ i +"' style='padding: 0px 3px 0px 10px;'>"+ (parseInt(i)+1) +"</td>"
					+"<td style='letter-spacing: 1px;'><a class='PID' href='https://mc.agatha.org.cn/players/?q="+ playerData.data[j].name +"'>"+ playerData.data[j].name + "</a>"+ McFormatting(GetPlayerPrefix(playerData.data[j].name)) + "<span style='font-size:15px;color:rgb(130,130,130);'>" + CheckOnline(playerData.data[j].name) + "</span></td>"
					+"<td id='td-level-"+ i +"'>"+ playerData.data[j].level + "</td>"
					+"<td id='td-exp-"+ i +"' style='color:rgb(100,100,100);'>"+ playerData.data[j].exp +"<span style='font-size:8px;color:rgb(130,130,130);'>/3000</span></td>"
					+"</tr>";
				}
			}
		}
		dataShowInnerHTML += "</table>";
		
		document.getElementById("dataShow").innerHTML = dataShowInnerHTML;
		
		var levela,levelb,expa,expb,colorClass=1;
		for(var i=0;i<Object.keys(playerData.data).length;i++){
			if(i==0){
				document.getElementById("tr-"+(i)).setAttribute("class","sort1");
			}
			if(i>0){
				levela = document.getElementById("td-level-"+(parseInt(i)-1)).innerHTML;
				levelb = document.getElementById("td-level-"+(i)).innerHTML;
				expa = document.getElementById("td-exp-"+(parseInt(i)-1)).innerHTML;
				expb = document.getElementById("td-exp-"+(i)).innerHTML;
				//console.log(i+" "+levela+" "+levelb+" "+expa+""+expb);console.log(parseInt(document.getElementById("td-sort-"+(i)).innerHTML));
					
				if(levela == levelb && expa == expb){
					document.getElementById("td-sort-"+(i)).innerHTML = document.getElementById("td-sort-"+(i-1)).innerHTML;
				}else colorClass++;
				
				if((colorClass)%2 == 1){
					document.getElementById("tr-"+(i)).setAttribute("class","sort1");
				}else document.getElementById("tr-"+(i)).setAttribute("class","sort2");
				
			}
		}
		for(var i=0;i<Object.keys(playerData.data).length;i++){
			if(i>0){
				levela = document.getElementById("td-level-"+(parseInt(i)-1)).innerHTML;
				levelb = document.getElementById("td-level-"+(i)).innerHTML;
				expa = document.getElementById("td-exp-"+(parseInt(i)-1)).innerHTML;
				expb = document.getElementById("td-exp-"+(i)).innerHTML;
				
				if(levela == levelb && expa == expb){
					document.getElementById("td-sort-"+(i)).innerHTML = "";
				}
			}
		}
	}
	function GetPlayerPrefix(name){
		for(var i=0;i<Object.keys(playerPrefixes.data).length;i++){
			if(playerPrefixes.data[i].name == name){
				console.log(name+" prefix "+playerPrefixes.data[i].prefix);
				return playerPrefixes.data[i].prefix;
			}
		}
		return "";
	}
	
	function Sort(){
		console.log("Sort " + Object.keys(playerData.data).length);
		for(var i=0;i<Object.keys(playerData.data).length;i++){
			playerData.data[i].sort = -1;
			playerData.data[i].trueSort = -1;
		}
		var maxLevel, maxOne;
		for(var j=0;j<Object.keys(playerData.data).length;j++){
			maxLevel=-1;
			maxOne=-1;
			for(var i=0;i<Object.keys(playerData.data).length;i++){
				if(maxLevel < parseInt(playerData.data[i].level) && playerData.data[i].sort==-1){
				   	maxLevel = parseInt(playerData.data[i].level);
					maxOne = i;
				} else if(maxLevel == parseInt(playerData.data[i].level) && playerData.data[i].sort==-1){
					if(parseInt(playerData.data[i].exp) > parseInt(playerData.data[maxOne].exp)){
						maxOne = i;
					}
				}
			}
			playerData.data[maxOne].sort = j;
			playerData.data[maxOne].trueSort = j;
		}
		console.log(JSON.stringify(playerData));
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

		GetPlayerData();
		GetPlayerPrefixes();
		GetPlayerOnline();
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