/**-----------------------------------------------------------------------------
 * Filename		: ScrollHalfPage.js
 * Last Modified	: 01/04/2009 12:45:34
 * Description		:
 * Created 		: 02/10/2008
 * Created by 		: PoYang Lai ( Lai.crimson@gmail.com )
 * Tested with		: PSPad 2331
-----------------------------------------------------------------------------**/

/**-----------------------------------------------------------------------------
 * Requirement		:
-----------------------------------------------------------------------------**/

/**-----------------------------------------------------------------------------
 * Note			:
-----------------------------------------------------------------------------**/

/**-----------------------------------------------------------------------------
 * Version History	:
-----------------------------------------------------------------------------**/

var module_name = "ScrollHalfPage";
var module_version = "0.100";
/**
 * Shortcut setting.
 * user can modify shortcut here.
 **/
var gShortcutHalfPgUp = "CTRL+PGUP";
var gShortcutHalfPgDn = "CTRL+PGDN";
var gShortcutHalfPgLf = "ALT+PGUP";
var gShortcutHalfPgRt = "ALT+PGDN";

var PageRightEdge = 80;

/**-----------------------------------------------------------------------------
 * Programs
-----------------------------------------------------------------------------**/

function ScrollHalfPgUp()
{
	// get current editor
	var ed = newEditor();
	ed.assignActiveEditor();
	// get half page line count
	var half_page = GetHalfPageLines(ed, true);
	//scroll page
	for(var i=0; i<half_page; i++){
	        ed.command("ecUp");
		ed.command("ecScrollUp");
 	}
	return;
}

function ScrollHalfPgDn()
{
	// get current editor
	var ed = newEditor();
	ed.assignActiveEditor();
	// get half page line count
	var half_page = GetHalfPageLines(ed, false);
	// scroll page
	for(var i=0; i<half_page; i++){
	        ed.command("ecDown");
		ed.command("ecScrollDown");
	}
	return;
}

function ScrollHalfPgLf()
{
	// get current editor
	var ed = newEditor();
	ed.assignActiveEditor();
	// get half page line count
	var half_page = PageRightEdge/2;
	// set cursor position
	ed.caretX( ed.caretX() - half_page);
	// scroll page
	for(var i=0; i<half_page; i++){
		ed.command("ecScrollLeft");
	}
	return;
}

function ScrollHalfPgRt()
{
	// get current editor
	var ed = newEditor();
	ed.assignActiveEditor();
	// get half page line count
	var half_page = PageRightEdge/2;
	// set cursor position
	ed.caretX( ed.caretX() + half_page);
	// scroll page
	for(var i=0; i<half_page; i++){
		ed.command("ecScrollRight");
	}
	return;
}

function GetHalfPageLines(ed, direction)
{
	// get original position
	var orgX = ed.caretX();
	var orgY = ed.caretY();
	var lines = ed.linesCount();

	// verify lines in one page
	var top_line, btm_line, half_page;
	ed.command("ecPageTop");
 	top_line = ed.caretY();
	ed.command("ecPageBottom");
	btm_line = ed.caretY();
	half_page = (btm_line - top_line - (btm_line-top_line)%2 )/2

	// reset cursor position
	ed.setCaretPos(orgX, orgY);

	// when encounter the editor's top or bottom
	if( (direction == true && top_line == 1)
	||  (direction == false && btm_line == lines) ){
		return 0;
 	}
 	if( (direction == true && half_page>(top_line-1)) ) half_page = (top_line-1);
	if( (direction == false && half_page>(lines-btm_line))) half_page = (lines-btm_line);

	return half_page;
}

function OpenActivateFile( file_name)
{
        var NewEditObj = newEditor(); //New editor object
        var i = FindOpenedFile(file_name);
        if(i == -1){
		NewEditObj.openFile(file_name);
	}else{
		NewEditObj.assignEditorByIndex(i);
	}
	NewEditObj.activate();
	return;
}

function FindOpenedFile( file_name)
{
	var OpenedEditObj = newEditor();
	var i = 0;
	for(i=0; i< editorsCount(); i++){
		if(OpenedEditObj.assignEditorByIndex(i)){
			if(OpenedEditObj.filename() == file_name){
				return i;
			}
		}
	}
	return -1;
}

function OpenModule()
{
	try{
                OpenActivateFile( moduleFileName(module_name));
	}
	catch(e){
		echo("\nOpen file error...'\n" + moduleFileName(module_name) + "\n" + e.message + "\n");
	}
	return;
}

function Init()
{
	addMenuItem("ScrollHalfPg&Up", "Editor", "ScrollHalfPgUp", gShortcutHalfPgUp);
	addMenuItem("ScrollHalfPg&Dn", "Editor", "ScrollHalfPgDn", gShortcutHalfPgDn);
	addMenuItem("ScrollHalfPg&Lf", "Editor", "ScrollHalfPgLf", gShortcutHalfPgLf);
	addMenuItem("ScrollHalfPg&Rt", "Editor", "ScrollHalfPgRt", gShortcutHalfPgRt);
	addMenuItem("-", "Editor", "", "");
	addMenuItem("&EditScrollHalfPage", "Editor", "OpenModule", "");
}
