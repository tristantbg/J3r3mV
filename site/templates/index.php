<?php snippet('header') ?>

<?php snippet('projects') ?>

<div class="overlay<?php e(!$pages->find('drawings')->isOpen(), ' hidden') ?>">
	<div class="back-btn">
	<a href="<?php echo $site->homePage()->url()?>" data-target="index">Back</a>
	</div>
</div>

<div class="content" data-scroll-scope>

<div class="inner"></div>
	
</div>

<?php snippet('footer') ?>