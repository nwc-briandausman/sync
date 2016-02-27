<?php

function nwc_register_default_customizer( $wp_customize ) {
    //create a new section
    $wp_customize->add_section(
        'nwc_default_options',
        array(
            'title'     => 'Default',   //title
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
            'section'   => 'nwc_default_options',
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
            'section'  => 'nwc_default_options',
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
            'section'  => 'nwc_default_options',
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
            'section'  => 'nwc_default_options',
            'label'    => 'Copyright Message',
            'type'     => 'text'
        )
    );
} // end nwc_register_theme_customizer
add_action( 'customize_register', 'nwc_register_default_customizer' );
?>