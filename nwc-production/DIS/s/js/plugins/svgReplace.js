if( !(jQuery('html').hasClass('svg')) ){
    jQuery('.lt-ie9 .svg-replace').each(function(){
        jQuery(this).attr( 'src', jQuery(this).attr('data-svg') );        
    });
}