<?php
if(kirby()->request()->ajax()) {
	$page = page($uri);
	$site = site();
	?>

	<?php $thumbmin = $site->thumbmin()->value(); $thumbmax = $site->thumbmax()->value(); ?>
	
	<?php foreach ($page->medias()->toStructure() as $slide): ?>

	<div class="gallery_cell">
		<?php if(!$slide->contentone()->empty()): ?>
			<img class="content" alt="<?php  echo $page->title()->html().' — © '.$page->date(Y).', '.$site->title(); ?>" src="<?php echo $slide->contentone()->toFile()->height($thumbmin)->url() ?>" data-flickity-lazyload="<?php echo $slide->contentone()->toFile()->height($thumbmax)->url() ?>" height="100%" width="auto">
		<?php endif ?>
		<?php if(!$slide->contenttwo()->empty()): ?>
			<img class="content" alt="<?php  echo $page->title()->html().' — © '.$page->date(Y).', '.$site->title(); ?>" src="<?php echo $slide->contenttwo()->toFile()->height($thumbmin)->url() ?>" data-flickity-lazyload="<?php echo $slide->contenttwo()->toFile()->height($thumbmax)->url() ?>" height="100%" width="auto">
		<?php endif ?>
	</div>

<?php endforeach ?>

	<?php
}
else {
	header::status('404');
}