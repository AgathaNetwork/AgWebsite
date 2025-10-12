function ShowData(id){
                    PName=id;
					var playerData, playerPrefixes, playerUUID;
			        var playerID = PName;
			        
			        var xmlhttp1 = new XMLHttpRequest();
		            xmlhttp1.onreadystatechange = function(){
		            	if (this.readyState == 4 && this.status == 200){
		            		playerPrefixes = JSON.parse(this.responseText);
		            		console.log("playerPrefixes: " + JSON.stringify(playerPrefixes));
		            	}
		            }
		            xmlhttp1.open("GET", "https://api-openid.agatha.org.cn/info/getPlayerPrefix", false);
		            xmlhttp1.send();
			        for(var i=0;i<Object.keys(playerPrefixes.data).length;i++){
			            if(playerPrefixes.data[i].name == playerID){
			            	document.getElementById("GreetingText").innerHTML=playerID+" "+SD_McFormatting(playerPrefixes.data[i].prefix);
		            	}
		            }
			        
			        
			        
			        
			        
			        
			        
			        
			        
			        
			        var xmlhttp = new XMLHttpRequest();
			        xmlhttp.onreadystatechange = function(){
			        	if (this.readyState == 4 && this.status == 200){
			        		playerData = JSON.parse(this.responseText);
			        		console.log(JSON.stringify(playerData));
			        		
			                var timeStamp = new Date(parseInt(playerData.regtime));
			                playerData.regtime = timeStamp.toLocaleDateString();
			                timeStamp = new Date(parseInt(playerData.lastlogintime));
			                playerData.lastlogintime = timeStamp.toLocaleDateString();
			        if(playerData.lastpos.world=="world") playerData.lastpos.world="主世界 ";
			        else if(playerData.lastpos.world=="world_nether") playerData.lastpos.world="下界 ";
			        else if(playerData.lastpos.world=="world_the_end") playerData.lastpos.world="末地 ";
			        if (playerData.lastpos.world=="71e5e6d6-5ed3-48ea-8c95-1b3102d0c42d")
				    {
				        playerData.lastpos.world="主世界 ";
				    }
				    if (playerData.lastpos.world=="1656ce12-7799-4531-abbc-fc3e5b5d3eac")
				    {
				        playerData.lastpos.world="末地 ";
				    }
				    if (playerData.lastpos.world=="8bad88ce-73d4-439c-b906-4cb4753b2bb2")
				    {
				        playerData.lastpos.world="下界 ";
				    }
				    var onlineStatus="离线";
				    if (playerData.online=="1")
				    {
				        onlineStatus="在线";
				    }
			                document.getElementById("I_RegTime").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">注册时间</a>"+playerData.regtime;
			                document.getElementById("I_LastLogin").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">上次登录</a>"+playerData.lastlogintime;
			                document.getElementById("I_LastLocation").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">最近位置</a>"+playerData.lastpos.world + parseInt(playerData.lastpos.x) +", "+ parseInt(playerData.lastpos.y) +", "+ parseInt(playerData.lastpos.z) ;
			                document.getElementById("I_Online").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">在线状态</a>"+onlineStatus;
			        	}
			        }
		        	xmlhttp.open("GET", "https://api-openid.agatha.org.cn/info/getPlayerData?fname=" + playerID, false);
		        	xmlhttp.send();
		        	var respond5;
		            url="https://api-openid.agatha.org.cn/account/getUUID";
		            httpRequest5 = new XMLHttpRequest();//第一步：创建需要的对象
		            httpRequest5.open('POST' , url , true); //第二步：打开连接
		            httpRequest5.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
		            httpRequest5.send('session=' + SD_getCookie("sess"));
		            httpRequest5.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
			            if (httpRequest5.readyState == 4 && httpRequest5.status == 200) {//验证请求是否发送成功
				            respond5 = JSON.parse(httpRequest5.responseText);//获取到服务端返回的数据
				            console.log(JSON.stringify(respond5));
				            if(respond5.status=="ok"){
				            	playerUUID=respond5.uuid;
				            	document.getElementById("UUIDContainer").innerHTML="<small class=\"text-muted\" style=\"font-size:15px;margin-left:1rem\"><em>"+playerUUID+"</em></small>";
				            	
				            }else{
				                playerUUID="";
				            }
				            
				
			            }
		            };
}
function SD_McFormatting(string){
		if(string){
		    string = string.replace("[","");
		    string = string.replace("]","");
			var n,newStr=string;
			newStr = "<span class='badge rounded-pill badge-light mc'>" + newStr + "</span>";// style='background-color:color(display-p3 345% 346% 348%);'
			
			n = SD_GetStringTimes(string,"&a");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&a", "<span class='badge mc-a'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&b");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&b", "<span class='badge mc-b'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&c");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&c", "<span class='badge mc-c'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&d");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&d", "<span class='badge mc-d'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&e");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&e", "<span class='badge mc-e'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&f");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&f", "<span class='badge mc-f'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&g");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&g", "<span class='badge mc-g'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&0");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&0", "<span class='badge mc-0'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&1");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&1", "<span class='badge mc-1'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&2");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&2", "<span class='badge mc-2'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&3");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&3", "<span class='badge mc-3'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&4");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&4", "<span class='badge mc-4'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&5");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&5", "<span class='badge mc-5'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&6");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&6", "<span class='badge mc-6'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&7");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&7", "<span class='badge mc-7'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&8");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&8", "<span class='badge mc-8'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&9");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&9", "<span class='badge mc-9'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&k");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&k", "<span class='badge mc-k'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&l");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&l", "<span class='badge mc-l'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&m");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&m", "<span class='badge mc-m'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&n");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&n", "<span class='badge mc-n'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&o");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&o", "<span class='badge mc-o'>");
				newStr = newStr + "</span>";
			}
			n = SD_GetStringTimes(string,"&r");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&r", "<span class='badge mc-r'>");
				newStr = newStr + "</span>";
			}
			
			console.log("Prefix shown " + newStr);
			return newStr;
		}
		return "";
	}
	function SD_GetStringTimes(string,aim){
		var times=(string.split(aim)).length-1;
		return times;
	}
	function SD_getCookie(name){
		 var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		 if (arr != null) return unescape(arr[2]); return null;
	}