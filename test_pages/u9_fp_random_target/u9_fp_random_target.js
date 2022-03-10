const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const algos = require('algos_sftest');

const settings = {
  dimensions: [ 1048, 1048 ],
  animate: true
};

// helpers
const cl = (str) => {
  console.log(str);
};

class AgentType {
  static COMMON_NODE = 'black';
  static FROM_NODE = 'blue';
  static TO_NODE = 'red';
}


const params = {
  numAgents: 40,
  maxAgents: 200,
  fromAgent: 0,
  toAgent: 1,
  connectionLimit: 350,
  useConnectionLimitForWidth: false,
};

const createpane = () => {
  const pane = new Tweakpane.Pane();  
  let folder;
  
  folder = pane.addFolder({ title: 'Graph Params'});

  folder.addInput(params, 'numAgents', { min: 2, max: params.maxAgents, step: 2 }); 
  folder.addInput(params, 'connectionLimit', { min: 2, max: 350, step: 2 });  
  folder.addInput(params, 'useConnectionLimitForWidth');
};


const sketch = ({ context, width, height }) => {
  
  const agents = Array.from({length: params.maxAgents}, (e) => new Agent(random.rangeFloor(0, width), random.rangeFloor(0, height)) );

  agents[params.fromAgent].typeColor = AgentType.FROM_NODE;
  agents[params.fromAgent].rad = 15;
  agents[params.toAgent].typeColor = AgentType.TO_NODE;
  agents[params.toAgent].rad = 10;
  
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);
    
    const cLim = params.connectionLimit;
    
    for (let i = 0; i < params.numAgents; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < params.numAgents; j++) {
        const other = agents[j];
        const dist = agent.pos.getDistance(other.pos);
        
        if (dist > cLim) continue;
                
        if (params.useConnectionLimitForWidth) {
          // maps one range to another based on the value of a variable
          context.lineWidth = math.mapRange(dist, 0, cLim, cLim/10, 1);
        } else {
          context.lineWidth = 2;  
        }

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }
    
    for (let i = 0; i < params.numAgents; i++) {
      const agent = agents[i];
      agent.update();
      agent.draw(context);
      //agent.bounce(width, height);
      agent.traverse(width, height);        
    }
    
  };
};


class Vector {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  dbg(){
    console.log(this);    
  }
}


class Agent {
  constructor(x, y, radius){
    this.pos = new Vector(x,y);
    this.vel = new Vector(random.range(-4, 4), random.range(-4, 4)); 
    //this.rad = random.rangeFloor(5, 21);
    this.rad = 5;
    this.typeColor = AgentType.COMMON_NODE;
  }
  
  draw(context){
    // isolate drawing behaviour by saving & restoring context
    context.save();
    
    context.translate(this.pos.x, this.pos.y);  // move the origin / move canvas under plotter pen - see if it helps to think of it like this!?    
    context.lineWidth = 4;    
    context.beginPath();
    // was this before translate intorduced
    // context.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI*2); // arc(x,y,r,sAngle,eAngle,counterclockwise);    
    context.arc(0,0, this.rad, 0, Math.PI*2);    
    context.strokstyle = 'black';
    context.stroke();
    context.fillStyle = this.typeColor;
    context.fill();

    context.restore();
  }
  
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width)  this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  traverse(width, height) {
    if (this.pos.x <= 0)  this.pos.x = width-1;
    if (this.pos.x >= width) this.pos.x = 1;
    
    if (this.pos.y <= 0) this.pos.y = height-1;
    if (this.pos.y >= height) this.pos.y = 1;
  }
  
  
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  
  dbg(){
    console.log(this);    
  }

}

createpane();    
canvasSketch(sketch, settings);

cl('IMPORTED MODULE: algos_sftest');
algos.algoInfo();
