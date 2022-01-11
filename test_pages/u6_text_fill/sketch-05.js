const canvasSketch = require('canvas-sketch');

// helpers
const cl = (str) => {
  console.log(str);
}

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = 'black';
    context.font = '1200px serif';
    context.textBaseline = 'top';
    //context.textBaseline = 'middle';
    //context.textAlign = 'center';     // ** WARNING ** NOT context.textAlign('center'); function!
    
    opTxt = 'A';

		context.save();
    //context.translate(width * 0.5, height * 0.5);

		context.fillText(opTxt, 0, 0);
		context.restore();
    
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
    
    context.save();
    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();
    context.restore();
    
    
  };
};

canvasSketch(sketch, settings);
