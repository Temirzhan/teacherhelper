"use strict";

import { Tools } from "../tools.js";
import { print, Instrument }  from "./helper.js";

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}




class Focus01 extends Instrument
{
	constructor()
	{
		super();
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

	input_data_extract()
	{
		var data = [];
		var rows = Tools.get_els("tr");
		rows = Array.from(rows);
		rows = rows.slice(0,7)
		for (let i = 0; i < rows.length; i++)
		{
			let elements = rows[i].querySelectorAll('td');
			let row = [];
			for (let i2 = 0; i2 < elements.length; i2++)
			{
				let temp = "";
				if (i2 === 0)
				{	
					temp = elements[i2].innerText;
				}
				else
				{
					temp = elements[i2].querySelector("textarea, input").value;
				}

				row.push(temp);
			}

			data.push( row );
		}

		return data;
	}



	main()
	{

		this.add_event_input();
		this.add_event_button();
		// this.create_csv_report_button();
		// this.create_image_report();

		this.create_image_report("group_work_", "Групповая работа");

	}

}


function init_focus01()
{
	return new Focus01();
}


export { init_focus01 } ;