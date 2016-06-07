<!-- Website developed by Tristan Bagot -->

<!DOCTYPE html>
<html lang="en" class="no-js">
<head>

	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="dns-prefetch" href="//www.google-analytics.com">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<link rel="canonical" href="<?php echo html($page->url()) ?>" />
	<?php if($page->isHomepage()): ?>
      <title><?php echo $site->title()->html() ?></title>
    <?php else: ?>
      <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
    <?php endif ?>
	<meta name="description" content="<?php echo $site->description()->html() ?>">
	<meta name="robots" content="index,follow" />
	<meta name="keywords" content="<?php echo $site->keywords()->html() ?>">
	<meta name="DC.Title" content="<?php echo $page->title()->html() ?>" />
    <meta name="DC.Description" content="<?php echo $site->description()->html() ?>"/ >
    <?php if($page->isHomepage()): ?>
      <meta property="og:title" content="<?php echo $site->title()->html() ?>" />
    <?php else: ?>
      <meta property="og:title" content="<?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?>" />
    <?php endif ?>
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?php echo html($page->url()) ?>" />
    <?php if(!$site->ogimage()->empty()): ?>
	<meta property="og:image" content="<?= $site->ogimage()->toFile()->width(1200)->url() ?>"/>
	<?php endif ?>
	<meta property="og:description" content="<?php echo $site->description()->html() ?>" />
	<?php if($page->isHomepage()): ?>
      <meta itemprop="name" content="<?php echo $site->title()->html() ?>">
    <?php else: ?>
      <meta itemprop="name" content="<?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?>">
    <?php endif ?>
    <meta itemprop="description" content="<?php echo $site->description()->html() ?>">
	<link rel="shortcut icon" href="<?= url('assets/images/favicon.ico') ?>">
	<link rel="icon" href="<?= url('assets/images/favicon.ico') ?>" type="image/x-icon">

	<?php 
	echo css('assets/css/app.min.css');
	echo js('assets/js/vendor/modernizr.min.js');
	?>
	
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="<?= url('assets/js/vendor/jquery.min.js') ?>">\x3C/script>')</script>

	<?php if(!$site->customcss()->empty()): ?>
		<style type="text/css">
			<?php echo $site->customcss()->html() ?>
		</style>
	<?php endif ?>

</head>
<body <?php e(page()->isHomePage() == false, ' class="page"') ?> >

<div class="wrap">

<div class="loader"></div>

<?php snippet('menu') ?>

<div id="main_title"><h1><?php echo $site->title()->html() ?></h1></div>