function brAutosuggest(){
    if( !so.storeParam ){  //if it's not a store page, remove these fields
        jQuery('#cid').prop('disabled', true);
        jQuery('#store').prop('disabled', true)
    }

    try{
        var tracker = BrTrk.getTracker(0.2, br_data);
        tracker.enableTracking();
    } catch (err) {}   

    var defaultConfig = {
        accountId: 4075,
        authKey: '',
        domainKey: 'searsoutlet_com',
        environment: 'prod',
        searchCallback: function(searchUrl, searchData) {
            //if the user clicks on a category
            var searchByNames = null;
            searchByNames = searchData.parameters.names;

            //if the user clicks on a search term
            var searchByTerms = null;
            searchByTerms = searchData.parameters.query;

            if(searchByTerms != null && searchByNames == null){
                jQuery('#hiddensearchtext').val(searchByTerms);
                jQuery("#searchForm").submit();
            }

            if(searchByNames != null) {
                searchByNames = searchData.parameters.names[searchData.parameters.names.length - 1];
                jQuery('#hiddensearchtext').val(searchByNames);
                jQuery("#searchForm").submit();
            }
        },
        onFocusCallback: function(event) {
            setTimeout(function(){  
                //do nothing, especially dont scroll the window 
            }, 200);
        }
    };

    try {
        if( mq === 'md' || mq === 'lg' || mq === 'xl' ){
            jQuery('#search').attr("autocomplete", "off");               //hide the autocomplete so it doesn't compete with brm
            jQuery('#search').brm_suggest(defaultConfig);                //init the brm autosuggest
            
            var brmOffset = jQuery('#search').offset();                 //get the distance from the top of the searchbox
            var brmFromTop = brmOffset.top + 34;                           //set it with height of the box + border
            var brmFromLeft = brmOffset.left + 4;
            var brmWidth = jQuery('#search').width() + 71;   
        }else{
            jQuery('#mobileSearch').attr("autocomplete", "off");               //hide the autocomplete so it doesn't compete with brm
            jQuery('#mobileSearch').brm_suggest(defaultConfig);                //init the brm autosuggest
            
            var brmOffset = jQuery('#mobileSearch').offset();                 //get the distance from the top of the searchbox
            var brmFromTop = brmOffset.top + 34;                           //set it with height of the box + border
            var brmFromLeft = brmOffset.left + 4;
            var brmWidth = jQuery('#mobileSearch').width() + 71;    
        }
        
        jQuery('.brm-autosuggest-menu').css({ 'top' : brmFromTop, 'left': brmFromLeft, 'width' : brmWidth });    //move the brm autocomplete below the searchbox  
        var chosen = "";   

        //make the keyboard interact with brm
        jQuery('body').keydown(function(e){                
            if(jQuery('.brm-autosuggest-menu').is(':visible')){    //only perform if brm suggest is visible
                //if down is pressed 
                if (e.keyCode == 40) {
                    if(chosen === "") {
                        chosen = 0; //init the selection
                    } else if((chosen) < 9) {   //if its pressed more than the total number of lis
                        chosen++; //increment
                    }
                    jQuery('.brm-autosuggest-menu ul li').removeClass('selected').css({ 'background-color' : 'white' }).find('a').css({ 'color' : '#3a81ce' });                 //remove class and un-highlight
                    jQuery('.brm-autosuggest-menu ul li:eq('+chosen+')').addClass('selected').css({ 'background-color' : '#3a81ce' }).find('a').css({ 'color' : '#fff' });      //add class and highlight

                    //unfocus the form so we can use enter again
                    jQuery('#search').blur();

                    return false;
                }

                //if up is pressed
                if (e.keyCode == 38) { 
                    if(chosen === "") {
                        chosen = 0; //init the selection
                    } else if(chosen > 0) { //if you try to go above the first one
                        chosen--;   //decrease     
                    }
                    jQuery('.brm-autosuggest-menu ul li').removeClass('selected').css({ 'background-color' : 'white' }).find('a').css({ 'color' : '#3a81ce' });                 //remove class and un-highlight
                    jQuery('.brm-autosuggest-menu ul li:eq('+chosen+')').addClass('selected').css({ 'background-color' : '#3a81ce' }).find('a').css({ 'color' : '#fff' });      //add class and highlight

                    //unfocus the form so we can use enter again
                    jQuery('#search').blur();

                    return false;
                }

                //if enter is pressed
                if (e.keyCode == 13) {                        
                    var brmSearch = jQuery('.brm-autosuggest-menu ul li.selected').text();      //store the selected search term
                    jQuery('#hiddensearchtext, #search').val(brmSearch);                  //set the value of the hidden field

                    jQuery('#searchForm').submit();                                            //submit the form based on the selected field
                }
            }
        });
    }catch(e){}

    jQuery(document).mousedown(function (e) {
        var container = jQuery(".brm-autosuggest-menu");

        if (container.has(e.target).length === 0) {
            jQuery(".brm-autosuggest-menu").hide();
        }
    });
}