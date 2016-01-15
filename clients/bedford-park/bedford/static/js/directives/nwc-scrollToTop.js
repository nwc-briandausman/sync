/* ==================================================
Usage: on a clickable element.

Usage: add 'scrollToTop' to main app decloration
Example: var nwcApp = angular.module('nwcApp',['scrollToTop']);

Usage: Add 'scroll-to-top' to the element you want to click
       Add class of hide to start (using boostrap)
       
Example: <i class="fa fa-angle-up hide" scroll-to-top></i>
================================================== */
angular.module('scrollToTop', [])
    .directive('scrollToTop', function ($window) {
        return function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                if ( this.pageYOffset >= 100 ) {
                    element.removeClass('hide');
                } else {
                    element.addClass('hide');
                }
            });
            
            angular.element(element).bind('click', function(){
                $('html, body').animate({scrollTop : 0},500);
                return false;    
            });
        };
    });