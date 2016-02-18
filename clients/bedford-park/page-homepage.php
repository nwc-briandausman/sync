<?php
/*
Template Name: Homepage
*/
?>

<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <main>
        <div class="row">
            <section id="hero" class="col-xs-12 text-center text-shadow--xs">
                <div class="rotator">
                    <img src="/wp-content/themes/bedford-park/static/images/rotator2.jpg" />
                </div>
                <aside>
                    <h3 class="font-34 font--primary5">Welcome To</h3>
                    <h2 class="font-60 font--light padding-vert-md">The Village of Bedford Park</h2>
                    <a href="#" class="btn btn--cta2 btn--3d font-21"><strong>Learn About Us</strong></a>
                </aside>
            </section>

            <section id="main" class="clear container padding-vert-md">
                <div class="col-xs-12 col-md-8">
                    <div id="about" class="col-xs-12">
                        <h1 class="font--primary padding-vert-sm">About the Village</h1>
                        <p class="lh-md">
                            The Village of Bedford Park is an Illinois Home Rule community located on the southwestern border of the Chicago city limits. The village is near Chicago’s Midway Airport and is minutes away from downtown Chicago. It is part of an Illinois enterprise zone and is also an integral partner of the Illinois and Michigan Heritage Canal Corridor where the IM HCC Visitors Center is located in the heart of the Village. We believe we have the perfect combination of a great place to live and a great place to do business in. Thank you for visiting our web site and if you have any questions, please do not hesitate to contact us!
                        </p>
                        <br>
                    </div>
                    <div id="quicklinks">
                        <div class="col-xs-12">
                            <h1 class="font--primary padding-vert-sm">Quick Links</h1>
                            <p class="lh-md bg--gray0 padding-vert-md bordered--xs bordered--gray2 text-center">
                                <a href="#" class="font--cta2 bordered--right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>For Residents</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                <a href="#" class="font--cta2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Why Bedford Park</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a> 
                                <a href="#" class="font--cta2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>For Business</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                <a href="#" class="font--cta2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>About the Village</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                            </p>
                        </div>
                    </div>
                    <br>
                    <div id="helpfulLinks">
                        <div class="col-xs-6">
                            <img src="/wp-content/themes/bedford-park/static/images/quicklink1.jpg" class="img-responsive" />
                            <br><br>
                        </div>
                        <div class="col-xs-6">
                            <img src="/wp-content/themes/bedford-park/static/images/quicklink2.jpg" class="img-responsive" />
                            <br><br>
                        </div>
                        <div class="col-xs-6">
                            <img src="/wp-content/themes/bedford-park/static/images/quicklink2.jpg" class="img-responsive" />
                        </div>
                        <div class="col-xs-6">
                            <img src="/wp-content/themes/bedford-park/static/images/quicklink1.jpg" class="img-responsive" />
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-md-4">
                    <div id="waterBill" class="padding-vert-sm">
                        <a href="#"><img src="/wp-content/themes/bedford-park/static/images/waterBill.jpg" class="img-responsive" /></a>
                        <br>
                    </div>
                    <div id="events">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <a href="#" class="font--cta2 pull-right">view all &raquo;</a>
                                <h3 class="font--primary"><i class="fa fa-calendar-o"></i>&nbsp;&nbsp;<strong>Events</strong></h3>
                            </div>
                            <div class="panel-body padding--none">
                                <aside class="padding-md bordered--bottom bordered--gray3">
                                    <div class="row">
                                        <div class="col-xs-2">01/16</div>
                                        <div class="col-xs-10">
                                            <strong>Title</strong>
                                            <br>
                                            Jan Blah Blah Blah
                                        </div>
                                    </div>
                                </aside>
                                <aside class="padding-md">
                                    <div class="row">
                                        <div class="col-xs-2">01/16</div>
                                        <div class="col-xs-10">
                                            <strong>Title</strong>
                                            <br>
                                            Jan Blah Blah Blah
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
                                <a href="#" class="font--cta2 pull-right">view all &raquo;</a>
                                <h3 class="font--primary"><i class="fa fa-bell-o"></i>&nbsp;&nbsp;<strong>Latest News</strong></h3>
                            </div>
                            <div class="panel-body padding--none">
                                <aside class="padding-md bordered--bottom bordered--gray3">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <strong>Title</strong>
                                            <br>
                                            Jan Blah Blah Blah
                                        </div>
                                    </div>
                                </aside>
                                <aside class="padding-md">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <strong>Title</strong>
                                            <br>
                                            Jan Blah Blah Blah
                                        </div>
                                    </div>
                                </aside>
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