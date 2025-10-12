function LoadData(){
                    PName=PLD_GetUrlParam("q");
                    if(PName==null){
                        //玩家未提供处理流程
                        return 0;
                    }
					var playerData;
			        var playerID = PName;
			        console.log("Start searching " + playerID);
			        var playerPrefixes;
			        
			        
			        var xmlhttp = new XMLHttpRequest();
			        xmlhttp.onreadystatechange = function(){
			        	if (this.readyState == 4 && this.status == 200){
			        		playerData = JSON.parse(this.responseText);
			        		console.log(JSON.stringify(playerData));
			        		if(playerData.status=="0"){
			        		    document.getElementById("NoInfoAlarm").style.display="";
			        		    return 0;
			        		}
			        		playerID = playerData.realname;
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
			                GetHeadImage(PName);
			                document.getElementById("IndexContainer").style.display="";
			                //document.getElementById("PlayerName").innerHTML=PName;
			                }
			                if(playerData.former != null)document.getElementById("PlayerName").innerHTML+='<br><a href="https://mc.agatha.org.cn/players/?q='+playerData.former+'" class=" text-black-50 small text-decoration-none" style="font-size:50%">曾用名：'+playerData.former+'</a>';
			                //Pastes Module by FanRun
			                var PastesData;
			                console.log("Getting pastes of " + PName);
			                var xmlhttp2 = new XMLHttpRequest();
			                xmlhttp2.onreadystatechange = function(){
			    	            if (this.readyState == 4 && this.status == 200){
			    	            	PastesData = JSON.parse(this.responseText);
			    	            	console.log(JSON.stringify(PastesData));
			    	            }
			                }
			                xmlhttp2.open("GET", "https://api-openid.agatha.org.cn/paste/fetchPaste?fname=" + PName, false);
			                xmlhttp2.send();
			                if(PastesData.status=="ok")
			                {
			                    document.getElementById("PastesShow").innerHTML=PastesData.content;
			                    document.getElementById("PasteDiv").style.display="";
			                    var PasteTTX=new Date(Number(PastesData.time)*1000);
			                    document.getElementById("PasteTime").innerHTML=PasteTTX.toLocaleDateString().replace(/\//g, "-") + " " + PasteTTX.toTimeString().substr(0, 8);
			                }
			                
			                var GalleryCountData;
			                console.log("Getting gallery count of " + PName);
			                var xmlhttp_gallery = new XMLHttpRequest();
			                xmlhttp_gallery.onreadystatechange = function(){
			    	            if (this.readyState == 4 && this.status == 200){
			    	            	GalleryCountData = JSON.parse(this.responseText);
			    	            	console.log(JSON.stringify(GalleryCountData));
			    	            }
			                }
			                xmlhttp_gallery.open("GET", "https://agatha.org.cn/api/getPlayerUploadCount?player=" + PName, false);
			                xmlhttp_gallery.send();
			                document.getElementById("I_GalleryCount").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">相册图片</a>"+GalleryCountData.count;
			        }
		        	xmlhttp.open("GET", "https://api-openid.agatha.org.cn/info/getPlayerData?fname=" + playerID, false);
		        	xmlhttp.send();
		        	
		        	
		        	var xmlhttp1 = new XMLHttpRequest();
		            xmlhttp1.onreadystatechange = function(){
		            	if (this.readyState == 4 && this.status == 200){
		            		playerPrefixes = JSON.parse(this.responseText);
		            		console.log("playerPrefixes: " + JSON.stringify(playerPrefixes));
		            	}
		            }
		            xmlhttp1.open("GET", "https://api-openid.agatha.org.cn/info/getPlayerPrefix", false);
		            xmlhttp1.send();
		            var isSet=0;
			        for(var i=0;i<Object.keys(playerPrefixes.data).length;i++){
			            if(playerPrefixes.data[i].name == playerID){
			            	document.getElementById("PlayerName").innerHTML=playerID+" "+PD_McFormatting(playerPrefixes.data[i].prefix) + document.getElementById("PlayerName").innerHTML;
			            	isSet=1;
		            	}
		            }
			        if(isSet==0){
			            document.getElementById("PlayerName").innerHTML=playerID + document.getElementById("PlayerName").innerHTML;
			        }
			        
			        
		        	var AdvData;
			                console.log("Getting advancements of " + PName);
			                var xmlhttp3 = new XMLHttpRequest();
			                xmlhttp3.onreadystatechange = function(){
			    	            if (this.readyState == 4 && this.status == 200){
			    	            	AdvData = JSON.parse(this.responseText);
			    	            	console.log(JSON.stringify(AdvData));
			    	            }
			                }
			                xmlhttp3.open("GET", "https://api-openid.agatha.org.cn/advancement/getAdvancement?user=" + PName, false);
			                xmlhttp3.send();
			                if(AdvData.status=="ok")
			                {
			                    var tot=0;
			                    var done=0; 
			                    for (const [key, value] of Object.entries(AdvData.data)) {
			                        tot++;
                                    if(value==1){
                                        document.getElementById(key).style.backgroundColor = "#e3f2fd";
                                        //document.getElementById(key).style.cssText += "background-color:color(display-p3 0.959 1.023 1.071);";
                                        //document.getElementById(key).style.backgroundColor = "background-color:color(display-p3 1.5 1.5 1.5);";
                                        done++;
                                    }
                                }
                                var percentage=parseInt(done*100/tot);
                                
			                    document.getElementById("AdvProgress").style.width=percentage+"%";
			                    document.getElementById("AdvProgress").innerText="已完成："+percentage+"%";
                                
			                    document.getElementById("AdvDiv").style.display="";
			                }
			                
}
function GoSearch(){
    location.href="https://mc.agatha.org.cn/players/?q="+document.getElementById("PlayerInput").value;
    return 0;
}
function PLD_GetUrlParam(key){
		var url = window.location.search;
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		var result = url.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	}
function GoTop(){
    scroll(0,0);
}

function PD_McFormatting(string){
		if(string){
		    string = string.replace("[","");
		    string = string.replace("]","");
			var n,newStr=string;
			newStr = "<span class='badge rounded-pill badge-light mc'>" + newStr + "</span>";// style='background-color:color(display-p3 345% 346% 348%);'
			
			n = PD_GetStringTimes(string,"&a");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&a", "<span class='badge mc-a'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&b");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&b", "<span class='badge mc-b'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&c");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&c", "<span class='badge mc-c'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&d");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&d", "<span class='badge mc-d'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&e");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&e", "<span class='badge mc-e'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&f");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&f", "<span class='badge mc-f'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&g");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&g", "<span class='badge mc-g'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&0");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&0", "<span class='badge mc-0'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&1");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&1", "<span class='badge mc-1'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&2");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&2", "<span class='badge mc-2'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&3");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&3", "<span class='badge mc-3'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&4");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&4", "<span class='badge mc-4'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&5");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&5", "<span class='badge mc-5'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&6");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&6", "<span class='badge mc-6'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&7");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&7", "<span class='badge mc-7'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&8");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&8", "<span class='badge mc-8'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&9");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&9", "<span class='badge mc-9'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&k");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&k", "<span class='badge mc-k'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&l");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&l", "<span class='badge mc-l'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&m");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&m", "<span class='badge mc-m'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&n");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&n", "<span class='badge mc-n'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&o");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&o", "<span class='badge mc-o'>");
				newStr = newStr + "</span>";
			}
			n = PD_GetStringTimes(string,"&r");
			for(var i=0;i<n;i++){
				newStr = newStr.replace("&r", "<span class='badge mc-r'>");
				newStr = newStr + "</span>";
			}
			
			console.log("Prefix shown " + newStr);
			return newStr;
		}
		return "";
	}
	
		function PD_GetStringTimes(string,aim){
		var times=(string.split(aim)).length-1;
		return times;
	}