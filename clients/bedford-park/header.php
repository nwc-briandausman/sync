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
        <link href="<?php bloginfo('template_directory'); ?>/static/css/style.min.css" rel="stylesheet">
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
        
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <![endif]-->
	</head>

	<body id="blog" <?php body_class(); ?>>        
		<!-- Primary Page Layout
        ================================================== -->   
        <section>
            <header id="header">
                <a href="<?php bloginfo('url'); ?>">
                    <?php bloginfo( 'name' ); ?>
                </a>  
            </header> 
            
            <nav id="mainNav">
                <?php wp_nav_menu(); ?> 
                
                <?php
                /* 
                 * Nav with nothing wrapped around it
                 * Used to remove unwanted li/uls
                */ 
                $footerTopNav = array(
                    'menu'            => 'footerTop',
                    'container'       => false,
                    'echo'            => false,
                    'items_wrap'      => '%3$s',
                    'depth'           => 0,
                );
                echo strip_tags(wp_nav_menu( $footerTopNav ), '<a>' ); 
                
                ?>
            </nav>