#ifndef _FABRIC_H
#define _FABRIC_H

//=====================================================================
//
//	Structure from diffusion . . . experiment
//
//	Concept and implementation by Simon Fernandez ... a long time ago :/
//
//=====================================================================

#include "StandardTypes.h"
#include "Genome.h"

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


//class FabricCell
//{
//public:
//	FabricCell*  walls[MAX_FABRIC_WALLS];
//	Message	msgs[MESSAGE_ARRAY_SIZE];
//	Message	inMsgs[MESSAGE_ARRAY_SIZE];
//
//   GENOME gFab;
//
//	FabricCell();
//	void Diffuse();
//	void Regroup();
//	bool InsertMessage(MsgType msg, long units);
//   void Insert1MsgPressure(void);
//
//};

void InitFabric(Uint16 xLower, Uint16 yLower, Uint16 xHigher, Uint16 yHigher);

extern FabricCell (*env)[FABRIC_HEIGHT];
extern Uint8 FABRIC_WALLS;
#endif
