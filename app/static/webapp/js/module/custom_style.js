"use strict";

import { Tools } from "../tools.js";

// get_el = Tools.get_el;


class CustomStyle
{

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




}


function init_CustomStyle()
{
	return new CustomStyle();
}


export { init_CustomStyle };