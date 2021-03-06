<?php
if(kirby()->request()->ajax()) {
	$page = page($uri);
	$site = site();
	?>

	<?php if ($page->content()->name() == "about"): ?>

	<?php $drawings = page("drawings") ?>

	<div id="about-page">

		<div class="back-btn">
			Back
		</div>

		<div class="left">
			<?php echo $site->title()->html() ?>
		</div>

		<div class="right">
			<div class="top">
				<div class="subtitle">
					<?php echo $page->subtitle()->kt() ?>
				</div>
				<div class="about_content">
					<?php echo $page->description()->kt() ?>
				</div>
				<div class="page_link">
					<a href="<?php echo $drawings->url() ?>" data-title="<?php echo $drawings->title()->html() ?>" data-target="drawings"><?php echo $drawings->title()->html() ?></a>
				</div>
			</div>
			<div class="clients">
				<?php echo $page->clientstitle()->html() ?>
				<div class="clients_content">
					<?php echo $page->clients()->kt() ?>
				</div>
			</div>
			<div class="copyright">
				<?php echo $page->copyright()->kt() ?>
			</div>
		</div>

	</div>


<?php else: ?>

		<div class="back-btn">
			Back
		</div>

	<h1 class="page_title"><?php echo $page->title()->html(); if ($page->date() != null && $page->showdate() != "0"): echo ', '.$page->date('Y'); endif ?></h1>

	<div class="page_content">
		<?php echo $page->description()->kt() ?>
	</div>

<?php endif ?>

<?php
}
else {
	header::status('404');
}