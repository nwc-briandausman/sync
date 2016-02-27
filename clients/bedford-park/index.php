<?php get_header(); ?>

<?php /* start the loop */ ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <?php the_ID(); ?> <!-- post id -->
    <?php post_class('loop-post clearfix'); ?> <!-- class to add to post wrapper

    <?php /* post thumbnail */ ?>
    <?php if (has_post_thumbnail()){ ?>
        <?php the_post_thumbnail('loop_thumbnail'); ?>  <!-- custom thumbnail attribute
    <?php } ?>

    
    <?php the_permalink() ?>    <!-- url for the post
    <?php the_title(); ?> <!-- title of the post -->
    <?php the_date(); ?>    <!-- published date -->
    <?php the_category('<br /> '); ?>   <!-- post category with a line break -->

    <?php comments_number(); ?> <!-- number of comments -->

    <?php the_excerpt(); ?>
<?php endwhile; ?>
<?php else : ?>
    404 Error
<?php endif; ?>
<?php get_footer(); ?>