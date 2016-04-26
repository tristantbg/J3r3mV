<?php

return function($pages) {

    $galleryPage = $pages->find('work');
    $galleryChilds = $galleryPage->grandChildren()->visible();
    $galleryImages = new Collection();
    foreach ($galleryChilds as $c) {
        foreach ($c->images() as $i) {
            $galleryImages->data[] = $i->url();
        }
    }
    shuffle($galleryImages->data);
    $galleryImages = $galleryImages->limit(2);

  return compact('galleryImages');

};