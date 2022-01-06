// JS in here :)

// HTML Canvas ref: W3 - https://www.w3schools.com/tags/ref_canvas.asp

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

// solid shape
context.fillStyle = 'blue';         // property
//context.fillRect(100,100,400,400);


// drawing path - 
context.lineWdth = 4;
context.beginPath();            // start contructing path
context.rect(100,100,400,400);
context.stroke();               // start drawing
  
// circular arc - https://www.w3schools.com/tags/canvas_arc.asp
// arc(x,y, radius, start angle, end angle)
// angles in radians,  360deg = 2*Math.PI
context.beginPath();            // start contructing path
context.arc(300,300,100, 0, 2*Math.PI);
context.stroke();  
