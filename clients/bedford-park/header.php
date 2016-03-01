<!DOCTYPE html>
<!--[if lt IE 7]><html lang="en-US" prefix="og: http://ogp.me/ns#" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html lang="en-US" prefix="og: http://ogp.me/ns#" class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html lang="en-US" prefix="og: http://ogp.me/ns#" class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html lang="en-US" prefix="og: http://ogp.me/ns#" class="no-js"><!--<![endif]-->

	<head>
        <title><?php wp_title(''); ?></title>
        
        <!-- meta -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="author" content="Brian Dausman - briandausman@gmail.com">
        
        <!-- WP Stuff -->
  		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
		<?php wp_head(); ?>
        
        <!-- favicons -->
        <link rel="shortcut icon" href="s/images/icons/favicon.ico">
		<link rel="apple-touch-icon" sizes="72x72" href="s/images/icons/apple-touch-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="114x114" href="s/images/icons/apple-touch-icon-114x114.png">
        
        <!-- css -->
        <link href="<?php bloginfo('template_directory'); ?>/static/css/site.min.css" rel="stylesheet">
        <link href='https://fonts.googleapis.com/css?family=Lora:400,700,700italic' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <![endif]-->
	</head>

	<body id="blog" <?php body_class(); ?>>   
        <?php require_once('header--upper.php'); ?>
        
		<!-- Primary Page Layout
        ================================================== -->   
        <section>
            <header class="row bordered--xs lh-5">
                <div class="container">
                    <div class="col-xs-8 col-xs-offset-2 col-md-3 col-md-offset-0">
                        <a href="<?php bloginfo('url'); ?>">
                            <img src="<?php echo get_template_directory_uri(); ?>/static/images/logo.jpg" alt="<?php bloginfo('url'); ?>" class="img-responsive padding-vert-xs" />
                        </a>  
                    </div>
                    <div class="col-md-9 text-right">
                        <i id="mobileNav" class="fa fa-bars visible-xs visible-sm"></i>
                        <nav id="navWrap">
                            <?php 
                                $defaults = array(
                                    'menu'            => 'main',
                                    'container'       => 'div',
                                    'container_class' => '',
                                    'container_id'    => '',
                                    'menu_class'      => 'menu',
                                    'echo'            => true,
                                    'fallback_cb'     => 'wp_page_menu',
                                    'before'          => '',
                                    'after'           => '',
                                    'items_wrap'      => '<ul id="%1$s" class="%2$s nav nav-pills pull-right">%3$s</ul>',
                                );
                                wp_nav_menu( $defaults ); 
                            ?> 
                        </nav>
                    </div>
                </div>
            </header> 