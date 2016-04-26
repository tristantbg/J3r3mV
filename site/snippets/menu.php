<?php 
$categories = $pages->find('work')->children()->visible();
 ?>


<header class="main_menu">

<?php 
foreach ($categories as $category):
if ($category->hasVisibleChildren()):
$albums = $category->children()->visible();
?>


<ul class="category">
	<li><?php echo $category->title()->html() ?></li>
	<li>
		<ul class="albums">
			<?php foreach ($albums as $album): ?>
			
				<li>
					<a title="<?php echo $album->title()->html() ?>" href="<?php echo $album->url() ?>" data-title="<?php echo $album->uri() ?>">
					<?php echo $album->title()->html(); $date = ($album->showdate() == "1") ? ', '.$album->date('Y') : ''; echo $date ?>
					</a>
				</li>

			<?php endforeach ?>
		</ul>
	</li>
</ul>

<?php endif ?>
<?php endforeach ?>
	
</header>