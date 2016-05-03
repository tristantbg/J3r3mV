<?php if(s::get('device_class') == 'desktop'): ?>

	<?php foreach ($page->medias()->toStructure() as $slide): ?>

		<div class="gallery_cell" <?php if(!$slide->caption()->empty()): echo 'data-caption="'.$slide->caption()->html().'"'; endif ?> >
			<?php if(!$slide->contentone()->empty()): ?>
				<img class="content" alt="<?php  echo $page->title()->html().' — © '.$page->date(Y).', '.$site->title(); ?>" src="<?php echo $slide->contentone()->toFile()->height($thumbmin)->url() ?>" data-flickity-lazyload="<?php echo $slide->contentone()->toFile()->height($thumbmax)->url() ?>" height="100%" width="auto">
			<?php endif ?>
			<?php if(!$slide->contenttwo()->empty()): ?>
				<img class="content" alt="<?php  echo $page->title()->html().' — © '.$page->date(Y).', '.$site->title(); ?>" src="<?php echo $slide->contenttwo()->toFile()->height($thumbmin)->url() ?>" data-flickity-lazyload="<?php echo $slide->contenttwo()->toFile()->height($thumbmax)->url() ?>" height="100%" width="auto">
			<?php endif ?>
		</div>

	<?php endforeach ?>

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

<?php if(!$page->description()->empty()): ?>
	<div class="gallery_cell">
		<div class="description">
			<?php echo $page->title()->html().', '.$page->date('Y') ?>
			<br><br>
			<?php echo $page->description()->kt() ?>
		</div>
	</div>
<?php endif ?>

<div class="caption"></div>