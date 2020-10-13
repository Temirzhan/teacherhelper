"use strict";
import jquery  from 'jquery';

function get_name_browser(){
    // получаем данные userAgent
    var bw = navigator.userAgent;    
    // с помощью регулярок проверяем наличие текста,
    // соответствующие тому или иному браузеру
    if (bw.search(/Chrome/) > 0) return 'Chrome';
    if (bw.search(/Firefox/) > 0) return 'Firefox';
    if (bw.search(/Opera/) > 0) return 'Opera';
    if (bw.search(/Safari/) > 0) return 'Safari';
    if (bw.search(/MSIE/) > 0) return 'Internet Explorer';
    // условий может быть и больше.
    // сейчас сделаны проверки только 
    // для популярных браузеров
    return 'Не определен';
}

function get_name_brand(){
    // получаем данные userAgent
    var bw = navigator.userAgent;    
    // с помощью регулярок проверяем наличие текста,
    // соответствующие тому или иному браузеру

    if (bw.search(/iPhone/) > 0) return 'iPhone';

    return 'Не определен';
}


function getCoords(elem) { // not IE8
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

function get_el(selector){
    return document.querySelector(selector);
}
function get_els(selector){
    return document.querySelectorAll(selector);
}

function current_datetime_f1()
{

    var currentdate = new Date();

    var datetime = currentdate.getDate() + "-"+(currentdate.getMonth()+1) 
        + "-" + currentdate.getFullYear() + "_" 
        + currentdate.getHours() + "-" 
        + currentdate.getMinutes() + "-" + currentdate.getSeconds();
    return datetime;


}


function send_file_ajax(file_name, data_blob, url, report_name ,callback)
{

    var fd = new FormData();
    fd.append('file', data_blob, file_name);
    fd.append('report_name', report_name);

    jquery.ajax({
        type: 'POST',
        url: url,
        data: fd,
        processData: false,
        contentType: false
    }).done(function(data) {
           console.log(data);
           callback();
    });
}


var Tools = {
    datetime_f1: current_datetime_f1,
    get_el : get_el,
    get_els : get_els,
    getCoords : getCoords,
    get_name_browser : get_name_browser,
    send_file_ajax : send_file_ajax,
}


export { Tools };