const canvasSketch = require('canvas-sketch');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// helpers  - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const cl = (str) => {
  console.log(str);
}

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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let manager;

const settings = {
  dimensions: [ 1080, 1080 ]
};

let opTxt = '𝛅'; //'𝛑'; //'𝛀' '𝚿' '𝛅' '𝛜' '𝛛'  '𝛑'  '𝛍' '𝛟';
let fontSize = 1200;
let fontFamily = 'serif';

// data source canvas
const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  // data source canvas
  const cell = 20;  // cell dimension
	const cols = Math.floor(width  / cell);
	const rows = Math.floor(height / cell);
	const numCells = cols * rows;

	typeCanvas.width  = cols;   // scaled down dataSourceContext 1 pixel per cell
	typeCanvas.height = rows;
  
  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);
    
    fontSize = cols * 1.2;              // dataSourceContext
    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';
    
    
    let textMetrics = typeContext.measureText(opTxt);
    cl(textMetrics);

		const mx = textMetrics.actualBoundingBoxLeft * -1;
		const my = textMetrics.actualBoundingBoxAscent * -1;
		const mw = textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight;
		const mh = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;    

    // translate to centre
    const x = (cols - mw) * 0.5 - mx;
    const y = (rows - mh) * 0.5 - my;

    typeContext.save();               // place dataSource Text 
    typeContext.translate(x, y);
    
    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();
    typeContext.fillText(opTxt, 0, 0);
    
    typeContext.restore();
    
    // legacy diagnostics
    //placementMarker(context, 0, 0, 'red');
    // placeHorizMeasure(ctx, text, xl, xr, y, col, lnD, lnW = 2)
    //placeHorizMeasure(context, `mw (${Math.floor(mw)})`, mx, mx+mw, my+mh+10, 'blue', 15);
    // function placeVertMeasure(ctx, text, x, yt, yb, col, lnD, lnW = 2)
    //placeVertMeasure(context, `mh (${Math.floor(mh)})`, mx+mw+10, my, my+mh, 'blue', 15);
    //placementMarker(context, mx, my, 'blue');    
    
    const typeData = typeContext.getImageData(0,0,cols,rows).data;
    //cl(typeData);                         // data large array RGBA
    //context.drawImage(typeCanvas, 0, 0);  // place image on main canvas context fro debug/display
                                            // this isn't necessary to read the data & construct art
    
    for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);

			const x = col * cell;
			const y = row * cell;

			const r = typeData[i * 4 + 0];
			const g = typeData[i * 4 + 1];
			const b = typeData[i * 4 + 2];
			const a = typeData[i * 4 + 3];
			//
			//const glyph = getGlyph(r);
			//
			//context.font = `${cell * 2}px ${fontFamily}`;
			//if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;
			//
			//context.fillStyle = 'white';
      context.fillStyle = `rgb(${r}, ${g}, ${b})`;  // 'rgb(255,0,255)'; paint magenta
      //cl(`rgb(${r}, ${g}, ${b})`);
			context.save();
			context.translate(x, y);
			//context.translate(cell * 0.5, cell * 0.5);

			context.fillRect(0, 0, cell, cell);
			//context.fillText(glyph, 0, 0);
			
			context.restore();

		}
  };
};

const onKeyUp = (e) => {
	opTxt = e.key.toUpperCase();
	manager.render();
};

document.addEventListener('keyup', onKeyUp);

const start = async () => {
	manager = await canvasSketch(sketch, settings);   // returns new SketchManager();
};

start();  // instantiate
// instead of just running once w/
// canvasSketch(sketch, settings);
// assign sketchManger and call it when key up events happen


