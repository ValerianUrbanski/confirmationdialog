# confirmationdialog
to create a dialog in javascript (no jquery required)

let dialog = new Dialog("your title","your sentence","yes option","no option");

you must then override the function "oui" and eventually "non" depending on what you want to do

dialog.oui = function(){
  //your code here
}
dialog.non = function()
{
  //your code here
}
//don't forget this one
dialog.show();
#CSS customisation
set --font-ubuntu : "your font" to change the font
