const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');

// helpers
const cl = (str) => {
  console.log(str);
}

const settings = {
  dimensions: [ 1200, 1200 ]
};

// PARAMETERS

let noOfBoids = 40;                   // #TWEAKABLE
let flockDensity = 0.3;   // 1 = No space between birds, 0 = no birds

let nearestNeighbourEffect = 7;       // #TWEAKABLE
let nNEffect = true;
let visualRangeEffect = 50;
let vREffect = false;

let borderStroke = true;              // #TWEAKABLE


const sketch = ({ context, width, height }) => {
  // contruct the bird cage? construct the flock!
  
  let initialSpacing = width/noOfBoids;
  let scene = new Vector(width, height, width); // use with for depth to create cube
  
  let flock = [];
  
  for (i=0; i<noOfBoids; i++ ) {
    let pos = new Vector( i*initialSpacing, height/2, width - i*initialSpacing);
    flock.push(new Boid(pos, scene));
  }
  
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);
    
    flock.sort(compareZ);
    
    flock.forEach( boid => {
       boid.draw(context);           
    });
    
  };
};

canvasSketch(sketch, settings);

// get z order paint farthest 1st
function compareZ(boidA, boidB) {
  if ( boidA.pos.z < boidB.pos.z ){
    return -1;
  }
  if ( boidA.pos.z > boidB.pos.z ){
    return 1;
  }
  return 0;
}

class Vector {
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  getDistance(v) {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
    const dz = this.z - v.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}
  
  dbg(){
    console.log(this);    
  }
}

let boidMaxRad = 40;   // #TWEAKABLE
let boidMinRad = 2;    // #TWEAKABLE

class Boid {
  constructor(pos, scene){
    this.pos = pos; //new Vector(x,y,z);
    this.vel = 0;   //new Vector(x,y,z);
    this.rad = this.radiusFromPos(scene);
  }
  
  radiusFromPos(scene){
    return math.mapRange(this.pos.z, 0, scene.x, boidMinRad, boidMaxRad, true);
  }
  
  draw(context){    
    context.save();                             // isolate drawing behaviour by saving & restoring context
    
    context.translate(this.pos.x, this.pos.y);  // move the origin / move canvas under plotter pen - see if it helps to think of it like this!?    
    //context.lineWidth = 4;    
    context.beginPath();
    context.arc(0,0, this.rad, 0, Math.PI*2);        
    context.strokeStyle = 'black';
    if (borderStroke) context.stroke();
    context.fillStyle = 'red';
    context.fill();
    
    context.restore();
  }
  
//  bounce(width, height) {
//		if (this.pos.x <= 0 || this.pos.x >= width)  this.vel.x *= -1;
//		if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
//	}
//
//  traverse(width, height) {
//    if (this.pos.x <= 0)  this.pos.x = width-1;
//    if (this.pos.x >= width) this.pos.x = 1;
//    
//		if (this.pos.y <= 0) this.pos.y = height-1;
//		if (this.pos.y >= height) this.pos.y = 1;
//	}
//  
//  
//	update() {
//		this.pos.x += this.vel.x;
//		this.pos.y += this.vel.y;
//	}
  
  dbg(){
    console.log(this);    
  }

}
