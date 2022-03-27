const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const algos = require('../u9_fp_random_target/lib/algos_sftest');

const settings = {
  dimensions: [ 1048, 1048 ],
  //animate: true
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

const mathSin = (rad) => {
  return Math.sin(rad);
};


const sketch = ({ context, width, height }) => {
  
  const mathTiles = [];
  const agents = Array.from({length: 9}, (e) => new MathsTile(0, 0, height/4, e) );

  mathTiles.push( new MathsTile(50, 50, height/4, mathSin) );
  
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);
    

    mathTiles[0].draw(context);
    
    cl(agents);
    
    
    




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
  constructor(x, y, size, equationCallback){
    this.x = x;
    this.y = y;
    this.w = size;
    this.h = size;
    this.equC = equationCallback;
    //this.rad = equationCallback(1);   // use -1 to 1 or rads?
    this.rad = size / 10;
  }
  
  draw(context){
    // isolate drawing behaviour by saving & restoring context
    context.save();
    //
    context.translate(this.x, this.y);  // move the origin / move canvas under plotter pen - see if it helps to think of it like this!?    
    context.lineWidth = 2;    
    context.beginPath();
    
    // border - guideline for now
    context.rect(this.x,this.y, this.w,this.h);
    context.strokeStyle = 'black';
    context.stroke();

    context.beginPath();
    context.arc(this.x + this.w/2, this.y + this.h/2, this.rad, 0, Math.PI*2);    
    //context.strokeStyle = 'black';
    //context.stroke();
    context.fillStyle = 'red';
    context.fill();

    //context.beginPath();
    //// show origin
    //context.fillStyle = 'blue';
    //context.arc(0, 0, 10, 0, 2*Math.PI);
    //context.fill();
    //
    //// show rect place
    //context.beginPath();
    //context.fillStyle = 'green';
    //context.arc(rx, ry, 10, 0, 2*Math.PI);
    //context.fill();
    //
    //// show translate place
    //context.beginPath();
    //context.fillStyle = 'orange';
    //context.arc(rx + w/2, ry + h/2, 15, 0, 2*Math.PI);
    ////context.arc(0, 0, 10, 0, 2*Math.PI);
    //context.fill();    
    //
    //context.translate(rx + w/2, ry + h/2);  // centre of rect
    //context.beginPath();
    //// show origin
    //context.fillStyle = 'red';
    //context.arc(0, 0, 5, 0, 2*Math.PI);
    //context.fill();    
    
    //context.translate(this.x, this.y, this.w/2, this.h/2);
    //// was this before translate intorduced
    //// context.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI*2); // arc(x,y,r,sAngle,eAngle,counterclockwise);    
    //context.arc(0,0, this.rad, 0, Math.PI*2);    
    //context.strokeStyle = 'black';
    //context.stroke();
    //context.fillStyle = this.typeColor;
    //context.fill();
    //
    context.restore();
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
