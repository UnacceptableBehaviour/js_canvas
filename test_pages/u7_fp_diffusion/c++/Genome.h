#ifndef _GENOME_H
#define _GENOME_H

class FABRIC;
typedef void (FABRIC::*MFP)();  // declare type MFP (MemberFunctionPointer)
                                // which points to members of FABRIC whose func signature
                                // is void FABRIC::function(void)
class NODE
{
public:
   NODE* pNxt;
   NODE* pPrv;
   //void  (FABRIC::*pGene)();  Declare pointer of type Member Function Pointer
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



#endif