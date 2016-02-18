soApp.controller('dealsCtrl', ['$scope', '$rootScope', '$timeout', '$window', 'commonServices', function($scope, $rootScope, $timeout, $window, commonServices){
    var self = this;
    
    self.topDealItemsJsonJS = topDealItemsJsonJS;
    self.dealOfDayItemsJsonJS = dealOfDayItemsJsonJS;
    
    $timeout(function () { 
        carousel(jQuery('#topDealsCarousel'), false, true, true, true, true, true, true, 2, true, 2, false, 4, true, 4, true); 
    },1500);
    
    //get the prod json or preview json depending on hash
    self.hash = commonServices.getHASH();   //get the hash

    if(self.hash === "preview4815162342"){
        dropzonesJSON = previewJSON;
    }

    commonServices.jsonService(dropzonesJSON).then(function(data){       
        self.marketing = data;    
        setTimeout(function(){
            commonServices.mqImages();
            commonServices.renderReviewIcons();
            carousel(jQuery('#hero'), true, true, true, false, true, false, true, 1, false, 1, false, 1, false, 1, false); 
        },90);
    });
}]);