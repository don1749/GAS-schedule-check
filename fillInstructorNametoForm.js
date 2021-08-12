var fileName = SpreadsheetApp.getActiveSpreadsheet().getName();
var thisMonth = fileName.substr(0,6);
var schoolName = ss4.getRange('B8').getValue();
var parrentFolder = DriveApp.getFoldersByName("塾システムサンプル（修正版）").next();
var schoolFolder = parrentFolder.getFoldersByName(schoolName).next();
var thisMonthFolder = schoolFolder.getFoldersByName(thisMonth).next();
var studentForm = thisMonthFolder.getFilesByName(thisMonth+"_"+schoolName+"・生徒用・日程希望").next();
var formId = studentForm.getId();

//var driveFolder = DriveApp.getFoldersByName()


//var formID = "1VBwTYcKsOda2PkbAR2cB-la06OAg5m_bfqzVKf1CjKA";//生徒フォームへアクセス
//var form = FormApp.openById(formID);
var ins_num = ss2.getRange('B1').getValue(); 
var max_ins_num = ss2.getLastColumn();//講師データシートの列の数

function fill_ins_name()
{
  Logger.log("current SpreadSheetName: %s, thisMonth: %s",fileName, thisMonth);
  Logger.log(parrentFolder);
  Logger.log(schoolFolder);
  Logger.log(studentForm);

  var form = FormApp.openById(formId);
  var items = form.getItems();//フォームの項目をゲット
  var item = form.getItemById(items[2].getId().toString());
  //Logger.log(item.getTitle());
  //Logger.log(item.getType());

  //講師名を生徒フォームのチェックボックスに入れる
  var ins_name = new Array(); //講師名の配列の宣言
  
  for (var i = 0; i < max_ins_num; i++) if (ss2.getRange(5,2+i).getValue().length != 0) ins_name.push(ss2.getRange(5,2+i).getValue() + " 先生" + "（" + ss2.getRange(6,i+2).getValue() + "）");
  
  Logger.log(ins_name);

  item.asCheckboxItem().setChoiceValues(ins_name);//checkboxの形にする
  //「講師名」の項目のIDを求める
  //var items = form.getItems();
  //Logger.log(items[2].getId().toString()); 
}
