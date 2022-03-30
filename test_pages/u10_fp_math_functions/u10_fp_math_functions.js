const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const algos = require('../u9_fp_random_target/lib/algos_sftest');

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

const mathSin = (rad) => {
  return Math.sin(rad);
};

const f1 = (rad) => {
  return Math.cos(rad);
};

const f2 = (rad) => {
  return Math.tan(rad);
};

const f3 = (rad) => {
  return Math.sin(Math.pow(8, Math.sin(rad)));
};

const f4 = (rad) => {
  return Math.sqrt(rad);
};



const sketch = ({ context, width, height }) => {
  
  const mathTiles = [];
  //const agents = Array.from({length: 9}, (e) => new MathsTile(0, 0, height/4, e) );

  cl('check maths funcs - S')
  cl(mathSin(Math.PI));
  cl(f1(Math.PI));
  cl(f2(Math.PI));
  cl(f4(Math.PI));
  cl('check maths funcs - E')
  mathTiles.push( new MathsTile(50, 50, height/4, mathSin) );
  mathTiles.push( new MathsTile(250, 50, height/4, f1) );
  mathTiles.push( new MathsTile(50, 250, height/4, f3) );
  mathTiles.push( new MathsTile(250, 250, height/4, f4) );
  
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);
    

    mathTiles[0].draw(context);
    mathTiles[0].update();
    mathTiles[1].draw(context);
    mathTiles[1].update();
    mathTiles[2].draw(context);
    mathTiles[2].update();
    mathTiles[3].draw(context);
    mathTiles[3].update();    
    //cl(agents);

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
    this.amp = size / 3;                // waveform amplitude
    this.yequ0 = y + size / 2;          // y = 0
    this.waveL = size;
    this.step = 1;
    this.waveLineWidth = 2;
    this.offset = 0;
    this.ballScale = 1.3;
    
    this.yValues = [];
    for (let step = 0; step < this.w; step++) {
      let rads = (step / this.w) * Math.PI*2;
      let y = this.amp * this.equC(rads);      
      //   let y = this.amp * Math.sin(rads);
      //let y = this.amp * Math.tan(rads);
      //let y = this.amp * Math.cos(rads);
      //let y = this.amp * equationCallback(rads);
      this.yValues.push(y);
    }
  }
  
  draw(context){
    // isolate drawing behaviour by saving & restoring context
    context.save();
    context.beginPath();
    // show origin
    context.fillStyle = 'blue';
    context.arc(0, 0, 10, 0, 2*Math.PI);
    context.fill();    
    
    //
    context.translate(this.x, this.y);  // move the origin / move canvas under plotter pen - see if it helps to think of it like this!?    
    context.lineWidth = 2;    

    // show rect place
    context.beginPath();
    context.fillStyle = 'green';
    context.strokeStyle = 'green';
    context.arc(this.x, this.y, 10, 0, 2*Math.PI);
    context.stroke();
    context.fill();    
    
    // border - guideline for now
    context.beginPath();
    context.rect(this.x,this.y, this.w,this.h);
    context.strokeStyle = 'black';
    context.stroke();

    
    context.beginPath();
    let ballRadius = Math.abs(this.yValues[this.offset]) * this.ballScale;
    context.arc(this.x + this.w/2, this.y + this.h/2, ballRadius, 0, Math.PI*2);    
    context.fillStyle = 'pink';
    context.fill();

    // waveform dots    
    let index = this.offset;
    for (let step = 0; step < this.w; step += 2) {
      // draw a dot per step
      context.beginPath();
      context.fillStyle = 'grey';
      context.arc(this.x + step, this.y + this.h/2 + this.yValues[index], this.waveLineWidth, 0, Math.PI*2);      
      context.fill();
      index++; 
      if (index >= this.w) index = 0;
    }
      
    
    // show translate place
    context.beginPath();
    context.fillStyle = 'orange';
    context.arc(this.x + this.w/2, this.y + this.h/2, 10, 0, Math.PI*2);
    context.fill();
    
    context.restore();
  }
    
  
  update() {
    this.offset++;
    if (this.offset >= this.w) this.offset    = 0;
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
