<?php
if(kirby()->request()->ajax()) {

	$project = page($uri);

	?>
	
	<?php foreach ($project->medias()->toStructure() as $slide): ?>

				<div class="gallery_cell">
					<?php if(!$slide->contentone()->empty()): ?>
						<img class="content" src="<?php echo $slide->contentone()->toFile()->width(800)->url() ?>">
					<?php endif ?>
					<?php if(!$slide->contenttwo()->empty()): ?>
						<img class="content" src="<?php echo $slide->contenttwo()->toFile()->width(800)->url() ?>">
					<?php endif ?>
				</div>

			<?php endforeach ?>

	<?php
}
else {
	header::status('404');
}