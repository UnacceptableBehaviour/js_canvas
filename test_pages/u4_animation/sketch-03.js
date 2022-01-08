const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1048, 1048 ]
};

// helpers
const cl = (str) => {
  console.log(str);
}

// canvas
// { context, width, height } - missing
const sketch = ({ context, width, height }) => {
  
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }
  
  // TODO look at canvasSketch(sketch, settings); code to see how this variable make it here!
  // js_canvas/test_pages/u4_animation/node_modules/canvas-sketch/lib/canvas-sketch.js
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);

    agents.forEach( agent => {
      agent.draw(context); 
    });
    
  };
};


class Vector {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  dbg(){
    console.log(this);    
  }
}


class Agent {
  constructor(x, y, radius){
    this.pos = new Vector(x,y);
    this.rad = random.rangeFloor(5, 21);
  }
  draw(context){
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI*2); // arc(x,y,r,sAngle,eAngle,counterclockwise);
    context.fillStyle = 'black';
    context.fill();        
  }
  dbg(){
    console.log(this);    
  }
}


canvasSketch(sketch, settings);
