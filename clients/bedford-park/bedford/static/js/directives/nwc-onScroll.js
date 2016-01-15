/* ==================================================
Usage: on an image that is hidden.

Usage: add 'onScroll' to main app decloration
Example: var aaeApp = angular.module('aaeApp',['onScroll']);

Usage: Add 'on-scroll' to the image

Param: data-threshold="xxx"
What: the threshold is the height from the top of
      window. when the image should replace it's 
      source. If not set, will = 100
Param: data-src="filename.jpg"
What: the source of the image, to be swapped out 
      when the threshold is met.

Example: <img src="" data-src="images/about-appliances.png" alt="Kitchen Appliances" class="z2 about-appliances" on-scroll data-threshold="587" />
================================================== */
angular.module('onScroll', [])
    .directive('onScroll', function ($window) {
        return function(scope, element, attrs) {
            var threshold =  element.attr('data-threshold');
            if( !( threshold > 0) ){ 
               threshold = 100; 
            }
            
            angular.element($window).bind("scroll", function() {
                if ( this.pageYOffset >= element.offset().top - threshold && element.attr('src').length === 0 ) {
                    element.attr('src', element.attr('data-src') );
                } else {
                    //element.attr('src', '' );
                }
                scope.$apply();
            });    
        };
    });