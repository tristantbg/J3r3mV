<?php 
$projects = $pages->find('work')->index()->filterBy('template', 'project')->visible();
?>

<div class="projects">

<?php foreach ($projects as $project) :?>

	<div class="project"><a href="<?php echo $project->url() ?>" data-target="<?php echo $project->uri() ?>"><img src="<?php echo resizeOnDemand($project->featured()->toFile(), 300) ?>" alt="<?php echo $project->title()->html().' — © '.$project->date("Y").', '.$site->title(); ?>"></a></div>

<?php endforeach ?>
	
</div>

<div class="content">
	
</div>