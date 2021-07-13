<?php if(!defined('KIRBY')) exit ?>

title: Project
files: true
pages: false
fields:
  title:
    label: Title
    type:  text
    width: 1/2
  date:
    label: Year
    type:  date
    format: DD/MM/YYYY
    width: 1/4
  showdate:
    label: Show date in title
    type: checkbox
    default: 1
    width: 1/4
  featured:
    label: Featured image
    type:  image
    width: 1/4
  important:
    label: Important
    type: checkbox
    width: 1/4
  notClickable:
    label: Not clickable
    type: checkbox
    width: 1/4
  category:
    label: Category
    type:  select
    options: field
    width: 1/4
    field:
      page:  ../
      name: categories
      seperator: ,
  description:
    label: Description
    type: textarea
