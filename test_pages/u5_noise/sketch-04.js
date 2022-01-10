const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');


// helpers
const cl = (str) => {
  console.log(str);
}

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

// TODO retro fit params to U3 & U4 - plus the console
// loads of teakable parameter in both of those: colour schemes, ball size receiver radius
const params = {
	cols: 10,
	rows: 10,
	scaleMin: 1,
	scaleMax: 30,
	freq: 0.001,
	amp: 0.2,
	frame: 0,
	animate: true,
	lineCap: 'butt',
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    const cols = params.cols;
		const rows = params.rows;
		const numCells = cols * rows;

		const gridw = width  * 0.8;
		const gridh = height * 0.8;
		const cellw = gridw / cols;
		const cellh = gridh / rows;
		const margx = (width  - gridw) * 0.5;
		const margy = (height - gridh) * 0.5;
    
    
    for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);

			const x = col * cellw;
			const y = row * cellh;
			const w = cellw * 0.8;
			const h = cellh * 0.8;
      
      // https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/random.md#noise2D
      // x,y co-ordinate of noise
      // how large is the 2d array? didn't complain at 1000x1000
			const n = random.noise2D(x + frame * 10, y, 0.001); //(x + frame * 10, y, params.freq); // returns between -1 & 1
			// const n = random.noise3D(x, y, f * 10, params.freq);      
			const angle = n * Math.PI * 0.2; // * params.amp;   // 2*PI rad in circle -1 thu 1 give whole 360
            
      context.save();                     // < - - - - - - - - - - - - context save
			context.translate(x,y);             // for each tile
      context.translate(margx,margy);     // include the margin around the tiles
      context.translate(cellw * 0.5, cellh * 0.5);  // translate to centre odf cell
      context.rotate(angle);
      
      context.beginPath();
      context.lineWidth = 8;
			context.moveTo(w * -0.5, 0);
			context.lineTo(w *  0.5, 0);
			context.stroke();
      
      context.beginPath();
      
      context.restore();                  // < - - - - - - - - - - - - context restore
    }
    
    
    
  };
};

canvasSketch(sketch, settings);

      //const g = random.noise2D(x, y)
      //const greyScale = Math.floor( math.mapRange(g, -1,1,0,0xFFFFFF) ); 
      //cl(`noise: ${g} - gs:${greyScale}`);
      
//      // add shaded square in background
//			context.save();
//      context.translate(x,y);             // for each tile
//      context.translate(margx,margy);     // include the margin around the tiles
//      context.translate(cellw * 0.5, cellh * 0.5);  // translate to centre odf cell
//      // hollow box - works
//			context.strokeStyle = greyScale;
//      context.strokeRect(w * -0.5,w * -0.5,w,w);
//      //
//      // filledRect - No work :<
//      context.beginPath();
//			context.fillStyle = greyScale; // take a grey scal from 2D noise
//			context.fillRect(w * -0.5,w * -0.5,w,w);
//			context.fill();
//			context.restore();
