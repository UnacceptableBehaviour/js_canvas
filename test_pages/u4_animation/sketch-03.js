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
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);
    
    const agentA = new Agent(800,400);
    agentA.dbg();
    const agentB = new Agent(200,200);
    agentB.dbg();
    
    agentA.draw(context);
    agentB.draw(context);
    
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
