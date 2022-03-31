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


const EQU_COLOR = 0;
const EQU_TITLE = 1;
const EQU_EQUATION = 2;
var equA = [[ '#99650D', 'sin(x)',                        (rad) => { return Math.sin(rad); } ],
            [ '#E89E00', 'cos(x)',                        (rad) => { return Math.cos(rad); } ],
            [ '#F4EC00', 'tan(x)',                        (rad) => { return Math.tan(rad); } ],
            [ '#5E2100', 'sin(sin(x)^8)',                 (rad) => { return Math.sin(Math.pow(8, Math.sin(rad))); } ],
            [ '#600000', '(sqrt(x)/x + sqrt(x)/2) / 5',   (rad) => { return (Math.sqrt(rad)/rad + Math.sqrt(rad)/2) /5; } ],
            [ '#630E32', 'floor((sin(rad) * 5) +1) / 5))',(rad) => { return (Math.floor((Math.sin(rad) * 5) +1) /5); } ],
            [ '#840919', 'sin(rad) + cos(rad)/4',         (rad) => { return Math.sin(rad) + Math.cos(rad*4)/4; } ],
            [ '#AA842A', 'sin(x*10)',                     (rad) => { return Math.sin(rad*10); } ],
            [ '#C17700', 'sin(x)+cos(rad*10)/4',          (rad) => { return Math.sin(rad)+Math.cos(rad*10)/4; } ],
            [ '#F4C300', 'sec(x)',                        (rad) => { return (1 / Math.cos(rad)) /20; } ],
            [ '#93832F', 'cos(sin(x)^4)',                 (rad) => { return Math.cos(Math.pow(4, Math.sin(rad))); } ],
            [ '#3D2409', 'f(x)',                        (rad) => { return (Math.sqrt(rad)/rad + Math.sqrt(rad)/2) /3 + (Math.sin(rad*10)/4) } ],
            ];




const sketch = ({ context, width, height }) => {
  // TODO add paint metrics
  
  const mathTiles = [];

  const xTiles = 4; const yTiles = 3;
  const spacer = 10;
  const tW = ( width - ( spacer * (xTiles -1) ) ) / xTiles;
  const tH = ( height - ( spacer * (yTiles -1) ) ) / yTiles;
    //
    // enforce square ??? - TODO - - - - - - - - - - - - - - - - - - - - - - - - -\
                                                                                  //
  let cnt = 0;                                                                    //
  for (let rectX = 0; rectX < xTiles; rectX++) {                                  //      
    for (let rectY = 0; rectY < yTiles; rectY++) {                                //
      mathTiles.push( new MathsTile(rectX * (tW + spacer), rectY * (tH + spacer), tW, equA[cnt][EQU_EQUATION], equA[cnt][EQU_TITLE], equA[cnt][EQU_COLOR]) );
      cnt++;
      cl(`rX*(tW+spc):${rectX * (tW + spacer)}, rY*(tH+spc):${rectY * (tH + spacer)}, tW:${tW}, spc:${spacer}`);
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
  constructor(x, y, size, equationCallback, title, color ){
    this.x = x;
    this.y = y;
    this.w = size;
    this.h = size;
    this.radialColor = color;
    this.equC = equationCallback;       // use -1 to 1 or rads?
    this.title = title;
    this.fontSz = 20;
    //this.titleX = x + size / 2.5;
    //this.titleY = y + size * 1.1;
    this.rad = size / 10;
    this.amp = size / 3;                // waveform amplitude
    this.yequ0 = y + size / 2;          // y = 0
    this.waveL = size;
    this.step = 1;
    this.waveDotWidth = 2;
    this.offset = 0;
    this.ballScale = 1.3;
    
    this.markers = true;                // component switches
    this.border = true;
    this.titleOn = true;
    
    this.yValues = [];
    for (let step = 0; step < this.w; step++) {
      let rads = (step / this.w) * Math.PI*2;
      let y = this.amp * this.equC(rads);      
      this.yValues.push(y);
    }
    
    // data source canvas
    // TODO create local canvas to clip drawing
    this.tileCanvas = document.createElement('canvas');
    this.tileContext = this.tileCanvas.getContext('2d');
  }
  
  draw(context){
    // isolate drawing behaviour by saving & restoring context
    context.save();
    
    let fontSize = (this.h/10).toString();
    context.font = `${fontSize}px Arial`;    // was serif
    
    //context.translate(this.x, this.y);  
    context.lineWidth = 2;    

    // circle    
    context.beginPath();
    let ballRadius = Math.abs(this.yValues[this.offset]) * this.ballScale;
    context.arc(this.x + this.w/2, this.y + this.h/2, ballRadius, 0, Math.PI*2);    
    context.fillStyle = this.radialColor;
    context.fill();

    // TODO make line from last dot to dot
    // waveform dots
    let index = this.offset;
    for (let step = 0; step < this.w; step += 2) {
      // draw a dot per step
      context.beginPath();
      context.fillStyle = 'grey';
      context.arc(this.x + step, this.y + this.h/2 + this.yValues[index], this.waveDotWidth, 0, Math.PI*2);      
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
    if (this.titleOn) {      
      context.fillStyle = 'blue';
      context.fillText(this.title, this.titleX, this.titleY);
      //placeCentreText(ctx, text, xl, xr, y, color, fontSize, lnW = 2)
      // left parameter in so can pull it out as a function later
      this.placeCentreText(context, this.title, this.x, this.x + this.w, this.y + this.h, 'black', this.fontSz);
    }
    if (this.markers) {
      // show rect place
      context.beginPath();
      context.fillStyle = 'cyan';
      context.arc(this.x, this.y, 10, 0, 2*Math.PI);
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
      context.arc(0, 0, 5, 0, 2*Math.PI);
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
  
  placeCentreText(ctx, text, xl, xr, y, color, fontSize, lnW = 2) {
    
    //   |                                 |      < fontSize(epth)
    //   xl             texts              xr
    //                    |
    //                    ^ markMidddle
    ctx.save();
    
    // font def
    //let fontSz = (fontSize*2).toString();
    ctx.font = `${fontSize}px Arial`;
    ctx.textBaseline = 'middle'; // hanging
    ctx.textAlign = 'center';
  
    
    let markMiddle = xl + (xr - xl) / 2;
    let textMetrics = ctx.measureText(text);
    let textStart = markMiddle;
    
    // place left vert line
    ctx.beginPath();
    ctx.lineWidth = lnW;
    ctx.strokeStyle = color;
    ctx.moveTo(xl, y);
    ctx.lineTo(xl, y+fontSize);  // line depth - marker depth
    ctx.stroke(); 
  
    // place right vert line
    ctx.beginPath();
    ctx.lineWidth = lnW;
    ctx.strokeStyle = color;
    ctx.moveTo(xr, y);
    ctx.lineTo(xr, y+fontSize);  // line depth - marker depth
    ctx.stroke(); 
  
    // place text between if it fits below if not
    ctx.fillStyle = color;
    ctx.fillText(text, textStart, y+fontSize);
    ctx.restore();
  }  
}

//createpane();    
canvasSketch(sketch, settings);

cl('IMPORTED MODULE: algos_sftest');
algos.algoInfo();
