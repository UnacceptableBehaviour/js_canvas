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
  
  magnitude(){
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
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

//const centreOfCage = 
// PARAMETERS - #TWEAKABLE
const params = {
  noOfBoids: 40,                    
  boidMaxRad: 40,
  boidMinRad: 2,
  velocityMin: 0,
  velocityMax: 3,
  borderStroke: true,
  
  flockDensity: 0.3,   // 1: No space between birds, 0 = no birds  
  rule1multiplier: 0.1,
  nearestNeighbourEffect: 7,
  nNEffect: true,
  visualRangeEffect: 50,
  vREffect: false,
  
  centreOfScene: new Vector(scene.x/2, scene.y/2, scene.z/2),
}



const sketch = ({ context, width, height }) => {

  let flock = [];
  const velZero = new Vector(0,0,0);
  
  let stationaryCentrePoint = new Boid(params.centreOfScene, velZero, scene, -1);     // (pos, vel, scene, id)
    
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
    
    stationaryCentrePoint.draw(context);
    
    flock.forEach( boid => {
       boid.draw(context);
       //boid.bounce();
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
  //const removedBoid = flock.pop();
  //if (removedBoid.id === -1) {
  //  flock.unshift(removedBoid);
  //}
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
    //this.ruleOneGravitateToPoint0(params.centreOfScene);
    this.ruleOneGravitateToPoint1(params.centreOfScene);
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
    this.pos.z += this.vel.z;
    this.rad = this.radiusFromPos();
	}
  
  ruleOneGravitateToPoint0(point){
    const accel = 0.1;
    
    if (point.x - this.pos.x > 0) {
      this.vel.x += accel;
      // clamp to velocityMin/Max
    } else {
      this.vel.x -= accel;
    }
    if (point.y - this.pos.y > 0) {
      this.vel.y += accel;
      // clamp to velocityMin/Max
    } else {
      this.vel.y -= accel;
    }
    if (point.z - this.pos.z > 0) {
      this.vel.z += accel;
      // clamp to velocityMin/Max
    } else {
      this.vel.z -= accel;
    }    
  }
  // point vel vector @ point - maintain magnitude
  ruleOneGravitateToPoint1(point){
    const velMag = this.vel.magnitude();
    const velSquared = velMag * velMag;
    
    // ratios of x^2,y^2,z^2 sum to vel^2 
    
    const dx = point.x - this.pos.x;
		const dy = point.y - this.pos.y;
    const dz = point.z - this.pos.z;
    const sx = Math.sign(dx);
		const sy = Math.sign(dy);
    const sz = Math.sign(dz);
    
    //const xRat = (dx * dx) / params.rule1multiplier * (dx * dx + dy * dy + dz * dz);
    //const yRat = (dy * dy) / params.rule1multiplier * (dx * dx + dy * dy + dz * dz);
    //const zRat = (dz * dz) / params.rule1multiplier * (dx * dx + dy * dy + dz * dz);
    const xRat = (dx * dx) / (dx * dx + dy * dy + dz * dz);
    const yRat = (dy * dy) / (dx * dx + dy * dy + dz * dz);
    const zRat = (dz * dz) / (dx * dx + dy * dy + dz * dz);
    //this.vel.x = Math.sqrt( velSquared * xRat) * sx;
    //this.vel.y = Math.sqrt( velSquared * yRat) * sy;
    //this.vel.z = Math.sqrt( velSquared * zRat) * sz;
    this.vel.x += params.rule1multiplier * Math.sqrt( velSquared * xRat) * sx;
    this.vel.y += params.rule1multiplier * Math.sqrt( velSquared * yRat) * sy;
    this.vel.z += params.rule1multiplier * Math.sqrt( velSquared * zRat) * sz;    
    //cl(`> - - - dx:${dx} - dy:${dy} - dz:${dz}`);
    //cl(`velMag:${velMag} - velSquared:${velSquared} - xRat:${xRat} - yRat:${yRat} - zRat:${zRat}`);
    //cl(this.vel);
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
  folder.addInput(params, 'rule1multiplier', { min: 0.01, max: 0.2, step: 0.01 });
  folder.addInput(params, 'flockDensity', { min: 0, max: 1, step: 0.05 });
  folder.addInput(params, 'nearestNeighbourEffect', { min: 1, max: 20, step: 1 });
  folder.addInput(params, 'nNEffect');
  folder.addInput(params, 'visualRangeEffect', { min: 1, max: 500, step: 5 });
  folder.addInput(params, 'vREffect');
}

createpane();
canvasSketch(sketch, settings);

