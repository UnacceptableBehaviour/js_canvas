const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const Tweakpane = require('tweakpane');

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

// PARAMETERS - #TWEAKABLE
const params = {
  noOfBoids: 100,                    
  boidMaxRad: 40,
  boidMinRad: 2,
  velocityMin: 0,
  velocityMax: 10,
  borderStroke: true,
  
  flockDensity: 0.3,   // 1: No space between birds, 0 = no birds  
  nearestNeighbourEffect: 7,
  nNEffect: true,
  visualRangeEffect: 50,
  vREffect: false,
}



const sketch = ({ context, width, height }) => {

  let flock = [];
  
  adjustFlockSize(flock, params.noOfBoids);
  //for (i=0; i<params.noOfBoids; i++ ) {
  //  let pos = new Vector( random.rangeFloor(1,scene.x), random.rangeFloor(1,scene.y), random.rangeFloor(1,scene.z));
  //  let vel = new Vector( random.rangeFloor(params.velocityMin,params.velocityMax), random.rangeFloor(params.velocityMin,params.velocityMax), random.rangeFloor(params.velocityMin,params.velocityMax));    
  //  flock.push(new Boid(pos, vel, scene, i));
  //}
  
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);

    adjustFlockSize(flock, params.noOfBoids);
    
    flock.sort(compareZ);
    
    flock.forEach( boid => {
       boid.draw(context);
       boid.bounce();
       boid.update();
    });
    
  };
};

// class Flock - TODO - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let birdsCreated = 0;

function adjustFlockSize(flock, numberOfBoids) {
  if (flock.length === numberOfBoids) return;
  while (flock.length < numberOfBoids) {
    addBoidToFlock(flock);
  }
  while (flock.length > numberOfBoids) {
    removeBoidFromFlock(flock);
  }  
}

function addBoidToFlock(flock) {
  let pos = new Vector( random.rangeFloor(1,scene.x), random.rangeFloor(1,scene.y), random.rangeFloor(1,scene.z));
  let vel = new Vector( random.rangeFloor(params.velocityMin,params.velocityMax), random.rangeFloor(params.velocityMin,params.velocityMax), random.rangeFloor(params.velocityMin,params.velocityMax));    
  birdsCreated += 1;
  flock.push(new Boid(pos, vel, scene, birdsCreated));
}

function removeBoidFromFlock(flock) {
  flock.pop();
  return flock.length;
}
// class Flock - TODO - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


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
    return math.mapRange(this.pos.z, 0, this.scene.x, params.boidMinRad, params.boidMaxRad, true);
  }
  
  draw(context){    
    context.save();                             // isolate drawing behaviour by saving & restoring context
    
    context.translate(this.pos.x, this.pos.y);  // move the origin / move canvas under plotter pen - see if it helps to think of it like this!?    
    context.lineWidth = 4;    
    context.beginPath();
    context.arc(0,0, this.rad, 0, Math.PI*2);        
    context.strokeStyle = 'black';
    if (params.borderStroke) context.stroke();
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

const createpane = () => {
  const pane = new Tweakpane.Pane();  
  let folder;
  
  folder = pane.addFolder({ title: 'Boids '});
  folder.addInput(params, 'noOfBoids', { min: 10, max: 500, step: 10 });
  folder.addInput(params, 'boidMinRad', { min: 1, max: 100, step: 1 });
  folder.addInput(params, 'boidMaxRad', { min: 1, max: 100, step: 1 }); 
  folder.addInput(params, 'velocityMin', { min: 1, max: 100, step: 1 });
  folder.addInput(params, 'velocityMax', { min: 1, max: 100, step: 1 });
  folder.addInput(params, 'borderStroke');

  
  folder = pane.addFolder({ title: 'Flock '});
  //flockDensity: 0.3,   // 1: No space between birds, 0 = no birds
  folder.addInput(params, 'flockDensity', { min: 0, max: 1, step: 0.05 });
  folder.addInput(params, 'nearestNeighbourEffect', { min: 1, max: 20, step: 1 });
  folder.addInput(params, 'nNEffect');
  folder.addInput(params, 'visualRangeEffect', { min: 1, max: 500, step: 5 });
  folder.addInput(params, 'vREffect');
}
	//
	//folder = pane.addFolder({ title: 'Grid '});
	//folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' }});
	//folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
	//folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
	//folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
	//folder.addInput(params, 'scaleMax', { min: 1, max: 100 });
	////
	//folder = pane.addFolder({ title: 'Noise' });
	//folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
	//folder.addInput(params, 'amp', { min: 0, max: 1 });
	//folder.addInput(params, 'animate');
	//folder.addInput(params, 'frame', { min: 0, max: 999 });

 createpane();

canvasSketch(sketch, settings);

