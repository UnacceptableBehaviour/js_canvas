# Final Project - Flock of boids
JS visualization exe using canvas sketch.  
  
## Steps  
1. 40 birds in a x * y * z cube.  
Represent a bird with a circle. A dot if on far face, 40px circle if on near face.  
Draw static line of birds, diagonally. From (0,50,100) to (100,50,0). Z=0 being front.  
Get rendering working.  
Add black stroke around the edge of circle so boids can be distinguished.  
Initially add velocity and fly in straight line bouncing off birdcage walls.  
  
2. Add tweak panel.  
```
> npm i tweakpane           # at terminal
                            # include package in code
const tweakpane = require('tweakpane');
```
  
3. Rule 1

x. Maintain list of nearest 7 boids - use bruteforce approach to start.

X. Create a boids type & state: lead bird.  
  
X. Generate lead boids flight: Change direction randomly to start.
New direction should be inside the forward hemisphere of current velocity.  
  

  
Some experiments:  
| 1 | 2 | 3 | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u8_fp_flock/2022.01.13-00.53.35.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u8_fp_flock/2022.01.13-11.05.53.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u8_fp_flock/2022.01.13-12.09.37.png) |
| Rendering boids @ [u8_fp_flock.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/f6d6ac88c0342b6f0cf6a9ead2f2c6677de5f2c9/test_pages/u8_fp_flock/u8_fp_flock.js) | Z-Order & outline @ [u8_fp_flock.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/8cedf36999324846dae38e2e8ed00a02235e4f8f/test_pages/u8_fp_flock/u8_fp_flock.js) | Straight line +bounce @ [u8_fp_flock.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/0257b3b42294a290537521a121e3fd2461d593d1/test_pages/u8_fp_flock/u8_fp_flock.js) | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u8_fp_flock/2022.01.13-13.55.54.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u8_fp_flock/2022.01.13-19.25.39.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u8_fp_flock/2022.01.14-14.20.53.png) |
| Add Tweakpane @ [u8_fp_flock.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/e60d98fb22722167d1204d26061cd756a071db45/test_pages/u8_fp_flock) | Rule1 cluster centre scene @ [u8_fp_flock.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/6f7e87edc86729c82f9eecdce42aa5d9519e063b/test_pages/u8_fp_flock/u8_fp_flock.js) | Rule1 centre flock @ [u8_fp_flock.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/9e483a53105c56c987572a81f6803ca642ea038b/test_pages/u8_fp_flock/u8_fp_flock.js) | 
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
Visual w track: https://www.youtube.com/watch?v=YjDYE5CUb7Q  
    
Boids Algorithm: https://www.youtube.com/watch?v=4LWmRuB-uNU  
1. Fly towards centre of mass.  
2. Avoid other birds.  
3. Match Velocity of Nearest neighbours.  
It doesn't mention a lead bird, the simulation drops a load of random boids onto the canvas and runs from there.  


