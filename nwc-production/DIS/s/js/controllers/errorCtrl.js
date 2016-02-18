soApp.controller('404Ctrl', ['$scope', '$rootScope', '$timeout', '$window', 'commonServices', function($scope, $rootScope, $timeout, $window, commonServices){
    var self = this;

    self.trendingItems = trendingItemsJsonObj;

    self.search = function(){
        if( self.fourOhFourSearchValue && self.fourOhFourSearchValue.length > 2 ){
            window.location = '/d/products.jsp?md=srh_md&stxt=' + self.fourOhFourSearchValue + '&fromUrl=search';
        }else{
            commonServices.inputError('Please enter at least two characters.', jQuery('#four-oh-four-search') );
        }
    };
    
    $timeout(function () { 
        commonServices.mqImages();
        commonServices.renderReviewIcons();
    }, 10);
}]);

jQuery(document).ready(function(){
    carousel(jQuery('#currentlyTrendingCarousel'), false, true, true, true, true, true, true, 2, true, 4, false, 6, true, 6, true)
});
