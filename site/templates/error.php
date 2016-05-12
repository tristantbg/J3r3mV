<?php snippet('header') ?>

<div id="error">
<?php echo $page->text()->html() ?>
<br><a href="<?php echo $site->homePage()->url() ?>">Go back</a>
</div>

<?php snippet('footer') ?>