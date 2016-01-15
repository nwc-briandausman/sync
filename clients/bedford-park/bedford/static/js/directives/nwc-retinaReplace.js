/* ==================================================
Usage: on an image.

Usage: add 'replaceRetina' to main app decloration
Example: var aaeApp = angular.module('aaeApp',['replaceRetina']);

Usage: Add 'retina-replace' class to the image and retina-replace to the app
Usgae: You can pass in a height if need be to conform to responsive sizes : data-height="460"

What: The src or alt-src will be replaced with the retina image, make sure there is a file with the same filename with .x2.ext

Example: images/about-appliances.png and images/about-appliances.x2.png
================================================== */
angular.module('replaceRetina', [])
    .directive('replaceRetina', function () {
        return function(element) {    
            if( window.devicePixelRatio > 1 && document.body.clientWidth > 1200 ){
                angular.element('.retina-replace').each(function(){
                    var imageSrc = '',
                        newSrc = '',
                        iHeight = angular.element(this).attr('data-height');
                    
                    //if lazy loading
                    if( angular.element(this).attr('src').length === 0 ){
                        imageSrc = angular.element('.retina-replace').attr('data-src'); 
                        newSrc = imageSrc.split('.');
                        newSrc = newSrc[0] + '.x2.' + newSrc[1];
                        angular.element(this).attr('data-src', newSrc).css({ 'height' : iHeight });
                    }else{
                        imageSrc = angular.element('.retina-replace').attr('src');        
                        newSrc = imageSrc.split('.');
                        newSrc = newSrc[0] + '.x2.' + newSrc[1];
                        angular.element(this).attr('src', newSrc).css({ 'height' : iHeight });
                    }
                    
                    angular.element(this).removeClass('retina-replace');
                });
            }
        };
    });