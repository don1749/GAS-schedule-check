//新規回答のデータにしか扱わない
var max_ins_num = ss2.getLastColumn();//講師データシートの列の数
var new_ins_num = ss2.getRange('B1').getValue(); 
var new_stu_num = ss3.getRange('B1').getValue();
var ins_pos = new Array();
var stu_pos = new Array();

function update() 
{
  var ss1 = spread[0]; //データ一覧のシートへアクセス
  var dayNum = ss4.getRange('B7').getValue();

  //データのある列を探し位置を記録
  for (var i = 2; i <= max_ins_num; i++) 
  {
    if(ss2.getRange(5,i).getValue().length != 0)
    {
      ins_pos.push(i);
      //Logger.log(i);
    }
  }

  for (var i = 2; i <= max_stu_num; i++) 
  {
    if(ss3.getRange(5,i).getValue().length != 0)
    {
      stu_pos.push(i);
      //Logger.log(i);
    }
  }


  var old_ins_num = 0, old_stu_num = 0;
  //回答した講師の数を数える
  for(var i = 3; i <= new_ins_num+3; i++) {
    //Logger.log(ss1.getRange(2,i).getValue());
    if(ss1.getRange(2,i).getValue().length == 0) break;
    old_ins_num++;
  }
  Logger.log("今まで情報を処理した講師の人数：" + old_ins_num);
  
  for (var i = old_ins_num + 5; i <= old_ins_num + new_stu_num + 5; i++)
  {
    //Logger.log(ss1.getRange(2,i).getValue());
    if(ss1.getRange(2,i).getValue().length == 0) break;
    old_stu_num++;
  }
  Logger.log("今まで情報を処理した生徒の人数：" +old_stu_num);

  var x = new_ins_num - old_ins_num;//新規回答した講師の人数
  var y = new_stu_num - old_stu_num;//新規回答した生徒の人数
  Logger.log("新規回答の講師の数：" + x);
  Logger.log("新規回答の生徒の数：" + y);

  //update

  //生徒の前のx列を後ろにシフトさせる
  if (x!=0)
  {  
    ss1.getRange(1,old_ins_num+5,190,x).copyTo(ss1.getRange(1,old_ins_num + old_stu_num + 5, 190, x));
    ss1.getRange(1,old_ins_num+5,190,x).clearContent();
  }

  //新規回答した講師のデータを処理
  for (var i = 0; i < x; i++)
  {
    var pos = ins_pos[old_ins_num + i];

    //新しい講師のx列のデータを講師データの一覧に入れる
    var insInfo = ss2.getRange(4,pos,3,1);
    insInfo.copyTo(ss1.getRange(1,i + old_ins_num + 3,3,1));//(1,4,3,1)

    for (var j = 1; j <= dayNum; j++)//3月の31日を1日ずつチェック
    {
      var time = ss2.getRange(j+6, pos).getValue();

      var l = Math.floor(time.length/11);//セルでの時間帯の数
      //Logger.log(l);

      if (l != 0)//空でない時間帯だけを操作
      {
        if (time.search('10:00-11:00') > -1) 
        {
          var range = ss1.getRange(j*6-1, old_ins_num+3+i);
          range.setValue("◯");
        }
        if (time.search('11:00-12:00') > -1) 
        {
          var range = ss1.getRange(j*6, old_ins_num+3+i);
          range.setValue("◯");
        }
        if (time.search('13:00-14:00') > -1) 
        {
          var range = ss1.getRange(j*6+1, old_ins_num+3+i);
          range.setValue("◯");
        }
        if (time.search('14:00-15:00') > -1) 
        {
          var range = ss1.getRange(j*6+2, old_ins_num+3+i);
          range.setValue("◯");
        }
        if (time.search('16:00-17:00') > -1) 
        {
          var range = ss1.getRange(j*6+3, old_ins_num+3+i);
          range.setValue("◯");
        }
        if (time.search('17:00-18:00') > -1) 
        {
          var range = ss1.getRange(j*6+4, old_ins_num+3+i);
          range.setValue("◯");
        }
      }
    }
  }

  //新規回答した生徒のデータの処理（○をつける）
  for (var i = 0; i < y; i++)
  {
    var pos = stu_pos[old_stu_num+i];
    Logger.log(pos);
    var insInfo = ss3.getRange(4,pos,3,1);
    insInfo.copyTo(ss1.getRange(1,new_ins_num + 5 + old_stu_num + i,3,1));

    for (var j = 1; j <= dayNum; j++)//3月の31日を1日ずつチェック
    {
      var time = ss3.getRange(j+6, pos).getValue();

      var l = Math.floor(time.length/11);//セルでの時間帯の数
      //Logger.log(l);

      if (l != 0)//空でない時間帯だけを操作
      {
        if (time.search('10:00-11:00') > -1) 
        {
          var range = ss1.getRange(j*6-1, new_ins_num + 5 + old_stu_num + i);
          range.setValue("◯");
        }
        if (time.search('11:00-12:00') > -1) 
        {
          var range = ss1.getRange(j*6, new_ins_num + 5 + old_stu_num + i);
          range.setValue("◯");
        }
        if (time.search('13:00-14:00') > -1) 
        {
          var range = ss1.getRange(j*6+1, new_ins_num + 5 + old_stu_num + i);
          range.setValue("◯");
        }
        if (time.search('14:00-15:00') > -1) 
        {
          var range = ss1.getRange(j*6+2, new_ins_num + 5 + old_stu_num + i);
          range.setValue("◯");
        }
        if (time.search('16:00-17:00') > -1) 
        {
          var range = ss1.getRange(j*6+3, new_ins_num + 5 + old_stu_num + i);
          range.setValue("◯");
        }
        if (time.search('17:00-18:00') > -1) 
        {
          var range = ss1.getRange(j*6+4, new_ins_num + 5 + old_stu_num + i);
          range.setValue("◯");
        }
      }
    }
  }

}
