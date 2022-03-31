# End of Course Project 4 - Maths Tiles
### Aim
Try and reproduce something like this page [here](https://soulwire.co.uk/math-for-motion/) from Justin Windle
A creative developer whos work I was introduced to doing this course.
  
### 1. Create a MathsTile class  
Create a frame border for the tile - prototyping.  
Centre a dot - a circular representation of the pulse of the equation.  
Pass an equation callback.  
Equation runs a 360deg/2pi cycle  
Draw line  
  - frequency or wavelength will govern the plot across the tile  
  - and the radius of the pulsing shape - circle in the prior art  
[Rough Code for this step](https://github.com/UnacceptableBehaviour/js_canvas/tree/fef9827a151e83704a811ba1b6f1ff0f74a4b191)
  
### 2. Draw a set of labelled tile objects with a different equation in each one.
Create equation array with title, color & equation callback.  
Modify MathTile class to take title and display it at bottom of tile.  
Centre the text, font currently hardcoded.  
Sit tiles evenly in available display area.
Code starting to look a bit more presentable. [CODE: 12 tiles 4x3](https://github.com/UnacceptableBehaviour/js_canvas/blob/f061f6283458a79b2545d58a226f466026898292/test_pages/u10_fp_math_functions/u10_fp_math_functions.js).  
  
### 3. How to add unit tests maybe?
Add paint metrics.  
Add mode to draw lines from adjacent points, instead of dots.  
Paint on internal object canvas and copy to main canvas to clip MathTile.  
  
### X. How to add unit tests maybe?
  
**Some experiments:**  
| 1 | 2 | 3 | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.03.30-19.03.52.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.03.30-19.57.16.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.03.30-20.47.30.png) |
| Code @ [u10_fp_math_functions.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/e41fa1e19bd49fd3987455c2eb2f8b58df2f3d30/test_pages/u10_fp_math_functions/u10_fp_math_functions.js) | Code @ [u10_fp_math_functions.js](https://github.com/UnacceptableBehaviour/js_canvas/tree/fef9827a151e83704a811ba1b6f1ff0f74a4b191) | Code @ [u10_fp_math_functions.js](https://github.com/UnacceptableBehaviour/js_canvas/tree/fef9827a151e83704a811ba1b6f1ff0f74a4b191) |
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.03.31-14.37.35.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.03.31-14.41.13.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.03.31-14.51.30.png) |
| Debug markers in place. | Color scheme added. | Code @ [u10_fp_math_functions.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/f061f6283458a79b2545d58a226f466026898292/test_pages/u10_fp_math_functions/u10_fp_math_functions.js) |
| ![sk]() | ![sk]() | ![sk]() |
| Code @ [u10_fp_math_functions.js]() | Code @ [u10_fp_math_functions.js]() | Code @ [u10_fp_math_functions.js]() |
  
To see short animation navigate [here]() and click DOWNLOAD for mp4. (Ver: add HASH)
  


# Resources
**Text Metrics**  
https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics

**NPM package manager**  
https://www.digitalocean.com/community/tutorials/how-to-use-node-js-modules-with-npm-and-package-json
  
**Creating a module - both installing or linking to local repo dir**  
https://www.digitalocean.com/community/tutorials/how-to-create-a-node-js-module  
  
**Add Node.js ref to modules**
https://nodejs.org/api/modules.html  
  
**40 useful node packages here**  
https://leanylabs.com/blog/npm-packages-for-nodejs/
  
**NPM website**  
https://www.npmjs.com/  
