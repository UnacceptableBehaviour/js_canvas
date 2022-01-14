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
  
  plus(v){    
    return new Vector(this.x + v.x, this.y + v.y, this.z + v.z); 
  }
  
  div(d) {
    return new Vector(this.x/d, this.y/d, this.z/d); 
  }

  // average list of vectors  
  static average (lVec) {
    let sum = new Vector(0,0,0);
    lVec.forEach( v => {
       sum = sum.plus(v);
    });    
    return sum.div(lVec.length);
  }
  
  dbg(){
    console.log(this);    
  }
}

let cubeSize = 2400;
const scene = new Vector(cubeSize, cubeSize, cubeSize);

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
  velocityMin: -3,
  velocityMax: 3,
  borderStroke: true,
  
  flockDensity: 0.3,   // 1: No space between birds, 0 = no birds  
  rule1multiplier: 0.05,  
  nearestNeighbourEffect: 7,
  nNEffect: true,
  visualRangeEffect: 50,
  vREffect: false,
  
  centreOfScene: new Vector(scene.x/2, scene.y/2, scene.z/2),
  
  fontSize: cubeSize / 30,
}



const sketch = ({ context, width, height }) => {

  let flock = [];
  const velZero = new Vector(0,0,0);
  
  let stationaryCentrePoint = new Boid(params.centreOfScene, velZero, scene, -1);     // (pos, vel, scene, id)
      
  placeFlockOnGround(flock);  
  //adjustFlockSize(flock, params.noOfBoids);   // create flock to start
  
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);
    context.font = `${params.fontSize}px serif`;
    context.textBaseline = 'middle'; // hanging
    context.textAlign = 'left';    
    context.fillStyle = 'black';    
  
    adjustFlockSize(flock, params.noOfBoids);
    
    flock.sort(compareZ);
    
    //stationaryCentrePoint.draw(context);
    
    params.centreOfScene = Boid.averageLoc(flock);
    let avVel = Boid.averageVel(flock);
    
    getNearestXBoidsForFlock(flock); 
    
    flock.forEach( boid => {
       boid.draw(context);
       boid.bounce();
       boid.update();
    });
    
    let [xPos, yPos] = [cubeSize * 0.66, cubeSize - (220 * 0.8)];
    context.fillText(`CoF: ${Math.floor(params.centreOfScene.x)} - ${Math.floor(params.centreOfScene.y)} - ${Math.floor(params.centreOfScene.z)}`,  xPos, yPos);
    context.fillText(`AvV: ${Math.floor(avVel.x)} - ${Math.floor(avVel.y)} - ${Math.floor(avVel.z)}`,  xPos, yPos + 35 * cubeSize/1200);
    //context.fillText(`AvV: ${avVel.x} - ${avVel.y} - ${avVel.z}`,  10, yPos + 35 * cubeSize/1200);
    context.fillText(`Cub: ${Math.floor(cubeSize)} - ${Math.floor(cubeSize)} - ${Math.floor(cubeSize)}`,  xPos, yPos + 70 * cubeSize/1200);    
    
    
  };
};

// class Flock - TODO - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let birdsCreated = 0;

function compNum(a, b) {
  if ( a < b ){
    return -1;
  }
  if ( a > b ){
    return 1;
  }
  return 0;
}

function compBoidDistPair(a, b) {
  if ( a.dist < b.dist ){
    return -1;
  }
  if ( a.dist > b.dist ){
    return 1;
  }
  return 0;
}

function placeFlockOnGround(flock) {
  // place 'square' of birds on ground
  const side = Math.ceil(Math.sqrt(params.noOfBoids));
  const numberOfBoids = params.noOfBoids;
  let id = 0;
  
  //cubeSize
  const step = params.boidMaxRad;
  const [gndX, gndZ] = [cubeSize/2 - (step * side/2), cubeSize/2 - (step * side/2)];

  for (let x=0; x<side; x++) {        
    for (let z=0; z<side; z++) {
      let placeX = gndX + step * x;
      let placeZ = gndZ + step * z;
      //let pos = new Vector(placeX,0,placeZ); //(placeX,placeZ,cubeSize);
      let pos = new Vector(placeX,placeZ,cubeSize);
      let vel = new Vector(0,0,0);
      id++;
      stationaryBoid = new Boid(pos, vel, scene, id); // (pos, vel, scene, id)
      flock.push(stationaryBoid);
      cl(`pfog: ${id}`);
      if (id === numberOfBoids) break;
    }
    if (id === numberOfBoids) break;
  }
  
}

function getNearestXBoidsForFlock(flock) {
  flock.forEach( b => {
    b.updateNearest(flock);
  });
}

function adjustFlockSize(flock, numberOfBoids) {
  if (flock.length === numberOfBoids) return;
  while (flock.length < numberOfBoids) {
    addRandomBoidToFlock(flock);
  }
  while (flock.length > numberOfBoids) {
    removeBoidFromFlock(flock);
  }  
}

function addRandomBoidToFlock(flock) {
  let pos = new Vector( random.rangeFloor(1,scene.x), random.rangeFloor(1,scene.y), random.rangeFloor(1,scene.z));
  let vel = new Vector( random.rangeFloor(params.velocityMin,params.velocityMax), random.rangeFloor(params.velocityMin,params.velocityMax), random.rangeFloor(params.velocityMin,params.velocityMax));      
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class Boid {
  
  constructor(pos, vel, scene, id){
    this.pos = pos; //new Vector(x,y,z);
    this.vel = vel;   //new Vector(x,y,z);
    this.scene = scene;    
    this.rad = this.radiusFromPos();
    this.id = id;
    this.nearest = [];
    birdsCreated += 1;    // make class var?    
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
  
	update() {
    //this.ruleOneGravitateToPoint0(params.centreOfScene);
    this.ruleOneGravitateToPoint1(params.centreOfScene);
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
    this.pos.z += this.vel.z;
    this.rad = this.radiusFromPos();
	}

  //let testData = [12,4,77,54,88,32,62,27,1,25,66,98,8,45,35,62];
  //let lowest7 = [];
  //let max = 0;
  //testData.forEach(no => {
  //  if (lowest7.length < params.nearestNeighbourEffect) { // fill array first
  //    if (no > max) max = no;
  //    lowest7.push(no);
  //    lowest7 = lowest7.sort(compNum);
  //  } else if (no < max) {  // check for max b4 insert & sort
  //    lowest7.push(no);
  //    lowest7 = lowest7.sort(compNum);
  //  }
  //  if (lowest7.length > params.nearestNeighbourEffect) lowest7.pop();
  //});
  //
  //cl(lowest7);  
  
  updateNearest(flock){
    //this.nearest
    //compBoidDistPair
    //getDistance
    let max = 0;
    this.nearest = [];
    flock.forEach( b => { 
      let d = this.pos.getDistance(b.pos);
      const pair = {dist: d, boid: b};
      
      if (this.nearest.length < params.nearestNeighbourEffect) { // fill array first
        if (d > max) max = d;
        this.nearest.push(pair);
        this.nearest.sort(compBoidDistPair);
      } else if (d < max) {  // check for max b4 insert & sort
        this.nearest.push(pair);
        this.nearest.sort(compBoidDistPair);
      }
      if (this.nearest.length > params.nearestNeighbourEffect) this.nearest.pop();      
    });
    //cl(this.nearest);
  }
  
  // average velocity of list of boids
  static averageVel (boids) {
    let sum = new Vector(0,0,0);
    boids.forEach( b => {
       sum = sum.plus(b.vel);
    });    
    return sum.div(boids.length);
  }

  // average positions (centre of group) of list of boids  
  static averageLoc (boids) {
    let sum = new Vector(0,0,0);
    boids.forEach( b => {
       sum = sum.plus(b.pos);
    });    
    return sum.div(boids.length);
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
    
    const xRat = (dx * dx) / (dx * dx + dy * dy + dz * dz);
    const yRat = (dy * dy) / (dx * dx + dy * dy + dz * dz);
    const zRat = (dz * dz) / (dx * dx + dy * dy + dz * dz);
    
    //vector - magnitude: same as current velocity -
    //         direction: scene centre from this boid
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
  folder.addInput(params, 'velocityMin', { min: -20, max: 20, step: 1 });
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

