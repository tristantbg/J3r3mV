<?php

return function($pages) {

	// Return 2 random images between all the projects images
    // $galleryPage = $pages->find('work');
    // $galleryChilds = $galleryPage->grandChildren()->visible();
    // $galleryImages = new Collection();
    // foreach ($galleryChilds as $c) {
    //     foreach ($c->images() as $i) {
    //         $galleryImages->data[] = $i->url();
    //     }
    // }
    // shuffle($galleryImages->data);
    // $galleryImages = $galleryImages->limit(2);

    $galleryPage = $pages->find('work');
    $pairs = $galleryPage->intro()->toStructure();
    $galleryImages = new Collection();
    foreach ($pairs as $p) {
    	$left = $p->contentone();
    	$right = $p->contenttwo();
    	if (!$left->empty() && !$right->empty()) {
    		$galleryImages->data[] = array('left' => $galleryPage->image($left)->url(), 'right' => $galleryPage->image($right)->url());
    	}
        
    }
    shuffle($galleryImages->data);
    $galleryImages = $galleryImages->limit(1);

  return compact('galleryImages');

};