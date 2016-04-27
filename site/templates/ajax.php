<?php
if(kirby()->request()->ajax()) {
	$page = page($uri);
	$site = site();
	?>
	
	<?php foreach ($page->medias()->toStructure() as $slide): ?>

	<div class="gallery_cell">
		<?php if(!$slide->contentone()->empty()): ?>
			<img class="content" alt="<?php echo $page->title()->html(). ', ' .$site->title()->html() ?>" src="<?php echo $slide->contentone()->toFile()->height(700)->url() ?>" data-flickity-lazyload="<?php echo $slide->contentone()->toFile()->height(1200)->url() ?>" height="100%" width="auto">
		<?php endif ?>
		<?php if(!$slide->contenttwo()->empty()): ?>
			<img class="content" alt="<?php echo $page->title()->html(). ', ' .$site->title()->html() ?>" src="<?php echo $slide->contenttwo()->toFile()->height(700)->url() ?>" data-flickity-lazyload="<?php echo $slide->contenttwo()->toFile()->height(1200)->url() ?>" height="100%" width="auto">
		<?php endif ?>
	</div>

<?php endforeach ?>

	<?php
}
else {
	header::status('404');
}