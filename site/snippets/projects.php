<?php 
$projects = $pages->find('work')->index()->filterBy('template', 'project')->visible();
?>

<div class="projects">

<div class="offset"></div>

<div class="wrap">

<?php foreach ($projects as $project) :?>

	<div class="project" data-title="<?php echo $project->title()->html() ?>" data-filter="<?php echo tagslug($project->category()) ?>">
		<a href="<?php echo $project->url() ?>" data-title="<?php echo $project->title()->html() ?>" data-target="<?php echo $project->uri() ?>">
		<span class="project-img <?php if($project->important() == '1'): echo 'important'; else: echo 'regular'; endif?>">
		<?php 
			$image = $project->featured()->toFile();
			$srcset = '';
			for ($i = 100; $i <= 900; $i += 200) $srcset .= resizeOnDemand($image, $i) . ' ' . $i . 'w,';
		?>

		<img 
		  src="<?php echo resizeOnDemand($image, 500) ?>" 
		  srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" 
		  data-srcset="<?php echo $srcset ?>" 
		  data-sizes="auto" 
		  data-optimumx="1.5" 
		  class="lazyimg lazyload"
		  alt="<?php echo $project->title()->html().' — © '.$project->date("Y").', '.$site->title(); ?>" 
		  width="100%" height="auto">

		</span>
		</a>
	</div>

<?php endforeach ?>

</div>

<div class="mouse_nav"></div>
	
</div>