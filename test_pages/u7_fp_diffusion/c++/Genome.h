#ifndef _GENOME_H
#define _GENOME_H

class FabricCell;
typedef void (FabricCell::*MFP)();  // declare type MFP (MemberFunctionPointer)
                                // which points to members of FabricCell whose func signature
                                // is void FabricCell::function(void)
class NODE
{
public:
   NODE* pNxt;
   NODE* pPrv;
   //void  (FabricCell::*pGene)();  Declare pointer of type Member Function Pointer
   MFP pGene;
};

/*******************************************************************
* Desc: List of genefunction pointers.
*       Each genefunction's execution based message contents of cell
*       pHead -> begining of the function list
*       pTail -> end of list
*       pPos  -> position indicator
*
*******************************************************************/
class GENOME   // Cell function description
{
public:
   GENOME();
   ~GENOME();

   // pointer to a list of function pointers
   NODE* pHead;
   NODE* pTail;
   NODE* pPos;
   void AddGene(MFP pMemerFunc);
   NODE* Next(void);
   NODE* Prev(void);
   void  SetPosToHead(void);
   void  SetPosToTail(void);

};

class MASK : public GENOME
{
public:
   NODE* duplicate(NODE* start, NODE* end);
};


//TRACE( "\nAddress as:\t%p\n", env[0][0].walls[BR]);
/*
   // THE FOLLOWING ALL DO THE SAME
   env[100][75].Insert1MsgPressure();
      
   FabricCell* pF; // object pointer 
   pF = &env[75][75];
   pF->Insert1MsgPressure();     // call function using object pointer

   gene.pHead->pGene = &FabricCell::Insert1MsgPressure; // assign function to node

   pF = &env[125][75];           // select ne object
   (pF->*gene.pHead->pGene)();   // run function on new object
*/  

#endif
