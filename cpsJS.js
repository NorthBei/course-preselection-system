var slideLeft = false;
var preShow = undefined,isShowList = false;
var nowTop = 0,courseData;

var options = {
	"Filter" : 0,
	"Gear" : 1,
	"Login" : 2
}

var selectOption = [
	//學士
	'<option value="090M">共同教育中心博雅教育組</option><option value="0507">資工系</option><option value="0701">商船系</option><option value="0703">航管系</option><option value="0603">運輸技術系航海組</option><option value="0608">運輸科學系</option><option value="060E">運輸與航海科學系航海組</option><option value="0609">運輸與航海科學系運輸組</option><option value="060B">輪機系輪機動力組</option><option value="060A">輪機系能源應用組</option><option value="0606">輪機系四年制</option><option value="060D">輪機系動力工程組</option><option value="0706">洋光系</option><option value="0300">生命科學院</option><option value="0309">食科系食品科學組</option><option value="030A">食科系生物科技組</option><option value="0302">食科系</option><option value="0303">養殖系</option><option value="030B">生命科學暨生物科技學系</option><option value="0800">海洋科學與資源學院</option><option value="0301">環漁系</option><option value="0801">海洋環境資訊系</option><option value="0500">工學院</option><option value="0702">機械系</option><option value="0501">系工系</option><option value="0502">河工系</option><option value="0600">電機資訊學院</option><option value="0503">電機系</option><option value="060C">通訊與導航工程學系</option><option value="0808">光電系</option><option value="0900">人文社會科學院</option><option value="090K">共同教育中心語文教育組</option><option value="090G">共同教育中心</option><option value="090B">外語教學研究中心</option><option value="090D">大學部英語課程</option><option value="090N">共同教育中心華語中心</option><option value="0901">通識教育中心</option><option value="0905">師資培育中心</option><option value="0908">國外校際(學)</option><option value="0907">校際選課</option><option value="0906">抵免課程</option><option value="0903">軍訓室</option><option value="0902">體育室</option><option value="0904">大學暑修班</option><option value="090S">學務處</option><option value="1000">海洋法律與政策學院（學）</option><option value="0912">校際選課(外文)</option><option value="0061">體育室體育教學組</option><option value="0100">行政單位</option><option value="0911">校際選課(體育)</option><option value="090L">共同教育中心體育教學組</option><option value="0910">校際選課(博雅)</option><option value="1001">海洋法政學士學位學程</option><option value="0909">校際選課（臺北聯合大學系統）</option><option value="0062">體育室體育活動組</option>',
	//碩士
	'<option value="0720">海運暨管理學院(碩)</option><option value="0721">商船系碩士班</option><option value="0723">航管系碩士班</option><option value="0628">運輸系碩士班</option><option value="0626">輪機系碩士班</option><option value="0320">生命科學院(碩)</option><option value="0322">食科系碩士班</option><option value="0323">水產養殖學系碩士班</option><option value="032B">生科系碩士班</option><option value="0324">海洋生物研究所碩士班</option><option value="0326">生物科技研究所碩士班</option><option value="0820">海洋科學與資源學院(碩)</option><option value="0321">環漁系碩士班</option><option value="0821">海洋系碩士班</option><option value="0826">應用地球科學研究所碩士班</option><option value="0327">海洋事務與資源管理研究所碩士班</option><option value="0823">海洋環境與生態研究所碩士班</option><option value="0520">工學院(碩)</option><option value="0722">機械系碩士班</option><option value="0521">系工系碩士班</option><option value="0522">河工系碩士班</option><option value="0525">材料工程研究所碩士班</option><option value="0620">電機資訊學院(碩)</option><option value="0523">電機系碩士班</option><option value="0527">資工系碩士班</option><option value="0627">通訊與導航工程學系碩士班</option><option value="0828">光電科學研究所碩士班</option><option value="0528">電機產業研發碩士專班</option><option value="0529">光電與通訊產業研發碩士專班</option><option value="0920">人文社會科學院（碩）</option><option value="0724">海洋法律研究所碩士班</option><option value="0325">應用經濟研究所碩士班</option><option value="092A">教育研究所碩士班</option><option value="092C">海洋文化研究所碩士班</option><option value="092D">應用英語研究所碩士班</option><option value="092N">共同教育中心華語中心（碩）</option><option value="0924">研究所暑修班</option><option value="0928">國外校際(碩)</option><option value="0927">校際選課(碩)</option><option value="0926">抵免課程(碩)</option><option value="032Z">海洋科學與資源學院碩士班聯合招生</option><option value="1020">海洋法律與政策學院（碩）</option>',
	//博士
	'<option value="0730">海運暨管理學院(博)</option><option value="0733">航管系博士班</option><option value="0636">輪機系博士班</option><option value="0330">生命科學院(博)</option><option value="0332">食科系博士班</option><option value="0333">養殖系博士班</option><option value="033B">生科系博士班</option><option value="0334">海洋生物研究所博士班</option><option value="0336">生物科技研究所博士班</option><option value="0830">海洋科學與資源學院(博)</option><option value="0331">環漁系博士班</option><option value="0831">海洋系博士班</option><option value="0836">應用地球科學研究所博士班</option><option value="0530">工學院(博)</option><option value="0732">機械系博士班</option><option value="0531">系工系博士班</option><option value="0532">河工系博士班</option><option value="0535">材料工程研究所博士班</option><option value="0536">海洋工程科技博士學位學程</option><option value="0630">電機資訊學院(博)</option><option value="0533">電機系博士班</option><option value="0537">資工系博士班</option><option value="0838">光電科學研究所博士班</option><option value="0734">海洋法律研究所博士班</option><option value="0937">校際選課(博)</option><option value="0936">抵免課程(博)</option><option value="0938">國外校際(博)</option><option value="1030">海洋法律與政策學院（博）</option><option value="1038">海洋生物科技博士學位學程</option><option value="1039">海洋資源與環境變遷博士學位學程</option>',
	//進修學士班
	'<option value="0401">航運管理學系進修學士班航管組</option><option value="0400">進修推廣教育班</option><option value="040B">資訊管理學系進修學士班</option><option value="0402">食品科學系進修學士班</option><option value="040S">航運管理學系進修學士班資管組</option><option value="040T">學士後輪機學士學位學程</option><option value="0404">海洋資源管理學系進修學士班</option><option value="040V">學士後商船學士學位學程</option><option value="0403">電機工程學系進修學士班</option><option value="040N">外語教學研究中心(進)</option><option value="040C">軍訓室(進)</option><option value="0409">通識教育中心(進)</option><option value="0408">體育室(進)</option><option value="040P">大學暑修班(進)</option><option value="040U">校際選課(進)</option>',
	//進修在職專班
	'<option value="0441">航管系碩士班</option><option value="0442">食科系碩士在職專班</option><option value="0443">電機系碩士在職專班</option><option value="0445">河工系碩士在職專班</option><option value="0446">海洋法律研究所碩士在職專班</option><option value="0447">環漁系碩士在職專班</option><option value="044A">商船系碩士在職專班</option><option value="044E">海洋系碩士在職專班</option><option value="044F">教育研究所碩士在職專班</option><option value="044Q">輪機系碩士在職專班</option><option value="044G">航管系國際物流管理碩士在職專班</option><option value="044I">航管系碩士在職專班航運管理組</option><option value="044J">航管系碩士在職專班企業管理組</option><option value="044W">資工系碩士在職專班</option>',
	//碩士學位班
	'<option value="044M">教育研究所教師在職進修「海洋教育碩士學位班」</option>',
	//碩士推廣學分班
	'<option value="0461">航管系碩士推廣教育學分班</option><option value="0465">河工系碩士推廣教育學分班</option><option value="046Q">輪機推廣教育碩士學分班</option><option value="046E">海洋系碩士推廣教育學分班</option><option value="046F">教育研究所碩士推廣教育學分班</option><option value="0466">海洋法律研究所碩士推廣教育學分班</option>',
	//學士推廣學分班
	'<option value="0473">推廣學分班</option><option value="0471">航運管理學系推廣教育學士學分班</option><option value="0477">環境生物與漁業科學學系學士學分班</option><option value="0472">食品科學推廣教育學士學分班</option><option value="0474">海洋資源管理學系推廣教育學士學分班</option><option value="0479">共同科學士推廣教育學分班</option><option value="047H">國小教師英語專長增能學分班</option><option value="047K">學務與輔導專長增能學分班</option><option value="047O">海洋教育在職進修學分班</option>'
]

var panel = ["#filterPanel","#gearPanel","#loginPanel"]
var page = ["home","filter","schedule"]

var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

window.addEventListener("load",function () {
	
	var username = getCookie("STUID");
	if( username != null){
		changeUserName(username);
		isLogin();
	}
	
	document.getElementById("content").addEventListener("click",hideListViewNav,false);
	//$("#content").on("click",hideListViewNav);
	document.getElementById("bars").addEventListener("click",slide,false);
	//$("#bars").on({click:slide});
	
	$(".fa-filter").on("mouseenter", { num: options["Filter"] }, showList);
	$(".fa-filter").on("mouseleave", { num: options["Filter"] }, showList);

	if(!isMobile){ //是電腦的話
		$(".fa-cog").on("click", { num: options["Gear"] }, showList);
		$(".RWDhidden>.fa-user").on("click", { num: options["Login"] }, showList);
		
		$(".filterList").jScrollPane({hideFocus :true});
		
		if(navigator.userAgent.match("Firefox")){
			$("#list-triangle").css("top","-10px");
			$(".whiteCircle>i").css("top","4px");
		}
		
		document.getElementById("searchWhat").addEventListener("keydown",function(event){
			if(event.which == 13){ //press Enter
				search();
				this.blur();
			}
		},false);
	}
	else{ //行動設備
		$("nav").touchwipe({
			wipeLeft: function() {
				$("nav").animate({ left: "-285px" }, 300);
				slideLeft = false; 
			},   
			min_move_x: 20,   
			min_move_y: 20,   
			preventDefaultEvents: true  
		});
		
		$(".whiteCircle").attr("id","pseudo");
	}
	
	var icon = $(".filterIcon");
	for(i = 0 ; i<icon.length ; i++){
		icon.eq(i).on("click",{ index: i },changeListViewTop);
	}
		
	$(".filterList").click(function(event){
		$(this).data("jsp").reinitialise();
		event.stopPropagation();
	});
	
	document.getElementById("studentType").addEventListener("change",function(){
		var nowSelect = this.options[this.selectedIndex].value;//textContent ;
		document.getElementById("department").innerHTML = selectOption[nowSelect];
	});
	
	/*
	document.querySelectorAll(".listViewTopContent>input[type=text]").item(2).addEventListener("keydown",function(event){
			if(event.which == 13){ //press Enter
				plus();
				this.blur();
			}
	},false);*/
	document.getElementById("logoutButton").addEventListener("click",function(){
		deleteCookie("STUID");
		changeUserName("Login");
		document.getElementById("login").style.display = "block";
		document.getElementById("logout").style.display = "none";
	},false);
	
	document.getElementById("loginButton").addEventListener("click",function(){
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		var loading = document.getElementById("loading");
		$.ajax({
			url:"http://140.121.196.20:7779/CPS/php/login.php" ,
			type:"POST",
			data:{STUID:username , PASSWORD:password},
			dataType: "json",
			 beforeSend:function(){
                loading.style.display = "block";
				var loadingGif = document.createElement("img");
				loadingGif.setAttribute("id","loadingGif");
				loadingGif.setAttribute("src","./assets/hourglass.gif");
				loading.appendChild(loadingGif);
             },
			complete:function(){
				loading.style.display = "none";
				document.getElementById("loadingGif").remove();
			},
			success: function(response) {
				console.log(response);
				
				if(response["isLogin"] == true){
					changeUserName(username);
					document.getElementById("warning").style.display = "none";
					isLogin();
				}
				else{
					document.getElementById("warning").style.display = "block";
					showToast("帳號或密碼錯誤");
				}
			}, 
			error: function() {
				showToast("login error");
				console.log("login error");
			}
		});
		
	},false);
	
	$(".rectangle:nth-child(2)").on("click", { num: options["Login"] }, function(event){
		showList(event);
		slide();
	});
	
	$(".rectangle").hover(
		function(){
			$(this).css("color", "black");
		}, 
		function(){
			$(this).css("color", "#858585");
		}
	);
	
	/*DADA*/
	document.getElementById("plus").addEventListener("click",plus,false);
	document.getElementById("cancelFilterTags").addEventListener("click",cleanTags,false);
	document.getElementById("okGoFilter").addEventListener("click",createQueryString,false);
	document.getElementById("search-icon").addEventListener("click",search,false);
	/*DADA*/
});//END Of document.ready

function setStyleSheet(title) {
	var i, link;
	for(i=0; (link = document.getElementsByTagName("link")[i]); i++) {
		if(link.getAttribute("rel").indexOf("style") != -1 && link.getAttribute("title")) {
		  link.disabled = true;
		  if(link.getAttribute("title") == title) link.disabled = false;
		}
	}
}

function showToast(message){
		var toast = document.getElementById("toast");
	    //toast.style.padding="0 11px";
		toast.style.display="block";
		toast.innerHTML = message;
		
		var timer = setTimeout(function(){ 
			$("#toast").fadeOut(600,function(){
				window.clearInterval(timer);
			});
		}, 1500);
}

function hideListViewNav(){
		if(slideLeft){
			slide();
		}
		if(isShowList){
			$(".list").hide();
			preShow = undefined;
			isShowList = false;
		}
}

function slide(){
	if(slideLeft == true){
		$("nav").animate({ left: "-285px" }, 300);
		slideLeft = false;
	}
	else{
		$("nav").animate({ left: "0" }, 300).css("display","block");
		slideLeft = true;
	}
}

function showList(event){
	if(preShow != event.data.num){
			$(panel[event.data.num]).show();
			$(panel[preShow]).hide();
			isShowList = true;
	}
	else{
		$(panel[event.data.num]).toggle();
		isShowList = !isShowList;
	}
	preShow = event.data.num;
}

function changeListViewTop(event){
	var top = document.querySelectorAll(".listViewTopContent");
	top.item(nowTop).style.display = "none";
	top.item(event.data.index).style.display = "block";
	nowTop = event.data.index;
}

//DADADADAD Tags
function plus()
{
	switch(nowTop)
	{
		case 0:
			var getDepartment = document.getElementsByName("department")[0].value;
			var getGrade = document.getElementsByName("grade")[0].value;
			var getClass = document.getElementsByName("class")[0].value;
				TagName = $("select[name=department]>option[value="+ getDepartment +"]").text();
				setTags(0,TagName,'FACULTY_CODE = ',getDepartment);
				setTags(0,getGrade+"年級",'GRADE = ',getGrade);
				setTags(0,getClass+"班",'OPEN_CLASSID = ',getClass);	
			break;
			
		case 1:
			var getClassID = document.getElementById("inputClassID").value;
				setTags(1,getClassID,'COSID LIKE ',"%25"+getClassID.toUpperCase()+"%25");
			break;
			
		case 2:
			var getClassName = document.getElementById("inputClassName").value;
				setTags(2,getClassName,'CH_LESSON LIKE ',"%25"+getClassName.toUpperCase()+"%25");
			break;
			
		case 3:
			var getTeacherName = document.getElementById("inputTeacherName").value;
				setTags(3,getTeacherName,'LECTR_TCH_CH LIKE ',"%25"+getTeacherName.toUpperCase()+"%25");
			break;
			
		case 4:
			var getTime1 = document.getElementsByName("time")[0].value;
			var getTime2 = document.getElementsByName("time")[1].value;
			if(getTime2!='全部')
				setTags(4,getTime1+""+getTime2,'SEG LIKE ',getTime1+""+getTime2);
			else
				setTags(4,getTime1+" 全部",'SEG LIKE ',getTime1+"__");
			break;
			
		case 5:
			var getPlace = document.getElementsByName("building")[0].value;
				var TagName = $("select[name=building]>option[value="+ getPlace +"]").text();
				setTags(5,TagName,'CLSSRM_ID LIKE ',"%25"+getPlace+"%25");
			break;
	}
	$(".forDelete").on("click",function(event){
		this.parentNode.parentNode.remove();
	});
}

function setTags(num, TagName, type, val)
{
	if(val!="" && val!="全部")
	{
		var  panel = $(".filterList").eq(num);
		if(!isMobile)
		{
			panel  = panel.data("jsp");
			panel.getContentPane().append(
			$("<span />").addClass("filterTag").html("<div>"+ TagName +"<i class='fa fa-times-circle forDelete' title='"+type+"' name='"+val+"' label='O'></i></div>")
			);  
			panel.reinitialise();
		}
		else
		{
			panel.append(
			$("<span />").addClass("filterTag").html("<div>"+ TagName +"<i class='fa fa-times-circle forDelete' title='"+type+"' name='"+val+"' label='O'></i></div>")
			);
		}
	}
}

/*
	var  panel = $(".filterList").eq(whichCircle).data("jsp");
	panel.getContentPane().append(
		$("<span />").addClass("filterTag").attr("title",nodeText).html("<div>"+nodeText+"<i class='fa fa-times-circle'></i></div>")
	);
	panel.reinitialise();
*/

function cleanTags(){
	$(".filterTag").remove();
	var filterList = $(".filterList");
	for(var i in filterList){
		filterList.eq(i).data("jsp").reinitialise();
	}
}

/*DADA createQueryString*/

function createQueryString()
{
	var queryString = "";
	var labelNumber = $(".forDelete").length;
	for(var i=0; i<$(".forDelete").length; i++)
	{
		var x = $(".forDelete").eq(i);
		if(x.attr("label")=='O')
		{
			queryString += " (";
			var s = x.attr("title") + "'" + x.attr("name") +"'";
			queryString += s;
			labelNumber--;
			x.attr("label","X");
			for(var j=0; j<$(".forDelete").length; j++)
			{
				var y = $(".forDelete").eq(j);
				if(y.attr("label")=='O' && y.attr("title")==x.attr("title"))
				{
					var s = " OR " + y.attr("title") + "'" + y.attr("name") +"'";
					queryString += s;
					labelNumber--;
					y.attr("label","X");
				}	
			}
			queryString += ") ";
			if(labelNumber==0) break;
			queryString += " AND ";
		}
	}
	
	console.log(queryString);
	for(var i=0; i<$(".forDelete").length; i++)
	{
		$(".forDelete").eq(i).attr("label","O");
	}
	passQuery(queryString);
	hideListViewNav();
}

/*DADA Search*/
function search(){
	var searchThing = document.getElementById("searchWhat").value;
	if(searchThing.length == 0){
		showToast("請輸入搜尋內容");
		return;
	}
	
	searchThing = searchThing.toUpperCase();
	var queryString = "(CH_LESSON LIKE '%25" + searchThing;
	queryString += "%25') OR (LECTR_TCH_CH LIKE '%25"+searchThing;
	queryString += "%25') OR (upper(ENG_LESSON) LIKE '%25"+searchThing;
	queryString += "%25') OR (upper(LECTR_TCH_ENGNAME) LIKE '%25"+searchThing+"%25')";
	
	console.log(queryString);
	passQuery(queryString);
}

function passQuery(queryString){
	$.ajax({
		url: "http://140.121.196.20:7779/CPS/php/getCourse.php?filter=" + queryString ,
		dataType: "json",
		async: false,
		success: function(data) {
			console.log(data);
			courseData = data;
			history.pushState({"page":"filter","queryString":queryString}, "cps-filter", "filter.php?filter="+queryString);
		}, //幹 你還不睡覺 我要睡了 馬的 看到這行記得註解掉ㄏ 不然會errorㄎㄎ
		error: function() {
			showToast("篩選錯誤");
		}       
	});
}

//LOGIN LOGOUT

function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null){
		return unescape(arr[2]); 
	}
	return null;
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function deleteCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function isLogin(){
	document.getElementById("login").style.display = "none";
	document.getElementById("logout").style.display = "block";
}

function changeUserName(name){
	var  userAccount = document.querySelectorAll(".userName");
	userAccount.item(0).innerHTML = name;
	userAccount.item(1).innerHTML = name;
	hideListViewNav();
}