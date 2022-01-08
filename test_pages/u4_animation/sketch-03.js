const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1048, 1048 ]
};

const cl = (str) => {
  console.log(str);
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);
    
    const pt = new Vector(800,400,10);
    pt.dbg();
    cl(`new Vector Access: ${pt.x}`);
    
    context.beginPath();
    context.arc(pt.x, pt.y, pt.rad, 0, Math.PI*2); // arc(x,y,r,sAngle,eAngle,counterclockwise);
    context.fillStyle = 'black';
    context.fill();
    
  };
};




class Vector {
  constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.rad = radius;
  }
  dbg(){
    console.log(this);    
  }
}




canvasSketch(sketch, settings);
