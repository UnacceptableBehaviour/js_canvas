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
    // isolate drawing behaviour by saving & restoring context
    context.save()
    
    context.translate(this.pos.x, this.pos.y);  // move the origin / move canvas under plotter pen - see if it helps to think of it like this!?
    
    context.beginPath();
    // was this befor translate intorduced
    // context.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI*2); // arc(x,y,r,sAngle,eAngle,counterclockwise);
    context.arc(0,0, this.rad, 0, Math.PI*2);    
    context.fillStyle = 'black';
    context.fill();
    //context.moveTo(this.pos.x, this.pos.y);
    context.moveTo(0,0);
    context.lineTo(0, this.rad+15);
    context.lineTo(30, this.rad+15);
    context.stroke();
    
    context.restore()
  }
  dbg(){
    console.log(this);    
  }
}

    //context.beginPath();
    //// show origin
    //context.fillStyle = 'red';
    //context.arc(0, 0, 5, 0, 2*Math.PI);
    //context.fill();
    
canvasSketch(sketch, settings);
