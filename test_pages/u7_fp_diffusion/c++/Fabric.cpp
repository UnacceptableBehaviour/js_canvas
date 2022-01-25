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
#define DIFFUSE_IN
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

//void InitFabric(FabricCell (*fab)[150],int xLower, int yLower, int xHigher, int yHigher);

//void InitFabric(FabricCell (*fab),int xLower, int yLower, int xHigher, int yHigher)
//{
//   TRACE("Fabric Limits: %l %d %d %d %d",env,xLower,yLower,xHigher,yHigher);
//}
/************************************************************************
*  FUNC:
*
*  DESC:
*
*
*
************************************************************************/
void InitFabric(Uint16 xLower, Uint16 yLower, Uint16 xHigher, Uint16 yHigher)
{
   #ifdef DIFFUSE_IN
      TRACE("\nDIFFUSE IN\n");
   #else
      TRACE("\nDIFFUSE OUT\n");
   #endif 

	// HEXAGONAL_FABRIC:
																//    Cell Wall Reference
	// int x,y;												//   
	// assign each cell it a pointer to itself.		 //      TL    TR   
	for (int y=yLower; y<yHigher; y++)               //       2    3
	{												
		for (int x=xLower; x<xHigher; x++)   	    //       L    ME    R
		{										             //       1    0     4
			env[x][y].walls[ME] = &env[x][y];		
		}											//			             6    5
	}												//		               BL    BR
	
	// assign cell 1 & 4 pointers (cells to L & R on the same line)
	for (y=yLower; y<yHigher; y++)						
	{
		env[xLower][y].walls[L] = 0;	// first in the row
		env[xLower][y].walls[R] = &env[xLower+1][y];
		for (int x=xLower+1; x<xHigher-1; x++)
		{
			env[x][y].walls[L] = &env[x-1][y];	// put pointer to cell to the left in walls[L]
			env[x][y].walls[R] = &env[x+1][y];
		}
		env[xHigher-1][y].walls[L] = &env[xHigher-2][y];	
		env[xHigher-1][y].walls[R] = 0;
	}
	
	
	// assign TL TR cell walls
	// row y=0 easy clear all TL an TR pointers
	// row y=1 offset = 1 so first cell has TL & TR walls - last cell only TL
	// row y=2 offset = 0 so first cell only has TR wall  - last both TL & TR
	// row y=3 offset = 1 so first cell has TL & TR walls etc etc
	for (int x=xLower; x<xHigher; x++) { // row y=0
		env[x][yLower].walls[TL] = 0; 
		env[x][yLower].walls[TR] = 0;
	}
	for (y=yLower+1; y<yHigher; y++)						
	{												
		int offset = 1 * (y % 2);
		// do cell at start of row
		if (offset){  // do LEFT edge of cell fabric
			env[xLower][y].walls[TL] = &env[xLower][y-1];
			env[xLower][y].walls[TR] = &env[xLower+1][y-1];
		}
		else {
			// causing unhandled access violation x=199,y=38
			env[xLower][y].walls[TL] = 0;
			env[xLower][y].walls[TR] = &env[xLower][y-1];
		}
		// do rest of cells except for last one
		for (int x=xLower+1; x<xHigher-1; x++)					
		{
			if (offset) {
				env[x][y].walls[TL] = &env[x][y-1];
				env[x][y].walls[TR] = &env[x+1][y-1];
			}
			else {
				env[x][y].walls[TL] = &env[x-1][y-1];
				env[x][y].walls[TR] = &env[x][y-1];
			}
		}							
		// do last cell in row
		if (offset){  // do RIGHT edge of cell fabric (LAST FabricCell)
			env[xHigher-1][y].walls[TL] = &env[x][y-1];
			env[xHigher-1][y].walls[TR] = 0;
		}
		else {
			env[xHigher-1][y].walls[TL] = &env[x-1][y-1];
			env[xHigher-1][y].walls[TR] = &env[x][y-1];
		}
	}
	
	// assign BL BR cell walls
	for (y=yLower; y<yHigher-1; y++)						
	{												
		int offset = 1 * (y % 2);
		// do cell at start of row
		if (offset){  // do LEFT edge of cell fabric
			env[xLower][y].walls[BL] = &env[xLower][y+1];
			env[xLower][y].walls[BR] = &env[xLower+1][y+1];
		}
		else {
			env[xLower][y].walls[BL] = 0;
			env[xLower][y].walls[BR] = &env[xLower][y+1];
		}
		// do rest of cells except for last one
		for (int x=xLower+1; x<xHigher-1; x++)					
		{
			if (offset) {
				env[x][y].walls[BL] = &env[x][y+1];
				env[x][y].walls[BR] = &env[x+1][y+1];
			}
			else {
				env[x][y].walls[BL] = &env[x-1][y+1];
				env[x][y].walls[BR] = &env[x][y+1];
			}
		}							
		// x still in scope and = 199
		// do last cell in row
		if (offset){  // do RIGHT edge of cell fabric (LAST FabricCell)
			env[xHigher-1][y].walls[BL] = &env[x][y+1];
			env[xHigher-1][y].walls[BR] = 0;
		}
		else {
			env[xHigher-1][y].walls[BL] = &env[x-1][y+1];
			env[xHigher-1][y].walls[BR] = &env[x][y+1];
		}
	}
	// do bottom row
	for (x=xLower; x<xHigher-1; x++) { // row y=149
		env[x][yHigher-1].walls[BL] = 0; 
		env[x][yHigher-1].walls[BR] = 0;
	}
   
}

