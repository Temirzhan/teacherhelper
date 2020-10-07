"use strict";

import { Tools } from "../tools.js";
import resizable from "jquery-resizable";
import html2canvas  from 'html2canvas';
import { saveAs } from 'file-saver';


function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}


function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
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

	create_csv_report_button()
	{
		var Self = this;
		var button = Tools.get_el(".btn.btn-secondary.btn-lg.btn-block")
		button.addEventListener("click", function(){
			var rows = Self.input_data_extract();
			exportToCsv("group_work_" + Tools.datetime_f1() + ".csv", rows)

		});

	}

	create_image_report()
	{
		var Self = this;
		var button = Tools.get_el(".btn.btn-secondary.btn-lg.btn-block")
		button.addEventListener("click", function()
		{
			html2canvas(document.querySelector("#single"), {
				"width" : 2000,
				"height" : 2000,
			}).then(canvas => {
			    // var data   = canvas.toDataURL();
			    var a = document.createElement('a');
			    a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
			    a.download = 'somefilename.png';
			    a.click();
			})			


		})



	}
	create_image_report2()
	{

    	var container = document.querySelector("body");
    	// var container = document.querySelector("#single");
    	var button = document.querySelector(".btn.btn-secondary.btn-lg.btn-block");
		button.addEventListener("click",function(){
			window.scrollTo( 0, 0 );



			html2canvas( container , {
				ignoreElements : function(element)
				{
					if( element.classList.contains( 'navbar' ) || element.classList.contains("ignore") )
					{
						return true;
					}
				}
			}).then(canvas => {
				console.log(canvas);
                canvas.toBlob(function(blob) {
                    saveAs(blob, "group_work_" + Tools.datetime_f1() + ".png"); 
                });

			})

		})
		
	}


	main()
	{
		var Self = this;
		this.add_event_input();
		this.add_event_button();
		// this.create_csv_report_button();
		// this.create_image_report();

		this.create_image_report2();

		

		// this.create_form();

		// this.resize_custom();



	}

}


function init_focus01()
{
	return new Focus01();
}


export { init_focus01 } ;