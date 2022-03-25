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


const params = {
  //numAgents: 20,
  //maxAgents: 200,
  //fromAgent: 0,
  //toAgent: 1,
  //connectionLimit: 350,
  //useConnectionLimitForWidth: false,
  //bounceOffWalls: true,
};

const createpane = () => {
  //const pane = new Tweakpane.Pane();  
  //let folder;
  //
  //folder = pane.addFolder({ title: 'Graph Params'});
  //
  //folder.addInput(params, 'numAgents', { min: 2, max: params.maxAgents, step: 2 }); 
  //folder.addInput(params, 'connectionLimit', { min: 2, max: 350, step: 2 });  
  //folder.addInput(params, 'useConnectionLimitForWidth');
  //folder.addInput(params, 'bounceOffWalls');
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
    

    
    
    




    //for (let i = 0; i < params.numAgents; i++) {
    //  const agent = agents[i];
    //  agent.draw(context);
    //  agent.update();
    //  if (agent.typeColor === AgentType.COMMON_NODE) {
    //    agent.bounce(width, height);
    //  } else {
    //    if (params.bounceOffWalls) {
    //      agent.bounce(width, height);
    //    } else {
    //      agent.traverse(width, height);
    //    }        
    //  }
    //}        
  };
};



class MathsTile {
  constructor(x, y, wh){
    //this.pos = new Vector(x,y);
    //this.vel = new Vector(random.rangeFloor(-4, 4), random.rangeFloor(-4, 4)); 
    ////this.rad = random.rangeFloor(5, 21);
    //this.rad = 5;
    //this.typeColor = AgentType.COMMON_NODE;
    //this.node = new algos.RouteNode(x, y, this);
  }
  
  draw(context){
    //// isolate drawing behaviour by saving & restoring context
    //context.save();
    //
    //context.translate(this.pos.x, this.pos.y);  // move the origin / move canvas under plotter pen - see if it helps to think of it like this!?    
    //context.lineWidth = 4;    
    //context.beginPath();
    //// was this before translate intorduced
    //// context.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI*2); // arc(x,y,r,sAngle,eAngle,counterclockwise);    
    //context.arc(0,0, this.rad, 0, Math.PI*2);    
    //context.strokeStyle = 'black';
    //context.stroke();
    //context.fillStyle = this.typeColor;
    //context.fill();
    //
    //context.restore();
  }
    
  
  update() {
    //this.pos.x += this.vel.x;
    //this.pos.y += this.vel.y;    
    //this.node.updatePos(this.pos.x, this.pos.y);
  }
  
  dbg(){
    console.log(this);    
  }

}

createpane();    
canvasSketch(sketch, settings);

cl('IMPORTED MODULE: algos_sftest');
algos.algoInfo();
