/* ================================================================ */
/* Owl Carousel Init Code
/* ================================================================ */
var owl = $('.owl-carousel');
owl.on('initialized.owl.carousel', function(e){
    //check if we need navigation
    $('.owl-carousel').each(function(){
        if( $(this).find('.owl-dot').length < 2 ){
            $(this).find('.owl-controls').addClass('hide');    
        }
    });
});

/*
Options:
autoplay        => bool
loop            => bool 
nav             => bool
lazyLoad        => bool
navText         => bool
responsiveClass => bool
URLhashListener => bool
xsItems         => #
xsNav           => bool
smItem          => #
smNav           => bool
mdItems         => #
mdNav           => bool
lgItems         => #
lgNav           => bool
*/
function carousel(el, autoplay, loop, nav, lazyLoad, navText, responsiveClass, URLhashListener, xsItems, xsNav, smItems, smNav, mdItems, mdNav, lgItems, lgNav){
    if( !(navigator.appVersion.indexOf("MSIE 7.") != -1) ){
        if( navText === true ){
            navText = ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'] 
        }else{
            navText = []
        }

        el.owlCarousel({
            loop: loop,
            nav: nav,
            lazyLoad: lazyLoad,
            navText: navText,
            responsiveClass: responsiveClass,
            URLhashListener: URLhashListener,
            autoplay: autoplay,
            autoplaySpeed: 3000,
            autoplayHoverPause: true,
            responsive:{
                0:{
                    items: xsItems,
                    nav:xsNav
                },
                600:{
                    items:smItems,
                    nav:smNav
                },
                1000:{
                    items:mdItems,
                    nav:mdNav
                },
                1200:{
                    items:lgItems,
                    nav:lgNav    
                }
            }
        }); 
    }
}
    
    