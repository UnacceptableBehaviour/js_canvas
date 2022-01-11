const canvasSketch = require('canvas-sketch');

// helpers
const cl = (str) => {
  console.log(str);
}

const settings = {
  dimensions: [ 1080, 1080 ]
};

function placeHorizMeasure(ctx, text, xl, xr, y, col, lnD, lnW = 2) {
  
  //   |                                 |      < lnD(epth)
  //   xl             texts              xr
  //                    |
  //                    ^ markMidddle
  ctx.save();
  
  // font def
  let fontSize = (lnD*2).toString();
  ctx.font = `${fontSize}px serif`;
  ctx.textBaseline = 'middle'; // hanging
  ctx.textAlign = 'center';

  
  let markMiddle = xl + (xr - xl) / 2;
  textMetrics = ctx.measureText(text);
  let textStart = markMiddle;
  
  // place left vert line
  ctx.beginPath();
  ctx.lineWidth = lnW;
  ctx.strokeStyle = col; // colour
  ctx.moveTo(xl, y);
  ctx.lineTo(xl, y+lnD);  // line depth - marker depth
  ctx.stroke(); 

  // place right vert line
  ctx.beginPath();
  ctx.lineWidth = lnW;
  ctx.strokeStyle = col; // colour
  ctx.moveTo(xr, y);
  ctx.lineTo(xr, y+lnD);  // line depth - marker depth
  ctx.stroke(); 

  // place text between if it fits below if not
  ctx.fillStyle = col;
  ctx.fillText(text, textStart, y+lnD);
  ctx.restore();
}

function placeVertMeasure(ctx, text, x, yt, yb, col, lnD, lnW = 2) {
  
  //   - yt
  //  
  //                
  //       texts  < markMidddle
  //
  //
  //    - yb
  //
  ctx.save();
  
  // font def
  let fontSize = (lnD*2).toString();
  ctx.font = `${fontSize}px serif`;
  ctx.textBaseline = 'middle'; // hanging
  ctx.textAlign = 'left';
  //
  //
  let markMiddle = yt + (yb - yt) / 2;
  
  // place top horiz line
  ctx.beginPath();
  ctx.lineWidth = lnW;
  ctx.strokeStyle = col; // colour
  ctx.moveTo(x, yt);
  ctx.lineTo(x+lnD, yt);  // line depth - marker depth
  ctx.stroke(); 

  // place bot horiz line
  ctx.beginPath();
  ctx.lineWidth = lnW;
  ctx.strokeStyle = col; // colour
  ctx.moveTo(x, yb);
  ctx.lineTo(x+lnD, yb);  // line depth - marker depth
  ctx.stroke(); 

  // place text between if it fits below if not
  ctx.fillStyle = col;
  ctx.fillText(text,  x+lnD, markMiddle);
  ctx.restore();
}

function placementMarker(ctx, x,y, col='red') {
    ctx.save();
    // show rect place
    ctx.beginPath();
    ctx.fillStyle = col;
    ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.fill(); 
    ctx.restore();   
}


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = 'black';
    context.font = '900px serif';
    context.textBaseline = 'top';
    //context.textBaseline = 'middle';
    //context.textAlign = 'center';     // ** WARNING ** NOT context.textAlign('center'); function!
    
    opTxt = 'ox';
    
    let textMetrics = context.measureText(opTxt);
    cl(textMetrics);
    // Dumps
    //TextMetrics {width: 866.6015625,
    //      actualBoundingBoxLeft: 415.72265625,
    //      actualBoundingBoxRight: 413.37890625,
    //      fontBoundingBoxAscent: 780,
    //      fontBoundingBoxDescent: 600, …}
    //actualBoundingBoxAscent: 508.0078125
    //actualBoundingBoxDescent: 300
    //actualBoundingBoxLeft: 415.72265625
    //actualBoundingBoxRight: 413.37890625
    //fontBoundingBoxAscent: 780
    //fontBoundingBoxDescent: 600
    //width: 866.6015625

		const mx = textMetrics.actualBoundingBoxLeft * -1;
		const my = textMetrics.actualBoundingBoxAscent * -1;
		const mw = textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight;
		const mh = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;    

    // to centre

    context.save();
    //context.translate(width * 0.5, 0);
    
    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();
    //context.restore();
    // placeHorizMeasure(ctx, text, xl, xr, y, col, lnD, lnW = 2)
    placeHorizMeasure(context, `mw (${Math.floor(mw)})`, mx, mx+mw, my+mh+10, 'blue', 15);
    // function placeVertMeasure(ctx, text, x, yt, yb, col, lnD, lnW = 2)
    placeVertMeasure(context, `mh (${Math.floor(mh)})`, mx+mw+10, my, my+mh, 'blue', 15);
    placementMarker(context, mx, my, 'blue');

    context.fillText(opTxt, 0, 0);
    placementMarker(context, 0, 0, 'red');
    
    context.restore();
  };
};

canvasSketch(sketch, settings);
