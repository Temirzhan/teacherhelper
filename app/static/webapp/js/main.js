"use strict";


import { Hello } from "./module/helloworld.js";
import { init_custom_style } from "./module/custom_style.js";
import { init_focus01 } from "./module/focus01.js";

console.log("Main load");


var App = {
	_main : function () {
		// var custom_style = init_CustomStyle();
		// custom_style.run();
		
		// window.onload = function()
		// {
		// 	setTimeout(function(){

		// 		e.layer04.style.zIndex = "0";
		// 		App.run();

		// 	}, 300);
			
		// }


	},
	run : function(){
		App._main();
	}
}


App.run();

var custom_style = init_custom_style();
// custom_style.footer_position();

var path = window.location.pathname.split(/\//);
path = path.slice(-1)[0];



if (path.search(/module\d{1,2}/) != -1 )
{
	custom_style.active_menu( path );
}

if (path.search(/module1/) != -1 )
{
	let focus = init_focus01();
	focus.main(); 
}

// if (path.length === 0 || path === "index.html")
// {

// 	mobile.home_page();
// 	component.resize_window();
// 	Prepare.prepare_layers();
// 	Prepare.preloading();
// 	Prepare.offdebug();

// 	window.onload = function()
// 	{
// 		setTimeout(function(){

// 			e.layer04.style.zIndex = "0";
// 			App.run();

// 		}, 300);
		
// 	}
// }