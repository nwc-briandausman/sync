<?php get_header(); ?>

<?php /* start the loop */ ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<section>
        <div class="bg--gray3 font--light margin--none">
            <div class="row">
                <div id="page--header" class="col-xs-12 text-center">
                    <img src="<?php bloginfo('template_directory'); ?>/static/images/page-bg.jpg" />
                    <h1 id="page--title" class="lora"><strong><?php the_title(); ?></strong></h1>
                </div>
            </div>
        </div>
</section>

<div class="container padding-xl">
    <div class="row">
        <div class="<?php if ( is_active_sidebar( 'page_sidebar' ) ) { ?>col-md-8<?php }else{ ?>col-xs-12<?php } ?>">
            <div class="padding-xl">
                <p class="font--standardText">
                    <?php the_content(); ?>
                </p>
            </div>
        </div>
        <?php if ( is_active_sidebar( 'page_sidebar' ) ) { ?> 
        <div class="col-md-4 padding-xl">
            <?php get_sidebar('page_sidebar'); ?>
        </div>
        <?php } ?>
    </div>

</div>
<?php endwhile; ?>
<?php else : ?>
    404 Error
<?php endif; ?>
<?php get_footer(); ?>