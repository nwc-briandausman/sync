<?php
#-----------------------------------------------------------------#
# Add to functions.php in wp-content theme folder
#-----------------------------------------------------------------#
//require_once('include/functions/scriptsAndStyles.php');

#-----------------------------------------------------------------#
# SCRIPTS & STYLES ENQUEUEING
#-----------------------------------------------------------------#
function nwc_scripts_and_styles() {
  global $wp_styles; // call global $wp_styles variable to add conditional wrapper around ie stylesheet the WordPress way

    if (!is_admin()) {
        //Styles
        wp_register_style( 'nwc-styles', get_stylesheet_directory_uri() . '/lib/css/style.css', array(), '', 'all' );
        wp_enqueue_style( 'nwc-styles' );


        //Scripts
        wp_register_script( 'nwc-scripts', get_stylesheet_directory_uri() . '/lib/js/scripts.min.js', array( 'jquery' ), '1.0', true );
        wp_enqueue_script( 'nwc-scripts' );
        /*





        // comment reply script for threaded comments
        if ( is_singular() AND comments_open() AND (get_option('thread_comments') == 1)) {
              wp_enqueue_script( 'comment-reply' );
        }

        //adding scripts file in the footer

        // enqueue styles and scripts

        wp_enqueue_style( 'bones-stylesheet' );
        wp_enqueue_style( 'bones-ie-only' );
        $wp_styles->add_data( 'bones-ie-only', 'conditional', 'lt IE 9' ); // add conditional wrapper around ie stylesheet

        wp_enqueue_script( 'jquery' );
        wp_enqueue_script( 'bones-js' );
        */
    }

};

add_action( 'wp_enqueue_scripts', 'nwc_scripts_and_styles', 999 );
?>
