<?php
#-----------------------------------------------------------------#
# Add to functions.php in wp-content theme folder
#-----------------------------------------------------------------#
//require_once('lib/include/functions/changePostName.php');
//user should have a role like 'editor'

#-----------------------------------------------------------------#
# Change Post Name in Admin To Whatever you like
#-----------------------------------------------------------------#
function remove_menus(){    
    //if you're not the admin, don't show them these
    if( current_user_can( 'update_core' )  ){
        //admin can view everything    
    }else{
        //remove_menu_page( 'index.php' );                  //Dashboard
        remove_menu_page( 'edit.php' );                   //Posts
        //remove_menu_page( 'upload.php' );                 //Media
        //remove_menu_page( 'edit.php?post_type=page' );    //Pages
        remove_menu_page( 'edit-comments.php' );          //Comments
        remove_menu_page( 'themes.php' );                 //Appearance
        remove_menu_page( 'plugins.php' );                //Plugins
        remove_menu_page( 'users.php' );                  //Users
        remove_menu_page( 'tools.php' );                  //Tools
        remove_menu_page( 'options-general.php' );        //Settings        
    }

}
add_action( 'admin_menu', 'remove_menus' );
?>
