<?php if(!defined('KIRBY')) exit ?>

title: Work
files: false
pages:
  template:
    - project
    - clone
deletable: false
preview: false
fields:
  categories:
    label: Categories
    type: tags
  sortable:
    label: Index view
    type:  sortable
    layout:  base
    variant: null
    limit: false
    parent: null
    prefix: null
    options:
      limit: false