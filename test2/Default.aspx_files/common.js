//注册设置高度事件（如需要根据窗口大小变化自动调整，则调用这个）
function autoFit(objId, subHight) {
    if (window.addEventListener) {  // firefox  , w3c 
        window.addEventListener("load", function () { setHeight(objId, subHight) });
        window.addEventListener("resize", function () { setHeight(objId, subHight) });
    }
    else if (window.attachEvent) {  //ie
        window.attachEvent("onload", function () { setHeight(objId, subHight); }, false);
        window.attachEvent("onresize", function () { setHeight(objId, subHight); }, false);
    }
}

//设置元素高度，subHeight参数为 "元素底部" 距离 "页面底部" 的高度
function setHeight(objId, subHight) {
    var elem = document.getElementById(objId);
    var elemTop = elem.offsetTop;
    var e = elem;
    while (e = e.offsetParent) {
        elemTop += e.offsetTop;
    }
    
    var wHeight = (window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight));
    var newHeight = wHeight - subHight - elemTop;

    //以防高度结算结果为负数时报错
    if (newHeight > 10) {
        elem.style.height = newHeight + "px";
    }    
}

//绑定收缩控制（objId为触发控件的id，collapse指定默认是否收缩，所有标记ref属性的元素为受控元素）
function bindCollapse(objId, visible) {
    if (visible == undefined) {
        visible = false;
    }    
    var obj = $("#" + objId);
    var ref = $("[ref='" + objId + "']");

    obj.css("cursor", "pointer");

    if (visible == false) {
        ref.css("display", "none");
        obj.attr("title", "展开选项");
    }
    else {
        obj.attr("title", "收起选项");
    }

    obj.click(function () {
        ref.toggle();
        if (ref.css("display") == "none") {
            obj.attr("title", "展开选项");
        }
        else {
            obj.attr("title", "收起选项");
        }
    });
}

//根据下拉框的选择，决定元素的显示，ojbId为下拉框的ID，控制方式为受控元素设置 ref属性=objId，showValue = 下拉框选中时要显示的值，可以为多个值（多个下拉选项对应一个显示元素）如 showValue="1,2,3,5"
function bindSelectCollapse(objId) {
    var ddl = $("#" + objId);
    var fun = function (sender, eventArgs) {
        var value = ddl.val();
        var refs = $("[ref='" + objId + "']");
        refs.css("display", "none");
        refs.each(function () {
            if ($(this).attr("showValue").indexOf(value) != -1) {
                $(this).css("display", "");
            }
        });
    }
    ddl.change(fun);
    fun(ddl);
}

function bindCollapse_bak(objId, visible) {
    var obj = $("#" + objId);
    var arrRef = obj.attr("ref").split(",");
    
    obj.css("cursor", "pointer");

    if (visible == true) {
        obj.attr("title", "点击展开");
        for (var i = 0; i < arrRef.length; i++) {
            $("#" + arrRef[i]).css("display", "");
        }
    }
    else {
        obj.attr("title", "点击收起");
        for (var i = 0; i < arrRef.length; i++) {
            $("#" + arrRef[i]).css("display", "none");            
        }
    }

    obj.click(function () {
        for (var i = 0; i < arrRef.length; i++) {
            $("#" + arrRef[i]).toggle();
        }
        if ($("#" + arrRef[0]).css("display") == "none") {
            obj.attr("title", "点击展开");
        }
        else {
            obj.attr("title", "点击收起");
        }
    });
}


//取地址栏参数
function getUrlParam(name) {
    var str = window.location.search;
    if (str.indexOf(name) != -1) {
        var pos_start = str.indexOf(name) + name.length + 1;
        var pos_end = str.indexOf("&", pos_start);
        if (pos_end == -1) {
            return str.substring(pos_start);
        }
        else {
            return str.substring(pos_start, pos_end)
        }
    }
    else {
        return "";
    }
}


//判断是否是未定义
function isUndefined(variable) {
    return typeof variable == 'undefined' ? true : false;
}

function openWindow(URL, width, height) {
    window.open(URL, parent, "height=" + height + ",width=" + width + ",status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,top=" + loc_y + ",left=" + loc_x + ",resizable=yes,modal=yes,dependent=yes,dialog=yes,minimizable=no", true);
}

//打开artDialog对话框，需要在页面先引用相关js文件
function openDialog(_url, _title, _width, _height) {
    
    if (isUndefined(_title)) {
        _title = "对话框";        
    }
    if (isUndefined(_width)) {
        _width = "60%";        
    }
    if (isUndefined(_height)) {
        _height = "60%";
    }
    art.dialog.open(_url, { title: _title, width: _width, height: _height });
}