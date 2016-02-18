//bootstrap the angular app
var soApp = angular.module('outletApp',['mainMenu', 'lazyLoad']).config(function($sceProvider) {
    // Completely disable SCE to support IE7.
    $sceProvider.enabled(false);
}); 


//init function
jQuery(function () {
    
    //popovers
    jQuery('[data-toggle="popover"]').popover({
        trigger: "click"
    });
    
    jQuery('body').on('click', function (e) {
        if (jQuery(e.target).data('toggle') !== 'popover' && jQuery(e.target).parents('.popover.in').length === 0) { 
            jQuery('[data-toggle="popover"]').popover('hide');
        }
    });
    
    //tabs
    jQuery('#tabs a').click(function (e){
      e.preventDefault()
      jQuery(this).tab('show');
    });
    
    //quickview close
    jQuery('#quickView .close').on('click', function(){
        jQuery('#quickView').addClass('ng-hide');
   });
});