<?php

/*

---------------------------------------
License Setup
---------------------------------------

Please add your license key, which you've received
via email after purchasing Kirby on http://getkirby.com/buy

It is not permitted to run a public website without a
valid license key. Please read the End User License Agreement
for more information: http://getkirby.com/license

*/

c::set('license', 'put your license key here');
c::set('home', 'index');

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/

c::set('debug', true);
c::set('oembed.lazyvideo', true);
c::set('autopublish.templates', array('project', 'item'));
c::set('thumb.quality', 100);
//c::set('thumbs.driver', 'im');
c::set('sitemap.exclude', array('error','work'));
c::set('sitemap.important', array('contact'));
c::set('routes', array(
    array(
        'pattern' => '(:all)/ajax',
        'action'  => function($uri) {
          tpl::load(kirby()->roots()->templates() . DS . 'ajax.php', array('uri' => $uri), false );
        }
    ),
    array(
        'pattern' => 'work',
        'action'  => function() {
          $page = site()->homePage();
      		go($page);
        }
    )
));
kirby()->hook(['panel.page.create', 'panel.page.sort', 'panel.page.hide', 'panel.page.delete'], function($page) {
	$page->parent()->update(array(
		'sortable'    => ''
	));
});