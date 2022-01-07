# U3 - Sketch Transforms
Contents notes:  
command | description
| - | - |
context.translate(x,y) | Remaps the (0,0) position on the canvas
context.rotate(45 * Math.PI / 180) | rotates around origin (0,0) in rads - Equation shows 45deg in rads
context.save() & context.restore() | save and restore context state
canvas-sketch-util | [canvas-sketch-util](https://github.com/mattdesl/canvas-sketch-util)  
  
Testing understanding - translate rotate:  
![canvas-sketch](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/01-translate-rotate.png)  
Code @ [sketch-02.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/efdcdd07826df5c5b8e8721b5c3ae99c9b3df5f7/test_pages/u3_sktch_transform/sketch-02.js)
  
Running canvas-sketch:  
```
> cd u3_sktch_transform
> canvas-sketch sketch-02 --new --open  # NO .js -creates template file sketch-02.js
> canvas-sketch sketch-02 --open        # opens a new browser tab
```
  
I'm sure there's a reason for doing it this way!
v1 | v2
| - | - |
![canvas-sketch](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/02-25-slices.png) | ![canvas-sketch](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/03-untils.png)  
Code @ [sketch-02.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/e6420bce798bb87b03b7a50b2fe37cf94d03c0ae/test_pages/u3_sktch_transform/sketch-02.js) | Code @ [sketch-02.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/3c9105e59dc721d79d172e783e3ed1fb0e0cb9de/test_pages/u3_sktch_transform/sketch-02.js)  

  
  
# Resources
#### Domestika - Creative Coding: Making Visuals with JavaScript
https://www.domestika.org/auth/login#course_lesson_28425  
[Creative Coding: Making Visuals with JavaScript](https://www.domestika.org/auth/login#course_lesson_28425)
  
#### canvas-sketch (npm package)
https://github.com/mattdesl/canvas-sketch  
From README.md:  
canvas-sketch is a loose collection of tools, modules and resources for creating generative art in JavaScript and the browser.  
[canvas-sketch documentation](https://github.com/mattdesl/canvas-sketch/blob/master/docs/README.md)  

#### W3 Canvas Reference
https://www.w3schools.com/tags/ref_canvas.asp

