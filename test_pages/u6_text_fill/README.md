# U6 - Sketch - Fonts - aligning - Bit reading 
Contents notes:  
Canvas fonts - fillText: https://www.w3schools.com/tags/canvas_font.asp
Alignment - https://www.w3schools.com/tags/canvas_textbaseline.asp
Canvas 2d Ref Mozilla: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
measureText: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText
    
  
Some experiments:
| 1 | 2 | 3 | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u6_text_fill/2022.01.11-18.30.43.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u6_text_fill/2022.01.11-20.34.58.png) | ![sk]() |
| Code @ [sketch-05.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/e494f399d9f610c4b33930f2651ca72b4eab8b2f/test_pages/u6_text_fill/sketch-05.js) | Code @ [sketch-05.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/497338f1b3d73796bf9d217e37253a3495eb1bb6/test_pages/u6_text_fill/sketch-05.js) | Code @ [sketch-05.js]() | 
| ![sk]() | ![sk]() | ![sk]() |
| Code @ [sketch-05.js]() | Code @ [sketch-05.js]() | Code @ [sketch-05.js]() | 
| ![sk]() | ![sk]() | ![sk]() |
| Code @ [sketch-05.js]() | Code @ [sketch-05.js]() | Code @ [sketch-05.js]() | 
  
Notes on experiments.
  
  
  
# Resources
#### Domestika - Creative Coding: Making Visuals with JavaScript
https://www.domestika.org/auth/login#course_lesson_28425  
[Creative Coding: Making Visuals with JavaScript](https://www.domestika.org/auth/login#course_lesson_28425)
  
#### canvas-sketch (npm package)
https://github.com/mattdesl/canvas-sketch  
From README.md:  
canvas-sketch is a loose collection of tools, modules and resources for creating generative art in JavaScript and the browser.  
[canvas-sketch documentation](https://github.com/mattdesl/canvas-sketch/blob/master/docs/README.md)  

#### Exporting Animations
https://github.com/mattdesl/canvas-sketch/blob/master/docs/exporting-artwork.md#exporting-animations
```
> sudo npm install @ffmpeg-installer/ffmpeg --global    # install video encoder - enables --stream flag in CLI
> canvas-sketch sketch-03 --output=anim --stream        # re-run w/ --stream flag set
#      ^cmd     ^project name  ^o/p folder   ^allow direct capture to video
# CTRL + SHIFT + S to start recording, and same to stop
```

#### Tweakpane - npm package - Hiroki Kokubun
https://github.com/cocopon/tweakpane
UI Gadget that allows you to live tweak model parameters on screen.


#### Canvas Sketch Utils
math, random, color, geometry ,penplot, shader
https://github.com/mattdesl/canvas-sketch-util

#### W3 Canvas Reference
https://www.w3schools.com/tags/ref_canvas.asp

#### Node Reference
https://nodejs.dev/learn/where-does-npm-install-the-packages
