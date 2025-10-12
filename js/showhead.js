function GetHeadImage(name){
		var uuid;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200){
				console.log("responseText: "+this.responseText);
				if(this.responseText){
					uuid = JSON.parse(this.responseText).id;
					console.log(JSON.stringify("uuid is "+uuid));
					document.getElementById("UserHeadPic").style="display:flex;";
					document.getElementById("UserHeadPic").src="https://api-minecraft.agatha.org.cn/avatar/"+uuid;
				}else{
					document.getElementById("UserHeadPic").src="";
					document.getElementById("UserHeadPic").style="display:none;";
				}
			}
			else document.getElementById("UserHeadPic").style="display:none;";
		}
		xmlhttp.open("GET", "https://api-minecraft.agatha.org.cn/uuid_svc?name="+name, false);
		xmlhttp.send();
	}