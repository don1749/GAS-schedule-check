//データ一覧を一応全て消す
function deleteAll() 
{
  var last = ss1.getLastColumn();
  Logger.log(last);
  if(last > 2) ss1.getRange(1,3,190,last).clearContent();
}
