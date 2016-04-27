<div class="container">
<div class="slider albumslider"></div>

	<div class="slider hover">


		<?php 
		$categories = $pages->find('work')->children()->visible();

		foreach ($categories as $category):
			if ($category->hasVisibleChildren()):
				$albums = $category->children()->visible();
			?>



			<?php foreach ($albums as $album): ?>

				<div class="gallery_cell hover hidden" data-title="<?php echo $album->uri() ?>">
					<?php $medias = $album->medias()->yaml();?>
					<?php if($medias[0]['contentone'] != null): ?>
						<img class="content" data-src="<?php echo $album->image($medias[0]['contentone'])->width(700)->url() ?>" height="100%" width="auto">
					<?php endif ?>
					<?php if($medias[0]['contenttwo'] != null): ?>
						<img class="content" data-src="<?php echo $album->image($medias[0]['contenttwo'])->width(700)->url() ?>" height="100%" width="auto">
					<?php endif ?>
				</div>

			<?php endforeach ?>


<?php endif ?>
<?php endforeach ?>


</div>

</div>
