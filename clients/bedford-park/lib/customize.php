<?php
/*
 * Usage
 * in the php file you want to display the option
 * add the below code. 
 * Change 'setting name' to whichever add_setting name you wish to use
 * <?php echo get_theme_mod("{{setting_name}}"); ?> 
*/ 
function nwc_register_theme_customizer( $wp_customize ) {
    /*** Start Header Options ***/
    //create a new section
    $wp_customize->add_section(
        'nwc_header_options',
        array(
            'title'     => 'Header Options',   //title
            'priority'  => 200                   //positioning
        )
    );
    
    $wp_customize->add_setting(
        'nwc_facebook',
        array(
            'default'            => '',
            'transport'          => 'postMessage'
        )
    );

    $wp_customize->add_control(
        'nwc_facebook',
        array(
            'section'  => 'nwc_header_options',
            'label'    => 'Facebook Link',
            'type'     => 'option'
        )
    );
    
    $wp_customize->add_setting(
        'nwc_twitter',
        array(
            'default'            => '',
            'transport'          => 'postMessage'
        )
    );

    $wp_customize->add_control(
        'nwc_twitter',
        array(
            'section'  => 'nwc_header_options',
            'label'    => 'Twitter Link',
            'type'     => 'option'
        )
    );
    
    $wp_customize->add_setting(
        'nwc_gPlus',
        array(
            'default'            => '',
            'transport'          => 'postMessage'
        )
    );

    $wp_customize->add_control(
        'nwc_gPlus',
        array(
            'section'  => 'nwc_header_options',
            'label'    => 'Google Plus Link',
            'type'     => 'option'
        )
    );
    
    $wp_customize->add_setting(
        'nwc_phone',
        array(
            'default'            => '',
            'transport'          => 'postMessage'
        )
    );

    $wp_customize->add_control(
        'nwc_phone',
        array(
            'section'  => 'nwc_header_options',
            'label'    => 'Phone Number',
            'type'     => 'option'
        )
    );
    
    $wp_customize->add_setting(
        'nwc_address',
        array(
            'default'            => '',
            'transport'          => 'postMessage'
        )
    );

    $wp_customize->add_control(
        'nwc_address',
        array(
            'section'  => 'nwc_header_options',
            'label'    => 'Address',
            'type'     => 'option'
        )
    );
    
    
    /*** Start Homepage Options ***/
    //create a new section
    $wp_customize->add_section(
        'nwc_homepage_options',
        array(
            'title'     => 'Homepage Options',   //title
            'priority'  => 200                   //positioning
        )
    );
    
    $wp_customize->add_setting(
        'nwc_water',
        array(
            'default'    	    =>  'true',
            'transport'  	    =>  'postMessage'
        )
    );

    $wp_customize->add_control(
        'nwc_water',
        array(
            'section'   => 'nwc_homepage_options',
            'label'     => 'Display the Water Bill Button',
            'type'      => 'checkbox'
        )
    );
    
    $wp_customize->add_setting(
        'nwc_quicklinks',
        array(
            'default'    	    =>  'true',
            'transport'  	    =>  'postMessage'
        )
    );

    $wp_customize->add_control(
        'nwc_quicklinks',
        array(
            'section'   => 'nwc_homepage_options',
            'label'     => 'Display the Quicklinks? Manage via "Menus"',
            'type'      => 'checkbox'
        )
    );
    
    $wp_customize->add_setting(
        'nwc_helpfulLinks',
        array(
            'default'    	    =>  'true',
            'transport'  	    =>  'postMessage'
        )
    );

    $wp_customize->add_control(
        'nwc_helpfulLinks',
        array(
            'section'   => 'nwc_homepage_options',
            'label'     => 'Display the Helpful Links?',
            'type'      => 'checkbox'
        )
    );
    
    for ($x = 1; $x <= 4; $x++) {
        $wp_customize->add_setting(
            'nwc_helpful_image' . $x,
            array(
                'default' => '',
            )
        );

        $wp_customize->add_control(
            new WP_Customize_Image_Control(
                $wp_customize,
                'nwc_helpful_image' . $x,
                array(
                    'label' => 'Image ' . $x . '',
                    'section' => 'nwc_homepage_options',
                    'settings' => 'nwc_helpful_image' . $x
                )
            )
        );

        $wp_customize->add_setting(
        'nwc_helpful' . $x . '_link',
            array(
                'default'            => '',
                'transport'          => 'postMessage'
            )
        );

        $wp_customize->add_control(
            'nwc_helpful' . $x . '_link',
            array(
                'section'  => 'nwc_homepage_options',
                'label'    => 'Image ' . $x . ' Link',
                'type'     => 'option'
            )
        );
        /*** End Hero Options ***/
    }
    
    /*** Start Hero Options ***/
    //create a new section
    $wp_customize->add_section(
        'nwc_hero_options',
        array(
            'title'     => 'Homepage Rotator',   //title
            'priority'  => 200                   //positioning
        )
    );

    //Checkbox example
    $wp_customize->add_setting(
        'nwc_hero_enable',
        array(
            'default'    	    =>  'true',
            'transport'  	    =>  'postMessage'
        )
    );

    $wp_customize->add_control(
        'nwc_hero_enable',
        array(
            'section'   => 'nwc_hero_options',
            'label'     => 'Display a Rotator?',
            'type'      => 'checkbox'
        )
    );
    //e: checkbox example

    for ($x = 1; $x <= 5; $x++) {
        $wp_customize->add_setting(
            'nwc_hero_image' . $x,
            array(
                'default' => '',
            )
        );

        $wp_customize->add_control(
            new WP_Customize_Image_Control(
                $wp_customize,
                'nwc_hero_image' . $x,
                array(
                    'label' => 'Image ' . $x . '',
                    'section' => 'nwc_hero_options',
                    'settings' => 'nwc_hero_image' . $x
                )
            )
        );

        //textbox example
        $wp_customize->add_setting(
        'nwc_rot' . $x . '_link',
            array(
                'default'            => 'http://google.com',
                'transport'          => 'postMessage'
            )
        );

        $wp_customize->add_control(
            'nwc_rot' . $x . '_link',
            array(
                'section'  => 'nwc_hero_options',
                'label'    => 'Image ' . $x . ' Link',
                'type'     => 'option'
            )
        );

        $wp_customize->add_setting(
            'nwc_rot_text' . $x,
            array(
                'default'            => 'Welcome to our website',
                'transport'          => 'postMessage'
            )
        );

        $wp_customize->add_control(
            'nwc_rot_text' . $x,
            array(
                'section'  => 'nwc_hero_options',
                'label'    => 'Image ' . $x . ' Text',
                'type'     => 'option'
            )
        );
        
        $wp_customize->add_setting(
            'nwc_button' . $x,
            array(
                'default'            => 'Learn More',
                'transport'          => 'postMessage'
            )
        );

        $wp_customize->add_control(
            'nwc_button' . $x,
            array(
                'section'  => 'nwc_hero_options',
                'label'    => 'Button ' . $x . ' Text',
                'type'     => 'option'
            )
        );
        /*** End Hero Options ***/
    } 
    
} // end nwc_register_theme_customizer
add_action( 'customize_register', 'nwc_register_theme_customizer' );
?>