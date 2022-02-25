const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const Tweakpane = require('tweakpane');

// helpers
const cl = (str) => {
  console.log(str);
}

class MsgType {
  static PRESSURE = 0;
  static SONIC_HEDGEHOG = 1;
  static ACTIVATOR_SENSE = 2;
  static MESSAGE_ARRAY_SIZE = 3;
  //static ACTIVATOR_ANTISENSE = ;  
  static NULL_MESSAGE = 5;
};

// enum Walls
class Walls {
  static ME = 0;  // this cell
  static L  = 1;  // left
  static TL =  2;  // top left
  static TR =  3;  // top right
  static R  =  4;  // right
  static BR  =  5;  // bottom right
  static BL  =  6;  // bottom left
  static MAX_FABRIC_WALLS = 7; // array size
};

// struct
class Message {
  constructor (msg, units) {
    this.units = units;
    this.msg   = msg;      // MsgType
  }
};

// params
const CELLSIZE_X         = 2;
const CELLSIZE_Y         = 2;
const CANVAS_X_OFFSET    = CELLSIZE_X / 2;
const FABRIC_PIX_X       = 1200; //400;  //1200;slow!
const FABRIC_PIX_Y       = 1200; //400;  //1800;slow!
const FABRIC_WIDTH       = FABRIC_PIX_X / CELLSIZE_X;
const FABRIC_HEIGHT      = FABRIC_PIX_Y / CELLSIZE_Y;
const INJECTION_MIN      = 0;
const INJECTION_MAX      = 500000;
const INITIAL_INJECTIONS = 1200; //100; //1200;

const params = {
  initPoints: INITIAL_INJECTIONS,
  injectionMin: INJECTION_MIN,
  injectionMax: INJECTION_MAX,
};

const createpane = () => {
  const pane = new Tweakpane.Pane();  
  let folder;
  
  folder = pane.addFolder({ title: 'Diffusion Rainbow '});
  folder.addInput(params, 'initPoints', { min: 1, max: 1000, step: 1 });  
  folder.addInput(params, 'injectionMin', { min: INJECTION_MIN, max: INJECTION_MAX, step: 1000 });
  folder.addInput(params, 'injectionMax', { min: INJECTION_MIN, max: INJECTION_MAX, step: 1000 });
  btnRestart = folder.addButton({
    title: 'RESTART',
    label: '',
    });
  btnRestart.on('click', () => { cl('RESTART CLICKED'); canvasSketch(sketch, settings);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  } );
  
  //folder.addInput(params, 'boidMaxRad', { min: 1, max: 100, step: 1 }); 
  //folder.addInput(params, 'speedLimit', { min: 1, max: 100, step: 1 });
  //folder.addInput(params, 'speedLimitOn');
  //folder.addInput(params, 'borderStroke');
  //
  //folder = pane.addFolder({ title: 'Flock '});
  //folder.addInput(params, 'rule1multiplier', { min: 0.01, max: 0.2, step: 0.01 });
  ////folder.addInput(params, 'flockDensity', { min: 0, max: 1, step: 0.05 });
  //folder.addInput(params, 'nearestNeighbourEffect', { min: 2, max: 20, step: 1 });
  //folder.addInput(params, 'nNEffect');
  ////folder.addInput(params, 'visualRangeEffect', { min: 1, max: 500, step: 5 });
  ////folder.addInput(params, 'vREffect');
  //folder.addInput(params, 'freeFlightAmp', { min: 0.01, max: 5, step: 0.05 });
  //folder.addInput(params, 'minSafeDistance', { min: 0, max: 100, step: 5 });
  //// add slider w/ callback
  ////folder.addInput(params, 'leadBoidConfinement', { min: 0, max: (cubeSize/2 -50), step: 50 });  
  //const lBCinput = pane.addInput(params, 'leadBoidConfinement', { min: 0, max: (cubeSize/2 -50), step: 50 });
  //lBCinput.on('change', function(ev) {
  //  const leadBoid = params.leadBoid;
  //  const shrink = params.leadBoidConfinement;
  //  if (leadBoid.pos.x <= shrink) leadBoid.pos.x = shrink + 1;
  //  if (leadBoid.pos.x >= scene.x - shrink) leadBoid.pos.x = scene.x - shrink -1;
  //  if (leadBoid.pos.y <= shrink) leadBoid.pos.y = shrink + 1;
  //  if (leadBoid.pos.y >= scene.y - shrink) leadBoid.pos.y = scene.y - shrink -1;
  //  if (leadBoid.pos.z <= shrink) leadBoid.pos.z = shrink + 1;
  //  if (leadBoid.pos.z >= scene.z - shrink) leadBoid.pos.z = scene.z - shrink -1;
  //});
}



class FabricCell {
  static DIFFUSE_IN = true; // or false!
  
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
  
  diffuse(){
    let  ifaces = 0;
    let  postUnits = 0;
    let  spare = 0;
    
    const FABRIC_WALLS = Walls.MAX_FABRIC_WALLS;
    const FIRST_WALL = Walls.L;
    
    // cycle though msgTypes - diffuse each into surrounding cells
    for(let forEachMsgType = 0; forEachMsgType < MsgType.MESSAGE_ARRAY_SIZE; forEachMsgType++){
    
       // diffuse particles into surrounding cell for each type of message
       if (this.msgs[forEachMsgType].units > 0){

          for (let n=FIRST_WALL; n<FABRIC_WALLS; n++) // TODO - add to object assign @ InitFabric - refactor DIFFUSE_IN
             if(this.walls[n] != 0) ifaces++;
    
          if (FabricCell.DIFFUSE_IN) {
            ifaces++; // add one for walls[0] ie ME
          }
    
          // divide up units equally
          postUnits = this.msgs[forEachMsgType].units / ifaces;
          // gather leftover particles so they don't get lost
          spare = this.msgs[forEachMsgType].units % ifaces;
    
          // post units to existing cell walls
          for (let forEachCellWall = FIRST_WALL; forEachCellWall < FABRIC_WALLS; forEachCellWall++)
          {
             if(this.walls[forEachCellWall] != 0) 
                this.walls[forEachCellWall].inMsgs[forEachMsgType].units = this.walls[forEachCellWall].inMsgs[forEachMsgType].units + postUnits;
          }
    
          // add an equal amount of particles to this cell
          // don't need to transfer message identifier since this cell is the progenitor
          // and is the source of the identifier
          if (FabricCell.DIFFUSE_IN) {
            this.inMsgs[forEachMsgType].units += (postUnits + spare);
          } else {
            this.inMsgs[forEachMsgType].units += (spare);  
          }
          
          ifaces = 0;
       }
    }  
  };
  
  regroup(){    
    for (let forEachMsgType = 0; forEachMsgType < MsgType.MESSAGE_ARRAY_SIZE; forEachMsgType++) {
       this.msgs[forEachMsgType].units = this.inMsgs[forEachMsgType].units;     
       this.inMsgs[forEachMsgType].units = 0;
    }
  };
  
  insertMessage(inMsg){          // TODO - pass Message(PRESSURE, 50000) 
    this.msgs[inMsg.msg].units += inMsg.units;
    this.msgs[inMsg.msg].msg = inMsg.msg;
  };
   
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
function initFabric(xLower, yLower, xHigher, yHigher)
{
  if (FabricCell.DIFFUSE_IN) {    
    cl("\nDIFFUSE IN\n");
  } else {
    cl("\nDIFFUSE OUT\n");
  }

  // HEXAGONAL_FABRIC:
                                              //   Cell Wall Reference
  // int x,y;                                  //   
  // assign each cell it a pointer to itself.  //         TL    TR   
  for (let y=yLower; y<yHigher; y++)          //          2    3
  {                        
    for (let x=xLower; x<xHigher; x++)         //       L    ME    R
    {                                          //       1    0     4
      env[x][y].walls[Walls.ME] = env[x][y];    
    }                                         //          6    5
  }                                           //         BL    BR
  
  // assign cell 1 & 4 pointers (cells to L & R on the same line)
  for (let y=yLower; y<yHigher; y++)            
  {
    env[xLower][y].walls[Walls.L] = 0;  // first in the row
    env[xLower][y].walls[Walls.R] = env[xLower+1][y];
    for (let x=xLower+1; x<xHigher-1; x++)
    {
      env[x][y].walls[Walls.L] = env[x-1][y];  // put pointer to cell to the left in walls[L]
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
    let offset = y % 2;
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
    // x still in scope and = 199            < - - - - - - - - -  < <
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


function diffusionCycle(fabricEnv) {
  for (let x=0; x<FABRIC_WIDTH; x++)
  {
    for (let y=0; y<FABRIC_HEIGHT; y++)
    {
      fabricEnv[x][y].diffuse();
    }
  }
  for (let x=0; x<FABRIC_WIDTH; x++)
  {
    for (let y=0; y<FABRIC_HEIGHT; y++)
    {
      fabricEnv[x][y].regroup();
    }
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


const settings = {
  dimensions: [ FABRIC_PIX_X, FABRIC_PIX_Y ],
  animate: true
};




const sketch = () => {
  
  cl(`ME ${Walls.ME}`);
  cl(env);
  
  // inject particles  
  for (let i=0; i<INITIAL_INJECTIONS; i++)
  {
    let x = Math.floor(random.range(0, FABRIC_WIDTH ));
    let y = Math.floor(random.range(0, FABRIC_HEIGHT ));
    //let x = Math.floor(FABRIC_WIDTH/2);
    //let y = Math.floor(FABRIC_HEIGHT/2);    
    let qty = Math.floor(random.range(params.injectionMin, params.injectionMax)); 
    let msg = Math.floor(random.range(0, MsgType.MESSAGE_ARRAY_SIZE )); 
    let rndMsg = new Message(msg, qty);
    //fabricEnv[x][y].insertMessage(rndMsg);  // TODO rename more meaningful
    env[x][y].insertMessage(rndMsg);
  }
  
  return ({ context, width, height }) => {
    const alpha = 1;
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    
    // draw
    for (let x=0; x<FABRIC_WIDTH; x++)
    {
      for (let y=0; y<FABRIC_HEIGHT; y++)
      {
        context.save();
        let x_offset = CANVAS_X_OFFSET * (y % 2);
        context.translate(x * CELLSIZE_X + x_offset, y * CELLSIZE_Y);
        //context.rotate(-angle);
        //context.scale(random.range(0.1, 2), random.range(0.2, 0.5));
  
        context.beginPath();
        
        //composedFill = `rgba(%{env[x][y].msgs[0].units % 256}, 0,0,${alpha})`;
        composedFill = `rgba(${env[x][y].msgs[0].units % 256}, ${env[x][y].msgs[1].units % 256},${env[x][y].msgs[2].units % 256},${alpha})`;
        context.fillStyle = composedFill; //cBox[Math.floor(random.range(0, cBox.length - 1))];
        context.rect(0, 0, CELLSIZE_X, CELLSIZE_Y);
        context.fill();
        context.restore();
      }
    }
    
    // run cycle 
    diffusionCycle(env);
    
  };
};



createpane();
canvasSketch(sketch, settings);
