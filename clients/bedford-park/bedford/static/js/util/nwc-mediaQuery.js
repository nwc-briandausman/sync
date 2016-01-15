/* ================================================================ */
/* JS Media Queries
/* ================================================================ */
var mq; //set our empty mq variable
var mediaQuery = mqType().width;    //set a var with the window width (this is most accurate for all browsers

//get window width
function mqType() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

//check the width to determine which device
function mqCheck(){
    if( !( $('html').hasClass('lt-ie9') ) ){
        switch(true){
            case ( mediaQuery <= 767 ):
                mq = 'xs';
                break;
            case ( 768 <= mediaQuery && mediaQuery <= 991 ):
                mq = 'sm';
                break;
            case ( 992 <= mediaQuery && mediaQuery <= 1199 ):
                mq = 'md';
                break;
            case ( 1200 <= mediaQuery && mediaQuery <= 1600 ):
                mq = 'lg';
                break;
            case ( mediaQuery >= 1601 ):
                mq = 'xl';
                break;
        }
    }
}

//init the media query check
mqCheck();
doMq();

//check window resize as well
$(window).resize(function(){
    mediaQuery = mqType().width;
    mqCheck(); //check mq on resize
    doMq();    //do anything we want after resize again
});

/* ================================================================ */
/* Do stuff with the media queries.
/* ================================================================ */
function doMq(){
    console.log(mq);
} //end: doMq