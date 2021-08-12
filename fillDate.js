var curMonth = parseInt(SpreadsheetApp.getActiveSpreadsheet().getName().substr(4,2),10);  //3
var spread = SpreadsheetApp.getActiveSpreadsheet().getSheets();  

var ss2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("講師"); //講師の回答シートへアクセス
var ss3 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("生徒"); //学生の回答シートへアクセス
var ss4 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("グローバル変数");

//月の日にちを自動的につける
var curYear = new Date().getFullYear();
var schoolName = ss4.getRange('B8').getValue
var row = new Array();

//Logger.log(curMonth);
var times = ["10:00-11:00", "11:00-12:00", "13:00-14:00", "14:00-15:00", "16:00-17:00", "17:00-18:00"];

function addDate() 
{
  var ss1 = spread[0]; //データ一覧のシートへアクセス
  ss1.setName(curMonth + "月");
  ss1.getRange('A1').setValue(curMonth + "月");//現時点の月（3月）
  ss4.getRange('B6').setValue(curMonth);
  
  var dayNum = new Date(curYear,curMonth,0).getDate();//月は0から数えられるので、-1にする
  Logger.log("curYear: %d, curMonth: %s, dayNum: %s",curYear,curMonth,dayNum);

  ss1.getRange(5,1,186,2).clearContent();

  //グローバル変数シートに現在の年月とその月の日数をアップデート

  ss4.getRange('B5').setValue(curYear);
  ss4.getRange('B6').setValue(curMonth);
  ss4.getRange('B7').setValue(dayNum);

  for(var i = 0; i < dayNum; i++)
  {
    for(var j=0; j<=5; j++)
    {  
      var range = ss1.getRange(i*6+j+5,1);
      
      range.clearContent();
      range.clearFormat();
      
      //var date = new Date(default_date+1000 * 60 * 60 * 24*i);    20210224　修正  
      var date = new Date(curYear,curMonth-1,i+1);
      
      range.setValue(date);
      ss1.getRange(i*6+j+5,2).setValue(times[j]);
    } 
    row.push(curMonth + '/' + (i+1));
  }

  //これから、フォームでの展示を変更する
  var fileName = SpreadsheetApp.getActiveSpreadsheet().getName();
  var thisMonth = fileName.substr(0,6);
  var schoolName = ss4.getRange('B8').getValue();
  var parrentFolder = DriveApp.getFoldersByName("塾システムサンプル（修正版）").next();
  var schoolFolder = parrentFolder.getFoldersByName(schoolName).next();
  var thisMonthFolder = schoolFolder.getFoldersByName(thisMonth).next();
  var studentForm = thisMonthFolder.getFilesByName(thisMonth+"_"+schoolName+"・生徒用・日程希望").next();
  var insForm = thisMonthFolder.getFilesByName(thisMonth + "_"+schoolName+"・講師用・日程について").next();
  var stuFormId = studentForm.getId();
  var insFormId = insForm.getId();

  changesAndUpdateForm(stuFormId,curMonth);
  changesAndUpdateForm(insFormId,curMonth);

}
