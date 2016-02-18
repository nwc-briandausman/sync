/* ==================================================
Usage: add 'mainMenu' to main app decloration
Example: var soApp = angular.module('soApp',['mainMenu']);

Effect: All main nav functionality
================================================== */
angular.module('mainMenu', [])
.directive('mainMenu', function () { 
    return function(){
        function renderMenu(){
            if(mq === 'md' || mq === 'lg' || mq === 'xl'){
                var menuWidth = jQuery('#mainNav .container').width();

                jQuery('.menuDropdown').css({'width':menuWidth});

                jQuery('#mainNav span').hover(function(e){
                    jQuery(this).find('.menuDropdown').stop(true, true).delay(250).show(0);
                    var imageSrc = jQuery(this).find('img').attr('so-src');
                    jQuery(this).find('img').attr('src', imageSrc);
                },function(e){
                    jQuery(this).find('.menuDropdown').stop(true, true).hide(0);
                });   
            }else if(mq === 'xs'){
                jQuery('#mainNav span').click(function(){
                    jQuery('.menuDropdown').hide();
                    jQuery(this).find('.menuDropdown').toggle();
                })
            }
        }
        
        setTimeout(function(){
            renderMenu();    
        }, 100);
           
        jQuery(window).resize(function(){
            renderMenu(); //perform again on window resize 
        });
        
        jQuery('#mobileUpperHeader').on('click', '#navOpen', function(){
            jQuery('header, footer, main, #mainNav').toggleClass('active'); 
            jQuery('.fa-times').removeClass('hide');
            jQuery('.fa-bars').addClass('hide');
        });
        
        jQuery('#mobileUpperHeader').on('click', '#navClose', function(){
            jQuery('header, footer, main, #mainNav').toggleClass('active'); 
            jQuery('.fa-times').addClass('hide');
            jQuery('.fa-bars').removeClass('hide');
        });
        
        //Left Nav
        /*
        jQuery('#leftNavBtn').on({
            mouseenter: function () {
                //stuff to do on mouse enter
                jQuery('#leftNavDropdown').show();
            },
            mouseleave: function () {
                //stuff to do on mouse leave
                jQuery('#leftNavDropdown').hide();
            }
        });
        */
    }
});