<?php
/*
Template Name: Homepage
*/
?>

<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <main>
        <section id="hero">
            <?php
                echo include (get_template_directory() . '/lib/options/nwc-hero/hero.php');
            ?>
        </section>
        <div class="row">
            <section id="main" class="clear container padding-vert-md">
                <div class="col-xs-12 col-md-8">
                    <div id="about" class="col-xs-12">
                        <?php the_content(); ?>
                    </div>
                    <?php if( get_theme_mod("nwc_quicklinks") ){ ?>
                        <div id="quicklinks" class="hidden-xs">
                            <div class="col-xs-12">
                                <h1 class="font--dark padding-vert-sm lora">Quick Links</h1>
                                <p class="lh-md bg--gray0 padding-vert-md bordered--xs bordered--gray2 text-center">
                                    <?php
                                    /* 
                                     * Nav with nothing wrapped around it
                                     * Used to remove unwanted li/uls
                                    */ 
                                    $args = array(
                                        'menu'            => 'Quick Links',
                                        'container'       => false,
                                        'echo'            => false,
                                        'items_wrap'      => '%3$s',
                                        'depth'           => 0,
                                    );
                                    echo strip_tags(wp_nav_menu( $args ), '<a>' ); 

                                    ?>
                                </p>
                            </div>
                        </div>
                    <?php } ?>
                    <br class="clear"><br>
                    <div id="helpfulLinks">
                    <?php if( get_theme_mod("nwc_helpfulLinks") ){ 
                        for ($x = 1; $x <= 4; $x++) {
                            if( get_theme_mod("nwc_helpful" . $x . "_link") ){ ?>
                                <div class="col-xs-6">
                                    <a href="<?php echo get_theme_mod("nwc_helpful" . $x . "_link") ?>">
                                        <img src="<?php echo get_theme_mod("nwc_helpful_image" . $x) ?>" class="img-responsive" />
                                    </a>
                                    <br><br>
                                </div>
                            <?php }
                        }
                     } ?>
                    </div>
                </div>
                <div class="col-xs-12 col-md-4">
                    <div id="waterBill" class="padding-vert-sm">
                        <?php if( get_theme_mod("nwc_water") ){ ?>
                            <a href="http://www.paymentservicenetwork.com/" target="_blank"><img src="wp-content/themes/bedford-park/static/images/waterBill.jpg" class="img-responsive" /></a>
                        <?php } ?>
                        <br>
                    </div>
                    <div id="events">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <a href="#" class="font--cta2 pull-right">view all &raquo;</a>
                                <h4 class="font--dark"><i class="fa fa-calendar-o font--gray1"></i>&nbsp;&nbsp;<strong>Events</strong></h4>
                            </div>
                            <div class="panel-body padding--none">
                                <aside class="padding-md bordered--bottom bordered--gray3">
                                    <div class="row">
                                        <div class="col-xs-2">01/16</div>
                                        <div class="col-xs-10">
                                            <strong>Title</strong>
                                            <br>
                                            Jan 14th
                                        </div>
                                    </div>
                                </aside>
                                <aside class="padding-md">
                                    <div class="row">
                                        <div class="col-xs-2">01/16</div>
                                        <div class="col-xs-10">
                                            <strong>Title</strong>
                                            <br>
                                            Jan 14th
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <br>
                    </div>
                    <div id="news">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <?php echo '<a href="' . get_permalink( get_option( 'page_for_posts' ) ) . '" class="font--cta2 pull-right">view all &raquo;</a>'; ?>
                                <h4 class="font--dark"><i class="fa fa-bell-o font--gray1"></i>&nbsp;&nbsp;<strong>Latest News</strong></h4>
                            </div>
                            <div class="panel-body padding--none">
                                <?php 
                                global $post;
                                $postCount = get_posts('numberposts=5');

                                foreach($postCount as $post) :
                                    setup_postdata($post);
                                ?>
                                    <aside class="padding-md bordered--bottom bordered--gray3">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <a href="<?php the_permalink(); ?>" class="font--dark"><strong><?php the_title(); ?></strong></a>
                                                <br>
                                                <span class="font--gray1">Posted on <?php the_time('d/m/Y'); ?> </span>
                                            </div>
                                        </div>
                                    </aside>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
<?php endwhile; else : ?>
    <?php _e("HUH?! Nothing to see here", "hooper") ?>
<?php endif; ?>

<?php get_footer(); ?>