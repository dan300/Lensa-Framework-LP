jQuery(function($){
	var $splash = $('#splash, #splash-whitelabel'),
	$eff = $('#efficiency'),
	$cent = $('#centralization'),
	$cand = $('#candidate'),
	$ref = $('#ref'),
	$proc = $('#process'),
	$contact = $('#contact'),
	$footer = $('body > footer'),
	$contactAndFooter = $contact.add($footer),
	$contactForm = $('form[name="contact"]'),
	$successMsg = $('.status-msg.success'),
	$errorMsg = $('.status-msg.error'),
	$backToForm = $('.status-msg > a');

	var contactController = '/contact/';

	$(window).scroll(function(){
		// top background parallax
		var scrollTop = $(this).scrollTop();
		$splash.css('background-position', 'center ' + ((scrollTop * 0.5)-40) + 'px');
		// contact opener
		// ha a ref latszik, vagy lejjebb vagyunk, akkor lathatova tesszuk a contactot
		var refTop = $ref.offset().top , windowHeight = $(window).height();
		var visibleTop = scrollTop, visibleBottom = scrollTop + windowHeight;
		if (refTop < visibleBottom) {
			$contactAndFooter.show();
		} else {
			$contactAndFooter.hide();
		}
		/*
		// megnezzuk, hogy hol van a contact teteje, latszik-e egyaltalan
		var contactTop = $contact.offset().top , windowHeight = $(window).height();
		var visibleTop = scrollTop, visibleBottom = scrollTop + windowHeight;
		if (contactTop > visibleTop && contactTop < visibleBottom) {
			var contactHeight = Math.max(0, Math.min(windowHeight - (contactTop - visibleTop), 630));
			$contact.css('height', contactHeight + 'px');
		}
		*/
	}).scroll();

	/* efficiency slider, flipper */
	$(window).load(function(){
		window.efficiencySlider = $eff.find('.sliderwindow ul').bxSlider({
			onSlideBefore : function ($slideElement, oldIndex, newIndex) {
				$eff.find('.sliderpagination span').eq(newIndex).addClass('on').siblings().removeClass('on');
				$eff.find('.flipperwindow .flipper').eq(newIndex).addClass('visible').siblings().removeClass('visible');
			}
		});
		$eff.find('.sliderpagination span').click(function(){
			window.efficiencySlider.goToSlide($(this).index());
			hookEfficiencySliderInterval();
		});
		hookEfficiencySliderInterval();
	});
	function hookEfficiencySliderInterval () {
		if (window.efficiencySliderInterval) clearTimeout(window.efficiencySliderInterval);
		if (window.efficiencySlider.length) window.efficiencySliderInterval = setInterval(function(){ window.efficiencySlider.goToNextSlide(); }, 10000);
	}
	$eff.find('.sliderwindow, .sliderpagination').hover(function(){
		if (window.efficiencySliderInterval) clearTimeout(window.efficiencySliderInterval);
	}, function(){
		hookEfficiencySliderInterval();
	});

	/* centralization slider, flipper */
	$cent.find('.sliderpagination span').click(function(){
		$(document).trigger('centralizationGoToSlide', $(this).index());
	});
	$cent.find('.slide').click(function(){
		var $this = $(this);
		if ($this.hasClass('prev') || $this.hasClass('next')) {
			$(document).trigger('centralizationGoToSlide', $(this).index());
		}
	});
	$(document).on('centralizationGoToSlide', function(e, slide) {
		var current = $cent.find('.slide').eq(slide).removeClass('invisible');
		current.addClass('current').siblings().removeClass('current invisible');
		if (current.next().length) {
			current.next().addClass('next').siblings().removeClass('next');
			current.next().nextAll().addClass('next invisible');
		} else {
			current.siblings().first().addClass('next').removeClass('prev').siblings().removeClass('next');

		}
		if (current.prev().length) {
			current.prev().addClass('prev').siblings().removeClass('prev');
			current.prev().prevAll(':not(.next)').addClass('prev invisible');
		} else {
			current.siblings().last().addClass('prev').removeClass('next invisible').siblings().removeClass('prev');
		}
		$cent.find('.sliderpagination span').eq(slide).addClass('on').siblings().removeClass('on');
		$cent.find('.flipper').eq(slide).addClass('visible').siblings().removeClass('visible');
		hookCentralizationSliderInterval();
	});
	function hookCentralizationSliderInterval () {
		if (window.centralizationSliderInterval) clearTimeout(window.centralizationSliderInterval);
		window.centralizationSliderInterval = setInterval(function(){ $cent.find('.slide.next').first().click(); }, 10000);
	}
	$cent.find('.sliderwindow, .sliderpagination').hover(function(){
		if (window.centralizationSliderInterval) clearTimeout(window.centralizationSliderInterval);
	}, function(){
		hookCentralizationSliderInterval();
	});

	/* candidate slider */
	$(window).load(function(){
		window.candidateSlider = $cand.find('.sliderwindow ul').bxSlider({
			onSlideBefore : function ($slideElement, oldIndex, newIndex) {
				$cand.find('.slideinpagination span').eq(newIndex).addClass('on').siblings().removeClass('on');
				$cand.find('.slidein').eq(newIndex).addClass('current').removeClass('next prev').siblings().removeClass('current');
				$cand.find('.slidein.current').prevAll().removeClass('next').addClass('prev');
				$cand.find('.slidein.current').nextAll().removeClass('prev').addClass('next');
			}
		});
		$cand.find('.slideinpagination span').click(function(){
			window.candidateSlider.goToSlide($(this).index());
		});
		hookCandidateSliderInterval();
	});
	function hookCandidateSliderInterval () {
		if (window.candidateSliderInterval) clearTimeout(window.candidateSliderInterval);
		if (window.candidateSlider.length) window.candidateSliderInterval = setInterval(function(){ window.candidateSlider.goToNextSlide(); }, 10000);
	}
	$cand.find('.sliderwindow, .slideinwindow, .slideinpagination').hover(function(){
		if (window.candidateSliderInterval) clearTimeout(window.candidateSliderInterval);
	}, function(){
		hookCandidateSliderInterval();
	});

	/* process slider */
	$(window).load(function(){
		window.processSlider = $proc.find('.sliderwindow ul').bxSlider({
			onSlideBefore : function ($slideElement, oldIndex, newIndex) {
				$proc.find('.slideinpagination span').eq(newIndex).addClass('on').siblings().removeClass('on');
				$proc.find('.slidein').eq(newIndex).addClass('current').removeClass('next prev').siblings().removeClass('current');
				$proc.find('.slidein.current').prevAll().removeClass('next').addClass('prev');
				$proc.find('.slidein.current').nextAll().removeClass('prev').addClass('next');
			}
		});
		$proc.find('.slideinpagination span').click(function(){
			window.processSlider.goToSlide($(this).index());
		});
		hookProcessSliderInterval();
	});
	function hookProcessSliderInterval () {
		if (window.processSliderInterval) clearTimeout(window.processSliderInterval);
		if (window.processSlider.length) window.processSliderInterval = setInterval(function(){ window.processSlider.goToNextSlide(); }, 10000);
	}
	$proc.find('.sliderwindow, .slideinwindow, .slideinpagination').hover(function(){
		if (window.processSliderInterval) clearTimeout(window.processSliderInterval);
	}, function(){
		hookProcessSliderInterval();
	});

	/* inview effects */
	$('article, body > header, body > footer').bind('inview', function(event, isInView) {
		if (isInView) {
			$(this).addClass('inView').removeClass('notInView');
		} else {
			$(this).removeClass('inView').addClass('notInView');
		}
	}).addClass('notInView');

	/* contact form */

	$contactForm.on('submit',function(event){
		console.log($(this).serialize());

		event.preventDefault();
		$.post(contactController, $(this).serialize())
		.then(function( response ){
			$contactForm.fadeOut(300,function(){
				$successMsg.fadeIn();
				$contactForm.children('input[type="text"], input[type="email"], textarea').val('');
			});
		},
		function(){
			$contactForm.fadeOut(300,function(){
				$errorMsg.fadeIn();
			});
		})
	});

	$backToForm.on('click',function(){
		$(this).parent().fadeOut(300,function(){
			$contactForm.fadeIn();
		});
	});
});

/*var display = Cookies.get('lensa-popup');

$(function() {
    // if (display) return;
    $.magnificPopup.open({
        items: {
            src: '#lensa-popup',
            type: 'inline'
        },
        callbacks: {
            close: function() {
                Cookies.set('lensa-popup', 'seen', { expires: 1 });
            }
        }
    });
});*/

