/**
 * Created by chjw on 2014/9/3.
 */
(function ($) {
    $.minNotify = function(options){
        var defaults = {
            content:"",
            escClose:false,
            closeBgClick:false,
            btnClose:true,
            confirm:true,
            callBack:function(e){
                return e;
            }
        }
        var opts = $.extend(defaults, options);
        if($(".cd-popup").length) {
           $(".cd-popup-container").find("p").text(opts.content)
        }
        else {
            var html ='<div class="cd-popup" role="alert"> '+
                '<div class="cd-popup-container"> '+
                '<p>' + opts.content +'</p>'+
                '<a href="#" class="cd-popup-close img-replace">关闭</a>'+
                '</div> '+
                '</div>'
            $("body").append(html)
            $(".cd-popup-close").on("click",function(e){

                    $('.cd-popup').removeClass('is-visible');
            })
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

        if(confirm)
        {
            var _btn = $("<div class='cd-buttons'><a>确&nbsp;认</a><a>取&nbsp;消</a></div>");
            _btn.find("a").first().on("click",function(){
                $('.cd-popup').removeClass('is-visible');
                opts. callBack(true);
            });
            _btn.find("a").last().on("click",function(){
                $('.cd-popup').removeClass('is-visible');
                opts. callBack(false);
            })
            $(".cd-popup-container").append(_btn);
        }
        if(opts.btnClose && !confirm) {
            var _btn = $("<div class='cd-buttons'><a>关&nbsp;闭</a></div>");
            _btn.find("a").on("click", function () {
                $('.cd-popup').removeClass('is-visible');
            })
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
