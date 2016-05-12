<?php 
$projects = $pages->find('work')->index()->filterBy('template', 'project')->visible();
?>

<div class="projects">

<?php foreach ($projects as $project) :?>

	<div class="project" data-title="<?php echo $project->title()->html() ?>" data-filter="<?php echo tagslug($project->category()) ?>">
		<a href="<?php echo $project->url() ?>" data-target="<?php echo $project->uri() ?>">
			<img src="<?php echo resizeOnDemand($project->featured()->toFile(), 300) ?>" alt="<?php echo $project->title()->html().' — © '.$project->date("Y").', '.$site->title(); ?>" width="100%" height="auto">
		</a>
	</div>

<?php endforeach ?>

<div class="mouse_nav"></div>
	
</div>

<div class="content">
	
</div>