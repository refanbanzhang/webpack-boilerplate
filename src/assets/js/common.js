// 将jquery serializeArray返回的数组数据转为json
var form2Json = function (arr) {
    var jsonStr = "";
    jsonStr += '{';
    for (var i = 0; i < arr.length; i++) {
        jsonStr += '"' + arr[i].name + '":"' + arr[i].value.trim() + '",';
    }
    jsonStr = jsonStr.substring(0, (jsonStr.length - 1));
    jsonStr += '}';
    var json = JSON.parse(jsonStr);
    return json;
}
// 支付确认弹层
var confirmPopup = function (content, yes, no, options) {
    var _sington = null;

    content = content ? content : '';
    yes = yes ? yes : $.noop;
    no = no ? no : $.noop;

    return function(){

        function dialog(options) {
            options = options ? options : {};

            if(_sington) return _sington;

            options = $.extend({
                title: null,
                content: '',
                className: '',
                buttons: [{
                    label: '确定',
                    type: 'primary',
                    onClick: $.noop
                }]
            }, options);
            
            var buildHtml = function(data){
                var html = '<div class="js_dialog dialogIntegral">'+
                            '<div class="am-dialog-mask show" data-js-customConfirmMask></div>'+
                            '<div class="am-dialog show" role="dialog" aria-hidden="false">'+
                            '<div class="diaint-content bg-white f-gray-38">'+
                            '<div class="border-bottom tc f16 diaint-title">'+
                            '<span class="custom-confirm-close" data-js-customConfirmClose>×</span>'+
                            '{{content}}'+
                            '</div>'+
                            '<div class="tc border-bottom diaint-mon">'+
                            '<p class="f15">沃银福利</p>'+
                            '<p class="f34"><span class="f24"></span>{{amount}}</p>'+
                            '</div>'+
                            '<div class="tl border-bottom f15 f-gray-7e diaint-mon">'+
                            '可用积分'+
                            '<span class="fr">{{useable}}</span>'+
                            '</div>'+
                            '<div class="diaint-mon border-bottom tl">'+
                            '<input type="password" style="width: 100%;" class="diaint-password" autocomplete="off" placeholder="输入交易密码" data-js-transPswdInput/>'+
                            '</div>'+
                            '<div class="diaint-mon">'+
                            '<button class="diaint-btn" data-js-customConfirmBtn>确认</button>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>';

                                
                var template = Handlebars.compile(html);
                return $(template(data));
            };


            var $dialog = buildHtml(options);
            var $mask = $dialog.find('[data-js-customConfirmMask]');
            var $closeBtn = $dialog.find('[data-js-customConfirmClose]');
            var $confirmBtn = $dialog.find('[data-js-customConfirmBtn]');
            var $transPswdInput = $dialog.find('[data-js-transPswdInput]');

            function _hide(callback){
                _hide = $.noop; // 防止二次调用导致报错

                $mask.addClass('weui-animate-fade-out');
                $dialog
                    .addClass('weui-animate-fade-out')
                    .on('animationend webkitAnimationEnd', function () {
                        $dialog.remove();
                        // 避免ios微信下弹层输入框等元素导致body高度被挤压bug 后续提供hide callback
                        $('body').removeClass('free');
                        _sington = false;
                        callback && callback();
                    });
            }
            function hide(callback){ _hide(callback); }
            // 避免ios微信下弹层输入框等元素导致body高度被挤压bug 后续提供hide callback
            $('body').addClass('free');
            $('body').append($dialog);
            // 不能直接把.weui-animate-fade-in加到$dialog，会导致mask的z-index有问题
            $mask.addClass('weui-animate-fade-in');
            $dialog.addClass('weui-animate-fade-in');

            $transPswdInput.on('input', function(e){
                var $this = $(this);
                $this.val($this.val().replace(/[^\d]/g,""));
            });

            $closeBtn.on('click', function(evt){

                    if(options.buttons[0].onClick){
                        if(options.buttons[0].onClick.call(this, evt, $transPswdInput) !== false) hide();
                    }else{
                        hide();
                    }
                })
                .on('touchmove', function(evt){
                    evt.stopPropagation();
                    evt.preventDefault();
                });

            $confirmBtn.on('click', function(evt){

                    if(options.buttons[1].onClick){
                        if(options.buttons[1].onClick.call(this, evt, $transPswdInput) !== false) hide();
                    }else{
                        hide();
                    }
                })
                .on('touchmove', function(evt){
                    evt.stopPropagation();
                    evt.preventDefault();
                });

            _sington = $dialog[0];
            _sington.hide = hide;
            return _sington;
        }

        if(typeof yes === 'object'){
            options = yes;
            yes = $.noop;
        }else if(typeof no === 'object'){
            options = no;
            no = $.noop;
        }

        options = $.extend({
            custom: true,
            content: content,
            buttons: [{
                label: '取消',
                type: 'default',
                onClick: no
            }, {
                label: '确定',
                type: 'primary',
                onClick: yes
            }]
        }, options);

        return dialog(options);

    };

}

var app = (function(){

    var jqueryMap = {};

    // 按下移动元素
    var Mover = function($elem){

        var start = { x: 0, y: 0 };
        var curr  = { x: 0, y: 100 };
        var delta = { x: 0, y: 0 };

        var translate = function(x, y){
            if(x < 5){
                x = 0;
            }
            $elem.css({
                bottom: y,
                right: x
            });
            curr = {
                y: y,
                x: x
            }
        };

        $elem.on('touchstart', function(e){
            var touch = e.originalEvent.targetTouches[0]; 
            start = {
                x: touch.pageX,
                y: touch.pageY
            }
        });

        jqueryMap.$backHomeBtn.on('touchmove', function(e){
            var touch = e.originalEvent.targetTouches[0]; 

            delta = {
                x: touch.pageX - start.x,
                y: touch.pageY - start.y
            }
            start.y = touch.pageY;
            start.x = touch.pageX;
            var newY = curr.y - delta.y
            var newX = curr.x - delta.x
            translate(newX, newY);
            return false;
        });

        jqueryMap.$backHomeBtn.on('touchend', function(e){
        });
    };

    var setJqueryMap = function(){
        jqueryMap = {
            $body: $('body'),
            $backHomeBtn: $('[data-js-backhomebtn]')
        };
    };

    var forceRefreshIfNeed = function() {
        //  页面加载的时候判断是否从Page Cache/BF Cache中加载 如果是 则强制刷新页面
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    };

    // 判断是否显示回到首页按钮
    var showBackHomeBtn = function(){
        if($('body').attr('data-hideBackHome') !== '1'){
            jqueryMap.$backHomeBtn.fadeIn();
        }
    };

    var init = function(){
        setJqueryMap();
        forceRefreshIfNeed();
        showBackHomeBtn();
        Mover(jqueryMap.$backHomeBtn);

    };

    return { init: init };
})();

$(function(){
    app.init();
});