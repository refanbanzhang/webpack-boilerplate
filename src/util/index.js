//	修复ios12中微信bug
export function fixIos12WeixinInputBug() {
  let currentScrollTop = 0;

  function scrollTop(y) {
    y = y ? y : 0;
    $(window).scrollTop(y);
  }

  $("body").on("focus", "input", function(e) {
    currentScrollTop = $(window).scrollTop();
  });

  $("body").on("blur", "input", function() {
    scrollTop(currentScrollTop);
  });
}
