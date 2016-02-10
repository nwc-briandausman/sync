var aaeApp = angular.module('aaeApp',['onScroll', 'scrollToTop', 'replaceSvg', 'replaceRetina']); 
aaeApp.controller('aaeController', function($scope, $rootScope, $timeout){
    //set the date in the footer
    var d = new Date();
    $rootScope.date = d.getFullYear();
});

aaeApp.controller('aaeStoreController', function($scope, $rootScope, $timeout, $http, googleMapService){
    //set the date in the footer
    var d = new Date();
    $rootScope.date = d.getFullYear();
    
    //get the store list json
    $http.get('js/getNearByStores.json')
    .success(function(data, status, headers, config) {
        $scope.stores = data.stores;
        $scope.storesByState = data;
        
        googleMapService.initMap($scope, 'geocode');
        $timeout(function() {
            jQuery('[data-toggle="popover"]').popover();
        }, 500);
        
        $scope.listVisible = false; //hide the store list
        
    }).
    error(function(data, status, headers, config) {
        alert('There was an error connecting to our mapping, please try again later');
    });
    
    $scope.changeLocation = function(){
        googleMapService.changeLocation($scope);    
    };
    
    $scope.getLocation = function(location){
        $scope.listVisible = true;  //show the store list
        googleMapService.initMap($scope, location);
        //calculate the distances
        $timeout(function() {
            for (i = 0; i < $scope.stores.length; i++) { 
                var lat1 = parseFloat($scope.stores[i].latitude);
                var lon1 = parseFloat($scope.stores[i].longitude);
                var lat2 = $scope.yourLat;
                var lon2 = $scope.yourLng;
                
                var R = 3959; // ml
                var dLat = toRad(lat2 - lat1);
                var dLon = toRad(lon2 - lon1);
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat2)) * Math.cos(toRad(lat1)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var distance = R * c;
                $scope.stores[i].distance = Math.round(distance);
            }
        }, 500);
    };
    
    function toRad(Value) {
        return Value * Math.PI / 180;
    }
    
    $scope.setCity = function(city){
        $scope.listTyping = false;
        $scope.stateFilter = city;
    };
    
    $scope.showHints = function(){
        $scope.listTyping = true;
    };
    
    $scope.hideHints = function(){
        $timeout(function() {
            $scope.listTyping = false;
        }, 30);
    };
    
    $scope.hideStates = function(){
        jQuery('.stateListWrapper').each(function(){
            if( jQuery(this).find('.storeInfo').length ){
                jQuery(this).removeClass('hide');
            }else{
                jQuery(this).addClass('hide');    
            }
        });   
    };
    
    $scope.scrollState = function(id){
        $('html, body').animate({ scrollTop: $('#' + id).offset().top }, 'slow');    
    };
});

aaeApp.controller('aaeKnowledgeController', function($scope, $rootScope, $timeout, $http, googleMapService){
    //set the date in the footer
    var d = new Date();
    $rootScope.date = d.getFullYear();
    
    
    //defualts
    $scope.category = "Browse Our";
    $scope.kcURL = '/views/kc-landing.html';
    
    $scope.setTitle = function(category, url){
        $scope.category =  category;   
        $scope.kcURL = url;
    };
    
    $scope.setLanding = function(){
        $scope.category = "Browse Our";
        $scope.kcURL = '/views/kc-landing.html';    
    };
});