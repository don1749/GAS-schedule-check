//学生の時間帯をチェック
var max_ins_num = ss2.getLastColumn();
var max_stu_num = ss3.getLastColumn(); 
var ins_num = ss2.getRange('B1').getValue(); 
var stu_num = ss3.getRange('B1').getValue();
var stu_pos = new Array();

function check_stu_time() 
{
  var ss1 = spread[0]; //データ一覧のシートへアクセス
  //データ一覧にまず名前、所属校、希望する講師名を書き込む
  //ss1.getRange(1,ins_num+4).setValue("生徒")
  Logger.log(max_stu_num);
  for (var i = 2; i <= max_stu_num; i++) 
  {
    if(ss3.getRange(5,i).getValue().length != 0)
    {
      stu_pos.push(i);
      //Logger.log(i);
    }
  }
  
  var dayNum = ss4.getRange('B7').getValue();

  for (var i = 1; i <= stu_num; i++) //今まで回答した学生さんの日程をチェック
  {
    var pos = stu_pos[i-1];
    Logger.log(pos);

    //学生情報をデータ一覧に入れる

    var insInfo = ss3.getRange(4,pos,3,1);
    insInfo.copyTo(ss1.getRange(1,i+ins_num+4,3,1));

    for (var j = 1; j <= dayNum; j++)//3月の31日を1日ずつチェック
    {
      var time = ss3.getRange(j+6, pos).getValue();

      var l = Math.floor(time.length/11);//セルでの時間帯の数
      //Logger.log(l);

      if (l != 0)//空でない時間帯だけを操作
      {
        if (time.search('10:00-11:00') > -1) 
        {
          var range = ss1.getRange(j*6-1, i+ins_num+4);
          range.setValue("◯");
        }
        if (time.search('11:00-12:00') > -1) 
        {
          var range = ss1.getRange(j*6, i+ins_num+4);
          range.setValue("◯");
        }
        if (time.search('13:00-14:00') > -1) 
        {
          var range = ss1.getRange(j*6+1, i+ins_num+4);
          range.setValue("◯");
        }
        if (time.search('14:00-15:00') > -1) 
        {
          var range = ss1.getRange(j*6+2, i+ins_num+4);
          range.setValue("◯");
        }
        if (time.search('16:00-17:00') > -1) 
        {
          var range = ss1.getRange(j*6+3, i+ins_num+4);
          range.setValue("◯");
        }
        if (time.search('17:00-18:00') > -1) 
        {
          var range = ss1.getRange(j*6+4, i+ins_num+4);
          range.setValue("◯");
        }
      }
    }
  }
}