const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = 'black';

    const x = width * 0.5;
    const y = height * 0.5;    
    const w = width * 0.3;
    const h = height * 0.3;
        
    //context.translate(x,y); // Remaps the (0,0) position on the canvas
                            // https://www.w3schools.com/tags/canvas_translate.asp
    
    //context.rotate(0.3);// rotation in rad rotates around origin
                          // 2 * Math.PI rads in 360 degs
                          // 20 degs = 20 * Math.PI / 180
    const rx = 300;
    const ry = 300;
    context.beginPath();
    context.rect(rx,ry, w,h);         // <<< - - - RECT
    //context.rect(x,y, w,h);
    context.fill();

    context.beginPath();
    // show origin
    context.fillStyle = 'blue';
    context.arc(0, 0, 10, 0, 2*Math.PI);
    context.fill();

    // show rect place
    context.beginPath();
    context.fillStyle = 'green';
    context.arc(rx, ry, 10, 0, 2*Math.PI);
    context.fill();
    
    // show translate place
    context.beginPath();
    context.fillStyle = 'orange';
    context.arc(rx + w/2, ry + h/2, 15, 0, 2*Math.PI);
    //context.arc(0, 0, 10, 0, 2*Math.PI);
    context.fill();    
    
    context.translate(rx + w/2, ry + h/2);  // centre of rect
    context.beginPath();
    // show origin
    context.fillStyle = 'red';
    context.arc(0, 0, 5, 0, 2*Math.PI);
    context.fill();
    
    context.fillStyle = 'black';
    for (let i=0; i<9; i++) {
      context.beginPath();      
      // place north
      // arc(x,y, radius, start angle, end angle)
      context.arc(0, -400, 50, 0, 2*Math.PI);
      context.fill();
      context.rotate(45 * Math.PI / 180)
    }
    
    
    
    
  };
};

canvasSketch(sketch, settings);
