/**
 * Created by chjw on 2014/9/3.
 */
(function ($) {
    $.minNotify = function(options){
        var defaults = {
            content:"",
            escClose:false,
            closeBgClick:false,
            btnClose:false,
            confirm:false,
            autoClose:false,
            hasTitle:false,
            alignCenter:true,
            millisec:2000,
            callBack:function(e){
                return e;
            }
        }
        var opts =  $.extend( defaults, options);
        if($(".cd-popup").length) {
            $(".cd-popup").remove()
        }

        var html = '<div class="cd-popup" role="alert">' +
                '<div class="cd-popup-container"> <div class="cd-popup-title">提示信息</div> ' +
                '<p>' + opts.content + '</p>' +
                '</div> ' +
                '</div>'
        $("body").append(html)
        if (!opts.hasTitle) {
            $(".cd-popup-title").remove()
        }
        if(opts.alignCenter) {
            $(".cd-popup-container p").css("text-align","center");
        }
        if(!opts.autoClose&&!opts.confirm) {
            var _btnClose = $('<a href="#" class="cd-popup-close img-replace">关闭</a>');
            _btnClose.on("click", function (e) {
                $('.cd-popup').removeClass('is-visible');
            })
            $(".cd-popup-container").append(_btnClose);
        }

        if(opts.autoClose) {
            setTimeout(function(){
                $('.cd-popup').removeClass('is-visible');
            },opts.millisec)
        }

        if(opts.closeBgClick)
        {
            $(".cd-popup").on("click",function(e){
                var targetClass = $(e.target).attr('role');
                if(targetClass) {
                    $('.cd-popup').removeClass('is-visible');
                }
            })
        }

        if(opts.confirm)
        {
            var _btn = $("<div class='cd-buttons'><a>确&nbsp;认</a><a>取&nbsp;消</a></div>");
            _btn.find("a").first().on("click",function(){
                $('.cd-popup').removeClass('is-visible');
                opts. callBack(true);
            });
            _btn.find("a").last().on("click",function(){
                $('.cd-popup').removeClass('is-visible');
                opts.callBack(false);
            })
            $(".cd-popup-container").append(_btn);
        }
        if(opts.btnClose && !opts.confirm) {
            var _btn = $("<div class='cd-buttons'><a>关&nbsp;闭</a></div>");
            _btn.find("a").on("click", function () {
                $('.cd-popup').removeClass('is-visible');
            }).css({"width":"100%","border-radius": "0 0 .25em .25em"})
            $(".cd-popup-container").append(_btn);
        }
        $('.cd-popup').addClass('is-visible');
        if(opts.escClose) {
            $(document).on("keyup",function (event) {
                if (event.which == '27') {
                    $('.cd-popup').removeClass('is-visible');
                }
            })
        }
    }
})(window.Zepto || window.jQuery)
