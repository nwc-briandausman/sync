soApp.controller('headerCtrl', ['$scope', '$rootScope', '$timeout', '$window', 'commonServices', function($scope, $rootScope, $timeout, $window, commonServices){
    var self = this;
    $timeout(function () { 
        //TODO move to init to prevent timing issues
        $rootScope.so = so;   //set the common values and variables found in commonJs.jsp
        self.formData = {}; //for feedback form data
    },100);
    
    //store locator
    var timer;
    self.storeLocator = false;
    
    self.showStoreLocator = function(){
        //load up google maps if we need it
        if (typeof google === 'object' && typeof google.maps === 'object') {
            //console.log('google map is read');
        }else{
            var scriptLoaded = false;
        	var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = window.location.protocol + '//maps.googleapis.com/maps/api/js?v=3&sensor=false&' + $rootScope.so.googleMapsApi + '&channel=' + $rootScope.so.googleMapsId  + '-outlet-shopByStoreLocation&callback=initMap1&libraries=geometry';
            script.async = false;
            document.getElementsByTagName("head")[0].appendChild(script);   
        }
        
        self.storeLocatorInput = self.customerZip;
        
        self.storeLocator = true;
    };
    
    self.storeLocatorTimer = function(){
        $timeout.cancel(timer);
        self.storeLocator = true;    
    };
    
    self.hideStoreLocator = function(){
        timer = $timeout(function () {
          self.storeLocator = false;
        }, 50);
        
    };
    
    self.showMiniCart = function(){
        if( self.miniCartLoaded !== true){   //if the minicart is already loaded no need for json call
            self.miniCartLoaded = true;
            commonServices.getJSON('/d/get_quick_view_cart_detail', function(callback){
                self.cartItems = callback;    //set the data as a scope object
                if( self.cartItems.length > 0 ){
                    self.miniCartVisible = true;  //show the minicart popup
                }
            });
        }else{
            if( self.cartItems && self.cartItems.length > 0 ){
                self.miniCartVisible = true;  //already loaded, so show it
            }
        }
        
    };
    
    self.hideMiniCart = function(){
        self.miniCartVisible = false;
    };
    
    self.viewCart = function(){   //on click of the view cart button
        setOmValuesEvent('Shopping Cart','/d/shopping_cart.jsp','no','no');    
    };
    //bring up the email savings modal
    self.emailSavings = function(){
        $timeout(function(){    //need to wrap in a timeout or will throw errors
            jQuery('#emailSavingsModal').modal('show'); //bring up the modal
        }, 10);    
    };
    
    //check if we should show the email savings modal on page load or not
    self.initHeader = function(){
        $timeout(function(){    //need to wrap in a timeout or will throw errors
            self.geoLocation = commonServices.checkGeo();
        
            self.hash = commonServices.getHASH();   //get the hash

            if(self.hash === "emailSignup"){    //if the has is emailSignup
                $timeout(function(){    //need to wrap in a timeout or will throw errors
                    jQuery('#emailSavingsModal').modal('show'); //bring up the modal
                }, 3000);
            }

            if( !jQuery.cookie('email_modal_show') && mq !== 'xs' ){ //text google plus or email savings modal to show
                commonServices.getJSON('/d/get-coupon-type', function(data){
                    //if the backend says email, then show the popup on page load
                    if( data === 'email' && jQuery.cookie('email_modal_show') != 'false'){  
                        self.emailSavings();    
                    }
                }); 
            }

            if( self.hash === 'feedback' || self.hash === 'Feedback' ){ //if we need to show the feedback modal
                $timeout(function(){    //need to wrap in a timeout or will throw errors
                    jQuery('#feedbackModal').modal('show');
                }, 10);
            }

            //set the correct logged in container
            if( jQuery.cookie('userType') === 'Registered' && jQuery.cookie('emailId') ){
                self.myProfile = jQuery.cookie('emailId');
                self.loggedIn = true;
                self.managerLoggedIn = false;
            }else if( jQuery.cookie('t_usr') === 'ACCESS_AUTHORIZED' ){
                self.loggedIn = false;
                self.managerLoggedIn = true;
            }else{
                self.loggedIn = false;
                self.managerLoddedIn = false;
            }

            //Geolocation and set zip code, check if already have the data
            var locationInfo;
            try{
                locationInfo = JSON.parse( jQuery.cookie("closestStoreInfo") );
            }catch(err){
                locationInfo = ['','','',''];
            }

            try{
                var savedData = JSON.parse( jQuery.cookie("customerData") ); //session cookie

                if( savedData.closestStoreCity !== '' ){
                    self.myStoreSet = true;
                    $rootScope.so.myStoreName = savedData.closestStoreCity + ' ' + savedData.closestStoreState;
                    $rootScope.so.myStoreLink = 'http://' + location.host + '/d/store.jsp?store=' + savedData.closestStoreNumber;
                }
            }catch(err){}

            //attempt to get user info/location/store from geolocation
            self.zipCodeSet = commonServices.checkZip(jQuery.cookie('customer_zip'));
            self.myStoreSet = commonServices.checkStore(jQuery.cookie("myStoreName_view"));

            if( self.zipCodeSet !== true ){   //no zip
                if( self.geoLocation === true ){    //geo is available
                    commonServices.getZipCode(function(data){
                        //find the postal from the result
                        for (var h=0; h<data.results.length; h++){
                            for (var i=0; i<data.results[h].address_components.length; i++){
                                for (var j=0; j<data.results[h].address_components[i].types.length; j++){
                                    if (data.results[h].address_components[i].types[j] == "postal_code"){
                                        $rootScope.so.zip = data.results[h].address_components[i].long_name;
                                    }
                                }
                            }
                        }

                        self.customerZip = $rootScope.so.zip;
                        jQuery.cookie('customer_zip', self.customerZip, { expires:  so.expireDate, path: '/', domain: so.cookieDomain });
                        
                        commonServices.getClosestStores(function(stores){
                            self.setClosestStore(stores);
                        });  //now that zip is set, get the closest store
                    });
                }
            }else{   //zip set
                if( self.myStoreSet !== true ){ //but no store
                    commonServices.jsonService('/'+Date.now()+ '/d/nearby-store-search/outlet').then(function(data){
                        self.setClosestStore(data);
                    });
                }else{  //my store is set
                    setTimeout(function(){
                        $rootScope.so.myStoreName = jQuery.cookie('myStoreName_view');
                        $rootScope.so.myStoreLink = '/d/store.jsp?' + jQuery.cookie('myStoreName_view') + '&store=' + jQuery.cookie("my_own_store");   
                        $scope.$apply();
                    }, 1000);
                }
            }

            
            //liveperson chat
            commonServices.chatBootstrap();

            commonServices.addScripts();    //add any scripts that can be loaded after the page is done loading
            
            //enable review capture
            renderReviewCapture();
            
            //set the mini cart variables
            self.cartCount = so.cartCount;
            self.cartSubtotal = so.cartSubtotal;
        }, 50);    
    };
    
    self.openYotpo = function(){
        if( $rootScope.so.yotpoUrl && $rootScope.yotpoLoaded != true) {
            commonServices.initYotpo($rootScope);
            
            setTimeout(function(){ 
                    jQuery('#yotpoHeaderBtn').click();
            },2000);
            
            $rootScope.yotpoLoaded = true;
        }
    };
    
    self.brInit = function(){
        if( self.brLoaded !== true){
            brAutosuggest();
        }
        self.brLoaded = true;
    };
    
    self.setClosestStore = function(stores){
        if( !(jQuery.cookie("myStoreName_view")) ){
           $rootScope.so.myStoreName = stores[0].city + ' ' + stores[0].state; 
           $rootScope.so.myStoreLink = location.host + '/d/store.jsp?store=' + stores[0].unit;
           $rootScope.so.closestStoreCity = stores[0].city;
           $rootScope.so.closestStoreState = stores[0].state;
           $rootScope.so.closestStoreZip = stores[0].zip;
           $rootScope.so.closestStoreNumber = stores[0].unit;

           //store the info in a cookie
           closestStoreInfo = [stores[0].city, stores[0].state, stores[0].zip, stores[0].unit];
           jQuery.cookie('closestStoreInfo', JSON.stringify(closestStoreInfo), { path: '/', domain: so.cookieDomain });
           jQuery.cookie("customerData", JSON.stringify({"closestStoreCity":stores[0].city,"closestStoreZip":stores[0].zip,"closestStoreState":stores[0].state,"closestStoreNumber":stores[0].unit}), { path: '/', domain: so.cookieDomain });
        }
    };
    
    //close the mailer and set the cookie to not show it again for xx days
    self.emailSavingsClose = function(){
        jQuery.cookie("email_modal_show", false, { expires: 15, path: '/', domain: so.cookieDomain }); //set the cookie to not show again for 15 days  
    };
    
    //signup for email savings
    self.emailSavingsSubmit = function(isValid){
        if( isValid === true ){ //if the form is valid, checked from the inline angular validation
            self.emailSavingsInvalid = false;   //hide the error message
            self.emailSavingsSuccess = true;   //show success message
            self.emailSavingsURL = "/d/email_submit.jsp?emailId=" + self.emailSavingsValue + "&dealFalg=true&promotionFlag=true";   //build the url
            
            jQuery.cookie("email_modal_show", false, { expires: so.expireDate, path: '/', domain: so.cookieDomain }); //set the cookie to not show again
                
            //Post to our db
            $timeout(function () {
                jQuery('#emailSavingsModal').modal('hide'); //hide the modal
            }, 3000);
            
            commonServices.postData(self.emailSavingsURL, '', function(data){
                //it went through    
            });
        }else{
            self.emailSavingsInvalid = true;    //show the error message
        }
    };
    
    //link tracking clicks
    self.helpCenterClick = function(el){
        if(el === 'faq' ){
            setOmValuesEvent('Frequently Asked Questions','/d/static/faq.jsp','newWin','no');
        }
    };
    
    //submit feedback modal
    self.feedbackSubmit = function(isValid){
        if( isValid === true ){ //if the form is valid, checked from the inline angular validation
            $.ajax({
                type : "POST",
                url : '/d/feedback/general',
                data: $('#userFeedbackForm').serialize(),
                success : function(data){
                    self.feedbackSuccess = true;
                    self.feedbackError = false;  
                },
                error: function() {
                    self.feedbackSuccess = false;
                    self.feedbackError = true;
                }
            });
        }else{
            self.feedbackSuccess = false;
            self.feedbackError = true;
        }
    };
    
    //signing form
    self.anonSignIn = function(){
        self.register(false,'Sign In');    
    };
    
    self.anonRegister = function(){
        self.register(false,'Register');
    };
    
    self.register = function(flag, pageForOmniture){
        setOmValuesEvent(pageForOmniture,'no','no','no');
        
        if (flag === true) {
            document.signin_form.profileFlag.value = "enabled";
        }
        
        document.signin_form.action="/d/user_management.jsp";
        document.signin_form.submit();
    };
    
    //my profile
    self.myProfileClick = function(){
        setOmValuesEvent('My Profile','/d/overview.jsp','no','no');    
    };
    
    //logout
    self.logout = function(){
        setOmValuesEvent('Logout','no','no','no');    
        document.location.href="/d/logout.jsp?LogoutMode=Yes";
    };
    
    //logout manager
    self.logoutManager = function(){
        jQuery.cookie("<%=ShcOutletForm.COOKIE_TOOL_USER%>", null);
        location.reload();
    };
    
    
    //set zipcode
    self.checkZip = function(){
        if( jQuery.cookie('customer_zip') ){ //if zipcode cookie is set, display it
            self.customerZip = jQuery.cookie('customer_zip');    //set the visible zip
        }    
    };
    
    //zip code submit
    self.zipCodeSubmit = function(isValid, fromPage){
        $rootScope.loadingMask = true;
        if($rootScope.so.userID != null && $rootScope.so.userID != "" && $rootScope.so.userID != 'null'){ //if logged in
            jQuery.cookie("bypass","true", { expires: so.expireDate, path: '/' });
        }else{
            jQuery.cookie("bypass","false", { expires: so.expireDate, path: '/' });
        }  
        
        if( isValid === true && self.zipcode !== '00000' && !( isNaN(self.zipcode) ) || /^\d+$/.test(self.zipcode) === true ){
            self.invalidZip = false;
            commonServices.postData('/d/cordinates_finder.jsp?zip=' + self.zipcode, '', function(data){
                data = $.trim(data);
                if(data == null || data == "null" || data == ""){   //if no coordinates are found
                    self.zipcode = '';  //reset the zip
                    $rootScope.loadingMask = false;
                    alert('Address not found. Please enter a valid zipcode.');    
                }else{
                    jQuery.cookie('customer_zip', self.zipcode, { expires:  so.expireDate, path: '/', domain: so.cookieDomain });  //set the zipcode cookie
                    jQuery.cookie($rootScope.so.filteredStores, '', { path: '/', domain: so.cookieDomain }); //filtered stores list?
                    
                    var local = '&lsStores=local';
                    var newURL = document.URL;
                    var finalURL  = document.URL;
                        
                    if(fromPage == "products"){
                        if(newURL.indexOf(local) == -1){
                            finalURL = newURL.concat(local);	
                        }
                    }
                        
                    jQuery.cookie('lsRedPage', finalURL, { path: '/', domain: so.cookieDomain });
                    self.customerZip = self.zipcode;    //set the visible zip
                    window.location = '/d/localZipSubmit.jsp?localZipCode=' + self.zipcode + '&actionName=zipCode'; //reload the page
                }
            }); 
            //postRequest(localZipCode, "header"); 
        }else{
            self.invalidZip = true; //invalid zip
            $rootScope.loadingMask = false;
        }	
    };
    
    //search submission
    //NOTE: if br autosuggest is on, it will take over.
    self.searchSubmit = function(isValid){
        if (isValid === true){
            if( !$rootScope.so.storeParam ){  //if it's not a store page, remove these fields
                jQuery('#cid').disabled = true;
                jQuery('#store').disabled = true;
            }
            
            $timeout(function (){
                gaSearch( self.searchValue );
                document.searchForm.submit();
            }, 100);
            
        }else{
            if( mq === 'xs' || mq === 'sm' ){
                commonServices.inputError('Please enter at least two characters', jQuery('#mobileSearch') );
            }else{
                commonServices.inputError('Please enter at least two characters', jQuery('#search') );
            }
            return false;   
        }
    };
    
    //store locator inits
    self.storeLocatorInput = jQuery.cookie('customer_zip');
    
    self.locatePosition = function(){
        $rootScope.loadingMask = true;
        
        commonServices.currentLocation(function(data){
            self.currentLocation = data.results[0].formatted_address;   //get the proper formatted address to display
            self.storeLocatorInput = self.currentLocation;  //set it as the input
            
            //get the lat long to perform the search
            self.lat = data.results[0].geometry.location.lat;
            self.long = data.results[0].geometry.location.lng;
            
            self.storeLocatorGetList();
        });
        
        $timeout(function (){
            if( self.geoLocation === false || !self.geoLocation ){
                $rootScope.loadingMask = false;
                self.geoLocation = false;
                commonServices.inputError('There was a problem finding your location.', jQuery('#storeLocatorInput') );
            }
        }, 10000);
    };
    
    self.storeLocatorGetList = function(){
        $rootScope.loadingMask = true;
        
        if( !(self.storeLocatorInput) || self.storeLocatorInput.length < 2 ){
            commonServices.hideLoadingMask($rootScope);
            commonServices.inputError('Please enter your location', jQuery('#storeLocatorInput') );      
        }else{
            commonServices.geocode(self.storeLocatorInput, function(geocode){ 
                if( geocode.status === 'ZERO_RESULTS' ){
                    commonServices.hideLoadingMask($rootScope);
                    commonServices.inputError('Please enter a valid address' , jQuery('#storeLocatorInput'));
                    return false;
                }
                //if no checkboxes have been selected
                if( !self.sl ){
                    commonServices.inputError('Please select at least one store type' , jQuery('#storeLocatorInput'));
                    return false;
                }

                var geoLat = geocode.results[0].geometry.location.lat,
                geoLong = geocode.results[0].geometry.location.lng,
                radii = 150,
                outlet = self.sl.outlet,
                homeappliance = self.sl.homeappliance,
                hometown = self.sl.hometown,
                full = self.sl.full,
                hardware = self.sl.hardware,
                apparel = self.sl.apparel; 
                
                //get myStore Distance
                try{
                    var myStoreDistance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(geoLat, geoLong), new google.maps.LatLng($rootScope.so.myStoreLat, $rootScope.so.myStoreLng));
                        myStoreDistance = myStoreDistance / 1000; //km
                        myStoreDistance = myStoreDistance * 0.621371192 //miles
                        myStoreDistance = myStoreDistance.toFixed(1);    
                    $rootScope.so.myStoreDistance = myStoreDistance;
                }catch(err){}

                //backend uses 'checked' instead of boolean :(
                if(outlet === true){ outlet = 'checked'; }else{ outlet = 'unchecked'}
                if(homeappliance === true){ homeappliance = 'checked'; }else{ homeappliance = 'unchecked'}
                if(hometown === true){ hometown = 'checked'; }else{ hometown = 'unchecked'}
                if(full === true){ full = 'checked'; }else{ full = 'unchecked'}
                if(hardware === true){ hardware = 'checked'; }else{ hardware = 'unchecked'}
                if(apparel === true){ apparel = 'checked'; }else{ apparel = 'unchecked'}
                
                commonServices.getStoreList(geoLat, geoLong, radii, outlet, homeappliance, hometown, full, hardware, apparel, function(data){
                    self.storeLists = data                
                    
                    for (var i = 0; i < self.storeLists.stores.length ; i++) {
                        var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(geoLat, geoLong), new google.maps.LatLng(data.stores[i].lat, data.stores[i].lng));
                        distance = distance / 1000; //km
                        distance = distance * 0.621371192 //miles
                        distance = distance.toFixed(1);
                    
                        self.storeLists.stores[i].distance = distance;
                        
                        // added by ssatush starts
                         var desc = "";
                         var storeType = self.storeLists.stores[i].type;
                         if (storeType == 1) {
                             desc = "Sears Department Stores";
                         } else if (storeType == 3) {
                             desc = "Sears Appliance and Hardware Store";
                         } else if (storeType == 4) {
                             desc = "Sears Outlet";
                         }else if (storeType == 5) {
                             desc = "Sears Hometown";
                         } else if (storeType == 7) {
                             desc = "Sears Home Appliance Showroom";
                         }
                        
                        self.storeLists.stores[i].storeType = desc;
                    }

                    if ( jQuery.cookie('my_own_store') ) {   //if a my store is set
                        
                    }
                    
                    commonServices.hideLoadingMask($rootScope);
                }); 
            });
            
        }
    };
    
    self.makeMyStore = function(name, unit, el, zip){
        jQuery.cookie("customerData", '', { path: '/', domain: so.cookieDomain });
        self.myStoreSet = true;
        $rootScope.so.myStoreName = name;
        $rootScope.so.myStoreLink = '/d/store.jsp?' + name + '&store=' + unit;
        jQuery.cookie("my_own_store", unit, { expires: so.expireDate, path: '/', domain: so.cookieDomain });
        //jQuery.cookie('myStoreName_view', name, { expires: so.expireDate, path: '/', domain: so.cookieDomain });
        jQuery.cookie('storesList_for_favourite_store', jQuery.cookie('st_na_aft_srh'), { expires: so.expireDate, path: '/', domain: so.cookieDomain });
        jQuery.cookie("makeMyStore","true");
        closestStoreInfo = [name, '', zip, name];
        
        if( !(jQuery.cookie('customer_zip')) ){
            jQuery.cookie('customer_zip', zip, { expires:  so.expireDate, path: '/', domain: so.cookieDomain });
        }
        
        $window.location.reload();
    };
    
    self.chatClick = function(){
        jQuery('#lpButtonDiv img').click();   
    };
}]);