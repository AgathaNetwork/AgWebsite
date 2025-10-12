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
    var startDate = new Date('2025-09-01').getTime() / 1000;
    var endDate = new Date().getTime() / 1000;
    
    var respond;
    var url="https://api-openid.agatha.org.cn/activity/getPlayerOnlineDuration";
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST' , url , true);
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httpRequest.send('session=' + Session + '&startDate=' + Math.floor(startDate) + '&endDate=' + Math.floor(endDate));
    
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            console.log(httpRequest.responseText);
            respond = JSON.parse(httpRequest.responseText);
            
            if(respond.status=="ok"){
                renderActivityCalendar(respond.data);
            }else{
                document.getElementById("resultContainer").innerHTML="发生了未知的错误。";
            }
        }
    };
}

function renderActivityCalendar(data) {
    const container = document.getElementById("resultContainer");
    const today = new Date(); // 获取今天日期
    
    // 创建日历容器
    const calendarContainer = document.createElement("div");
    calendarContainer.className = "activity-calendar-container";
    
    // 添加说明文字
    const legend = document.createElement("div");
    legend.className = "activity-legend";
    legend.innerHTML = '<small>本期统计以来活动情况（2025年10月9日至今）</small>';
    calendarContainer.appendChild(legend);
    
    // 按月份组织数据
    const monthData = {};
    Object.keys(data).forEach(dateKey => {
        const year = dateKey.substring(0, 4);
        const month = dateKey.substring(4, 6);
        const monthKey = `${year}-${month}`;
        
        if (!monthData[monthKey]) {
            monthData[monthKey] = {};
        }
        monthData[monthKey][dateKey] = data[dateKey];
    });
    
    // 创建月份容器
    const monthsContainer = document.createElement("div");
    monthsContainer.className = "months-container";
    
    // 计算整体最大值用于颜色深浅
    let maxDuration = 0;
    Object.values(data).forEach(duration => {
        if (duration > maxDuration) maxDuration = duration;
    });
    
    // 生成从2025-09到当前月份的所有月份
    const start = new Date('2025-10-09');
    const end = new Date();
    const current = new Date(start);
    
    const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月",
                       "7月", "8月", "9月", "10月", "11月", "12月"];
    
    while (current <= end) {
        const year = current.getFullYear();
        const month = current.getMonth() + 1;
        const monthKey = `${year}-${String(month).padStart(2, '0')}`;
        
        // 创建月份卡片
        const monthCard = document.createElement("div");
        monthCard.className = "month-card";
        
        // 月份标题
        const monthHeader = document.createElement("div");
        monthHeader.className = "month-header";
        monthHeader.textContent = `${year}年${monthNames[month - 1]}`;
        monthCard.appendChild(monthHeader);
        
        // 创建月份日历网格
        const grid = document.createElement("div");
        grid.className = "month-grid";
        
        // 获取该月第一天和最后一天
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);
        
        // 获取该月第一天是星期几 (0=Sunday, 1=Monday, ..., 6=Saturday)
        const firstDayOfWeek = firstDay.getDay();
        
        // 添加星期标签
        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        for (let i = 0; i < 7; i++) {
            const weekdayElement = document.createElement("div");
            weekdayElement.className = "weekday-label";
            weekdayElement.textContent = weekdays[i];
            grid.appendChild(weekdayElement);
        }
        
        // 填充月初的空白
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyElement = document.createElement("div");
            emptyElement.className = "calendar-day empty";
            grid.appendChild(emptyElement);
        }
        
        // 确定该月需要显示的最大日期
        let maxDayToShow = lastDay.getDate();
        if (year === today.getFullYear() && month === (today.getMonth() + 1)) {
            // 如果是当前月份，只显示到今天
            maxDayToShow = today.getDate();
        }
        
        // 填充该月的每一天
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dateStr = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
            const dayElement = document.createElement("div");
            dayElement.className = "calendar-day";
            
            if (day <= maxDayToShow) {
                // 默认无活动
                dayElement.classList.add("no-activity");
                
                // 设置Bootstrap popover属性
                const dateText = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                dayElement.setAttribute("data-toggle", "popover");
                dayElement.setAttribute("data-placement", "top");
                dayElement.setAttribute("data-trigger", "hover");
                dayElement.setAttribute("title", dateText);
                
                let contentText = "无活动";
                if (data[dateStr]) {
                    const duration = data[dateStr];
                    const intensity = maxDuration > 0 ? Math.floor((duration / maxDuration) * 4) : 0;
                    dayElement.classList.remove("no-activity");
                    dayElement.classList.add(`activity-level-${intensity}`);
                    contentText = formatMilliseconds(duration * 1000);
                }
                
                dayElement.setAttribute("data-content", contentText);
                
            } else {
                // 本月未来日期留空
                dayElement.classList.add("future-day");
            }
            
            grid.appendChild(dayElement);
        }
        
        monthCard.appendChild(grid);
        monthsContainer.appendChild(monthCard);
        
        // 移动到下一个月
        current.setMonth(current.getMonth() + 1);
    }
    
    calendarContainer.appendChild(monthsContainer);
    
    // 添加样式
    const style = document.createElement("style");
    style.innerHTML = `
        .activity-calendar-container {
            padding: 10px;
        }
        .activity-legend {
            margin-bottom: 20px;
        }
        .months-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        .month-card {
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 10px;
            min-width: 200px;
            background-color: #f8f9fa;
        }
        .month-header {
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ddd;
        }
        .month-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 2px;
        }
        .weekday-label {
            text-align: center;
            font-weight: bold;
            font-size: 0.8em;
            padding: 2px;
        }
        .calendar-day {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8em;
            border-radius: 3px;
        }
        .empty {
            background-color: transparent;
        }
        .no-activity {
            background-color: #ebedf0;
        }
        .activity-level-0 {
            background-color: #c6e4ff;
        }
        .activity-level-1 {
            background-color: #7bc9ff;
        }
        .activity-level-2 {
            background-color: #239aff;
        }
        .activity-level-3 {
            background-color: #1961ff;
        }
        .activity-level-4 {
            background-color: #002eff;
        }
        .future-day {
            background-color: transparent;
        }
        .popover {
            max-width: 200px;
            font-size: 12px;
        }
    `;
    
    container.innerHTML = '';
    container.appendChild(style);
    container.appendChild(calendarContainer);
    
    // 初始化Bootstrap popover
    $('[data-toggle="popover"]').popover();
}