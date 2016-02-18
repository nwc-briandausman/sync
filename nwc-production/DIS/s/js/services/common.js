jQuery.ajaxSetup({ cache: false });
soApp.factory('commonServices', function($http, $rootScope){
    return{
        postIt: function(url, data){
                return $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    success : function(d){
                        return d;
                    },
                    error: function(d){
                        return d;   
                    }
                });  
            },
            getIt: function(url, data){
                return $.ajax({
                    type : "GET",
                    url : url,
                    data: data,
                    beforeSend: function (request){
                        request.setRequestHeader("Accept", "text/html;type=ajax");
                    },
                    success : function(data){
                        return data;
                    },
                    error: function(data){
                        return data;
                    }
                });
        },
        getJSON : function(url, callback){
            $http({ 
                method: 'GET', 
                url: url,
                cache: false,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded', 'x-outlet-rest' : 'get', 'Cache-Control' : 'no-cache' }
            }).success(callback)
            .error(callback);
        },
        jsonService: function(url){
            return $http.get(url, { headers : { 'Content-Type': 'application/x-www-form-urlencoded', 'x-outlet-rest' : 'get' } })
            .then(function(result){
                return result.data;
            }, function(data){
                return 0;
            });        
        },
        returnJSON: function(url, data){
            return $http.get(url, { params: jQuery("#" + data).serializeArray() }, { headers : { 'Content-Type': 'application/x-www-form-urlencoded', 'x-outlet-rest' : 'get' } })
            .then(function(result){
                return result.data;
            }, function(data){
                return 0;
            });        
        },
        getProducts: function(url, form, data){
            //here
            return $http.get(url, { data: jQuery("#" + form).serializeArray() }, { headers : { 'Content-Type': 'application/x-www-form-urlencoded', 'x-outlet-rest' : 'get' } })
			.then(function(result){
                return result.data;
            }, function(data){
                return 0;
            });    
        },
        postData : function(url, data, callback){
            $http({ 
                method: 'POST', 
                url: url,
                data: data
            }).success(callback)
            .error(callback);    
        },
        inputError : function(message, el){
            var position = jQuery(el).offset();
            var iTop = position.top - 12;
            var iLeft = position.left;
            
            jQuery('body').append(    
                '<div class="input--error bg--danger font--light padding-xs font-10 lh-xs" style="z-index: 9999; position: absolute; top: ' + iTop +'px; left: '+ iLeft + 'px;" ><strong>' + message + '</strong></div>'
            );
            
            jQuery(document).mouseup(function (e){
                var container = $(".input--error");

                if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    container.remove();
                }
            });
        },
        displayErrorMessage : function(message){
            jQuery('#error').remove();
            jQuery('body').append('<div id="error" class="alert alert-error">' + message + '</div>');
        },
        mqImages: function(){
            //NOTE: need to add a class of mqImage to each, AND a data-src attribute
            function mqSwitch(){
                switch(mq){
                    case ( 'xs' ):
                        jQuery('.mqImage').each(function(){ jQuery(this).attr('src', jQuery(this).attr('data-xs') ); });  
                        break;
                    case ( 'sm' ):
                        jQuery('.mqImage').each(function(){ jQuery(this).attr('src', jQuery(this).attr('data-sm') ); });  
                        break;
                    case ( 'md' ):
                        jQuery('.mqImage').each(function(){ jQuery(this).attr('src', jQuery(this).attr('data-md') ); });  
                        break;
                    case ( 'lg' ):
                        jQuery('.mqImage').each(function(){ jQuery(this).attr('src', jQuery(this).attr('data-lg') ); });  
                        break;
                    case ( 'xl' ):
                        jQuery('.mqImage').each(function(){ jQuery(this).attr('src', jQuery(this).attr('data-lg') ); });  
                        break;
                }
            }
            
            mqSwitch();
            
            jQuery(window).resize(function(){
                mqSwitch(); //perform again on window resize 
            });
            //jQuery('.mqImage').removeClass('mqImage');
        },
        renderTooltips : function(){
            jQuery('[data-toggle="tooltip"]').tooltip();    
        },
        renderReviewIcons : function(){
            jQuery('.itemReview').each(function(){
                var reviewRating = parseFloat( jQuery(this).attr('data-rating') );
                switch (reviewRating){
                    case 0.5:
                        jQuery(this).find('i:lt(1)').addClass('fa-star-half-o').removeClass('fa-star-o');
                        break;
                    case 1:
                        jQuery(this).find('i:lt(1)').addClass('fa-star').removeClass('fa-star-o');
                        break;
                    case 1.5:
                        jQuery(this).find('i:lt(1)').addClass('fa-star').removeClass('fa-star-o');
                        jQuery(this).find('i:eq(1)').addClass('fa-star-half-o').removeClass('fa-star-o');
                        break;
                    case 2:
                        jQuery(this).find('i:lt(2)').addClass('fa-star').removeClass('fa-star-o');
                        break;
                    case 2.5:
                        jQuery(this).find('i:lt(2)').addClass('fa-star').removeClass('fa-star-o');
                        jQuery(this).find('i:eq(2)').addClass('fa-star-half-o').removeClass('fa-star-o');
                        break;
                     case 3:
                        jQuery(this).find('i:lt(3)').addClass('fa-star').removeClass('fa-star-o');
                        break;
                     case 3.5:
                        jQuery(this).find('i:lt(3)').addClass('fa-star').removeClass('fa-star-o');
                        jQuery(this).find('i:eq(3)').addClass('fa-star-half-o').removeClass('fa-star-o');
                        break;
                    case 4:
                        jQuery(this).find('i:lt(4)').addClass('fa-star').removeClass('fa-star-o');
                        break;
                    case 4.5:
                        jQuery(this).find('i:lt(4)').addClass('fa-star').removeClass('fa-star-o');
                        jQuery(this).find('i:eq(4)').addClass('fa-star-half-o').removeClass('fa-star-o');
                        break;
                     case 5:
                        jQuery(this).find('i:lt(5)').addClass('fa-star').removeClass('fa-star-o');
                        break;
                   } 
            });    
        },
        addScripts : function(){
                setTimeout(function(){                     
                    //bloomreach autosuggest
                    (function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src='//d1tpmtwl6eat2g.cloudfront.net/brm/searsoutlet_com/br-mob.js';var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})( );
                }, 4000);
        },
        printPage : function(){
            window.print();    
        },
        hideLoadingMask : function($rootScope){
            $rootScope.loadingMask = false;    
        },
        getHASH : function(){
            var URLhash = document.location.href.split('#');
            return URLhash[1];
        },
        checkZip : function(zipcode){
            if(zipcode != null && zipcode != "" && zipcode.length > 0 && zipcode !== undefined){
                so.zip =  jQuery.cookie("customer_zip");
                return true;
            }
        },
        checkStore : function(myStore){
            if(myStore != null && myStore != "" && myStore.length > 0 && myStore !== undefined || jQuery.cookie("myStoreName_view")){
                return true;
            }
        },
        checkGeo : function(){
            if ( navigator.geolocation ){
                return true;
            }
        },
        currentLocation : function(callback){
            navigator.geolocation.getCurrentPosition(showLocation, function(errorCode){
                if( errorCode.code == 1){
                    jQuery.cookie('geoLocation', 'no');
                }
            });
            
            function showLocation(position) {
                $http({ 
                    method: 'POST', 
                    url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=true', 
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(callback)
                .error(callback);
            }
        },
        geocode : function(location, callback){
            $http({ 
                method: 'POST', 
                url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&sensor=true', 
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(callback)
            .error(callback);    
        },
        getZipCode : function(data){
            navigator.geolocation.getCurrentPosition(function(position) {
                //convert the lat long to a zip
                $http({ 
                    method: 'POST', 
                    url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=true', 
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(data)
                .error(data);
            });
        },
        getClosestStores : function(callback){
            $http({ 
                method: 'GET', 
                url: '/'+Date.now()+ '/d/nearby-store-search/outlet',
                data: {}
            }).success(callback)
            .error(callback);    
        },
        getStoreList : function(lat, long, radii, outlet, homeappliance, hometown, full, hardware, apparel, callback){
            $http({ 
                method: 'GET', 
                url: '/'+Date.now()+'/d/getNearByStores?action=nbst&lat=' + lat + '&lng=' + long + '&r=' + radii + '&chkOutlet=' + outlet + '&chkHardware=' + hardware + '&chkFullline=' + full + '&chkHometown=' + hometown + '&chkApparel=' + apparel + '&chkHomeApp=' + homeappliance,
                data: {}
            }).success(callback)
            .error(callback);        
        },
        chatBootstrap : function(){
            //currently disabled
        },
        chatClick : function(){
            //currently disabled
        },
        cut : function(word, n){
            word = word.substring(0, n) + "...";
            return word;
        },
        stripIt : function(word){
    	   word = word.replace(/<(?:.|\n)*?>/gm, '');
            return word;
        },
        initYotpo : function($rootScope){
            if( so.yotpoUrl && $rootScope.yotpoLoaded != true) {
                (function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src=self.so.yotpoUrl;var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})( );

                //trigger the yotpo review on click of the header item
                jQuery('#upperHeader').on('click', '#yotpoHeaderBtn', function(){
                    jQuery('#yotpo_testimonials_btn ').trigger('click');    
                });

                //on click of the rate us link, fire a click of yotpo
                jQuery('main').on('click', '#yotpoHeaderBtn', function(){
                    jQuery('#yotpo_testimonials_btn ').trigger('click');    
                });

                $rootScope.yotpoLoaded = true;
            }
        },
        quickView : function(itemId, $scope){
            //to use include the quickview tag in the page
            //envoke with commonServices.quickView(id)
            //assign to $rootScope.quickViewDetails
            var quickview = {};
            
            return $http({
                method: 'GET',
                url: '/d/product_specifications?basicAttr=Y&itemId=' + itemId 
            }).then(function successCallback(response) {
                quickview.data = response;
                return quickview;
            }, function errorCallback(response) {
                quickview.data = response;
                return quickview;
            });
        },
        getProductsList : function(callback){
            $http({ 
                method: 'GET', 
                url: 'xyz',
                cache: false,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded', 'x-outlet-rest' : 'get', 'Cache-Control' : 'no-cache' }
            }).success(callback)
            .error(callback);
        },
    }
});