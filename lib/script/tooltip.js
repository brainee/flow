(function ($) {
    $.extend({
        showTip: function (content) {
            var obj = $(content);
            obj.appendTo("body");
            var myleft = ($("body").width() - obj.width()) / 2 + $("body").attr("scrollLeft");
            var mytop = ($("body").height() - obj.height()) / 3 + $("body").attr("scrollTop");
            obj.css("left", myleft).css("top", mytop).fadeIn("slow");
            window.setTimeout(function () { obj.fadeOut(1000); }, 1000);
            window.setTimeout(function () { obj.remove(); }, 2000);
        },

        // 2012-07-23 tobby���Ӷ��·����ұ߱�Եλ�õ��ж�
        tooltip: function () {
            var tipTop = 0; var tipLeft = 0;
            $("[title][title!='']").each(function () {

                $(this).hover(function (e) {
                    this.t = this.title;
                    this.title = "";
                    $("body").append("<div id='tooltip'>" + this.t + "</div>");

                    var tipHeight = $("#tooltip").innerHeight();
                    var tipWidth = $("#tooltip").innerWidth();
                    if (tipHeight + e.pageY + 10 > ($(window).height() + $(window).scrollTop())) {
                        tipTop = $(window).height() - tipHeight - 10 + $(window).scrollTop();
                    }
                    else {
                        tipTop = e.pageY + 10;
                    }

                    if (tipWidth + e.pageX + 20 > ($(window).width() + $(window).scrollLeft())) {
                        tifLeft = $(window).width() - tipWidth - 20 + $(window).scrollLeft();
                    }
                    else {
                        tipLeft = e.pageX + 10;
                    }

                    $("#tooltip")
						.css("top", tipTop.toString() + "px")
						.css("left", tipLeft.toString() + "px")
						.show();
                },
				function () {
				    this.title = this.t;
				    $("#tooltip").remove();
				});
                $(this).mousemove(function (e) {

                    var tipHeight = $("#tooltip").innerHeight();
                    var tipWidth = $("#tooltip").innerWidth();
                    if (tipHeight + e.pageY > ($(window).height() + $(window).scrollTop())) {
                        tipTop = $(window).height() - tipHeight - 10 + $(window).scrollTop();
                    }
                    else {
                        tipTop = e.pageY + 10;
                    }

                    if (tipWidth + e.pageX > ($(window).width() + $(window).scrollLeft())) {
                        tipLeft = $(window).width() - tipWidth - 20 + $(window).scrollLeft();
                    }
                    else {
                        tipLeft = e.pageX + 10;
                    }

                    $("#tooltip")
						.css("top", tipTop.toString() + "px")
						.css("left", tipLeft.toString() + "px");
                });
            });
        }
    });
})(jQuery);