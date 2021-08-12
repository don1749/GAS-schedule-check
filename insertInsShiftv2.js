var ins_num = ss2.getRange('B1').getValue(); 
var stu_num = ss3.getRange('B1').getValue();
var times = ["10:00-11:00", "11:00-12:00", "13:00-14:00", "14:00-15:00", "16:00-17:00", "17:00-18:00"];

function insert_ins_time_shift_v2() 
{
  var ss1 = spread[0]; //データ一覧のシートへアクセス
  var cur = 0;
  var dayNum = ss4.getRange('B7').getValue();
  
  for (var i = 0; i < ins_num; i++)//先生のシフト表を一人分ずつを作成
  {
    var ins_name = ss1.getRange(2,i+3).getValue() + " 先生";//注）先生名のフォーマット：〇〇 先生（スペースは半角）
    var ssi = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ins_name);

    var requestedList = new Array();//この先生を希望した生徒リスト
    for (var j = 0; j < stu_num; j++) 
    {
      var stuRequest = ss1.getRange(3,j+ins_num+5).getValue();
      if (stuRequest.search(ins_name+"（"+ss1.getRange(3,i+3).getValue()+"）") > -1) requestedList.push(j);
    }
    Logger.log(requestedList);

    for (var j = 0; j < dayNum; j++)
    {

      for (var k = 0; k < 6; k++)
      {
        var list = new Array();//この時間帯に入れる生徒リスト
        for (var l = 0; l < requestedList.length; l++) if (ss1.getRange(j*6+k+5,ins_num+5+requestedList[l]).getValue().length != 0) list.push(ss1.getRange(2,ins_num+5+requestedList[l]).getValue());
        if (ss1.getRange(j*6+5+k,i+3).getValue().length != 0) ssi.getRange(k+4,j+3).setBackground("Yellow");
        else ssi.getRange(k+4,j+3).clearFormat(); 
        //その時間に希望した生徒が何人いるかをセルで表示
        Logger.log(list);
        ssi.getRange(k+4,j+3).setValue(list.length);
      }
    }

    //作成済みのシフト表の数をアップデート
    cur ++;
    ss4.getRange('B2').setValue(cur);
  }
}
