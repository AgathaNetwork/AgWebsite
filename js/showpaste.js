function ShowPaste(id){
					var PastesData;
			    console.log("Getting pastes of " + id);
			    var xmlhttp = new XMLHttpRequest();
			    xmlhttp.onreadystatechange = function(){
			    	if (this.readyState == 4 && this.status == 200){
			    		PastesData = JSON.parse(this.responseText);
			    		console.log(JSON.stringify(PastesData));
			    		if(PastesData.status=="ok")
			    {
			        document.getElementById("S_Current").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">签名内容</a>"+PastesData.content;
			        var PasteTTX=new Date(Number(PastesData.time)*1000);
			        document.getElementById("S_SetTime").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">设置时间</a>"+PasteTTX.toLocaleDateString().replace(/\//g, "-") + " " + PasteTTX.toTimeString().substr(0, 8);
			    }
			    else {
			        document.getElementById("S_Current").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">签名内容</a>未设置";
			        var PasteTTX=new Date(Number(PastesData.time)*1000);
			        document.getElementById("S_SetTime").innerHTML="<a class=\"text-black-50\" style=\"margin-right:1rem\">设置时间</a>未设置";
			    }
			    	}
			    }
			    xmlhttp.open("GET", "https://api-openid.agatha.org.cn/paste/fetchPaste?fname=" + id, false);
			    xmlhttp.send();
			    
}