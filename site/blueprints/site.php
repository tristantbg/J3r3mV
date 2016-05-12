<?php if(!defined('KIRBY')) exit ?>

title: Site
fields:
  generalSettings:
    label: Site Settings
    type: headline
  title:
    label: Title
    type:  text
  description:
    label: Description
    type:  textarea
  keywords:
    label: Keywords
    type:  tags
  thumbmin:
    label: Min. thumbnail height
    type:  number
    min: 100
    step: 100
    width: 1/2
  thumbmax:
    label: Max. thumbnail height
    type:  number
    min: 100
    step: 100
    width: 1/2
  customcss:
    label: Custom CSS
    type: textarea
    buttons: false
  googleAnalytics:
    label: Google Analytics ID
    type: text
    icon: code
    help: Tracking ID in the form UA-XXXXXXXX-X. Keep this field empty if you are not using it.
    width: 1/2
  ogimage:
    label: Facebook OpenGraph image
    type: image
    width: 1/2