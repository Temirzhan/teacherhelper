"use strict";

import { Tools } from "../tools.js";
import { resizable } from "jquery-resizable";

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

class Focus01
{
	constructor()
	{

		this.desc_inputs = Tools.get_els(".desc-box input");
		this.row_inputs  = Tools.get_els("td input");
		this.button_word = Tools.get_els(".btn.btn-sm");


	}

	add_event_input()
	{
		var Self = this;
		for (let i = 0; i < this.desc_inputs.length; i++)
		{
			this.desc_inputs[i].addEventListener("change", function(){
				Self.row_inputs[i].value = this.value;

			})
		}
	}

	add_event_button()
	{
		for (let i = 0; i < this.button_word.length; i++)
		{
			this.button_word[i].addEventListener("click", function(){
				let textarea    = this.parentElement.parentElement.querySelector('textarea');
				textarea.value += this.innerText + ",";
			});
		}
	}


	main()
	{
		console.log( this.button_word.length );
		this.add_event_input();
		this.add_event_button();
		// this.create_form();

		// this.resize_custom();



	}

}


function init_focus01()
{
	return new Focus01();
}


export { init_focus01 };