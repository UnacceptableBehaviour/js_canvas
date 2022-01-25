const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};


// helpers
const cl = (str) => {
  console.log(str);
}

class MsgType {
	static PRESSURE = 0;
	static SONIC_HEDGEHOG = 1;
	static ACTIVATOR_SENSE = 2;
	static ACTIVATOR_ANTISENSE = 3;
	static MESSAGE_ARRAY_SIZE = 4;
	static NULL_MESSAGE = 5;
};

// enum Walls
class Walls {
	static ME = 0;  // this cell
	static L  = 1;	// left
	static TL =	2;	// top left
	static TR =	3;	// top right
	static R  =	4;	// right
	static BR	=	5;  // bottom right
	static BL	=	6;  // bottom left
  static MAX_FABRIC_WALLS = 7; // array size
};

// struct
class Message {
   constructor (msg, units) {
      this.units = units;
      this.msg   = msg;      
   }
};

const CELLSIZE_X         = 4;
const CELLSIZE_Y         = 4;
const FABRIC_PIX_X       = 800;
const FABRIC_PIX_Y       = 600;
const FABRIC_WIDTH       = FABRIC_PIX_X / CELLSIZE_X;
const FABRIC_HEIGHT      = FABRIC_PIX_Y / CELLSIZE_Y;

class FabricCell {
   constructor(){
      this.walls = [];
      this.msgs  = [];
      this.inMsgs  = [];
      
      for (let n=0; n<Walls.MAX_FABRIC_WALLS; n++) this.walls.push(0);
      
      for (let m=0; m<MsgType.MESSAGE_ARRAY_SIZE; m++) // initialise Message array : Current Outgoing
      {
         this.msgs.push(new Message(MsgType.NULL_MESSAGE, 0));
      }
   
      for (let m=0; m<MsgType.MESSAGE_ARRAY_SIZE; m++) // initialise Message array : Cumulative Incoming
      {
         this.inMsgs.push(new Message(MsgType.NULL_MESSAGE, 0));
      }      
   }

	diffuse(){};
	regroup(){};
	insertMessage(msg, units){};
   
};

const env = new Array(FABRIC_HEIGHT).fill(new FabricCell()).map(() => new Array(FABRIC_WIDTH).fill(new FabricCell()));

//const params = {
//	cols: 10,
//	rows: 10,
//	scaleMin: 1,
//	scaleMax: 30,
//	freq: 0.001,
//	amp: 0.2,
//	frame: 0,
//	//animate: true,
//
//};


const sketch = () => {
  
  cl(`ME ${Walls.ME}`);
  cl(env);
  
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
