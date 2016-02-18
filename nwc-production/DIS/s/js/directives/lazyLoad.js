/* ==================================================
Usage: add 'lazyLoad' to main app decloration
Example: var soApp = angular.module('soApp',['lazyLoad']);

Usage: add '.lazyload' class to any element's wrapper to 
use this directive on. It will find all images with an 
attr data-src and swap it out.

Effect: any element with the directive will load slightly before
the window reaches them.
================================================== */
angular.module('lazyLoad', [])
.directive('lazyLoad', function () {
    return function() {   
        var scrolled = false;  //set the initial state to false
        
        jQuery(window).scroll(function() {
            scrolled = true;    //set the state to true on scroll
        });

        setInterval(function() {
            if (scrolled){  //if the timer has been met, and scrolling has happened
                jQuery('.lazyLoad').each(function(){
                    var elOffset = jQuery(this).offset(),
                        elHeight = jQuery(this).height(),
                        winOffset = jQuery(window).scrollTop(),
                        offsetThreshold = elOffset.top - elHeight - 900;
                     
                    if( winOffset >= offsetThreshold){
                        jQuery(this).find('img').each(function(){
                            if( (mq === 'xs' && jQuery(this).closest('.lazyLoad').hasClass('hidden-xs')) || (mq === 'sm' && jQuery(this).closest('.lazyLoad').hasClass('hidden-sm')) || (mq === 'md' && jQuery(this).closest('.lazyLoad').hasClass('hidden-md')) || (mq === 'lg' && jQuery(this).closest('.lazyLoad').hasClass('hidden-lg'))){
                                //do not render the images to save bandwidth
                            }else{
                                var imgSrc = jQuery(this).attr('data-src');
                                jQuery(this).attr('src', imgSrc).removeClass('lazyLoad'); //no longer need to watch anymore 
                            }
                        });
                    }
                });
                
                //leave this line
                scrolled = false;   //set it back to false and only run again if scrolling again
            }
        }, 500); //set the timout here, this will improve performance. The higher the number the better the perfmance but a lag could appear    
    };
});