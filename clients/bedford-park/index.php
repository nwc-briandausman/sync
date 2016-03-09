<?php get_header(); ?>

<?php /* start the loop */ ?>
<section>
        <div class="bg--gray3 font--light margin--none">
            <div class="row">
                <div id="page--header" class="col-xs-12 text-center">
                    <img src="<?php bloginfo('template_directory'); ?>/static/images/page-bg.jpg" />
                    <h1 id="page--title" class="lora"><strong>Latest News</strong></h1>
                </div>
            </div>
        </div>
</section>
<div class="container">
    <div class="row padding-vert-md">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <div class="col-xs-12 col-md-6">
            <div class="bordered--xs">
                <?php if (has_post_thumbnail()){ ?>
                    <?php the_post_thumbnail('loop_thumbnail'); ?>
                <?php } ?>
                <div class="padding-md <?php if (has_post_thumbnail()){ ?>bordered--top<?php } ?>">
                    <a href="<?php the_permalink() ?>">
                        <strong class="font-21 lora"><?php the_title(); ?></strong>
                        <br>
                        <small class="font--gray1"><?php the_date(); ?></small>
                        <br>
                        <?php the_excerpt(); ?>
                    </a>
                </div>
                <footer class="padding-md bordered--top bg--gray0">
                    <a href="<?php the_permalink() ?>"><span class="font--offRed pull-right">Read More &raquo;</span></a>
                    <i class="fa fa-comment font--gray1"></i> <?php comments_number(); ?>
                </footer>
            </div>
        </div>
    <?php endwhile; ?>
    </div>
</div>
<?php else : ?>
    404 Error
<?php endif; ?>
<?php get_footer(); ?>