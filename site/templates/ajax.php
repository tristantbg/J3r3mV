<?php
if(kirby()->request()->ajax()) {
	$page = page($uri);
	$site = site();
	?>

	<?php $thumbmin = $site->thumbmin()->value(); $thumbmax = $site->thumbmax()->value(); ?>

<?php if ($page->content()->name() == "about"): ?>

	<h1 class="page_title"><?php echo $page->title()->html(); if (!$page->date() == null): echo ', '.$page->date('Y'); endif ?></h1>

	<div class="page_content">
		<?php echo $page->description()->kt() ?>
	</div>


<?php else: ?>

	<h1 class="page_title"><?php echo $page->title()->html(); if (!$page->date() == null): echo ', '.$page->date('Y'); endif ?></h1>

	<div class="page_content">
		<?php echo $page->description()->kt() ?>
	</div>

<?php endif ?>

	<?php
}
else {
	header::status('404');
}