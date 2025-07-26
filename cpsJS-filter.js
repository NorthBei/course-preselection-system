window.addEventListener("load",init,false);

function showCourseList(data){
	console.log(data);
	
	var aSpanTag = document.createElement("span");
	for(var i=0;i<data.length;i++){
		var courseList = document.createElement("div");
		courseList.className = "courseList";
		
		var addIcon = document.createElement("div");
		addIcon.className = "addCourse addIcon";
		
		var addIconPic = document.createElement("i");
		addIconPic.className = "fa fa-plus-circle";
		
		addIcon.appendChild(addIconPic)
		
		var listNumber = document.createElement("div");
		listNumber.className = "number";
		listNumber.innerHTML = (i+1);
		
		var courseNum = document.createElement("div");
		courseNum.className = "courseNum";
		courseNum.innerHTML = data[i]['COSID'];
		
		var courseName = document.createElement("div");
		courseName.className = "courseName";
		courseName.innerHTML = data[i]['CH_LESSON'];
		
		var time = document.createElement("div");
		time.className = "time";
		time.innerHTML = data[i]['SEG'];
		
		var time = document.createElement("div");
		time.className = "time";
		time.innerHTML = data[i]['SEG'];
		
		var gradeNclass = document.createElement("div");
		gradeNclass.className = "gradeNclass";
		gradeNclass.innerHTML = "&lt;"+data[i]['GRADE']+"年"+data[i]['OPEN_CLASSID']+"班&gt;";
		
		var teacher = document.createElement("div");
		teacher.className = "teacher";
		teacher.innerHTML = data[i]['LECTR_TCH_CH'];
		
		var depart = document.createElement("div");
		depart.className = "depart";
		depart.innerHTML = data[i]['FACULTY_NAME'];
		
		var type = document.createElement("div");
		type.className = "type";
		type.innerHTML = data[i]['MUST'];
		
		courseList.appendChild(addIcon);
		courseList.appendChild(listNumber);
		courseList.appendChild(courseNum);
		courseList.appendChild(courseName);
		courseList.appendChild(time);
		courseList.appendChild(gradeNclass);
		courseList.appendChild(teacher);
		courseList.appendChild(depart);
		courseList.appendChild(type);
		
		aSpanTag.appendChild(courseList);
	}
	document.getElementById("courseContent").appendChild(aSpanTag);
	//document.getElementById("courseContent").innerHTML = string;
	init();
}

function init(){
	console.log("init");
	courseListListener();
	
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
}

var CourseDetail;

function plusListener(){
	
	var addIcon = document.querySelectorAll(".addIcon>.fa-plus-circle");

	for(var i in addIcon){
		addIcon.item(i).addEventListener("click",function(event){
			event.stopPropagation();
			
			var parent = this.parentNode.parentNode;
			var courseNum = parent.querySelector(".courseNum").innerHTML;
			var gradeNclass = parent.querySelector(".gradeNclass").innerHTML.substring(6, 7);
			console.log(courseNum+","+gradeNclass);
			
			var username = getCookie("STUID");
			if(username == null){
				showToast("尚未登入，登入後方可選課");
				return;
			}
			console.log(username);
			
			var icon = this;
			$.ajax({
				url: "http://140.121.196.20:7779/CPS/php/addPersonalCourse.php",
				type: "POST",
				data:{ STUID:username,COSID: courseNum,OPEN_CLASSID:gradeNclass},
				dataType:"json",
				success: function(response) {
					console.log("成功");
					if(response["isAdd"] == true){
						icon.style.color = "#3BB61F";
						icon.setAttribute("class","fa fa-check-circle");
						showToast("選課成功");
					}
					else{
						showToast("選課失敗");
					}
				},
				error: function(xhr) {
					showToast("選課錯誤");
					console.log("錯誤");
				}
			});
		},false);
	}
}

function courseListListener(){
	CourseList = document.querySelectorAll(".courseList");
	if(CourseList.length==0){
		showToast("can't find any course");
		return;
	}
	for(var i in CourseList){
		 CourseList.item(i).addEventListener("click", function (){
			//event.stopPropagation();
			var CourseID =this.querySelector(".courseNum").innerHTML;
			var Class = this.querySelector(".gradeNclass").innerHTML.substring(6, 7);
			$.ajax({
				url: "http://140.121.196.20:7779/CPS/php/getCourseDetail.php?COSID=" + CourseID +"&OPEN_CLASSID=" +Class,
				type: "GET",
				dataType:"json",
				error: function(xhr) {
				  console.log("錯誤");
				},
				success: function(response) {
					CourseDetail = JSON.stringify(response[0]).replace(/\\r\\n/g, "<br />");
					CourseDetail = JSON.parse(CourseDetail);
					CpopOut(CourseDetail);
					console.log(CourseDetail);
					document.getElementById("popContent").style.display="block";
				}
			});
		}, false);
	}
	plusListener();
}
//pop out page in Chinese information
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

//pop out oage in English information
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