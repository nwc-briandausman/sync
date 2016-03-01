<?php
/*
    Upper Header, if not needed just comment it out or empty this file.
*/
?>

<section id="upperHeader" class="bg--primary padding-xs hidden-xs">
    <div class="container font--light">
        <div class="col-xs-6 font-21">
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
        <div class="col-xs-6 text-right">
            <?php if(get_theme_mod("nwc_phone")){ ?>
                <i class="fa fa-phone font--cta"></i> <?php echo get_theme_mod("nwc_phone"); ?> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <?php } ?>
            <?php if(get_theme_mod("nwc_address")){ ?>
                <!-- <i class="fa fa-map-marker font--cta"></i>  <?php echo get_theme_mod("nwc_address"); ?> -->
            <?php } ?>
        </div>
    </div>
</section>
