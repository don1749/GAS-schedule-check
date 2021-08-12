/**
 * Creates a trigger for when a spreadsheet opens.
 */
function createSpreadsheetOpenTrigger() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('initMenu')
      .forSpreadsheet(ss)
      .onOpen()
      .create();
  ScriptApp.newTrigger('importRange')
      .forSpreadsheet(ss)
      .onOpen()
      .create();
  ScriptApp.newTrigger('hidess4')
      .forSpreadsheet(ss)
      .onOpen()
      .create();
}
