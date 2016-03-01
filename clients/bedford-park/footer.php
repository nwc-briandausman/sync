<!-- all js scripts are loaded in library/bones.php -->
        </section>
        <footer class="bg--primary4 padding-vert-lg bordered--top bordered--md bordered--dark lh-md">
            <div class="container font--light">
                <div class="row">
                    <div class="col-xs-12 col-md-6">
                        <a href="<?php bloginfo('url'); ?>">
                            <img src="<?php echo get_template_directory_uri(); ?>/static/images/logo.png" alt="<?php bloginfo('url'); ?>" class="half" />
                        </a>  
                        <br><br>
                        <?php if(get_theme_mod("nwc_phone")){ ?>
                            <i class="fa fa-phone font--cta"></i> <?php echo get_theme_mod("nwc_phone"); ?> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <br>
                        <?php } ?>
                        <?php if(get_theme_mod("nwc_address")){ ?>
                            <i class="fa fa-map-marker font--cta"></i>  <?php echo get_theme_mod("nwc_address"); ?>
                            <br>
                        <?php } ?>
                        <i class="fa fa-user font--cta"></i> <a href="<?php echo wp_login_url(); ?>" class="font--light">Login or Register</a>
                    </div>
                    <div class="col-xs-12 col-md-6 text-right hidden-xs hidden-sm">
                        <br>
                        <div id="social" class="font-28">
                            <?php if(get_theme_mod("nwc_facebook")){ ?>
                                <a href="<?php echo get_theme_mod("nwc_facebook"); ?>" class="font--light"><i class="fa fa-facebook"></i>&nbsp;&nbsp;</a>
                            <?php } ?>
                            <?php if(get_theme_mod("nwc_twitter")){ ?>
                                <a href="<?php echo get_theme_mod("nwc_twitter"); ?>" class="font--light"><i class="fa fa-twitter"></i>&nbsp;&nbsp;</a>
                            <?php } ?>
                            <?php if(get_theme_mod("nwc_gPlus")){ ?>
                                <a href="<?php echo get_theme_mod("nwc_gPlus"); ?>" class="font--light"><i class="fa fa-google-plus"></i>&nbsp;&nbsp;</a>
                            <?php } ?>

                        </div>
                        <br><br>
                        <nav class="list-unstyled">
                            <?php
                            /* 
                             * Nav with nothing wrapped around it
                             * Used to remove unwanted li/uls
                            */ 
                            $args = array(
                                'menu'            => 'footerMenu',
                                'container'       => false,
                                'echo'            => false,
                                'items_wrap'      => '%3$s',
                                'depth'           => 0,
                            );
                            echo wp_nav_menu( $args ), '<a></a>'; 

                            ?>
                        </nav>
                        <br>
                        <span>Copyright Info. Website by</span> <a href="http://axiomtechgroup.com" target="_blank" class="font--danger">Axiom Technology Group</a>
                    </div>
                </div>
            </div>
        </footer>

        <?php wp_footer(); ?>
    </body>
    <!-- minified scripts -->
    <script src="<?php bloginfo('template_directory'); ?>/static/js/global.min.js"></script>
</html> <!-- end page. what a ride! -->