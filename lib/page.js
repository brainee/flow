
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
      left: left||0,
      top: top||0,
      strokeWidth: 5,
      width: width||50,
      height: height||50,
      fill: '#ff0',
      stroke: '#666'
    });
    return c;
}

  function makeLine(coords) {
    return new fabric.Line(coords, {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
      selectable: false
    });
  }