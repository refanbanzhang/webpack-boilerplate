
//	修复ios12中微信bug
export const fixIos12WeixinInputBug = function () {
  var currentScrollTop = 0

  var scrollTop = function (y) {
    y = y ? y : 0;
    $(window).scrollTop(y)
  }

  $('body').on('focus', 'input', function (e) {
    currentScrollTop = $(window).scrollTop()
  })

  $('body').on('blur', 'input', function () {
    scrollTop(currentScrollTop)
  })
}


