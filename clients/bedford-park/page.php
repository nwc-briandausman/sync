<?php get_header(); ?>

<?php /* start the loop */ ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<section>
        <div class="container bg--gray3 font--primary6 padding-xl margin--none">
            <div class="row">
                <div class="col-xs-12">
                    <h1 class="weight-black">
                    HEADING
                    </h1>
                </div>
            </div>
        </div>
</section>

<div class="container padding-xl">
    <div class="row">
        <div class="col-md-8">
            <div class="padding-xl">
                <h2 class="font--primary6 weight-semi">
                    Title
                </h2>
                <p class="font--standardText">
                    Lorem ipsum dolor sit amet, phasellus est, sed adipiscing parturient elementum, lorem nulla magna lectus quam viverra, elit eros, curabitur eget fuga leo blandit. Pharetra blandit massa vehicula pellentesque viverra, nulla curabitur, nibh vestibulum ab, massa eu lacinia felis interdum scelerisque, litora laoreet sit. Massa adipiscing nulla eu, quam vestibulum ac non volutpat, vestibulum justo mollis nulla lacus ultrices felis, morbi vulputate quis at. Aliquam diam volutpat. Suspendisse integer. Justo hymenaeos amet, eu phasellus nam justo laoreet porttitor, elit turpis, sit pellentesque, sunt dui tincidunt pellentesque suscipit nulla. Sit a dolor et posuere rutrum, ac egestas non, dolor hendrerit aliquam fusce nonummy semper at. Metus curae interdum, ultrices tellus, est in aliquam mauris justo, etiam quis. Luctus donec praesent sapien donec. Sed lacus iaculis, turpis est, arcu praesent facilisis est vehicula leo, vitae nulla quis, vel sed ipsum purus porttitor suspendisse. Ornare dolor vestibulum lobortis morbi felis non, sodales massa est eget, diam nulla congue dignissim mollis, vel arcu eget quam, metus viverra massa id bibendum ut vestibulum.
                </p>
            </div>
        </div>
        <div class="col-md-4 padding-xl">
            <div class="panel panel-default">
              <div class="panel-heading">
                <div class="panel-title">
                    <h2 class="weight-semi font--primary6">
                        Title
                    </h2>
                </div>
              </div>
              <ul class="list-group">
                <li class="list-group-item">Item #1</li>
                <li class="list-group-item">Item #2</li>
                <li class="list-group-item">...and so forth.</li>
              </ul>
            </div>
        </div>
    </div>

</div>
<?php endwhile; ?>
<?php else : ?>
    404 Error
<?php endif; ?>
<?php get_footer(); ?>