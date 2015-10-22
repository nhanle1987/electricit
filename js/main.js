function getPosition($elem) {
	var element = $elem.get(0);
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

jQuery( document ).ready(function($) {

	var $topbar = $("#topbar");
	var $menutop = $("#menu-top");
	var $iconbar = $(".navbar-toggle");
	var cHsh = window.location.hash.substr(1);

	var swiperBanner = new Swiper('#primary-banner', {
		pagination: '#primary-banner__pagination',
		paginationClickable: true,                
		autoplayDisableOnInteraction: false            
	});

	$(window).bind("scroll mousewheel DOMMouseScroll", null, function(evt) {

		var scrollTop = $(this).scrollTop();
		if(scrollTop >= 90) {
			$topbar.addClass("fixed")
		} else {
			$topbar.removeClass("fixed")
		}

		if($menutop.hasClass('in') ){
			$menutop.removeClass('in');
			$menutop.attr("aria-expanded","false");
			$menutop.css("height","1px");
		}

	}).trigger("mousewheel");

	$menutop.find("a").bind("click", null, function(evt) {
		// evt.preventDefault();

		var $this = $(this);
		var $cTarget = $($this.attr("href"));
		if($cTarget.size() < 1) {
			return true;
		} else if($cTarget.size() > 1) {
			console && console.log("multiple ref: ", $this);
		}

		($(".navbar-toggle").is(":visible")) && $iconbar.trigger("click");
		window.location.hash = $this.attr("href");
		$menutop.find(".active").removeClass("active");
		$this.parent().addClass("active");
		// console.log($cTarget, $cTarget.offset().top);
		$(window).stop(true, true).scrollTo(($cTarget.offset()).top - ($iconbar.width() < 50 ? 30 : 63), 500);

		return false;
	});

	var $cHsh = $menutop.find("a[href=\"" + cHsh + "\"]");
	// console.log($cHsh);
	$cHsh.size() && $cHsh.trigger("click");
});   
 