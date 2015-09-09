<?php
/*
 * Template Name: Custom Page 
 * Description: Your description
 */
?>

<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <?php the_content(); ?>
    <?php endwhile; ?>
<?php else : ?>
    No posts found
<?php endif; ?>

<?php get_footer(); ?>