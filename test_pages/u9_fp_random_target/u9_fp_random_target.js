const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const algos = require('algos_sftest');

const settings = {
  dimensions: [ 1048, 1048 ],
  animate: true
};

// helpers
const cl = (str) => {
  console.log(str);
};

class AgentType {
  static COMMON_NODE = 'black';
  static FROM_NODE = 'blue';
  static TO_NODE = 'red';
};


const params = {
  numAgents: 40,
  fromAgent: 10,
  toAgent: 11,
  connectionLimit: 300,
};

const sketch = ({ context, width, height }) => {
  
  const agents = [];

  for (let i = 0; i < params.numAgents; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }
  agents[params.fromAgent].typeColor = AgentType.FROM_NODE;
  agents[params.fromAgent].rad = 15;
  agents[params.toAgent].typeColor = AgentType.TO_NODE;
  agents[params.toAgent].rad = 10;
  
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);
    
    const cLim = params.connectionLimit;
    
    for (let i = 0; i < agents.length; i++) {
			const agent = agents[i];

			for (let j = i + 1; j < agents.length; j++) {
				const other = agents[j];
				const dist = agent.pos.getDistance(other.pos);
				
				if (dist > cLim) continue;
				
        // maps one range to another based on the value of a variable
        // var is dist. map 0 to 
				
        context.lineWidth = 2;
        //context.lineWidth = math.mapRange(dist, 0, cLim, cLim/10, 1);

				context.beginPath();
				context.moveTo(agent.pos.x, agent.pos.y);
				context.lineTo(other.pos.x, other.pos.y);
				context.stroke();
			}
		}
    
    agents.forEach( agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
      //agent.traverse(width, height);
    });
    
  };
};


class Vector {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  getDistance(v) {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
  
  dbg(){
    console.log(this);    
  }
}


class Agent {
  constructor(x, y, radius){
    this.pos = new Vector(x,y);
    this.vel = new Vector(random.range(-4, 4), random.range(-4, 4)); 
    //this.rad = random.rangeFloor(5, 21);
    this.rad = 5;
    this.typeColor = AgentType.COMMON_NODE;
  }
  
  draw(context){
    // isolate drawing behaviour by saving & restoring context
    context.save()
    
    context.translate(this.pos.x, this.pos.y);  // move the origin / move canvas under plotter pen - see if it helps to think of it like this!?    
    context.lineWidth = 4;    
    context.beginPath();
    // was this before translate intorduced
    // context.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI*2); // arc(x,y,r,sAngle,eAngle,counterclockwise);    
    context.arc(0,0, this.rad, 0, Math.PI*2);    
    context.strokstyle = 'black';
    context.stroke();
    context.fillStyle = this.typeColor;
    context.fill();

    context.restore()
  }
  
  bounce(width, height) {
		if (this.pos.x <= 0 || this.pos.x >= width)  this.vel.x *= -1;
		if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
	}

  traverse(width, height) {
    if (this.pos.x <= 0)  this.pos.x = width-1;
    if (this.pos.x >= width) this.pos.x = 1;
    
		if (this.pos.y <= 0) this.pos.y = height-1;
		if (this.pos.y >= height) this.pos.y = 1;
	}
  
  
	update() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}
  
  dbg(){
    console.log(this);    
  }

}

    //context.beginPath();
    //// show origin
    //context.fillStyle = 'red';
    //context.arc(0, 0, 5, 0, 2*Math.PI);
    //context.fill();
    
canvasSketch(sketch, settings);
cl('IMPORTED MODULE: algos_sftest');
algos.algoInfo();



// call on every frame update - - - - - < <
// simple RAF callack request
//const animate = () => {
//	console.log('domestika');
//	requestAnimationFrame(animate);
//};
// animate();
