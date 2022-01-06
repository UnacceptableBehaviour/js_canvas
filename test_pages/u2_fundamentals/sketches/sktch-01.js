const canvasSketch = require('canvas-sketch');  // load lib as reference canvasSketch

const settings = {            // create settings object
  dimensions: [ 600, 600 ]
};

// callback anonymous function for 
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    
    const w = 60;
    const h = 60;
    const gap = 20;
    let x,y;

    context.fillStyle = 'black';         // property
    context.fillRect(0,0,600,600);

    for (let i=0; i < 5; i++){
      for (let j=0; j < 5; j++){
        x = 100 + (w + gap) *i;
        y = 100 + (h + gap) *j;
        
        context.strokeStyle = "white";
        context.beginPath();            // outer rect
        context.rect(x,y, w,h);
        context.stroke();       
    
        // on refresh draws inner rect in different places
        if (Math.random() > 0.5) {
          context.beginPath();            // inner rect
          context.rect(x+8,y+8, w-16,h-16);
          context.stroke();       
        }
      }
}
  };
};

canvasSketch(sketch, settings);
