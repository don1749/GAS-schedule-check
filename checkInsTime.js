//講師の時間帯に◯をつける
var max_ins_num = ss2.getLastColumn();//講師データシートの列の数
var ins_num = ss2.getRange('B1').getValue(); 
var ins_pos = new Array();

function check_ins_time() 
{
  var ss1 = spread[0]; //データ一覧のシートへアクセス
  var dayNum = ss4.getRange('B7').getValue();
  Logger.log(dayNum);
  //for (var i = 1; i <= 38; i++) Logger.log(ss2.getRange(i,2).getValue().toString());
  
  for (var i = 2; i <= max_ins_num; i++) 
  {
    Logger.log(ss2.getRange(5,i).getValue());
    if(ss2.getRange(5,i).getValue().length != 0)
    {
      ins_pos.push(i);
      Logger.log(i);
    }
  }

  //講師のシートからデータ一覧に講師情報を書き込む
  for (var i = 1; i <= ins_num; i++) //回答した講師の日程をチェック
  {
    var pos = ins_pos[i-1];
    Logger.log(pos);
    
    //講師情報を最初の3行に入れる

    var insInfo = ss2.getRange(4,pos,3,1);
    insInfo.copyTo(ss1.getRange(1,i+2,3,1));
  
    for (var j = 1; j <= dayNum; j++)//3月の31日を1日ずつチェック
    {
      var time = ss2.getRange(j+6, pos).getValue();
      //Logger.log(time);
      var l = Math.floor(time.length/11);//セルでの時間帯の数
      //Logger.log(l);
      if (l != 0)//空でない時間帯だけを操作
      {
        if (time.search('10:00-11:00') > -1) 
        {
          var range = ss1.getRange(j*6-1, i+2);
          range.setValue("◯");
        }
        if (time.search('11:00-12:00') > -1) 
        {
          var range = ss1.getRange(j*6, i+2);
          range.setValue("◯");
        }
        if (time.search('13:00-14:00') > -1) 
        {
          var range = ss1.getRange(j*6+1, i+2);
          range.setValue("◯");
        }
        if (time.search('14:00-15:00') > -1) 
        {
          var range = ss1.getRange(j*6+2, i+2);
          range.setValue("◯");
        }
        if (time.search('16:00-17:00') > -1) 
        {
          var range = ss1.getRange(j*6+3, i+2);
          range.setValue("◯");
        }
        if (time.search('17:00-18:00') > -1) 
        {
          var range = ss1.getRange(j*6+4, i+2);
          range.setValue("◯");
        }
      }
      //else ss1.getRange(j*6-1,i+2,6,1).clearContent();
    }
  }
}
