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
  constructor(id){
    this.cid = id;    
    this.id = '';
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

/************************************************************************
*  FUNC: initFabric
*
*  DESC: assign co-located FabricCell objects to cell walls for 
*        communication w/ eachother.
*        Simulated hexagonal lattice. 2D array with each element
*        having acces from 2 above, 2 below and 1 from each side.
*        See fabric_array_connections.jpeg for sketch
*
************************************************************************/
const DIFFUSE_IN = true; // or false!

function initFabric(xLower, yLower, xHigher, yHigher)
{
  if (DIFFUSE_IN) {		
    cl("\nDIFFUSE IN\n");
  } else {
    cl("\nDIFFUSE OUT\n");
  }

	// HEXAGONAL_FABRIC:
                                              //   Cell Wall Reference
	// int x,y;												          //   
	// assign each cell it a pointer to itself.	//         TL    TR   
	for (let y=yLower; y<yHigher; y++)          //          2    3
	{												
		for (let x=xLower; x<xHigher; x++)   	    //       L    ME    R
		{										                      //       1    0     4
			env[x][y].walls[Walls.ME] = env[x][y];		
		}                                         //          6    5
	}                                           //         BL    BR
	
	// assign cell 1 & 4 pointers (cells to L & R on the same line)
	for (let y=yLower; y<yHigher; y++)						
	{
		env[xLower][y].walls[Walls.L] = 0;	// first in the row
		env[xLower][y].walls[Walls.R] = env[xLower+1][y];
		for (let x=xLower+1; x<xHigher-1; x++)
		{
			env[x][y].walls[Walls.L] = env[x-1][y];	// put pointer to cell to the left in walls[L]
			env[x][y].walls[Walls.R] = env[x+1][y];
		}
		env[xHigher-1][y].walls[Walls.L] = env[xHigher-2][y];	
		env[xHigher-1][y].walls[Walls.R] = 0;
	}
	
	
	// assign TL TR cell walls
	// row y=0 easy clear all TL an TR pointers
	// row y=1 offset = 1 so first cell has TL & TR walls - last cell only TL
	// row y=2 offset = 0 so first cell only has TR wall  - last both TL & TR
	// row y=3 offset = 1 so first cell has TL & TR walls etc etc
	for (let x=xLower; x<xHigher; x++) { // row y=0
		env[x][yLower].walls[Walls.TL] = 0; 
		env[x][yLower].walls[Walls.TR] = 0;
	}
	for (let y=yLower+1; y<yHigher; y++)						
	{												
		let offset = 1 * (y % 2);
		// do cell at start of row
		if (offset){  // do LEFT edge of cell fabric
			env[xLower][y].walls[Walls.TL] = env[xLower][y-1];
			env[xLower][y].walls[Walls.TR] = env[xLower+1][y-1];
		}
		else {
			// causing unhandled access violation x=199,y=38
			env[xLower][y].walls[Walls.TL] = 0;
			env[xLower][y].walls[Walls.TR] = env[xLower][y-1];
		}
		// do rest of cells except for last one
    let x;
		for (x=xLower+1; x<xHigher-1; x++)					
		{
			if (offset) {
				env[x][y].walls[Walls.TL] = env[x][y-1];
				env[x][y].walls[Walls.TR] = env[x+1][y-1];
			}
			else {
				env[x][y].walls[Walls.TL] = env[x-1][y-1];
				env[x][y].walls[Walls.TR] = env[x][y-1];
			}
		}							
		// do last cell in row
		if (offset){  // do RIGHT edge of cell fabric (LAST FabricCell)
			env[xHigher-1][y].walls[Walls.TL] = env[x][y-1];
			env[xHigher-1][y].walls[Walls.TR] = 0;
		}
		else {
			env[xHigher-1][y].walls[Walls.TL] = env[x-1][y-1];
			env[xHigher-1][y].walls[Walls.TR] = env[x][y-1];
		}
	}
	
	// assign BL BR cell walls
	for (let y=yLower; y<yHigher-1; y++)						
	{												
		let offset = 1 * (y % 2);
		// do cell at start of row
		if (offset){  // do LEFT edge of cell fabric
			env[xLower][y].walls[Walls.BL] = env[xLower][y+1];
			env[xLower][y].walls[Walls.BR] = env[xLower+1][y+1];
		}
		else {
			env[xLower][y].walls[Walls.BL] = 0;
			env[xLower][y].walls[Walls.BR] = env[xLower][y+1];
		}
		// do rest of cells except for last one
    let x;
		for (x=xLower+1; x<xHigher-1; x++)					
		{
			if (offset) {
				env[x][y].walls[Walls.BL] = env[x][y+1];
				env[x][y].walls[Walls.BR] = env[x+1][y+1];
			}
			else {
				env[x][y].walls[Walls.BL] = env[x-1][y+1];
				env[x][y].walls[Walls.BR] = env[x][y+1];
			}
		}							
		// x still in scope and = 199						< - - - - - - - - -  < <
		// do last cell in row
		if (offset){  // do RIGHT edge of cell fabric (LAST FabricCell)
			env[xHigher-1][y].walls[Walls.BL] = env[x][y+1];
			env[xHigher-1][y].walls[Walls.BR] = 0;
		}
		else {
			env[xHigher-1][y].walls[Walls.BL] = env[x-1][y+1];
			env[xHigher-1][y].walls[Walls.BR] = env[x][y+1];
		}
	}
	// do bottom row
	for (let x=xLower; x<xHigher-1; x++) { // row y=149
		env[x][yHigher-1].walls[Walls.BL] = 0; 
		env[x][yHigher-1].walls[Walls.BR] = 0;
	}
   
}

//const env = new Array(FABRIC_HEIGHT).fill(new FabricCell()).map(() => new Array(FABRIC_WIDTH).fill(new FabricCell()));

//const env = new Array(FABRIC_WIDTH).fill(new FabricCell(count++)).map(() => new Array(FABRIC_HEIGHT).fill(new FabricCell(count++)));

let count = 0;
let env = [];
for (let x=0; x<FABRIC_WIDTH; x++)
{
  let col = [];
  
  for (let y=0; y<FABRIC_HEIGHT; y++)
  {
    col.push(new FabricCell(count++));
  }
  env.push(col);
}

initFabric(0, 0, FABRIC_WIDTH, FABRIC_HEIGHT);

// label for debug
for (let y=0; y<FABRIC_HEIGHT; y++)						
{
  for (let x=0; x<FABRIC_WIDTH; x++)
  {
    env[x][y].id = `X${x}-Y${y}`;
  }
}


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
