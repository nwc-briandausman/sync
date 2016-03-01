<?php 
    if( get_theme_mod("nwc_hero_enable") ){
        //add the scripts and styles
        wp_enqueue_script( 'owl-js', get_template_directory_uri() . '/lib/options/nwc-hero/owl.carousel.js', array('jquery'), '1.0.0', true );
        wp_enqueue_style( 'owl-css', get_template_directory_uri() . '/lib/options/nwc-hero/owl.carousel.css' );
        
        
        $owlHtml = '<div class="owl-carousel owl-theme">';    
        
        for ($x = 1; $x <= 5; $x++) {
            if( get_theme_mod("nwc_rot" . $x . "_link") ){
                $owlHtml .= '<div class="item">
                                <a href="' . get_theme_mod("nwc_rot" . $x . "_link") . '">
                                    <img src="' .get_theme_mod('nwc_hero_image' . $x). '" />
                                    <span>
                                        <h1 class="lora">' . get_theme_mod("nwc_rot_text" . $x) . '</h1>
                                        <br>';
                                        if( get_theme_mod("nwc_button" . $x) ){
                                            $owlHtml .= '<button class="btn btn--danger btn--3d font-18">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>' . get_theme_mod("nwc_button" . $x) . '</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>';
                                        }
                $owlHtml .=         '</span>
                                </a>
                            </div>';
            }
        }  
        
        $owlHtml .= '</div>';
        return $owlHtml; 
    };
?>