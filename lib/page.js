
function makeCircle(left, top, line1, line2, line3, line4) {
    var c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 5,
      radius: 12,
      fill: '#fff',
      stroke: '#666'
    });
    c.hasControls = c.hasBorders = false;

    c.line1 = line1;
    c.line2 = line2;
    c.line3 = line3;
    c.line4 = line4;
    return c;
}

function makeRect(left, top, width, height) {
    var c = new fabric.Rect({
      left: left,
      top: top,
      strokeWidth: 5,
      width: 20,
      height: 20,
      fill: '#fff',
      stroke: '#666'
    });
    return c;
}

function makeLine(left, top, line1, line2, line3, line4) {
    var c = new fabric.Line({
      left: left,
      top: top,
      strokeWidth: 5,
      radius: 12,
      fill: '#fff',
      stroke: '#666'
    });
    c.hasControls = c.hasBorders = false;

    c.line1 = line1;
    c.line2 = line2;
    c.line3 = line3;
    c.line4 = line4;
    return c;
}