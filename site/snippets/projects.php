<?php 
$projects = $pages->find('work')->index()->filterBy('template', 'project')->visible();
?>

<div class="projects">

<?php foreach ($projects as $project) :?>

	<div class="project"><img src="<?php echo $project->featured()->toFile()->resize(300)->url() ?>" alt="<?php echo $project->title()->html().' — © '.$project->date(Y).', '.$site->title(); ?>"></div>

<?php endforeach ?>
	
</div>

<div class="content">
	
</div>