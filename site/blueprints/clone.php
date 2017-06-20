<?php if(!defined('KIRBY')) exit ?>

title: Clone
files: true
pages: false
icon: files-o
fields:
  title:
    label: Title
    type:  text
    width: 1/2
  project:
    label: Project
    type: quickselect
    options: query
    width: 1/2
    required: true
    query:
      page: ../
      fetch: children
      value: '{{uri}}'
      text: '{{title}} ({{uri}})'
  featured:
    label: Featured image
    type:  image
    required: true
    width: 1/2
  important:
    label: Important
    type: checkbox
    width: 1/2