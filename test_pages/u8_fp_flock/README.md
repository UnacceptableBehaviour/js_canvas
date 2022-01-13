# Final Project - Flock of boids
JS visualization exe using canvas sketch.  
  
## Steps  
1. 40 birds in a x * y * z cube.  
Represent a bird with a circle. A dot if on far face, 40px circle if on near face.  
Draw static line of birds, diagonally. From (0,50,100) to (100,50,0). Z=0 being front.  
Get rendering working.  
Add black stroke around the edge of circle so boids can be distinguished.

Initially add velocity and fly in straight line bouncing off birdcage walls.  
  
Add tweak panel.  
  
  
2. Create a bird type & state: lead / follower bird, landed / flying.  
  
3. Generate lead bird flight: Change direction randomly to start. New direction should be inside the forward hemisphere of current direction.  
  
Some experiments:  
| 1 | 2 | 3 | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u8_fp_flock/2022.01.13-00.53.35.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u8_fp_flock/2022.01.13-11.05.53.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u8_fp_flock/2022.01.13-12.09.37.png) |
| Code @ [u8_fp_flock.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/f6d6ac88c0342b6f0cf6a9ead2f2c6677de5f2c9/test_pages/u8_fp_flock/u8_fp_flock.js) | Code @ [u8_fp_flock.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/8cedf36999324846dae38e2e8ed00a02235e4f8f/test_pages/u8_fp_flock/u8_fp_flock.js) | Code @ [u8_fp_flock.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/0257b3b42294a290537521a121e3fd2461d593d1/test_pages/u8_fp_flock/u8_fp_flock.js) | 
| ![sk]() | ![sk]() | ![sk]() |
| Code @ [u8_fp_flock.js]() | Code @ [u8_fp_flock.js]() | Code @ [u8_fp_flock.js]() | 
| ![sk]() | ![sk]() | ![sk]() |
| Code @ [u8_fp_flock.js]() | Code @ [u8_fp_flock.js]() | Code @ [u8_fp_flock.js]() | 
  
Notes on experiments.  
  



# Resources
#### Domestika - Creative Coding: Making Visuals with JavaScript
https://www.domestika.org/auth/login#course_lesson_28425  
[Creative Coding: Making Visuals with JavaScript](https://www.domestika.org/auth/login#course_lesson_28425)

#### Markdown syntax (.md)
https://www.markdownguide.org/basic-syntax/


#### Murmurations
https://scitechdaily.com/patterns-of-flocks-of-starlings-mathematically-behave-how-magnets-would-move/

Visual w track: https://www.youtube.com/watch?v=YjDYE5CUb7Q

Boids Algorithm: https://www.youtube.com/watch?v=4LWmRuB-uNU
1. Fly towards centre of mass
2. Avoid other birds
3. Match Velocity of Nearest neighbours ()

