/* ==================================================
Usage: to create a store finder.

Usage: add <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=TRUE"></script> to html
Usage: Add a div with an id of 'map-canvas' to your html

Param: data-threshold="xxx"
What: the threshold is the height from the top of
      window. when the image should replace it's 
      source. If not set, will = 100
Param: data-src="filename.jpg"
What: the source of the image, to be swapped out 
      when the threshold is met.
================================================== */
var gmarkers = [];

aaeApp.factory('googleMapService', function($http, $timeout){
    return{
        initMap : function(scope, location){
            var mapOptions = {
                center: { lat: 35.607917, lng: -95.960373}, //default is chicago
                zoom: 5, //zoom out to start
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
            };
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            //****************************
            // Test Geolocation
            //***************************/
            if(navigator.geolocation && location === 'geocode' || location === 'current location' || location === 'Current Location'){
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                    map.setCenter(pos);
                    map.setZoom(9);

                    //set my marker
                    var marker = new google.maps.Marker({
                        position: pos, 
                        map: map,
                        icon: 'images/currentLocation-marker.png'
                    });

                    angular.element('.storeListContainer').toggleClass('hide');
                    angular.element('.searchContainer').toggleClass('hide');
                    scope.yourLat = position.coords.latitude;
                    scope.yourLng = position.coords.laongitude;
                    
                    scope.getLocation( position.coords.latitude + ' ' + position.coords.longitude );
                });
            }else{
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&sensor=true')
                .success(function(data) {
                    //console.log(data.results[0].formatted_address);
                    
                    var pos = new google.maps.LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
                    scope.yourLat = data.results[0].geometry.location.lat;
                    scope.yourLng = data.results[0].geometry.location.lng;
                    map.setCenter(pos);
                    map.setZoom(9);

                    //set my marker
                    var marker = new google.maps.Marker({
                        position: pos, 
                        map: map,
                        icon: 'images/currentLocation-marker.png'
                    });

                    angular.element('.storeListContainer').toggleClass('hide');
                    angular.element('.searchContainer').toggleClass('hide');
                    scope.checkLocation = location;
                }).
                error(function(data, status, headers, config) {
                    alert('There was an error connecting to our mapping service, please try again later');
                });
            }
            
            //****************************
            // Create Markers
            //***************************/
            var data = scope.stores;
            var infoWindow = new google.maps.InfoWindow(), marker, i;

            for( i = 0; i < data.length; i++ ) {
                gmarkers.push(marker);  //push into our array so we can click later
                var position = new google.maps.LatLng(data[i].latitude, data[i].longitude);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: data[i].address,
                    icon: 'images/store-marker.png'
                });  

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infoWindow.setContent(
                            '<div style="width: 440px;">' +
                                '<a target="_blank" class="btn btn-default pull-right" href="http://maps.apple.com/?saddr=Current%20Location&daddr=' + data[i].streetAddr + data[i].city + data[i].zipCode + '">Get Directions</a>' +
                                '<h2><strong>' + data[i].storeName + '</strong></h2>' +
                                '<span class="dullGray">Store #' + data[i].storeUnit + '</span>' +   
                                '<br>' +
                                '<aside class="mapInfoWrap lh-standard">' +
                                    data[i].streetAddr + ', ' + data[i].city + ', ' + data[i].state + ' ' + data[i].zipCode +
                                    '<br>' +
                                    'Phone: ' + data[i].phone +
                                    '<br><br>' +
                                    '<a class="btn btn-info pull-right" target="_blank" href="http://www.searshometownstores.com/locations/' + data[i].urlFriendlyName + '-' + data[i].state + '">Shop Store Inventory</a>' +
                                    '<strong class="dark toggleNext">Store Hours <i class="fa fa-caret-down"></i></strong>' +
                                    '<aside class="hide">' +
                                        '<strong class="col-xs-2 text-right">Mon:</strong> ' + data[i].monHours + '<br>' +
                                        '<strong class="col-xs-2 text-right">Tue:</strong> ' + data[i].tueHours + '<br>' +
                                        '<strong class="col-xs-2 text-right">Wed:</strong> ' + data[i].wedHours + '<br>' +
                                        '<strong class="col-xs-2 text-right">Thr:</strong> ' + data[i].thrHours + '<br>' +
                                        '<strong class="col-xs-2 text-right">Fri:</strong> ' + data[i].friHours + '<br>' +
                                        '<strong class="col-xs-2 text-right">Sat:</strong> ' + data[i].satHours + '<br>' +
                                        '<strong class="col-xs-2 text-right">Sun:</strong> ' + data[i].sunHours + '<br>' +
                                '</aside>' +
                            '</div>'
                        );
                        infoWindow.open(map, marker);
                        map.setCenter(marker.getPosition());
                    }
                })(marker, i));
            }
            
            
            //click event for markers
            //TODO
            angular.element('body').on('click', '#storeLocatorListWrapper li', function() {
                var markerIndex = angular.element(this).index();
                //google.maps.event.trigger(marker.[markerIndex], 'click');
            });
        },
        updateMap : function(scope, userLocation){
            console.log(userLocation)
        },
        changeLocation : function(scope){
            angular.element('.storeListContainer').toggleClass('hide');
            angular.element('.searchContainer').toggleClass('hide');
        }
    }  //end: return
});