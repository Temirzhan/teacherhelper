"use strict";


import { Hello } from "./module/helloworld.js";
import { init_CustomStyle } from "./module/custom_style.js";

console.log("Main load1");

// Hello.call();
var custom_style = init_CustomStyle();
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


var path = window.location.pathname.split(/\//);
path = path.slice(-1)[0];

if (path.search(/module\d{1,2}/) != -1 )
{
	custom_style.active_menu( path );
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