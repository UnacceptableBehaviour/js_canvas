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
