soApp.controller('footerCtrl', ['$scope', '$timeout', '$window', 'commonServices', function($scope, $timeout, $window, commonServices){
    var self = this;
    
    self.emailSavings = function(){
       jQuery('#emailSavingsModal').modal('show');
    };
    
    self.omnitureEvents = function(ev){
        setOmValuesEvent(ev,'no','no','no');    
    };
    
    self.scrollToTop = function(){
        $window.scrollTo(0, 0);
    };
}]);

//scrolling back to top
if (navigator.userAgent.indexOf('iPad', 'iPhone', 'iPod') == -1) {
    jQuery("#backToTop").hide();
    jQuery(window).scroll(function() {
        if( jQuery(this).scrollTop() > 100 ){
            jQuery('#backToTop').fadeIn();
        } else{
            jQuery('#backToTop').fadeOut();
        }
    }); 
}