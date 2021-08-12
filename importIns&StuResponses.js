//フォームの回答シート（Response)へアクセス

var fileName = SpreadsheetApp.getActiveSpreadsheet().getName();
var thisMonth = fileName.substr(0,6);//202103
var schoolName = ss4.getRange('B8').getValue();
var parrentFolder = DriveApp.getFoldersByName("塾システムサンプル（修正版）").next();
var schoolFolder = parrentFolder.getFoldersByName(schoolName).next();
var thisMonthFolder = schoolFolder.getFoldersByName(thisMonth).next();

function importRange() {
  var insResFileId = thisMonthFolder.getFilesByName(thisMonth+"_"+schoolName+"・講師用・日程について（回答）").next().getId();
  var stuResFileId = thisMonthFolder.getFilesByName(thisMonth+"_"+schoolName+"・生徒用・日程希望（回答）").next().getId();
  Logger.log(insResFileId);
  Logger.log(stuResFileId);

  var importFromInsRes = "=TRANSPOSE(IMPORTRANGE(" + '"' + insResFileId + '"' + ',"A1:AJ1000"))';
  var importFromStuRes = "=TRANSPOSE(IMPORTRANGE(" + '"' + stuResFileId + '"' + ',"A1:AJ1000"))';
  
  ss2.getRange(3,1).setFormula(importFromInsRes);
  ss3.getRange(3,1).setFormula(importFromStuRes);
  //完了！
}