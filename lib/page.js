var log = function() {
  //console.log.apply(console,arguments);
};
var iTask=fnParam('task')||1,iWorkFlow;
var aAllStep = [],aHasDrawn=[],aHistory=[],
  iDistanse = 100;
var oConf = {};
oConf.arrow = {
  strokeWidth: 1,
  width: 100,
  height: 10
};
oConf.text = {
  fontSize: 16,
  lineWidth:10
};

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

function getConf(type) {
  switch (type) {
    case 'rect':
      return getRectConf();
    case 'image':
      return getImageConf();
    default:
      return getImageConf();
  }
}

function getRectConf() {
  return {
    left: 0,
    top: 0,
    strokeWidth: 1,
    width: 50,
    height: 50,
    fill: '#ff0',
    stroke: '#666'
  };
}

function getImageConf() {
  return {
    left: 0,
    top: 0,
    width: 50,
    height: 50,
    strokeWidth: 0,
    angle: 0,
    opacity: 1
  };
}

function makeRect(rectConf) {
    var c = new fabric.Rect(rectConf || getConf());
    return c;
  }
  //makeImage width conf.imgElement or conf.url,conf.callback
function makeImage(conf) {
    conf = conf || getImageConf();
    if (conf.callback) {
      fabric.Image.fromURL(conf.url, function(oImg) {
        //conf.canvas.add(oImg);
        return conf.callback(oImg);
      });
    } else {
      var imgElement = conf.imgElement;
      var c = new fabric.Image(imgElement);
      return c;
    }
  }
  //makeLine
function makeLine(coords) {
    return new fabric.Line(coords, {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
      selectable: false
    });
  }
  //makeArrowAsyn
function makeArrowAsyn(conf) {
  var svg = '<svg style="" width="114" height="15" pointer-events="none" version="1.1" xmlns="http://www.w3.org/1999/xhtml"><path d="M 0 7.5 L 90 7.5" pointer-events="all" version="1.1" xmlns="http://www.w3.org/1999/xhtml" style="" fill="none" stroke="gray" stroke-width="{0}"></path><path pointer-events="all" version="1.1" xmlns="http://www.w3.org/1999/xhtml" d="M100,7.5 L67,12.5 L73,7.5 L67,2.5 L100,7.5" class="" stroke="gray" fill="gray"></path></svg>';
  fabric.loadSVGFromString(svg.format(oConf.arrow.strokeWidth), function(option) {
    var group = new fabric.Group([option[0], option[1]], {
      left: 0,
      top: 0
    });
    conf.callback && conf.callback(group);
  });
}

function makeArrow(conf) {
  var shap = new fabric.Text("→", _.extend({
    fontSize: conf.fontSize || oConf.arrow.fontSize,
    stroke: '#c3bfbf',
    strokeWidth: oConf.arrow.strokeWidth
  }, conf));
  return shap;
}

function fnJson(param,callback){
    var obj={
        url: '',
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            callback(data);
        },
        error:function(e){
            alert(e);
            callback(e);
        }
    };
    if(typeof param=='object'){
        param=$.extend(obj,param);
        param.url=param.url+(param.url.indexOf('?')?'&':'?')+$.param(param.data);
    }else if(typeof param=='string'){
        obj.url=param;
        param=obj;
    }else{
      alert('您传入的数据不合法！')
    }
    $.ajax(param);
    // $.getJSON(param.url, function(res){callback(res);});
}