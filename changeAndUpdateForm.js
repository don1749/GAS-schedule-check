function changesAndUpdateForm(formId,curMonth)
{
  // Open a form by ID and create a new spreadsheet.
  var form = FormApp.openById(formId);
  var formName = DriveApp.getFileById(formId).getName();
  var responseSheet = SpreadsheetApp.create(formName+"（回答）");
  var formTitle;

  //旧版の回答シートを削除
  var parrentFolder = DriveApp.getFoldersByName("塾システムサンプル（修正版）").next();
  var schoolName = ss4.getRange('B8').getValue();
  var schoolFolder = parrentFolder.getFoldersByName(schoolName).next();
  curMonth = fileName.substr(0,6);
  var thisMonthFolder = schoolFolder.getFoldersByName(curMonth).next();

  if(formName.search('講師') > -1)
  {
    //過去に作った回答シートを削除する
    var insResponseSheet = thisMonthFolder.getFilesByName(curMonth + "_"+schoolName+"・講師用・日程について（回答）");
    if (insResponseSheet.hasNext()) thisMonthFolder.removeFile(DriveApp.getFileById(insResponseSheet.next().getId()));
    // Update form properties via chaining.
    formTitle = '［講師用］' + thisMonth + '月分　日程について';
  }

  else if(formName.search('生徒') > -1) 
  {
    var studentResponseSheet = thisMonthFolder.getFilesByName(curMonth+"_"+schoolName+"・生徒用・日程希望（回答）");
    if (studentResponseSheet.hasNext()) thisMonthFolder.removeFile(DriveApp.getFileById(studentResponseSheet.next().getId()));
    // Update form properties via chaining.
    formTitle = '［生徒用］' + thisMonth + '月分　日程希望';
  }
  

  form.setTitle(formTitle)
      //.setDescription('Description of form')
      //.setConfirmationMessage('Thanks for responding!')
      .setAllowResponseEdits(true)
      .setAcceptingResponses(true);

  var items = form.getItems();

  //まずは学校名を変える
  var school = form.getItemById(items[0].getId());
  school.asMultipleChoiceItem().setChoiceValues([schoolName]);

  //次は受講・教科可能日程の展示を変える
  var days = form.getItemById(items[3].getId());
  days.asCheckboxGridItem().setRows(row).setColumns(times);

  // Update the form's response destination.
  DriveApp.getFileById(responseSheet.getId()).moveTo(DriveApp.getFolderById(thisMonthFolder.getId()));
  form.setDestination(FormApp.DestinationType.SPREADSHEET, responseSheet.getId());
}