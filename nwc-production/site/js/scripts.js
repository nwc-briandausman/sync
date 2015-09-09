// create our module and inject ngAnimate into it
angular.module('nwc', [])
    .controller('nwcController', function($scope) {
      
        /**************************/
        /* Push Nav
        /**************************/
        $scope.pushNav = function(){
            $scope.navOpen = !$scope.navOpen;
        };
    });
