#include <stdafx.h>
#include "Genome.h"



GENOME::GENOME()
{
   pHead = 0;
   pTail = 0;
   pPos  = 0;
}

GENOME::~GENOME()
{
   //delete newed up mem
   // All genomes whether masks or base  should delete added nodes aswell as
   // the initially defined GENOME object.

   if (pTail == pHead)
   {
      //TRACE("\n dtor:GENOME - this ");
      if (pTail)
         delete pTail;
   
      // else - no problem there are no list elements to delete
   }
   else
   {
      int n=0;
      // delete all elements of the list associated with the GENOME obj
      this->SetPosToTail();
      while( Prev() )      // Prev() returns a pointer to the previous element in the list
      {
         //TRACE("\n dtor:GENOME - list:%d:%p",n++,pPos);
         delete pPos->pNxt;
      }

      //TRACE("\n dtor:GENOME - head:%d:%p",n++,pHead);
      delete pHead;        // delete final element in the list
      pHead = pTail = 0;
   }
}


void GENOME::AddGene(MFP pMemerFunc)
{
   if (pTail == 0)
   {
      pTail = pPos = pHead = new NODE; // allocate first NODE
      pHead->pGene = pMemerFunc;       // assign member function pointer
      pHead->pPrv  = 0;
   }
   else
   {
      pTail->pNxt = new NODE;          // get memory and point pTail to it
                                       // assign all new element to new node
      pTail->pNxt->pGene = pMemerFunc; // assign member function pointer
      pTail->pNxt->pPrv = pTail;       // link new node(new tail) to old tail node
      pTail->pNxt->pNxt = 0;           // put NULL in pNxt of new node

      if ( pTail->pNxt == 0)           // if new failed and returned NULL 
      {
         TRACE("\nFATAL  <----------->  OUT OF MEMORY");
         for(;;);
      }

      pTail = pTail->pNxt;             // move tail on
   }
}

NODE* GENOME::Next(void)
{
   pPos = pPos->pNxt;
   return pPos;
}

NODE* GENOME::Prev(void)
{
   pPos = pPos->pPrv;
   return pPos;
}

void GENOME::SetPosToHead(void)
{
   pPos = pHead;
}

void GENOME::SetPosToTail(void)
{
   pPos = pTail;
}

                      
NODE* MASK::duplicate(NODE* start, NODE* end)
{
   NODE* retHead = start;

   return retHead;
}
