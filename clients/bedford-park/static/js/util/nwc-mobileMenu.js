/* ================================================================ */
/* Mobile Slide Nav
/* ================================================================ */
//get window width
function mobileNavInit() {
    jQuery('#mobileNav').click(function(){
        jQuery(this).toggleClass('active');
        jQuery('body').toggleClass('active');
    });
    
    jQuery('#navWrap a').click(function(){
        jQuery('#mobileNav').removeClass('active');
        jQuery('body').removeClass('active');    
    });
}

mobileNavInit();