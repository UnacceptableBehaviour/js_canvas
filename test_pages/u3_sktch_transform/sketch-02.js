const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ]
};

function deg2rad(deg) {
  return (deg /180 * Math.PI);
};

const randomRange = (min, max) => {
  // 0 to <1 EG 0.999999 
  return Math.random() * (max - min) + min;
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;    
    const w = width * 0.01;
    const h = height * 0.1;
    let x,y;
		const num = 12;
		const radius = width * 0.3;
        
    //context.translate(x,y); // Remaps the (0,0) position on the canvas
                            // https://www.w3schools.com/tags/canvas_translate.asp
    
    //context.rotate(0.3);// rotation in rad rotates around origin
                          // 2 * Math.PI rads in 360 degs
                          // 20 degs = 20 * Math.PI / 180
    
		for (let i = 0; i < num; i++) {
			const slice = deg2rad(360 / num);
			const angle = slice * i;

			x = cx + radius * Math.sin(angle);    // calc point on circle
			y = cy + radius * Math.cos(angle);

			context.save();
			context.translate(x, y);
			context.rotate(-angle);
      context.scale(randomRange(1,4), randomRange(0.5,1.5));  // scale(x,y)
      
			context.beginPath();			
      context.rect(-w * 0.5, -h * 0.5, w, h);
			context.fill();
      // or
      //context.strokeRect(-w * 0.5, -h * 0.5, w, h);  // rect border
      
			context.restore();

		}
  };
};

canvasSketch(sketch, settings);
