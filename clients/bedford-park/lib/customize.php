<?php
/*
 * Usage
 * in the php file you want to display the option
 * add the below code. 
 * Change 'setting name' to whichever add_setting name you wish to use
 * <?php echo get_theme_mod("nwc_font"); ?>
*/ 

function nwc_register_theme_customizer( $wp_customize ) {
    //create a new section
	$wp_customize->add_section(
		'nwc_homepage_options',
		array(
			'title'     => 'Homepage Options',   //title
			'priority'  => 200                   //positioning
		)
	);

	//Checkbox example
	$wp_customize->add_setting(
		'nwc_display_header',
		array(
			'default'    	    =>  'true',
			'sanitize_callback' => 'nwc_sanitize_input',
			'transport'  	    =>  'postMessage'
		)
	);

	$wp_customize->add_control(
		'nwc_display_header',
		array(
			'section'   => 'nwc_homepage_options',
			'label'     => 'Display Header?',
			'type'      => 'checkbox'
		)
	);
    //e: checkbox example

	//radio example
	$wp_customize->add_setting(
		'nwc_color_scheme',
		array(
			'default'   	    => 'normal',
			'sanitize_callback' => 'nwc_sanitize_input',
			'transport' 	    => 'postMessage'
		)
	);

	$wp_customize->add_control(
		'nwc_color_scheme',
		array(
			'section'  => 'nwc_homepage_options',
			'label'    => 'Color Scheme',
			'type'     => 'radio',
			'choices'  => array(
				'normal'    => 'Normal',
				'inverse'   => 'Inverse'
			)
		)
	);
    //e: radio example

	//select example
	$wp_customize->add_setting(
		'nwc_font',
		array(
			'default'   	    => 'times',
			'sanitize_callback' => 'nwc_sanitize_input',
			'transport' 	    => 'postMessage'
		)
	);

	$wp_customize->add_control(
		'nwc_font',
		array(
			'section'  => 'nwc_homepage_options',
			'label'    => 'Theme Font',
			'type'     => 'select',
			'choices'  => array(
				'times'     => 'Times New Roman',
				'arial'     => 'Arial',
				'courier'   => 'Courier New'
			)
		)
	);
    //e: select example

	//textbox example
	$wp_customize->add_setting(
		'nwc_footer_copyright_text',
		array(
			'default'            => 'All Rights Reserved',
			'sanitize_callback'  => 'nwc_sanitize_input',
			'transport'          => 'postMessage'
		)
	);

	$wp_customize->add_control(
		'nwc_footer_copyright_text',
		array(
			'section'  => 'nwc_homepage_options',
			'label'    => 'Copyright Message',
			'type'     => 'text'
		)
	);
    //e: textbox example
} // end nwc_register_theme_customizer
add_action( 'customize_register', 'nwc_register_theme_customizer' );

/*********************
Sanitize
*********************/
function nwc_sanitize_input( $input ) {
	return strip_tags( stripslashes( $input ) );
}

/*********************
Sanitize
    - Writes styles out the `<head>` element of the page based on the configuration options saved in the Theme Customizer.
*********************/function nwc_customizer_css() {
?>
	 <style type="text/css">

		 body {

		 	font-family: <?php echo get_theme_mod( 'nwc_font' ); ?>;

		 	<?php if ( 'normal' === get_theme_mod( 'nwc_color_scheme' ) || '' === get_theme_mod( 'nwc_color_scheme' ) ) { ?>

			 	background: #fff;
			 	color:      #000;

		 	<?php } else { ?>

			 	background: #000;
			 	color:      #fff;

		 	<?php } // end if/else ?>

		 	<?php if ( 0 < count( strlen( ( $background_image_url = get_theme_mod( 'nwc_background_image' ) ) ) ) ) { ?>
		 		background-image: url( <?php echo $background_image_url; ?> );
		 	<?php } // end if ?>

		 }

	     a { color: <?php echo get_theme_mod( 'nwc_link_color' ); ?>; }

		<?php if( false === get_theme_mod( 'nwc_display_header' ) ) { ?>
			#header { display: none; }
		<?php } // end if ?>

	 </style>
<?php
}
add_action( 'wp_head', 'nwc_customizer_css' );
add_action( 'customize_preview_init', 'nwc_customizer_live_preview' );