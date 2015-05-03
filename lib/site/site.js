//$.ajaxSetup({cache:false});
/**
* 扩展String方法
*/
(function ($) {
    $.extend(String.prototype, {
       isNumber: function (value, element) {
           return (new RegExp(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/).test(this));
       },
        trim: function (c) {
			//c不能等于\.  
			var str=c==null?"(^\\s*)|(\\s*$)|\\r|\\n":"(^[\\s"+c+"]*)|([\\s"+c+"]*$)|\\r|\\n";
			var pattern =new RegExp(str,"g"); 
            return this.replace(pattern, "");
            //return this.replace(/(^\s*)|(\s*$)|\r|\n/g, "");
        },
        format: function () {
            var args = arguments;
            return this.replace(/\{(\d+)\}/g,
            function (m, i) {
                return args[i];
            });
        },
        toDate: function (delimiter, pattern) {
            delimiter = delimiter || "-";
            pattern = pattern || "ymd";
            var a = this.split(delimiter);
            var y = parseInt(a[pattern.indexOf("y")], 10);
            //remember to change this next century ;)
            if (y.toString().length <= 2) y += 2000;
            if (isNaN(y)) y = new Date().getFullYear();
            var m = parseInt(a[pattern.indexOf("m")], 10) - 1;
            var d = parseInt(a[pattern.indexOf("d")], 10);
            if (isNaN(d)) d = 1;
            return new Date(y, m, d);
        }
    });

})(jQuery);

/** 
* 时间对象的格式化 
*/
Date.prototype.format = function (format) {
    /* 
    * format="yyyy-MM-dd hh:mm:ss"; 
    */
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
function format(num, options){
	options=options||{};
	options.point=options.point||'.';  
	options.group=options.group||',';  
	options.suffix=options.suffix||'';  
	options.prefix=options.prefix||'';  
	if (typeof(options.places)=="undefined")  
	{     
		options.places=2;  
	} 
	regex = /(\d+)(\d{3})/;  
	result = ((isNaN(num) ? 0 : Math.abs(num)).toFixed(options.places)) + '';  
	for (result = result.replace('.', options.point); regex.test(result) && options.group; result=result.replace(regex, '$1'+options.group+'$2')) {  
		regex.exec(result);        
	};  
	return (num < 0 ? '-' : '') + options.prefix + result + options.suffix; 
}
function fnParam(param) {
	var query = window.location.search;
	var iLen = param.length;
	var iStart = query.indexOf(param);
	if (iStart == -1) {
		return "";
	}
	//取得开始搜索的位置。 
	iStart += iLen + 1;
	var iEnd = query.indexOf("&", iStart);
	//如果只有一个参数传进来 
	if (iEnd == -1) {
		return query.substring(iStart);
	} else {
		return query.substring(iStart, iEnd);
	}
}
function fn2Json(sJson){
	if(typeof sJson=='object'){
		return sJson;
	}else if($&&$.parseJSON){
		return $.parseJSON(sJson);
	}else if(sJson==""){
		return null;
	}else{
		return eval("("+sJson+")");
	}
}
///aData数组数据
///aAlign 位置与数据索引对应[2,1,3] 1左，2中，3右
///aFilter 过滤索引列表[0,1]
///aaCall 自定义绘制表格内容[[0,function(td,irow,iCol,oTr){}],[1,""]]
function fnDrawTrs(aData,aAlign,oSet) {//aAlign,aFilter,aaCall,strip
     var aData=aData||[],oSet=oSet||{},aAlign=aAlign||oSet.aAlign||[],aFilter=oSet.aFilter||[],aaCall=oSet.aaCall||[],strip=oSet.strip==null||oSet.strip,cell=oSet.cell||"td",aHead=oSet.aHead,aOrder=oSet.aOrder||[],aaAddCol=oSet.aaAddCol||[],key=oSet.sKey==null?'':oSet.sKey,fnTdCb=oSet.fnTdCb,fnTrCb=oSet.fnTrCb,iLimitCol=oSet.iLimitCol,iLimitRow=oSet.iLimitRow,aRangeR=oSet.aRangeR,bFilter=oSet.bFilter;
     var trs = "";
     var aAlignClass=["","w_al","w_ac","w_ar"];
     for (var i = 0; i < aData.length; i++) {
		  if(iLimitRow!=null&&i>=iLimitRow){           
			continue;
		  }
		  if(aRangeR&&(i<aRangeR[0]||(null==aRangeR[1]?false:i>aRangeR[1]))){
			continue;
		  }
          var oTr = aData[i];
		  aHead?$.inArray(i,aHead)>-1?cell="th":cell="td":'';
          var sTds = "";              
          var k=0;
          for (var j in oTr) {
				if(iLimitCol!=null&&k>=iLimitCol){
                    k++;              
                    continue;
				}
               if(bFilter){//filter in use  
				  if($.inArray(k,aFilter)==-1){
					k++;              
					continue;
				  } 
               }else{
				  if($.inArray(k,aFilter)>-1){
					k++;              
					continue;
				  }
			   }
			   if($.inArray(j,aOrder)>-1){//order
			   j=aOrder[k];
			   }
               var text=oTr[j]==null?"":key?oTr[j][key]:oTr[j];//deal "null"			   
               if(aaCall.length>0){
                    $.each(aaCall,function(m,n){
                         if(n[0]==k){
                         text=typeof n[1]=="function"?n[1](text,i,k,oTr,j):n[1];
                         }
                    });
               }
			   var std="";
               if(passif(aAlign[k])){                   
				   std = '<'+cell+' class="'+aAlignClass[aAlign[k]]+'">'+text+'</'+cell+'>';
               }else{
				   std = '<'+cell+'>'+text+'</'+cell+'>';
               }
			   if(aaAddCol.length>0){//add
				  var sadd="";
				  $.each(aaAddCol,function(m,n){
					if(n[0]==k){
					   sadd=typeof n[1]=="function"?n[1](text,i,k,oTr):n[1];
					   sadd= sadd.toString().indexOf("<td")>-1?sadd:'<'+cell+'>'+sadd+'</'+cell+'>';
					}
					if(n[2]){//insert bafter
						std=std+sadd;
					}else{
						std=sadd+std;
					}
				  });
			   }			   
			   sTds+=fnTdCb?fnTdCb(std,i,k,oTr,j):std;
               k++;              
          }
          var sTr=strip?i%2==0?'<tr>'+sTds+'</tr>':'<tr class="w_trEven">'+sTds+'</tr>':'<tr>'+sTds+'</tr>';         
		  trs +=fnTrCb?fnTrCb(sTr,i,oTr):sTr; 
     }
     return trs;
}
function isEmpty(source){
 return source==null||source=='';
}
function isNE(source){
 return !(source==null||source=='');
}
function passif(source){
	var flag=false;
	if(source){
		flag=true;
	}
	return flag;	
}
function fnDate(type,n,date){
	var aDate=[];
	date=date||new Date();
	aDate[0]=date.format('yyyy-MM-dd');//source date
	switch(type){
		case 'y':
		date.setYear(date.getYear()+n);
		aDate[1]=date.format('yyyy-MM-dd');
		break;
		case 'M':
		date.setMonth(date.getMonth()+n);
		aDate[1]=date.format('yyyy-MM-dd');
		break;
		case 'd':
		date.setDate(date.getDate()+n);
		aDate[1]=date.format('yyyy-MM-dd');
		break;
	}
	return aDate;
}
