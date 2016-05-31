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
    width: 1/4
  featured:
    label: Featured image
    type:  image
    width: 1/2
  category:
    label: Category
    type:  select
    options: field
    width: 1/2
    field:
      page:  ../
      name: categories
      seperator: ,
  description:
    label: Description
    type: textarea