$(function(){
	//用Stellar.js自定义滚动效果
	$(window).stellar({
		// Set scrolling to be in either one or both directions
		horizontalScrolling: false
	});

	// 与niceScroll.js相关
	var nice = $("html").niceScroll({
		cursorwidth: '8px', //定义滚动条宽度
		cursorborder: "0px solid #fff", //滚动条边界样式
		cursorborderradius: '10px' //是否有圆角
	});

	//关于将背景图撑满屏幕
    function home_height () {
		var element = $('.st-home-unit'),
			elemHeight = element.height(),//获取元素的当前高度
			winHeight = $(window).height()//浏览器当前窗口可视区域高度 
			padding = (winHeight - elemHeight - 200) /2;//通过计算padding将元素置中

		if (padding < 1 ) {
			padding = 0;
		};
		element.css('padding', padding+'px 0');//根据实际的浏览器高度改变所选元素的样式。
	}
	home_height ();//函数调用

//	对浏览器窗口调整大小进行计数：好像没什么卵用
	$(window).resize(function () {
		home_height ();
	});
	
	//这一块控制导航栏的动画效果
	var fadeStart=$(window).height()/3 // 100px scroll or less will equiv to 1 opacity
    ,fadeUntil=$(window).height()  // 200px scroll or more will equiv to 0 opacity
    ,fading = $('.st-home-unit')
    ,fading2 = $('.hero-overlayer')
	;
	$(window).bind('scroll', function(){
	    var offset = $(document).scrollTop()
	        ,opacity=0
	        ,opacity2=1
	    ;
	    if( offset<=fadeStart ){
	        opacity=1;
	        opacity2=0;
	    }else if( offset<=fadeUntil ){
	        opacity=1-offset/fadeUntil;
	        opacity2=offset/fadeUntil;
	    }
	    fading.css({'opacity': opacity});

	    if (offset >= 120) {
	    	$('.st-navbar').addClass("st-navbar-mini");
	    } else if (offset <= 119) {
	    	$('.st-navbar').removeClass("st-navbar-mini");
	    }
	});
	
	//计数动画效果的实现
	$('.st-ff-count').appear();//与jquery.appear.js有关
	$(document.body).on('appear', '.st-ff-count', function(e, $affected) {
		$affected.each(function(i) {
			if (parseInt($(this).data('runit'))) {
				$(this).countTo({
					speed: 3000,
					refreshInterval: 50
				});
				$(this).data('runit', "0");
			};

		});
	});
	
	//tab选项卡类别切换
	$(window).load(function () {
	var $grid = $('.grid'),
		$sizer = $grid.find('.shuffle__sizer'),
		$filterType = $('#filter input[name="filter"]');

	$grid.shuffle({
		itemSelector: '.portfolio-item',
		sizer: $sizer
	});

	$filterType.change(function(e) {
		var group = $('#filter input[name="filter"]:checked').val();

		$grid.shuffle('shuffle', group);

		$('label.btn-main').removeClass('btn-main');
		$('input[name="filter"]:checked').parent().addClass('btn-main');
	});
	});
	
	//赞助商轮播，与owlCarousel插件相关
	$('.clients-carousel').owlCarousel({
    	items: 5,
    	autoPlay: true,
    	pagination: false
    });
    
    //名人名言轮播
	$(".testimonials-carousel ul").owlCarousel({
    items: 1,
    navigation: false,
    pagination: true,
    singleItem:true,
    autoPlay: true,
    navigationText: ['<i class="ct-etp etp-arrow-left7"></i>', '<i class="ct-etp etp-arrow-right8"></i>'],
    transitionStyle: "backSlide"
    });
})
