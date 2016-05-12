<?php 
$categories = $pages->find('work')->categories()->split(',');
$about = $pages->find('about');
?>


<header id="main_menu">
	<ul>
		<li class="category" data-target="filter/all">All</li>
		<?php foreach ($categories as $category): ?>
				<li class="category" data-target="filter/<?php echo tagslug($category) ?>"><?php echo ucwords($category) ?></li>
		<?php endforeach ?>
	</ul>
</header>


<span id="about"><a href="<?php echo $about->url() ?>" data-target="about"><?php echo $about->title()->html() ?></a></span>