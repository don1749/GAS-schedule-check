var ins_num = ss2.getRange('B1').getValue(); 
var times = ["10:00-11:00", "11:00-12:00", "13:00-14:00", "14:00-15:00", "16:00-17:00", "17:00-18:00"];
var filename;
var curYear = new Date().getFullYear();

function createShiftSheets() {
  var ss1 = spread[0]; //データ一覧のシートへアクセス
  var curMonth = ss1.getRange(1,1).getValue()[0];//現時点の月（3月）
  var dayNum = new Date(curYear,curMonth,0).getDate();//月は0から数えられるので、-1にする

  for (var i = 0; i < ins_num; i++)
  {
    //新規シートを作成
    var ins_name = ss1.getRange(2,i+3).getValue() + " 先生";//注: 先生名のフォーマット：〇〇 先生（スペースは半角）
    Logger.log(ins_name);
    
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var yourNewSheet = activeSpreadsheet.getSheetByName(ins_name);

    if (yourNewSheet != null) {
        activeSpreadsheet.deleteSheet(yourNewSheet);
    }
    yourNewSheet = activeSpreadsheet.insertSheet();
    yourNewSheet.setName(ins_name);

    //該当する講師のシフト表を作る

    //カレンダー作成
    if (i == 0)
    {
      for (var j = 0; j < dayNum; j++) 
      {
        var s = curMonth + "/" + (j+1);
        Logger.log(s);
        yourNewSheet.getRange(3,j+3).setValue(s);
        yourNewSheet.getRange(3,j+3).setNumberFormat("MM/dd");
        if(j==0) for (var k = 0; k < 6; k++) yourNewSheet.getRange(j+k+4,2).setValue(times[k]);
      }
      yourNewSheet.autoResizeColumns(1,yourNewSheet.getDataRange().getLastColumn());
      break;
    }
  }


  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetToCopyName = ss1.getRange(2,3).getValue() + " 先生";
  var sheetToCopy = ss.getSheetByName(sheetToCopyName);
  //Logger.log(sheetToCopyName);

  for (var i = 1; i < ins_num; i++)
  {
    //新規シートを作成
    var ins_name = ss1.getRange(2,i+3).getValue() + " 先生";//注: 先生名のフォーマット：〇〇 先生（スペースは半角）
    Logger.log(ins_name);

    var yourNewSheet = activeSpreadsheet.getSheetByName(ins_name);
    
    if (yourNewSheet != null) {
        activeSpreadsheet.deleteSheet(yourNewSheet);
    }

    //次のシートは最初に作ったシートのコピー
    SpreadsheetApp.flush();
    sheetToCopy.copyTo(ss).setName(ins_name);
  }
}
