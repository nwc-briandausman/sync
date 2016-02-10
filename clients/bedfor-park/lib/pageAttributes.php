<?php
/**
 * Allow pages to have tags or categories
**/
function page_meta_settings() {  
    register_taxonomy_for_object_type('post_tag', 'page');
    register_taxonomy_for_object_type('category', 'page');
}
add_action( 'init', 'page_meta_settings' );
?>