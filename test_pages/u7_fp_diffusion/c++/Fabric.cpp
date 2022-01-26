//=====================================================================
//
//	Structure from diffusion . . . experiment
//
//	Concept and implementation by Simon Fernandez ... a long time ago :/
//
//=====================================================================

#include <stdafx.h>
#include "Fabric.h"
#include "StandardTypes.h"

Uint8 FABRIC_WALLS;
FabricCell (*env)[FABRIC_HEIGHT];

/************************************************************************
*  FUNC:
*
*  DESC:
*
*
*
************************************************************************/
FabricCell::FabricCell()
{
	moved > JS
}

/************************************************************************
*  FUNC: Diffuse
*
*  DESC: Send an equal amount of message from this cell into existing 
*        surrounding cells. 
*
*  NOTE: if DIFFUSE_IN is defined this diffuses to this cell
*
************************************************************************/
void FabricCell::Diffuse()
{
	Uint8    ifaces = 0;
	Uint32   postUnits = 0;
	Uint32   spare = 0;
   Uint16   forEachMsgType = 0;
   Uint8    forEachCellWall = 0;

   FABRIC_WALLS = selectedDimension+1; // hexagonal + pointer this cell
   // cycleMsgs is used as the index for the msgs structure array
   for(forEachMsgType = 0; forEachMsgType < MESSAGE_ARRAY_SIZE; forEachMsgType++){

      // diffuse particles into surrounding cell for each type of message
      if (this->msgs[forEachMsgType].units > 0){
         // count how many cell wall - this information should be kept up to date by the
         // divide process as the organism grows - avoids having to do the calc here
         for (int n=1; n<FABRIC_WALLS; n++) 
            if(this->walls[n] != 0) ifaces++;

         #ifdef DIFFUSE_IN
         ifaces++; // add one for walls[0] ie ME
         #endif 

         // divide up units equally
         postUnits = this->msgs[forEachMsgType].units / ifaces;
         // gather leftover particles so they don't get lost
         spare = this->msgs[forEachMsgType].units % ifaces;

         // post units to existing cell walls
         for (forEachCellWall = 1; forEachCellWall < FABRIC_WALLS; forEachCellWall++)
         {
            // look for existence of pointer before assinging particles
            if(this->walls[forEachCellWall] != 0) 
               // add check to see if surrounding cell will accept message.
               // this should be implemented/evaluated at moment of divide/mask change
               // add particles to the incoming message array of surrounding cells
               this->walls[forEachCellWall]->inMsgs[forEachMsgType].units = this->walls[forEachCellWall]->inMsgs[forEachMsgType].units + postUnits;
               // transfer msgs identifier
         }

         // add an equal amount of particles to this cell
         // don't need to transfer message identifier since this cell is the progenitor
         // and is the source of the identifier
         #ifdef DIFFUSE_IN
         this->inMsgs[forEachMsgType].units += (postUnits + spare);
         #else 
         this->inMsgs[forEachMsgType].units += (spare);
         #endif 

         // NOTE:
         // units may or maynot be posted according to their attribute an the filter 
         // on the cell wall i/f
         ifaces = 0;
      }
   }
}

/************************************************************************
*  FUNC: Regroup
*
*  DESC: Take msgs diffused in from surrounding cells and move to current
*        msg array.
*
************************************************************************/
void FabricCell::Regroup()
{
   Uint16 forEachMsgType = 0;
	
   for (forEachMsgType = 0; forEachMsgType < MESSAGE_ARRAY_SIZE; forEachMsgType++) {
      this->msgs[forEachMsgType].units = this->inMsgs[forEachMsgType].units;
      this->inMsgs[forEachMsgType].units = 0;
	}
}


/************************************************************************
*  FUNC:
*
*  DESC:
*
*
*
************************************************************************/
bool FabricCell::InsertMessage(MsgType msg, long units)
{
	this->msgs[msg].units += units;
	this->msgs[msg].msg = msg;

	return(false);
}

/************************************************************************
*  FUNC:
*
*  DESC:
*
*
*
************************************************************************/
void FabricCell::Insert1MsgPressure(void)
{
	this->msgs[0].units += 20000;
}

