"use strict";

import { Tools }  from "../tools.js";
import { print }  from "./helper.js";
// import print  from "./helper.js";

// get_el = Tools.get_el;


class CustomStyle
{
	constructor()
	{
		this.Height = document.documentElement.clientHeight;
		this.Width  = document.documentElement.clientWidth;
	}

	active_menu(path)
	{
		var elements = Tools.get_els(".nav-link.act-menu");
		for (var i = 0; i < elements.length; i++) {
			let el = elements[i];
			let _path = el.getAttribute("href");
			if (_path === "/"+path)
			{
				el.classList.add("active");
			}

		}
	}

	footer_position()
	{
		var footer = Tools.get_el(".footer-bottom"  );
		var setting = footer.getBoundingClientRect()
		footer.style.cssText = "position: fixed;left: 0;top:" + (this.Height - setting.height) + "px";
		console.log(this.Height, this.Width, footer, setting );
	}





}


function init_custom_style()
{
	return new CustomStyle();
}


export { init_custom_style };