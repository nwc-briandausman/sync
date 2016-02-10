/* ==================================================
Usage: on an image that is hidden.

Usage: add 'replaceSVG' to main app decloration
Example: var aaeApp = angular.module('aaeApp',['replaceSVG']);

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
angular.module('replaceSvg', [])
    .directive('replaceSvg', function () {
        return function(element) {    
            if( !(angular.element('html').hasClass('svg')) ){
                console.log('old ie');
                angular.element('.svg-replace').each(function(){
                    angular.element(this).attr( 'src', angular.element(this).attr('data-src') );        
                });
            }
        };
    });