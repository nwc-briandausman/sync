var reviewErrorMessage = '';

function renderReviewCapture(){
    if( mq !== 'xs' && so.reviewCaptureEnabled === true ){
        //build the review content
        var reviewBody = '<div id="reviewMask" class="hide">' +
                             '<div id="reviewBody">' + 
                                '<div id="reviewHeading"><span id="reviewClose"><i class="fa fa-times icon-remove"></i></span> Write a Review</div>' + 
                                '<div id="checkReviewMask" class="hide"></div>' +
                                '<div id="validReviewMask" class="hide"><br><i class="fa fa-check-circle-o icon-check font-60 font--success"></i><br>Thanks for the feedback!</div>' +
                                '<div id="reviewForm"><form><input type="hidden" name="feedbackRating" id="reviewRating" /><input type="hidden" name="feedbackSource" id="reviewSource" value="review" />' +
                                    '<div id="reviewError" class="alert alert-danger hide"></div>' +
                                    '<div class="lh-standard">We would love to know how we are doing. Please submit a review and let us know about your shopping experience. Please leave your email address if you would like to recieve a follow up from us.</div>' + 
                                    '<div class="col-xs-12 font-24 font--gray2 padding-vert-sm"><strong class="font--dark">Review Rating:</strong> <i class="fa fa-star icon-star"></i><i class="fa fa-star icon-star"></i><i class="fa fa-star icon-star"></i><i class="fa fa-star icon-star"></i><i class="fa fa-star icon-star"></i></div>' +
                                    '<div class="col-xs-6"><strong class="font--dark">Subject</strong><br>' +
                                    '<input type="text" name="feedbackTitle" id="reviewTitle" class="form-control" /></div>' +
                                    '<div class="col-xs-6"><div class="row-padding"><strong class="font--dark">Your Email</strong><br>' +
                                    '<input type="text" name="feedbackEmail" id="reviewEmail" class="form-control" /></div></div>' +
                                    '<div class="col-xs-12"><strong class="font--dark">How did we do?</strong><br>' +
                                    '<textarea name="feedbackMessage" id="reviewMessage" class="form-control" rows="4"></textarea></div>' +
                                    '<div class="col-xs-12 text-right"><br><button id="submitReview" class="btn btn--cta">Submit Review</button><br><br></div>'
                                '</form></div>' + 
                             '</div>' +
                         '</div>';

        $('body').append('<span id="reviewButton" class="z9999">Rate Us</span>');
        $('body').append(reviewBody);

        //events
        $('#reviewButton').on('click', function(e){
            e.preventDefault();
            $('#reviewMask').removeClass('hide');
        });

        $('#reviewClose').on('click', function(e){
            e.preventDefault();    
            $('#reviewMask').addClass('hide');
        });

        $('#reviewForm .fa-star').hover(function(){
            var starHoverRating = $(this).index();
            $('#reviewForm .fa-star').removeClass('active');
            $('#reviewForm .fa-star:lt('+ starHoverRating +')').addClass('active');
            $(this).addClass('active');
        }, function(){
            var previousStarRating = $('#reviewRating').val();
            $('#reviewForm .fa-star').removeClass('active');
            $('#reviewForm .fa-star:lt('+ previousStarRating +')').addClass('active');
        });

        $('#reviewForm .fa-star').on('click', function(e){
            e.preventDefault();
            var starRating = $(this).index();
            $('#reviewForm .fa-star').removeClass('active');
            $('#reviewForm .fa-star:lt('+ starRating +')').addClass('active');
            $(this).addClass('active');
            $('#reviewRating').val( $(this).index() );
        });

        $('#submitReview').on('click', function(e){
            e.preventDefault();
            var isValid = checkReviewIsValid();

            if(isValid){
                $('#checkReviewMask').removeClass('hide');
                $.ajax({
                    type : "POST",
                    url : '/d/feedback/review',
                    data: $("#reviewForm form").serialize(),
                    success : function(data){
                        $('#validReviewMask').removeClass('hide');
                        $('#checkReviewMask').addClass('hide');
                        $('#reviewForm').addClass('hide');

                        setTimeout(function(){
                            $('#reviewMask').addClass('hide');    
                        },3500);
                    },
                    error: function() {
                        $('#validReviewMask').addClass('hide');
                        $('#checkReviewMask').addClass('hide');    
                        $('#reviewForm').removeClass('hide');
                        $('#reviewError').removeClass('hide').text("There was an error submitting your review. Please try again later.");
                    }
                });
            }else{
                $('#reviewError').removeClass('hide').text(reviewErrorMessage);
            }
        });    
    }
};
    
function checkReviewIsValid(){
    if( isNaN($('#reviewRating').val()) || $('#reviewRating').val().length < 1 ){
        reviewErrorMessage = 'Please select a star rating';
        return false;
    }else if( $('#reviewTitle').val().length < 3 ){
        reviewErrorMessage = 'Please add a subject';
        return false;
    }else if( $('#reviewMessage').val().length < 5 ){
        reviewErrorMessage = 'Please tell us a little more about your experience';
        return false;
    }else if( $('#reviewEmail').val().length < 1){
        reviewErrorMessage = 'Please enter a valid email';
        return false;    
    }else if( $('#reviewEmail').val().length > 1){
        var reg = /^([A-Za-z0-9])([a-zA-Z0-9\.\_\-])*@([A-Za-z0-9_\-])+\.([A-Za-z]{2,4})$/;
        
        if (reg.test($('#reviewEmail').val()) == false){
            reviewErrorMessage = 'Please enter a valid email';
            return false;
        }else{
            return true;
        }
    }else{
        return true;
    }
};