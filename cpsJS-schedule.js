window.addEventListener("load",putCourse,false);

function putCourse() {
	username = getCookie("STUID");
	if(username == null){
		showToast("尚未登入，登入後方可使用課表");
		return;
	}
	console.log(username);
	
	/*↓filter內有*/
	document.getElementById("closeButton").addEventListener("click",function(){
		document.getElementById("popContent").style.display="none";
	},false);
	
	document.getElementById("chinese").addEventListener("click",function (){
		CpopOut(CourseDetail);
	},false);
	//建立中文按鍵事件監聽器
	document.getElementById("english").addEventListener("click",function (){
		EpopOut(CourseDetail);
	},false);
	//建立英文按鍵的事件監聽器
	/*↑filter內有*/
	getPersonalCourse();
}

var table;
var username=null;

///////////////////////////////////////////

//建立二維陣列 儲存某個時段已經有幾堂課
function Array2DVar(x,y) 
{ 
	this.length = x;
	this.x = x; // x 
	this.y = y; // y 
	for(var i = 0; i < this.length; i++) 
	this[i] = new Array(y); 
}
//初始化
var courseNumber = new Array2DVar(8,15);
for(i=0;i<8;i++)
{
	for(j=0;j<15;j++)
		{
			courseNumber[i][j]=0;
		}
}

function getPersonalCourse(){

	if(username==null){
		return;
	}
	
	$.ajax({
		url: "http://140.121.196.20:7779/CPS/php/getPersonalCourse.php",
		data:{STUID:username},
		type:"POST",
		dataType:"json",

		success: function(data)
		{
			console.log("成功");
			console.log("json:"+ data["AYEARSMS"]);
			console.log(JSON.stringify(data));
			//取得總課程數量
			var NumTable = data.length;
			for(i=0 ; i<NumTable ; i++)
			{
				//創建div
				var t = document.createElement("div");//coureseCard
				var a = document.createElement("div");//courseNum
				var b = document.createElement("div");//courseName
				var c = document.createElement("div");//room
				var d = document.createElement("i");//fa fa-times
				var e = document.createElement("span");//removeCourse
				//取得時段div
				var s = document.getElementById(data[i].SEG);		
				//寫入標籤內容
				a.innerHTML = data[i].COSID;				
				b.innerHTML = data[i].CH_LESSON + data[i].OPEN_CLASSID;
				c.innerHTML = data[i].CLSSRM_ID;
				//取得同時段課程數量
				var f = courseNumber[data[i].SEG[0]][(data[i].SEG.slice(1))*1];
				//同時段課程數量+1
				courseNumber[data[i].SEG[0]][(data.SEG)*1]++;
				//設定課號div的id 例如104時段的第一個課程M5701K33課程 = 104_1
				a.id = data[i].SEG+"_"+data[i].COSID;//101_課號
				e.id = data[i].SEG+"_"+data[i].CH_LESSON;//101_課名
				e.value = data[i].COSID;//課號
				b.id = data[i].CH_LESSON + data[i].OPEN_CLASSID+data[i].SEG;//名稱+班別+時間
				c.id = data[i].CLSSRM_ID;//地點
				b.value = data[i].OPEN_CLASSID;//班別
				a.value = data[i].OPEN_CLASSID;//班別
				t.value = data[i].COSID;//課號
				//設定div的class
				t.className = "courseCard";
				a.className = "courseNum";	
				b.className = "courseName";
				c.className = "room";	
				d.className = "fa fa-times";
				e.className = "removeCourse";
				//將標籤依順序放入其他標籤下
				s.appendChild(t);
				t.appendChild(a);
				t.appendChild(b);
				t.appendChild(c);
				e.appendChild(d);
				a.appendChild(e);
				//X按鈕觸發事件刪除課程
				document.getElementById(e.id).onclick=function(event)
				{				
					event.stopPropagation();
					if(confirm("確定刪除課程?"))
					{
					
						var cosID = this.parentNode.innerHTML.substr(0,8);
						
						$.ajax({
							url: "http://140.121.196.20:7779/CPS/php/deletePersonalCourse.php",
							data:{STUID:username,COSID:cosID},
							type:"POST",
							dataType:"json",

							success: function(response)
							{
								if(response["isDelete"] == true){
									$(".courseCard").remove();
									showToast("刪除成功");
									getPersonalCourse();
								}
								else{
									showToast("刪除失敗");
								}
							},
							error:function(xhr, ajaxOptions, thrownError)
							{ 
								console.log("刪除錯誤");
								console.log(xhr.status); 
								console.log(thrownError); 
							}
						});
					}
					else
					{
						
					}
				};
				//課號按鈕觸發事件
				document.getElementById(a.id).addEventListener("click",getCourseData,false);
				//課名按鈕觸發事件
				document.getElementById(b.id).addEventListener("click",getCourseData,false);
			}	
		},

		error:function(xhr, ajaxOptions, thrownError){ 
			console.log("失敗");
			console.log(xhr.status); 
			console.log(thrownError); 
		}
	});
}

function getCourseData(){
	$.ajax({
		url: "http://140.121.196.20:7779/CPS/php/getCourseDetail.php?COSID=" + this.parentNode.value +"&OPEN_CLASSID=" +this.value,
		type:"GET",
		dataType:"json",

		success: function(data)
		{
			showPanel(data);
		},
		error:function(xhr, ajaxOptions, thrownError)
		{ 
			console.log("失敗");
			console.log(xhr.status); 
			console.log(thrownError); 
		}
	})
}

//跟filter重複的

function showPanel(data){
	CourseDetail = JSON.stringify(data[0]).replace(/\\r\\n/g, "<br />");
	CourseDetail = JSON.parse(CourseDetail);
	CpopOut(CourseDetail);
	console.log(CourseDetail);
	document.getElementById("popContent").style.display="block";
}

function CpopOut(CourseDetail){
	document.querySelector("#chinese div").style.display="block";
	document.querySelector("#english div").style.display="none";
	
	putData("colspan2",CourseDetail.CH_LESSON);
	putData("place_Room",CourseDetail.CLSSRM_ID);
	putData("course_Credit",CourseDetail.CRD);
	putData("course_Objective",CourseDetail.CH_TARGET);
	putData("course_Precourse",CourseDetail.CH_PREOBJ);
	putData("course_Outline",CourseDetail.CH_OBJECT);
	putData("course_TeachingMethod",CourseDetail.CH_TEACH);
	putData("course_Reference",CourseDetail.CH_REF);
	putData("course_Syllabus",CourseDetail.CH_TEACHSCH);
	putData("course_Evaluation",CourseDetail.CH_TYPE);
	putData("course_Website",CourseDetail.DOWNLOAD_ADDR);
}

function EpopOut(CourseDetail){
	document.querySelector("#chinese div").style.display="none";
	document.querySelector("#english div").style.display="block";
	
	putData("colspan2",CourseDetail.ENG_LESSON);
	putData("place_Room",CourseDetail.CLSSRM_ID);
	putData("course_Credit",CourseDetail.CRD);
	putData("course_Objective",CourseDetail.ENG_TARGET);
	putData("course_Precourse",CourseDetail.ENG_PREOBJ);
	putData("course_Outline",CourseDetail.ENG_OBJECT);
	putData("course_TeachingMethod",CourseDetail.ENG_TEACH);
	putData("course_Reference",CourseDetail.ENG_REF);
	putData("course_Syllabus",CourseDetail.ENG_TEACHSCH);
	putData("course_Evaluation",CourseDetail.ENG_TYPE);
	putData("course_Website",CourseDetail.DOWNLOAD_ADDR);

}

function putData(id,x){
	document.getElementById(id).innerHTML = (( x == null )? "" : x);
}