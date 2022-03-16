# End of Course Project 3 - Random Target, Shortest Path
### Aim
Based on the code form [class 3](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u4_animation/README.md) as a starting point.  
Select two nodes in the graph and calculate the shortest path between the nodes.  
Highlight the path.  
Create a algorithms library module to provide the functionality.   
  
### 1. Create Node module for algorithms  
Aim to make this into a git subsystem later. TODO and link to gist.
```
> cd js_canvas/test_pages/u9_fp_random_target
> npm search algos		# check if there's already a package wit the name!
> mkdir -p lib/algos_sftest		# call it something else!!
> cd lib/algos_sftest
> npm init -y			# create module package.json file -y say yes to all
```
  
Add **algos_sftest** test code:
```
> nano index.js

File: u9_fp_random_target/lib/algos_sftest/index.js
// algos support module
// helpers
const cl = (str) => {
  console.log(str);
};

function algoInfo() {
  cl('[algos] Hello!');
};

// use export built in to export interface - shortcut for module.export
exports.algoInfo = algoInfo;

cl('FROM MODULE: algos_sftest');
```
Include it in app file (u9_fp_random_target.js) to test.
```
File: u9_fp_random_target/u9_fp_random_target.js

const algos = require('algos_sftest');
cl('IMPORTED MODULE: algos_sftest');
algos.algoInfo();
```
  
Create link to this package:
```
> cd u9_fp_random_target/lib/algos_sftest/    # module directory
> sudo npm link			# make link in /usr/local/lib/node_modules
added 1 package, and audited 3 packages in 1s
found 0 vulnerabilities

> ls /usr/local/lib/node_modules/algos		# check worked!
index.js		package.json

> cd ../..		# js_canvas/test_pages/u9_fp_random_target/
> sudo npm link algos
added 1 package, and audited 56 packages in 1s
11 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities

> ls -la node_modules
lrwxr-xr-x   1 root   staff     12 10 Mar 07:46 algos -> ../lib/algos
```
  
So we don't get problem when running canvas-sketch like:
```
  → Installing dependencies:  
    algos_sftest  

npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/algos_sftest - Not found
```
  
Edit package.json file:
```
> nano package.json

File: u9_fp_random_target/lib/algos_sftest/package.json
{
  "name": "u9_fp_random_target",
  "version": "1.0.0",
  "description": "",
  "main": "u9_fp_random_target.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "algos_sftest": "^1.0.0",		     < Add line left of arrow
    "canvas-sketch": "^0.7.4",
    "canvas-sketch-util": "^1.10.0"
  }
}
```  
  
### 2. Add tweakpane get a feel for sensible parameter settings  
Number of nodes, distance at which to connect to make a network thats not too over-connected.
See 1st 6 images below. Blue and red node are route start & finish nodes

**Some experiments:**  
| 1 | 2 | 3 | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.10-17.10.44.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.10-19.37.25.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.10-19.38.12.png) |
| Code @ [u9_fp_random_target.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/fc610f4ddc7dde1d54572d3e60bac26bbdf1ff84/test_pages/u9_fp_random_target/u9_fp_random_target.js) | testing line types | testing # of nodes | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.10-19.38.26.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.10-19.38.32.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.10-19.38.40.png) |
| testing connection types | testing connection types | testing connection types | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.13-19.55.17.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.13-19.31.46.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.13-19.32.50.png) |
| Code @ [u9_fp_random_target.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/b06198baa8ad26ff6bed0ed5eb69aad1f8cb5b8f/test_pages/u9_fp_random_target/u9_fp_random_target.js)  git vs no to match lib  0a697bf837f94b20292a3064da15a7357cf3e859 | More nodes | More nodes | 
  
To see short animation navigate [here](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/anim/2022.03.15-19.28.22.mov) and click DOWNLOAD for mp4.
  
### X. Next steps
Create a graph from the nodes & link in the current frame.
Think about the API to the Algo library
Components needed for Dijkstra.


  




# Resources
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
