<?php
/*
Author: Brian Dausman
*/

/*********************
Load up required files
*********************/
// creating and adding custom sidebars
require_once('lib/sidebars.php');

// allow pages to have tags or categories
require_once('lib/pageAttributes.php');

//customizer
require_once('lib/customize.php');

/*********************
Get us up and running
*********************/
// we're firing all out initial functions at the start
add_action('after_setup_theme','nwc_ahoy', 15);
function nwc_ahoy() {
    flush_rewrite_rules();
}
?>