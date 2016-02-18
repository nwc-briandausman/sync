soApp.controller('categoryCtrl', ['$scope', '$rootScope', '$timeout', '$window', 'commonServices', function($scope, $rootScope, $timeout, $window, commonServices){
    var self = this;
    self.so = so;   //set the common values and variables found in commonJs.jsp
    
    setOmValues(); 
    
    if( mq === 'xs' || mq === 'sm' ){
        so.categoryDrop = '';   //if mobile, do not load up the category banners
        self.so.topCategoriesJson = '';
        self.so.specialDealItemJson = '';
    }    
    
    if(self.so.omniVerticalFlag === "true"){
        setOmValuesVerticals(categoryName,'no','no','event38');
    }
    
    if(self.so.source != "null" && self.so.source == "commisionj") {				
        jQuery.cookie(self.so.cookieSearchFeedSource, self.so.source, { expires: self.so.exireDate, path: '/', domain: self.so.cookieDomain });
    }
    
    var bestSellersURL = so.bestSellers;
    commonServices.jsonService(bestSellersURL).then(function(data){
        self.bestSellers = data;
        
        setTimeout(function(){
            commonServices.renderReviewIcons();
            commonServices.renderTooltips();
            carousel(jQuery('#categoryBestSellersCarousel'), false, true, true, true, true, true, true, 2, true, 3, false, 5, true, 5, true); 
            carousel(jQuery('#categorySpecialDealsCarousel'), false, true, true, true, true, true, true, 2, true, 3, false, 5, true, 5, true); 
            carousel(jQuery('#topCategoriesCarousel'), false, true, true, true, true, true, true, 2, true, 3, false, 5, true, 5, true); 
            $scope.$apply();
        }, 10);
    });
    
    self.quickView = function(itemId, pdpURL){
        $rootScope.loadingMask = true;
        commonServices.quickView(itemId).then(function(data){
            $rootScope.quickViewURL = pdpURL;
            $rootScope.quickViewDetails = data;
            $rootScope.loadingMask = false;
            setTimeout(function(){
                commonServices.renderReviewIcons();    
            }, 10);
        });
    };
}]);
