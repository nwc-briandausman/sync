/* ================================================================ */
/* Toggle the next element by clicking the previous one
/* ================================================================ */
jQuery('body').on('click', '.toggleNext', function(e){
    e.preventDefault();
    jQuery(this).next().toggleClass('hide');
    jQuery(this).find('i').toggleClass('fa-caret-down').toggleClass('fa-caret-up');
});