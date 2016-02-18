soApp.controller('productsCtrl', ['$scope', '$rootScope', '$timeout', '$window', '$compile', 'commonServices', function($scope, $rootScope, $timeout, $window, $compile, commonServices){
    var self = this;
    
    self.plpInit = function(){
        commonServices.renderReviewIcons();
        /*
        //TODO
        if(omniVerticalFlag === "true"){
            setOmValuesVerticals(categoryName,'no','no','event38');
        }
        
        if("https:" != document.location.protocol) {
            var rand = Math.random();
            var file =  "http://cdn.brcdn.com/v1/br-bl-4075-v1.js?rand=" + rand;
    	
            document.write(unescape("%3Cscript src='" + file + "' type='text/javascript'%3E%3C/script%3E"));
            
            var tracker;
            try {
               tracker = BrRouter.getRouter(0.1, br_dlp_data);
            } catch (err) {}
        }
        */
         
        var br_dlp_data = {};
        br_dlp_data.acct_id = "4075";  
        
        //tooltips
        commonServices.renderTooltips();
        
        //pagination highlighting
        self.currentPage = jQuery('#plp--topPaginator nav').attr('data-current-page');        
		jQuery('.pagen' + self.currentPage).parent().addClass('active');
        jQuery('#pn').val(self.currentPage);
        
        //stick scroll
        if( mq === 'lg' || mq === 'md' ){
            self.offTop = jQuery('#plp--filters').offset().top;
            jQuery(window).scroll(function() {
                if (jQuery(window).scrollTop() > self.offTop) {
                    self.stickyFilters = true;
                    $scope.$apply();
                } else {
                    self.stickyFilters = false;
                    $scope.$apply();
                }
           });
        }
        
        //if the page is dirty, caused by the back button
        $scope.isDirty = jQuery('#dirty').val();
        setTimeout(function(){
            if ( $scope.isDirty === '1' && jQuery('.facet--checkbox:checked').length > 0 ){ 
                self.submitAjaxRequestForProducts();
                jQuery('#dirty').val('0');
            }
        },500);
    };
    
    /* ================================================================ */
    /* Show Mobile Menu
    /* ================================================================ */
    self.showMobileFacets = function(){
        $rootScope.isFacetActive = true;
    };
    
    self.hideMobileFacets = function(){
        $rootScope.isFacetActive = false;    
    };
    
    /* ================================================================ */
    /* Clear Facets
    /* ================================================================ */
    self.clearFacets = function(){
        jQuery('.facet--checkbox').prop('checked', false);   //reset all checkboxes    
        self.submitAjaxRequestForProducts();
    };
    
    /* ================================================================ */
    /* Sort by select box
    /* ================================================================ */
    self.sortBy = function(val){
        jQuery('#sort').val(val);
        
		self.submitAjaxRequestForProducts();
    };
    
    /* ================================================================ */
    /* Page Size
    /* ================================================================ */
    self.pageSize = function(pageSize){
        jQuery('#ps').val(pageSize);
        
		self.submitAjaxRequestForProducts();
    };
    
    /* ================================================================ */
    /* Compare Functionality
    /* ================================================================ */
    self.compareClick = function(itemNumber){
        var isDuplicate = $.inArray(itemNumber, $rootScope.so.compareArray); 
        
        if( isDuplicate === -1 ){
            $rootScope.so.compareArray.push(itemNumber);  //if it's not in the array already, add it
        }else{
            var index = $rootScope.so.compareArray.indexOf(itemNumber); //if it is in the array, get it's index
            $rootScope.so.compareArray.splice(index, 1);  //and remove it
        }
        
        setTimeout(function(){
            if( $rootScope.so.compareArray.length > 4){
                //too many items in the array
                alert('You have reached the maximum number of comparable items.'); 
                jQuery('.plp--compareWrap').not('.active').css({'visibility':'hidden'});
            }else if($rootScope.so.compareArray.length === 0){
                jQuery('.plp--compareWrap').css({'visibility':'visible'});
                $rootScope.so.allowCompare = false;
            }else{
                jQuery('.plp--compareWrap').css({'visibility':'visible'});
                $rootScope.so.allowCompare = true;
            }    
        },50);
    };
    
    self.compareNow = function(elementId){
        window.location = '/d/products_compare.jsp?cid=' + $rootScope.so.cid + '&pids=' + $rootScope.so.compareArray;
    };
    
    /* ================================================================ */
    /* Toggle Grid/List View
    /* ================================================================ */
    self.toggleGrid = function(orientation){
        if($rootScope.so.grid !== orientation){
            $rootScope.so.grid = orientation;
        }
    };
    
    self.paginationClick = function(pageNumber){
        jQuery('#pn').val(pageNumber);
        console.log(pageNumber);
        self.submitAjaxRequestForProducts();
    }
    
    /* ================================================================ */
    /* Toggle Nearby Stores
    /* ================================================================ */
    self.toggleNearbyStore = function(unit){
        var isDuplicate = $.inArray(unit, $rootScope.so.selectedStores); 
        
        if( isDuplicate === -1 ){
            $rootScope.so.selectedStores.push(unit);  //if it's not in the array already, add it
        }else{
            var index = $rootScope.so.selectedStores.indexOf(unit); //if it is in the array, get it's index
            $rootScope.so.selectedStores.splice(index, 1);  //and remove it
        }        
        
        self.submitAjaxRequestForProducts();
    };
    
    /* ================================================================ */
    /* Refresh the page via AJAX
    /* ================================================================ */
    self.submitAjaxRequestForProducts = function(){
        setOmValuesSearchClick();
        
        var tabVal = ''; 
        
        if( $rootScope.so.isBundle ){
            var isBundleURL = '&bundlePage=Y'   
        }else{
            var isBundleURL = '';    
        }
			
        if($rootScope.so.isThematic) {
            var baseURL = '/d/thematic_page.jsp'; 
        } else if($rootScope.so.isTheme) {
            var baseURL = '/d/theme.jsp';
        } else {
            var baseURL = '/d/products.jsp';
        }
        
        if( $rootScope.so.nearbyTab === true){
            var nearbyStoreArray = $rootScope.so.selectedStores;
        }else{
            var nearbyStoreArray = '';
        }
        
        if( !$rootScope.so.tab ){
            var tab = 'instore';
        }else{
            var tab = $rootScope.so.tab;
        }
        
        var tabSwitch = false;
        
        if(self.tabSwitch === true){
            tabSwitch = true;    
        }
        
        self.submitAjaxRequest(baseURL + '?fragments=left-navigation,page,page-dataLayer' + isBundleURL + '&tabSwitch=' + tabSwitch + '&selected_stores=' + nearbyStoreArray + '&tab=' + tab + '&beta=true', 'facets', 'search_results', '/' + $rootScope.so.buildNumber, '#plp--ajaxPanel');
    };
    
    self.submitAjaxRequest = function(url, form, responseDiv, buildVersion, contentDiv){
        $rootScope.loadingMask = true;
        
        try{
            window.history.pushState('', '', url + '&' + $.param( $("#"+form).serializeArray() ) );    
        }catch(err){}

        commonServices.getIt(url, jQuery('#' + form).serialize()).then(function(data){
            /*
            if( data.getResponseHeader("Spring-Redirect-URL") ){
                window.location = jqXHR.getResponseHeader("Spring-Redirect-URL");
                return false;
            }
            */
            
            $rootScope.loadingMask = false; //hide the loading mask
            $rootScope.so.errorMessage = null;
            $rootScope.so.resultMessage = null;
            
            //update the url if possible
            try{
                window.history.pushState('', '', url + '&' + $.param( $("#" + form).serializeArray() ) );    
            }catch(err){}
            
            var htmlcontent = $(contentDiv);
            htmlcontent.html(data)
            $compile(htmlcontent.contents())($scope);
        });
    };
    
    
    self.tabSwitch = function(isAllInventory){
        self.tabSwitch = true;
        
        jQuery('.facet--checkbox').prop('checked', false);   //reset all checkboxes    
        
        if( isAllInventory === 0){  //if it is the near me tab
            if( !jQuery.cookie("customer_zip") && ($rootScope.so.zip != null || $rootScope.so.zip != "" || $rootScope.so.zip.length > 0 || $rootScope.so.zip !== undefined) ){   //no zip is set
                jQuery('#changeZipModal').modal('show'); 
                return false;
            }
            
            $rootScope.so.nearbyTab = true;
            $rootScope.so.tab = 'instore';
            self.submitAjaxRequestForProducts();
        }else{
            $rootScope.so.nearbyTab = false;
            $rootScope.so.tab = 'outlet';
            self.submitAjaxRequestForProducts();
        }
    };
    
    self.toggleFacet = function(dataName, dataValue){
        //setvaluesForOmniture(dataName,dataValue);
        jQuery("#currentFacetForCascading").val(dataName);
        
        self.submitAjaxRequestForProducts();
    };
}]);

/* ================================================================ */
/* Show More Button
/* ================================================================ */
function resetView(){
    jQuery('.facet--collapse').each(function(){
        var facetCount = jQuery(this).find('input[type=checkbox]').length;

        if( facetCount > 4 ){
            jQuery(this).append('<span class="seeMore cursor--pointer">See More <i class="fa fa-angle-down"></i></span>');
            jQuery(this).append('<span class="seeLess cursor--pointer hide">See Less <i class="fa fa-angle-up"></i></span>');
        }
    });
    
    jQuery('.seeMore').on('click', function(e){
        e.preventDefault();
        jQuery(this).parent().find('label').css({ "position":"relative", "top":0, "left":0 });
        jQuery(this).addClass('hide');
        jQuery(this).parent().find('.seeLess').removeClass('hide');
    });

    jQuery('.seeLess').on('click', function(e){
        e.preventDefault();
        jQuery(this).parent().find('label').attr('style', '');
        jQuery(this).addClass('hide');
        jQuery(this).parent().find('.seeMore').removeClass('hide');
    });
    
    jQuery('.plp--facetHeading').on('click', function(e){
        e.preventDefault();
        jQuery(this).find('.fa-chevron-down, .fa-plus').toggleClass('font--cta').toggleClass('fa-chevron-down').toggleClass('fa-plus');
        jQuery(this).next().slideToggle();
    });
    
    //for handling back button
    $('.plp-item--container').on('click', function(){
        jQuery('#dirty').val("1");        
    });
    
    //remove extra location facets
    jQuery('.rStoreLocation label:gt(10)').remove();
}
resetView();

jQuery(document).ajaxComplete(function() {
    resetView();
});
         