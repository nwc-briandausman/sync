<?php
#-----------------------------------------------------------------#
# Add to functions.php in wp-content theme folder
#-----------------------------------------------------------------#
//require_once('lib/include/functions/changePostName.php');

#-----------------------------------------------------------------#
# Change Post Name in Admin To Whatever you like
#-----------------------------------------------------------------#
add_filter( 'gettext', 'change_post_to_article' );
add_filter( 'ngettext', 'change_post_to_article' );

function change_post_to_article( $translated ) 
{  
    $translated = str_replace( 'Page', 'Client', $translated );
    $translated = str_replace( 'Pages', 'Clients', $translated );
    return $translated;
}

?>
