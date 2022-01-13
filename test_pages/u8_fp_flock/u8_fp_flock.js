const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

// helpers
const cl = (str) => {
  console.log(str);
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

const scene = new Vector(1200, 1200, 1200);

const settings = {
  dimensions: [ scene.x, scene.y ],
  animate: true
};

// PARAMETERS

let noOfBoids = 100;                  // #TWEAKABLE
let flockDensity = 0.3;   // 1 = No space between birds, 0 = no birds

let boidMaxRad = 40;                  // #TWEAKABLE
let boidMinRad = 2;                   // #TWEAKABLE

let nearestNeighbourEffect = 7;       // #TWEAKABLE
let nNEffect = true;
let visualRangeEffect = 50;
let vREffect = false;

let velocityMin = 0;
let velocityMax = 10;

let borderStroke = true;              // #TWEAKABLE


const sketch = ({ context, width, height }) => {

  let flock = [];
  
  for (i=0; i<noOfBoids; i++ ) {
    let pos = new Vector( random.rangeFloor(1,scene.x), random.rangeFloor(1,scene.y), random.rangeFloor(1,scene.z));
    let vel = new Vector( random.rangeFloor(velocityMin,velocityMax), random.rangeFloor(velocityMin,velocityMax), random.rangeFloor(velocityMin,velocityMax));    
    flock.push(new Boid(pos, vel, scene, i));
  }
  
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);
    
    flock.sort(compareZ);
    
    flock.forEach( boid => {
       boid.draw(context);
       boid.bounce();
       boid.update();
    });
    
  };
};




// Boid compare helper - TODO how to add to Boid so array.sort uses automatically? Is poss?
function compareZ(boidA, boidB) {
  if ( boidA.pos.z < boidB.pos.z ){
    return -1;
  }
  if ( boidA.pos.z > boidB.pos.z ){
    return 1;
  }
  return 0;
}

class Boid {
  constructor(pos, vel, scene, id){
    this.pos = pos; //new Vector(x,y,z);
    this.vel = vel;   //new Vector(x,y,z);
    this.scene = scene;    
    this.rad = this.radiusFromPos();
    this.id = id;
  }
  
  radiusFromPos(){
    return math.mapRange(this.pos.z, 0, this.scene.x, boidMinRad, boidMaxRad, true);
  }
  
  draw(context){    
    context.save();                             // isolate drawing behaviour by saving & restoring context
    
    context.translate(this.pos.x, this.pos.y);  // move the origin / move canvas under plotter pen - see if it helps to think of it like this!?    
    context.lineWidth = 4;    
    context.beginPath();
    context.arc(0,0, this.rad, 0, Math.PI*2);        
    context.strokeStyle = 'black';
    if (borderStroke) context.stroke();
    context.fillStyle = 'red';
    context.fill();
    
    context.restore();
  }
  
  bounce() {
		if (this.pos.x <= 0 || this.pos.x >= this.scene.x)  this.vel.x *= -1;
		if (this.pos.y <= 0 || this.pos.y >= this.scene.y) this.vel.y *= -1;
    if (this.pos.z <= 0 || this.pos.z >= this.scene.z) this.vel.z *= -1;
	}

//  traverse(width, height) {
//    if (this.pos.x <= 0)  this.pos.x = this.scene.x-1;
//    if (this.pos.x >= this.scene.x) this.pos.x = 1;
//    
//		if (this.pos.y <= 0) this.pos.y = this.scene.y-1;
//		if (this.pos.y >= this.scene.y) this.pos.y = 1;
//
//		if (this.pos.z <= 0) this.pos.z = this.scene.z-1;
//		if (this.pos.z >= this.scene.z) this.pos.z = 1;
//	}
  
  
	update() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
    this.pos.z += this.vel.z;
    this.rad = this.radiusFromPos();
	}

  dbg(){
    console.log(this);    
  }

}


canvasSketch(sketch, settings);

