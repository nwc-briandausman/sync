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
                        <i class="fa fa-map-marker font--cta"></i> 6701 S. Archer Road, Bedford Park, IL 60501
                        <br>
                        <i class="fa fa-phone font--cta"></i> (708) 458-2067
                        <br>
                        <i class="fa fa-user font--cta"></i> <a href="<?php echo wp_login_url(); ?>" class="font--light">Login or Register</a>
                    </div>
                    <div class="col-xs-12 col-md-6 text-right">
                        <br>
                        <div id="social" class="font-28">
                            <i class="fa fa-twitter"></i>
                            &nbsp;&nbsp;
                            <i class="fa fa-facebook"></i>
                            &nbsp;&nbsp;
                            <i class="fa fa-google-plus"></i>

                        </div>
                        <br><br>
                        Footer Link 1
                        <br>
                        Another Footer Link 2
                        <br>
                        Some More Footer Link 3
                    </div>
                </div>
            </div>
        </footer>

        <?php wp_footer(); ?>
    </body>
    <!-- minified scripts -->
    <script src="<?php bloginfo('template_directory'); ?>/static/js/global.min.js"></script>
</html> <!-- end page. what a ride! -->