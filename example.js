function dialog()
{
	let dialog = new Dialog("Delete","Do you want to delete this ?","yes","no");
	dialog.oui = function()
	{
		console.log("your code here");
		alert('you pressed yes');
	}
	dialog.non = function()
	{
		console.log("your code here");
		alert('you pressed no');
	}
	//Don't forget to call show();
	dialog.show();
}
