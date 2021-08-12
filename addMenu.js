function initMenu() {
  var ui = SpreadsheetApp.getUi();

  var menu = ui.createMenu("メニュー");

  menu.addItem("日にちの展示を変更、及び回答シートを作成","addDate");
  menu.addSeparator();

  menu.addItem("講師の時間帯に◯をつける","check_ins_time");
  menu.addItem("生徒の時間帯に◯をつける","check_stu_time");
  menu.addItem("アップデート","update");
  menu.addSeparator();

  menu.addItem("講師名を生徒のフォームに入れる","fill_ins_name");
  menu.addSeparator();

  var submenu = ui.createMenu("講師のタイムシフトの作成");
  submenu.addItem("シフト表を作成","createShiftSheets");
  submenu.addItem("情報を最初から計算・入力","insert_ins_time_shift_v2");
  submenu.addItem("続けて入力する","updateShiftInfo");
  menu.addSubMenu(submenu);
  menu.addSeparator();
  
  menu.addItem("データ一覧を一時削除","deleteAll");
  menu.addToUi();
}