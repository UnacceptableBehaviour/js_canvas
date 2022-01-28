# End of Course Project 1 - Diffusion Rainbow  
![Diffusion Rainbow](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u7_fp_diffusion/imgs/2022.01.26-16.25.15.png)
  
This very loosely based on how diffusion works.  
If we draw an imaginary barrier, and on one side the gas is much more dense than the other:  
  
Given that the particles are moving randomly (why is irrelevant for purpose of animation!) 
It stands to reason that if there are more particles on one side moving randomly then its more likely
that a higher quantity of particles will cross the line from this side. This work in every direction
since the movement is random.
  
![diffusion axiom](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u7_fp_diffusion/imgs/20220127_195932.jpeg)
  
More in depth explanation (Possibly made more complicated than necessary!) [The diffusion equation | Week 12 | MIT 18.S191 Fall 2020 | Grant Sanderson](https://www.youtube.com/watch?v=a3V0BJLIo_c)
Highly recommend [3Brown 1Blue](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw) GREAT content!    
  
So if we paint a dot on the canvas representing say 40000 particles in that space, the next step would be to distribute them equally in every direction in the next frame.
10K up, left, right & down. Then next step 2.5k from each pixel to its surrounding pixels etc etc. Not forgetting that particles cross in both directions!
see Some experiments Line 1A (see table below).  
  
A square matrix creates an aliasing effect and curves dont happen :/  
To get around this a hexagonal matrix is used with each point connecting to six points around it.
  
Each point is allocated a FabricCell object which is walled in by 6 neighbours.
  
Each of which is referenced in the walls array.  
  
![fabricCell connectome](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u7_fp_diffusion/imgs/fabric_array_connections.jpeg)  
  
### Understanding the FabricCell connectome diagram above:  
Each cell is painted with 4 pixels (2x2).  
TLHC is the X,Y fabric array position (canvas position is calculated from this & the offset).  
TRHC is the offset: 0 = no offset, 1 = offset by 1/2 CELLWIDTH  
  
#### The hexagonal numbers around a 0:  
If its a dot it means no neighbour. NULL pointer.  
If its a number its the number in the walls where a reference to that neighbour is stored.  
```
class FabricCell {
    this.walls = [];    // access neighbour - this.walls[TR].inMsgs
    this.msgs  = [];    // diffuse out from here
    this.inMsgs  = [];  // accumulate incoming here

// enum Walls                                   //   Cell Wall Reference
class Walls {                                   //   
  static ME = 0;  // this cell                  //         TL    TR   
  static L  = 1;  // left                       //          2    3
  static TL = 2;  // top left                   
  static TR = 3;  // top right                  //       L    ME    R
  static R  = 4;  // right                      //       1    0     4
  static BR = 5;  // bottom right                 
  static BL = 6;  // bottom left                //          6    5
  static MAX_FABRIC_WALLS = 7; // array size    //         BL    BR
};
```

In the animation cycle the whole fabric is painted and then particles are diffused into neighbours (and accumulated) ready for next cycle.






  
Some experiments:  
| A | B | C | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u7_fp_diffusion/imgs/2022.01.27-20.32.05.png) | ![sk]() | ![sk]() |
| Code @ [u7_fp_diffusion.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/bd248eeecf5ca825f3d2555b439fa13862c85c50/test_pages/u7_fp_diffusion/u7_fp_diffusion.js) | Code @ [u7_fp_diffusion.js]() | Code @ [u7_fp_diffusion.js]() | 
| ![sk]() | ![sk]() | ![sk]() |
| Code @ [u7_fp_diffusion.js]() | Code @ [u7_fp_diffusion.js]() | Code @ [u7_fp_diffusion.js]() | 
| ![sk]() | ![sk]() | ![sk]() |
| Code @ [u7_fp_diffusion.js]() | Code @ [u7_fp_diffusion.js]() | Code @ [u7_fp_diffusion.js]() | 


still
https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u7_fp_diffusion/imgs/Screenshot%202022-01-26%20at%2014.26.38.png
anim
https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u7_fp_diffusion/anim/2022.01.26-22.45.44.mp4
code
https://github.com/UnacceptableBehaviour/js_canvas/blob/1fda1252d9e3502cf44fbbf4d672c2509d7c6ab4/test_pages/u7_fp_diffusion/u7_fp_diffusion.js
  
Notes on experiments.  
  
### More Diffusion Rainbow



# Resources
#### Domestika - Creative Coding: Making Visuals with JavaScript
https://www.domestika.org/auth/login#course_lesson_28425  
[Creative Coding: Making Visuals with JavaScript](https://www.domestika.org/auth/login#course_lesson_28425)

#### Markdown syntax (.md)
https://www.markdownguide.org/basic-syntax/  
