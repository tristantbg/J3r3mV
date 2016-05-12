<?php
if(kirby()->request()->ajax()) {
	$page = page($uri);
	$site = site();
	?>

	<?php $thumbmin = $site->thumbmin()->value(); $thumbmax = $site->thumbmax()->value(); ?>
	
<?php if(s::get('device_class') == 'desktop'): ?>

	<div class="inner">

	<h1 class="page_title"><?php echo $page->title()->html().', '.$page->date('Y') ?></h1>

	<div class="page_content">
		<?php echo $page->description()->kt() ?>
	</div>

	</div>

<?php else: ?>

	<?php foreach ($page->medias()->toStructure() as $slide): ?>

		
		<?php if(!$slide->contentone()->empty()): ?>
			<div class="gallery_cell">
				<img class="content" alt="<?php  echo $page->title()->html().' — © '.$page->date(Y).', '.$site->title(); ?>" src="<?php echo $slide->contentone()->toFile()->height($thumbmin)->url() ?>" data-flickity-lazyload="<?php echo $slide->contentone()->toFile()->height($thumbmax)->url() ?>" height="100%" width="auto">
			</div>
		<?php endif ?>
		<?php if(!$slide->contenttwo()->empty()): ?>
			<div class="gallery_cell">
				<img class="content" alt="<?php  echo $page->title()->html().' — © '.$page->date(Y).', '.$site->title(); ?>" src="<?php echo $slide->contenttwo()->toFile()->height($thumbmin)->url() ?>" data-flickity-lazyload="<?php echo $slide->contenttwo()->toFile()->height($thumbmax)->url() ?>" height="100%" width="auto">
			</div>
		<?php endif ?>

	<?php endforeach ?>

<?php endif ?>

	<?php
}
else {
	header::status('404');
}