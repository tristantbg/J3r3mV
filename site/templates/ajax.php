<?php
if(kirby()->request()->ajax()) {
	$page = page($uri);
	$site = site();
	?>
	
	<?php foreach ($page->medias()->toStructure() as $slide): ?>

		<div class="gallery_cell">
			<?php if(!$slide->contentone()->empty()): ?>
				<img class="content" alt="<?php echo $page->title()->html(). ', ' .$site->title()->html() ?>" src="<?php echo $slide->contentone()->toFile()->width(800)->url() ?>" data-flickity-lazyload="<?php echo $slide->contentone()->toFile()->url() ?>">
			<?php endif ?>
			<?php if(!$slide->contenttwo()->empty()): ?>
				<img class="content" alt="<?php echo $page->title()->html(). ', ' .$site->title()->html() ?>" src="<?php echo $slide->contenttwo()->toFile()->width(800)->url() ?>" data-flickity-lazyload="<?php echo $slide->contenttwo()->toFile()->url() ?>">
			<?php endif ?>
		</div>

	<?php endforeach ?>

	<?php
}
else {
	header::status('404');
}