import { Tools } from "../tools.js";
import { configurate as config } from "../config.js";
import resizable from "jquery-resizable";
import html2canvas  from 'html2canvas';
import { saveAs } from 'file-saver';

import jquery from 'jquery';
import "../../node_modules/jquery-modal/jquery.modal";


const log = (message, timestamp) => {
	var today = timestamp.toString().slice(16, 25).trim();
	console.log(`[${today}]`, message);
}

const print = (message) => log(message, new Date());



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




class Instrument {


	create_csv_report_button()
	{
		var Self = this;
		var button = Tools.get_el(".btn.btn-secondary.btn-lg.btn-block")
		button.addEventListener("click", function(){
			var rows = Self.input_data_extract();
			exportToCsv("group_work_" + Tools.datetime_f1() + ".csv", rows)

		});

	}


	create_image_report(name_focus, report_name)
	{

    	var container = document.querySelector("body");
    	// var container = document.querySelector("#single");
    	var button = document.querySelector(".btn.btn-secondary.btn-lg.btn-block");
		button.addEventListener("click",function(){

			var close_modal = '<br/> НАЖМИТЕ <a href="#" rel="modal:close">ГОТОВО</a>';
			var modal_el = Tools.get_el("#ex1");

        	function callback_close_modal(){
			
				jquery("#ex1").modal({
					fadeDuration: 250,
					escapeClose: false,
					clickClose: false,
					showClose: false
				});


        		modal_el.innerText = "Отчет сформирован и отправлен на почту";
        		modal_el.innerHTML += close_modal;
        	}

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
				print(canvas);
                canvas.toBlob(function(blob) {
                	var file_name = name_focus + Tools.datetime_f1() + ".png";

                    // saveAs(blob, name_focus + Tools.datetime_f1() + ".png");
                    if (config.REPORT)
                    {
                    	Tools.send_file_ajax(file_name, blob, "/module1", report_name , callback_close_modal);
                    }
                    else
                    {
	                  	callback_close_modal();
                    }

                });

			})

		})
		
	}
}

export {print, Instrument}
// export default print