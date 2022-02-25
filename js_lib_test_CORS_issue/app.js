import { collidingBalls } from './collision_canvas.js';
// note on using import - module syntax
// https://bobbyhadz.com/blog/javascript-syntaxerror-cannot-use-import-statement-outside-module

// use .mjs in node?
// https://exerror.com/uncaught-syntaxerror-cannot-use-import-statement-outside-a-module-when-importing-ecmascript-6/


console.log('collidingBalls(); - - - S');
document.addEventListener('DOMContentLoaded', (event) => {
    collidingBalls();
});
console.log('collidingBalls(); - - - E');


// - - - - Summary
// f() calls push onto the stack
// setTimeout(callback, timeout) passes callback to eventTable / Web API
//                  - this put callBack in the msgQ at appropriate time - set by timeout
// requestAnimationFrame(callback) puts callback into start of the rendering steps
//                  - rendering steps: callback, Style Calcs, Layout Tree, Pixel Render
// Event Loop:
// Execute off stack first. (UNTIL EMPTY)
// Pull callbacks from msgQ push to stack
// RenderQ - exec renderQ 60FPS insert between msgQ call back as appropiate
// MicrotasksQ (used for Promises) - Waits until stack empty, then highest priority, keep being serviced until uTaskQ empty!
//
// Event Loop in 3m
// https://www.youtube.com/watch?v=5YcMKYTZZvk
//
// Event Loop - in Depth
// https://www.youtube.com/watch?v=8aGhZQkoFbQ
//
// Node Event Loop
// https://www.youtube.com/watch?v=zphcsoSJMvM
//
// Event Loop Visualized - how requestAnimationFrame fits into the picture, and microTasks 27m30
// https://www.youtube.com/watch?v=cCOL7MC4Pl0



// https://www.toptal.com/javascript/interview-questions

const delay = 4;
// synchronous - bad - blocks rendering
// forEach is on the stack until all aelemnts processed so if they take a long time they could block rendering
[1,2,3,4].forEach( element => {
    console.log(`This coulds be a huge call ${element}`);
    let count = 0;
    while (count < delay) {
      count += 1;
      console.log(count);
    }
});


function asyncCallbackArray(arr) {
  arr.forEach(
    callback => { setTimeout( a => { console.log(`Asynch callback ${callback}`); }, 0 ) }
  );
}

asyncCallbackArray([1, 2, 3, 4]);

console.log('\n\nTESTS from ');
const sum = (m) => {
    return (n) => { return m + n; };
};

console.log(sum(2)(3));

// for (var i = 0; i < 5; i++) {    // I think this creates i on the heap so all console logs 5 ln 72
for (let i = 0; i < 5; i++) {       // using let assigns the number as expected
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode(`Button ${i}`));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}

// quite a COMMON PATTERN to KEEP THE STACK CLEAR - and thus not blocke evernts & rendering
function readHugeList() { return [11,22,33,44,55,66] };
var list = readHugeList();
var nextListItem = function() {     // the recursive functionality is retained by 
    var item = list.pop();          // pushing the next call onto the eventQ - leaving the stack clear

    if (item) {
        console.log(item); // process the list item...
        setTimeout( nextListItem, 0);
    }
};
nextListItem();



// JS weirdness
var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;   // the parameter b is stringified to "[object Object]" as opposed to using object id as in python
a[c]=456;   // the parameter c is stringified to "[object Object]"

console.log('> a[b] - - - - - S');
console.log(a[b]);  // so this yields 456
console.log(b.toString());
console.log(c.toString());
console.log('> a[b] - - - - - E');

//Create a function that, given a DOM Element on the page, will visit the element itself and all of its
//descendents (not just its immediate children). For each element visited, the function should pass that
//element to a provided callback function.
//
//The arguments to the function should be:
//a DOM element
//a callback function (that takes a DOM element as its argument)

function elementInspect(element) {
  console.log(elment);
}

function processTaregtAndDescendants(theElement, callback) {
  var descendants = Array.from(theElement.querySelectorAll("*"));
  
  descendants.unshift(theElement);

  descendants.forEach( e => { callback(e); } );
}
//processTaregtAndDescendants(target, elementInspect);

// Their answer
// Visiting all elements in a tree (DOM) is a classic Depth-First-Search algorithm application. Here’s an example solution:
function Traverse(p_element,p_callback) {
   p_callback(p_element);
   var list = p_element.children;
   for (var i = 0; i < list.length; i++) {
       Traverse(list[i],p_callback);  // recursive call
   }
}








