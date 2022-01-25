const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};


// helpers
const cl = (str) => {
  console.log(str);
}

// enum Walls
class Walls
{
	static ME = 0;  // this cell
	static L  = 1;	// left
	static TL =	2;	// top left
	static TR =	3;	// top right
	static R  =	4;	// right
	static BR	=	5;  // bottom right
	static BL	=	6;  // bottom left
};

const params = {
	cols: 10,
	rows: 10,
	scaleMin: 1,
	scaleMax: 30,
	freq: 0.001,
	amp: 0.2,
	frame: 0,
	//animate: true,

};

const sketch = () => {
  
  cl(`ME ${Walls.ME}`);
  
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
