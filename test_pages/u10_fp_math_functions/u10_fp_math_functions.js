const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const algos = require('../u9_fp_random_target/lib/algos_sftest');

const settings = {
  dimensions: [ 1024, 1024 ],
  animate: true
};

// helpers
const cl = (str) => {
  console.log(str);
};


const f0 = (rad) => { return Math.sin(rad); };
const f1 = (rad) => { return Math.cos(rad); };
const f2 = (rad) => { return Math.tan(rad); };
const f3 = (rad) => { return Math.sin(Math.pow(8, Math.sin(rad))); };
const f4 = (rad) => { return (Math.sqrt(rad)/rad + Math.sqrt(rad)/2) /5; };
const f5 = (rad) => { return (Math.floor((Math.sin(rad) * 5) +1) /5); };
const f6 = (rad) => { return Math.sin(rad); };
const f7 = (rad) => { return Math.sin(rad); };
const f8 = (rad) => { return Math.sin(rad); };
const f9 = (rad) => { return Math.sin(rad); };
const f10 = (rad) => { return Math.sin(rad); };
const f11 = (rad) => { return Math.sin(rad); };

var equA = [f0, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11];

const sketch = ({ context, width, height }) => {
  
  const mathTiles = [];

  const xTiles = 4; const yTiles = 3;
  const spacer = 10;
  const tW = ( width - ( spacer * xTiles -1 ) ) / xTiles;
  const tH = ( height - ( spacer * yTiles -1 ) ) / yTiles;
    //
    // enforce square ??? - TODO - - - - - - - - - - - - - - - - - - - - - - - - -\
                                                                                  //
  let cnt = 0;                                                                    //
  for (let rectX = 0; rectX < xTiles; rectX++) {                                  //
    for (let rectY = 0; rectY < yTiles; rectY++) {                                //
      mathTiles.push( new MathsTile(rectX * (tW + spacer), rectY * (tH + spacer), tW, equA[cnt]) );
      cnt++;
      cl(`rX*(tW+spc):${rectX * (tW + spacer)}, rY*(tH+spc):${rectY * (tH + spacer)}, tW:${tW},`);
    }
  }
  
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);
    
    for (let t = 0; t < mathTiles.length; t++) {
      mathTiles[t].draw(context);
      mathTiles[t].update();
    }
  };
};



class MathsTile {
  constructor(x, y, size, equationCallback ){
    this.x = x;
    this.y = y;
    this.w = size;
    this.h = size;
    this.equC = equationCallback;       // use -1 to 1 or rads?
    this.rad = size / 10;
    this.amp = size / 3;                // waveform amplitude
    this.yequ0 = y + size / 2;          // y = 0
    this.waveL = size;
    this.step = 1;
    this.waveLineWidth = 2;
    this.offset = 0;
    this.ballScale = 1.3;
    this.markers = false;
    this.border = true;
    
    this.yValues = [];
    for (let step = 0; step < this.w; step++) {
      let rads = (step / this.w) * Math.PI*2;
      let y = this.amp * this.equC(rads);      
      this.yValues.push(y);
    }
  }
  
  draw(context){
    // isolate drawing behaviour by saving & restoring context
    context.save();
    context.translate(this.x, this.y);  // move the origin / move canvas under plotter pen - see if it helps to think of it like this!?    
    context.lineWidth = 2;    

    // circle    
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

    if (this.border) {
      // border - guideline for now
      context.beginPath();
      context.rect(this.x,this.y, this.w,this.h);
      context.strokeStyle = 'black';
      context.stroke();
    }  
    if (this.markers) {
      // show rect place
      context.beginPath();
      context.fillStyle = 'green';
      context.strokeStyle = 'green';
      context.arc(this.x, this.y, 10, 0, 2*Math.PI);
      context.stroke();
      context.fill();
      
      // show translate place
      context.beginPath();
      context.fillStyle = 'orange';
      context.arc(this.x + this.w/2, this.y + this.h/2, 10, 0, Math.PI*2);
      context.fill();

      // show origin
      context.translate(0, 0);     
      context.beginPath();
      context.fillStyle = 'blue';
      context.arc(0, 0, 10, 0, 2*Math.PI);
      context.fill();       
    }    
    context.restore();
  }
    
  
  update() {
    this.offset++;
    if (this.offset >= this.w) this.offset = 0;
  }
  
  dbg(){
    console.log(this);    
  }
  makersOnOff(tf){
    this.markers = tf && true;
  }
  borderOnOff(tf){
    this.border = tf && true;
  }  
}

//createpane();    
canvasSketch(sketch, settings);

cl('IMPORTED MODULE: algos_sftest');
algos.algoInfo();
