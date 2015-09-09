<?php
#-----------------------------------------------------------------#
# Add to functions.php in wp-content theme folder
#-----------------------------------------------------------------#
//require_once('lib/include/functions/allowTagsOnPages.php');

#-----------------------------------------------------------------#
# Allow tags to pages as well as posts
#-----------------------------------------------------------------#
// add tag support to pages
function tags_support_all() {
	register_taxonomy_for_object_type('post_tag', 'page');
}

// ensure all tags are included in queries
function tags_support_query($wp_query) {
	if ($wp_query->get('tag')) $wp_query->set('post_type', 'any');
}

// tag hooks
add_action('init', 'tags_support_all');
add_action('pre_get_posts', 'tags_support_query');
?>
