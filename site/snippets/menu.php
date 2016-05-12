<?php 
$categories = $pages->find('work')->categories()->split(',');
$about = $pages->find('about');
?>


<header class="main_menu">
	<ul>
		<li class="category" data-target="filter/all">All</li>
		<?php foreach ($categories as $category): ?>
				<li class="category" data-target="filter/<?php echo tagslug($category) ?>"><?php echo ucwords($category) ?></li>
		<?php endforeach ?>
	</ul>
</header>


<span class="about" data-target="about"><a href="<?php echo $about->url() ?>"><?php echo $about->title()->html() ?></a></span>