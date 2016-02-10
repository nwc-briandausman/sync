//tell the app where to go
aaeApp.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        templateUrl : '/views/home.html',
        controller  : 'aaeController'
    })
    .when('/store_locator', {
        templateUrl : '/views/storeLocator.html',
        controller  : 'aaeStoreController'
    })
    .when('/knowledge_center', {
        templateUrl : '/views/knowledgeCenter.html',
        controller  : 'aaeKnowledgeController'
    })
    .otherwise({redirectTo: '/'});
    
    $locationProvider.html5Mode(true);
});