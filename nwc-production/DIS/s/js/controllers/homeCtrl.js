soApp.controller('homeCtrl', ['$scope', '$rootScope', '$timeout', '$window', 'commonServices', function($scope, $rootScope, $timeout, $window, commonServices){
    var self = this;

    self.trendingItems = trendingItemsJsonObj;
    self.popularItems = topDealItemsJsonObj;
    commonServices.getJSON('/d/prevViewedItems', function(data){
        self.previouslyViewed = data;
        $timeout(function () { 
            carousel(jQuery('#previouslyViewedCarousel'), false, true, true, true, true, true, true, 2, true, 4, false, 6, true, 6, true); 
        },1500);
    });


    setOmValues();

    self.isStoreIpadSubmit = function(isValid){
        if( self.isStoreIpadValue && self.isStoreIpadValue.length === 5){
            jQuery.cookie("inStoreIpadRedirect", self.isStoreIpadValue, { expires: $rootScope.so.exireDate, path: '/', domain: $rootScope.so.cookieDomain });    
            window.location.href = '/d/store.jsp?store=' + self.isStoreIpadValue;
        }else if( self.isStoreIpadValue && self.isStoreIpadValue.length === 4 ){
            jQuery.cookie("inStoreIpadRedirect", '0' + self.isStoreIpadValue, { expires: $rootScope.so.exireDate, path: '/', domain: $rootScope.so.cookieDomain });
            window.location.href = '/d/store.jsp?store=0' + self.isStoreIpadValue;    
        }else{
            commonServices.inputError('Please enter a valid store number.', jQuery('#isStoreIpadInput') );
            jQuery.cookie("inStoreIpadRedirect", '', { expires: $rootScope.so.exireDate, path: '/', domain: $rootScope.so.cookieDomain });
        }    
    };

    //get the prod json or preview json depending on hash
    self.hash = commonServices.getHASH();   //get the hash

    if(self.hash === "preview4815162342"){
        dropzonesJSON = previewJSON;
    }

    commonServices.getJSON(dropzonesJSON, function(dropzones){
        self.marketing = dropzones;
        $timeout(function () { 
            commonServices.mqImages();
            commonServices.renderReviewIcons();
            
            $timeout(function () { 
                self.isHeroReady = true;
                carousel(jQuery('#hero'), true, true, true, false, true, false, true, 1, false, 1, false, 1, false, 1, false); 
            },500);
        }, 10);
    });
    
    self.homeInit = function(){
        if( so.inStoreIpad ){
            commonServices.postData('/d/chk-store-modal', '', function(data){
                if( data !== false ){
                    if( jQuery.cookie("inStoreIpadRedirect") && jQuery.cookie("inStoreIpadRedirect").length === 5 ){
                        window.location.href = '/d/store.jsp?store=' + jQuery.cookie("inStoreIpadRedirect");    
                    }else{
                        jQuery('#inStoreModal').modal('show');    
                    }
                }
            });    
        }    
    };
}]);


jQuery(window).load(function(){
    carousel(jQuery('#popularItemsCarousel'), false, true, true, true, true, true, true, 2, true, 4, false, 6, true, 6, true); 
    carousel(jQuery('#currentlyTrendingCarousel'), false, true, true, true, true, true, true, 2, true, 4, false, 6, true, 6, true); 
});