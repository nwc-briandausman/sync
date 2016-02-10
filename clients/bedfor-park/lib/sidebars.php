<?php
/**
 * Register our sidebars and widgetized areas.
 * Use with '<?php dynamic_sidebar( 'home_right_1' ); ?>'
 */
function nwc_register_sidebars() {
	register_sidebar( array(
		'name'          => 'Home right sidebar',
		'id'            => 'home_right_1',
		'before_widget' => '<div>',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="rounded">',
		'after_title'   => '</h2>',
	) );

}
add_action( 'widgets_init', 'nwc_register_sidebars' );
?>