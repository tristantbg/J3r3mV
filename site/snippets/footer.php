<?php $infos = $pages->find('infos'); ?>

<div class="album-navigation">
	<div class="prev"></div>
	<div class="next"></div>
	<div class="mouse_nav"></div>
</div>

<div id="infos">
	<a href="<?php echo $site->homePage()->url() ?>" data-target="index"><h1><?php echo $site->title()->html() ?></h1></a>
	<div class="content"><?php echo $infos->text()->kt() ?></div>
</div>

<div class="btn_infos"><a title="<?php echo $infos->title()->html() ?>" href="<?php echo $infos->url() ?>" data-target="infos"><?php echo $infos->title()->html() ?></a></div>
<div class="btn_back"><a href="<?php echo $site->homePage()->url() ?>" data-target="index">Back</a></div>

</div> 
<?php if(!$site->googleanalytics()->empty()): ?>
  <!-- Google Analytics-->
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', '<?php echo $site->googleanalytics() ?>', 'auto');
    ga('send', 'pageview');
  </script>
<?php endif ?>

	<?php
	echo js(array('assets/js/build/plugins.js', 'assets/js/build/app.min.js'));
	?>

</body>
</html>