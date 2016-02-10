<?php
/*
Template Name: Homepage
*/
?>

<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <?php the_ID(); ?>
    <?php post_class('clearfix'); ?>
    <?php the_content(); ?>

    <!-- get most recent blog posts -->
    <?php while ($the_query -> have_posts()) : $the_query -> the_post(); ?>						    
        <?php the_permalink() ?>
        <?php the_title(); ?>
        <?php the_post_thumbnail( $size = 'homepage_thumbnail' ); ?>
    <?php endwhile;?>
<?php endwhile; else : ?>
    <?php _e("HUH?! Nothing to see here", "hooper") ?>
<?php endif; ?>

<?php get_footer(); ?>