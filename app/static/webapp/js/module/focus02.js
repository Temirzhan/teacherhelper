"use strict";

import { Tools } from "../tools.js";
import { print, Instrument }  from "./helper.js";



(function(target) {
	// https://github.com/frogcat/canvas-arrow
  if (!target || !target.prototype)
    return;
  target.prototype.arrow = function(startX, startY, endX, endY, controlPoints) {
    var dx = endX - startX;
    var dy = endY - startY;
    var len = Math.sqrt(dx * dx + dy * dy);
    var sin = dy / len;
    var cos = dx / len;
    var a = [];
    a.push(0, 0);
    for (var i = 0; i < controlPoints.length; i += 2) {
      var x = controlPoints[i];
      var y = controlPoints[i + 1];
      a.push(x < 0 ? len + x : x, y);
    }
    a.push(len, 0);
    for (var i = controlPoints.length; i > 0; i -= 2) {
      var x = controlPoints[i - 2];
      var y = controlPoints[i - 1];
      a.push(x < 0 ? len + x : x, -y);
    }
    a.push(0, 0);
    for (var i = 0; i < a.length; i += 2) {
      var x = a[i] * cos - a[i + 1] * sin + startX;
      var y = a[i] * sin + a[i + 1] * cos + startY;
      if (i === 0) this.moveTo(x, y);
      else this.lineTo(x, y);
    }
  };
})(CanvasRenderingContext2D);



class Focus02 extends Instrument
{
	constructor()
	{
		super();
		this.canvas = Tools.get_el("#canvas");
		this.ctx    = this.canvas.getContext('2d');
		this.button_clear = Tools.get_el(".btn-clear");
		this.studen1 = Tools.get_el(".role1");
		this.studen2 = Tools.get_el(".role2");
		this.mode = {
			draw_line : 1
		};
	}


	draw_grid(ctx, w, h, step)
	{
		// the render logic should be focusing on the rendering 
		const minutes = [0, 5,10, 15,20,25,30,35,40];
		const values  = [100, 90,80, 70,60,50,40,30,20,10];
		const drawGrid = (ctx, w, h, step) => {
		    ctx.beginPath(); 
		    var c, i;
		    c = 0; i =0;
		    for (var x=0;x<=w-40;x+=step) 
		    {

		    		if (1 )
		    		{
		    			ctx.fillText(`${minutes[i]}`, x+75, h-25);
		    			i++;
		    		}
		            ctx.moveTo(x+40, 0);
		            ctx.lineTo(x+40, h-20);
		            c++;
		    }

		    ctx.stroke(); 

		    c = 0; i =0;

		    ctx.beginPath();
		    ctx.font = "12px serif";
		    for (var y=0;y<=h-40;y+=step) 
		    {

		    		if (c < values.length)
		    		{

		    			ctx.fillText(`${values[i]} %`, 50, y + 15);
		    			i++;
		    		}

		            ctx.moveTo(0+40, y);
		            ctx.lineTo(w+10, y);
		            c++;
		    }

		    ctx.stroke(); 
		};


		drawGrid(ctx, w, h, step);
	}

	draw_line(ctx)
	{
		// create canvas element and append it to document body
		var canvas = this.canvas;
		var Self = this;

		// last known position
		var pos = { x: 0, y: 0 };

		canvas.addEventListener('mousemove',  draw);
		canvas.addEventListener('mousedown',  setPosition);
		canvas.addEventListener('mouseenter', setPosition);

		// new position from mouse event
		function setPosition(e) {
		  pos.x = e.offsetX;
		  pos.y = e.offsetY;
		}

		var c = 0;
		function draw(e) {
		  // mouse left button must be pressed
		  if (e.buttons !== 1) return;

		  ctx.beginPath(); // begin

		  ctx.lineWidth   = 4;
		  ctx.lineCap     = 'round';
		  ctx.strokeStyle = '#c0392b';
		  

		  ctx.moveTo(pos.x, pos.y); // from
		  setPosition(e);
		  ctx.lineTo(pos.x, pos.y); // to


		  if (Self.mode.draw_line)
		  {
		  	
		  	ctx.stroke();
		  }
		  else
		  {
		  	ctx.strokeStyle = '#374FEF';
			if ( c > 5 )
			{
				if (c > 10){c = 0;}
			} else {

				ctx.stroke();  // draw it!
			}
			c++;
		  }

		}
	}



	create_chart()
	{

		const width  = 550;
		const height = 600;
		var ctx = this.ctx;
		var Self = this;

		const create_first_line = () => 
		{

			ctx.font = "15px serif";
			ctx.fillStyle = "black"; // Задаём чёрный цвет для линий 
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 1.5;

			ctx.strokeRect(0, 0, width+10, height + 10);

			ctx.beginPath();
			ctx.moveTo(40, 10);
			ctx.lineTo(40, height + 10);
			ctx.stroke(); 
			ctx.save();
			
			ctx.translate(-20, (width / 2) + (width / 100) * 20);
			ctx.rotate(-Math.PI/2);
			ctx.fillText("Концентрация внимания %", 0, 50);
			ctx.restore()

			ctx.beginPath();
			ctx.moveTo(40, height - 20 );
			ctx.lineTo(width + 10, height - 20);
			ctx.stroke();
			ctx.save(); 

			ctx.fillText("Время, мин", height -150, width + 48);
			ctx.restore()


		}

		const create_gorizontal_line = () => {

			ctx.beginPath();
			ctx.lineWidth = 1.5;
			ctx.arrow(95, height - 20, 95, 0, [0, 1, -10, 1, -10, 5]);
			ctx.fill();
			ctx.stroke();

		}		

		const create_vertical_line = () => {

			ctx.beginPath();
			ctx.lineWidth = 1.5;
			ctx.arrow(40, height-40, width-5, height-40, [0, 1, -10, 1, -10, 5]);
			ctx.stroke();
			ctx.fill();
			
		}

		create_first_line();
		this.draw_grid(ctx, width, height, 56);
		create_gorizontal_line();
		create_vertical_line();
		this.draw_line(ctx);

		this.button_clear.addEventListener('click',  function(){


			ctx.clearRect(0, 0, canvas.width, canvas.height);
			create_first_line();
			Self.draw_grid(ctx, width, height, 56);
			create_gorizontal_line();
			create_vertical_line();


		});

		this.studen1.addEventListener('click', function(){

			Self.mode.draw_line = 1;

		})		

		this.studen2.addEventListener('click', function(){

			Self.mode.draw_line = 0;

		})


		// ctx.fillStyle = "black"; // Задаём чёрный цвет для линий 
		// ctx.lineWidth = 2.0; // Ширина линии
		// ctx.beginPath(); // Запускает путь
		// ctx.moveTo(30, 10); // Указываем начальный путь
		// ctx.lineTo(30, 460); // Перемешаем указатель
		// ctx.lineTo(500, 460); // Ещё раз перемешаем указатель
		// ctx.stroke(); // Делаем контур

		// // Цвет для рисования
		// ctx.fillStyle = "black";
		// // Цикл для отображения значений по Y 
		// for(let i = 0; i < 6; i++) { 
		//     ctx.fillText((5 - i) * 20 + "", 4, i * 80 + 60); 
		//     ctx.beginPath(); 
		//     ctx.moveTo(25, i * 80 + 60); 
		//     ctx.lineTo(30, i * 80 + 60); 
		//     ctx.stroke(); 
		// }
		 
		// // Массив с меткам месяцев
		// let labels = ["JAN", "FEB", "MAR", "APR", "MAY"]; 
		 
		// // Выводим меток
		// for(var i=0; i<5; i++) { 
		//     ctx.fillText(labels[i], 50+ i*100, 475); 
		// }

	}

	main()
	{
		print("init focus02.js");
		this.create_chart();
		this.create_image_report("observer_", "Деятельность ученика");

	}

}


function init_focus02()
{
	return new Focus02();
}


export { init_focus02 } ;