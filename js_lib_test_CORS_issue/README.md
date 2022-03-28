# JS Visualisation Tests 
This a great post about how to use vanilla canvas - clean code and well explained steps to creating it.  
[Canvas - javascript & html - Josh Bradley](https://joshbradley.me/object-collisions-with-canvas/) - [code](https://gist.github.com/joshuabradley012/bd2bc96bbe1909ca8555a792d6a36e04)
  
To fire up code and demonstrate module behaviour:
```
> git clone https://github.com/UnacceptableBehaviour/js_canvas
> cd js_canvas/js_lib_test_CORS_issue
> http-server -p 8000                   # fire up server navigate to landing page link
```

| Notes | Info | 
| - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/js_lib_test_CORS_issue/collision_canvas.png) | This a great post about how to use vanilla canvas - clean code and well explained steps to creating it. [Canvas - javascript & html - Josh Bradley](https://joshbradley.me/object-collisions-with-canvas/) - [code](https://gist.github.com/joshuabradley012/bd2bc96bbe1909ca8555a792d6a36e04)|
| Code @ [collision_canvas.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/js_lib_test_CORS_issue/collision_canvas.js) | [README.md](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/js_lib_test_CORS_issue/README.md) | 
  
**This hangs together like this:**
![sw_overview.jpg](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/js_lib_test_CORS_issue/sw_overview.jpg)
  
With the anonymous function being passed into the **animation** parameter, being called from within the **frame** function. The frame function is the one that is registered with requestAnimationFrame(frame) and re-registers itself at the end. See here:
  
```
const runAnimation = animation => {
  let lastTime = null;
  const frame = time => {
    if (lastTime !== null) {
      const timeStep = Math.min(100, time - lastTime) / 1000;

      // return false from animation to stop
      if (animation(timeStep) === false) {
        return;
      }
    }
    lastTime = time;
    requestAnimationFrame(frame);     // re-insert frame callback in animation Q
  };
  requestAnimationFrame(frame);       // start animation
};
```
  
# Resources
**Canvas - javascript & html - Josh Bradley**  
https://joshbradley.me/object-collisions-with-canvas/  
[code](https://gist.github.com/joshuabradley012/bd2bc96bbe1909ca8555a792d6a36e04)  
  
**window.requestAnimationFrame(callback)**
https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  
**W3 Canvas Reference**  
https://www.w3schools.com/tags/ref_canvas.asp  
  
**Markdown syntax (.md)**  
https://www.markdownguide.org/basic-syntax/  


