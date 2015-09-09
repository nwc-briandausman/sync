<?php
/*----------------------------------------------------------
Custom Meta Box Boilerplate
----------------------------------------------------------*/

/*----------------------------------------------------------
Instructions
----------------------------------------------------------*/
//  1.) Find/Replace the following
        //      nwc_test                   -> prefaced name
        //      nwc-test                   -> field name
        //      Test Meta Box              -> Visible name
// 2.) Add to functions.php (or wherever you are declairing in your theme
        //ex: require_once('includes/meta-customPhone.php');
// 3.) Add to template/page
        //  echo get_post_meta( $post->ID, 'nwc_test', true );


//init, tell the funcions when to fire
add_action( 'load-post.php', 'nwc_test_meta_boxes_setup' );
add_action( 'load-post-new.php', 'nwc_test_meta_boxes_setup' );

//fire the function to start creation of the meta boxes
function nwc_test_meta_boxes_setup(){
	add_action( 'add_meta_boxes', 'nwc_test_add_meta_boxes' ); //add meta boxes hook
	add_action( 'save_post', 'nwc_test_save_meta', 10, 2 );    //save post meta hook
}

//add a custom meta box
//https://codex.wordpress.org/Function_Reference/add_meta_box
function nwc_test_add_meta_boxes(){
	add_meta_box(
		'nwc-test',                       //Field Phone
		'Test Meta Box',                  //Visible Phone
		'nwc_test_meta_box',              //Input Phone
		'Page',                           //Where to show
		'normal',                           //Where on the admin page to display
		'default' 
	);
}

//generate the html
function nwc_test_meta_box( $object, $box ){ ?>
	<?php wp_nonce_field( basename(__FILE__), 'nwc_test_nonce' ); ?>
	<p>
		<label for="nwc-test"><?php _e("Test Meta Box", 'nwc' ); ?></label>
		<br />
		<input class="widefat" type="text" name="nwc-test" id="nwc-test" value="<?php echo get_post_meta( $object->ID, 'nwc_test', true ); ?>" size="30" />
	</p>

<?php
}

//save the meta box
function nwc_test_save_meta( $post_id, $post ){
	//verify the nonce
	if( !isset( $_POST['nwc_test_nonce'] ) || !wp_verify_nonce( $_POST['nwc_test_nonce'], basename( __FILE__ ) ) ){
		return $post_id;
	}

	//get post type object
	$post_type = get_post_type_object( $post->post_type );

	//check if current user has permission
	 if ( !current_user_can( $post_type->cap->edit_post, $post_id ) ){
        return $post_id;
    }

    //get posted date and sanitize
	$new_meta_value = ( isset( $_POST['nwc-test'] ) ? sanitize_text_field( $_POST['nwc-test'] ) : ' ' );

	//get the meta key.
	$meta_key = 'nwc_test';

	//get the meta value key.
	$meta_value = get_post_meta( $post_id, $meta_key, true );

	//use old value
	if ( $new_meta_value && '' == $meta_value )
		add_post_meta( $post_id, $meta_key, $new_meta_value, true );

	//update value if new
	elseif ( $new_meta_value && $new_meta_value != $meta_value )
		update_post_meta( $post_id, $meta_key, $new_meta_value );

	//empty if no new value
	elseif ( '' == $new_meta_value && $meta_value )
		delete_post_meta( $post_id, $meta_key, $meta_value );
}





/* 
 * Change Meta Box visibility according to Page Template
 *
 * Usage:
 * - adjust jQuery('#nwc-test') to your meta box
 * - change 'pages/page-custom.php' to your template's filename
 * - remove the console.log outputs
 */

add_action('admin_head', 'nwc_page_custom_switcher');

function nwc_page_custom_switcher() {
    global $current_screen;
    if('page' != $current_screen->id) return;

    echo <<<HTML
        <script type="text/javascript">
        jQuery(document).ready( function($) {

            /**
             * Adjust visibility of the meta box at startup
            */
            if(jQuery('#page_template').val() == 'pages/page-custom.php') {
                // show the meta box
                jQuery('#nwc-test').show();
            } else {
                // hide your meta box
                jQuery('#nwc-test').hide();
            }

            // Debug only
            // - outputs the template filename
            // - checking for console existance to avoid js errors in non-compliant browsers
            if (typeof console == "object") 
                console.log ('default value = ' + jQuery('#page_template').val());

            /**
             * Live adjustment of the meta box visibility
            */
            jQuery('#page_template').live('change', function(){
                    if(jQuery(this).val() == 'pages/page-custom.php') {
                    // show the meta box
                    jQuery('#nwc-test').show();
                } else {
                    // hide your meta box
                    jQuery('#nwc-test').hide();
                }

                // Debug only
                if (typeof console == "object") 
                    console.log ('live change value = ' + jQuery(this).val());
            });                 
        });    
        </script>
HTML;
}

?>