<?php 
$projects = page('work')->children()->visible();
?>

<div class="projects">

<div class="offset"></div>

<div class="wrap">

<?php foreach ($projects as $project) :?>

  <?php $image = $project->featured(); ?>

  <?php if($image->isNotEmpty()): ?>

  <?php $important = $project->important()->bool() ?>

  <?php if($project->intendedTemplate() == 'clone'){ $project = page($project->project()->value()); } ?>

  <?php $image = $image->toFile(); ?>

  <div class="project<?= $project->notClickable()->bool() ? ' pointer-none' : '' ?>" data-title="<?php echo $project->title()->html() ?>" data-filter="<?php echo tagslug($project->category()) ?>">
    <?php if ($project->notClickable()->bool()): ?>
      <div data-title="<?php echo $project->title()->html() ?>" data-target="<?php echo $project->uri() ?>">
    <?php else: ?>
      <a href="<?php echo $project->url() ?>" data-title="<?php echo $project->title()->html() ?>" data-target="<?php echo $project->uri() ?>">
    <?php endif ?>
    <span class="project-img<?php if($important): echo ' important'; else: echo ' regular'; endif ?>" data-ratio="<?php echo $image->ratio() ?>">
    <?php
      $srcset = '';
      for ($i = 100; $i <= 900; $i += 200) $srcset .= resizeOnDemand($image, $i) . ' ' . $i . 'w,';
    ?>

    <img
      srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      data-src="<?php echo resizeOnDemand($image, 800) ?>"
      data-srcset="<?php echo $srcset ?>"
      data-sizes="auto"
      data-optimumx="1.3"
      class="lazyimg lazyload"
      alt="<?php echo $project->title()->html().' — © '.$project->date("Y").', '.$site->title(); ?>"
      width="100%" height="auto">

    </span>
    <?php if ($project->notClickable()->bool()): ?>
      </div>
    <?php else: ?>
      </a>
    <?php endif ?>
  </div>

  <?php endif ?>

<?php endforeach ?>

</div>

<div class="mouse_nav"></div>

</div>
