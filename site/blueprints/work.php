<?php if(!defined('KIRBY')) exit ?>

title: Work
files: true
pages:
  max: 2
  template: category
deletable: false
preview: false
fields:
  intro:
    label: Intro images
    type: structure
    entry: >
      <table style="width:100%; font-size: 11px">
      	<tr>
      		<td style="width:50%">Image 1</td>
      		<td style="width:50%">Image 2</td>
      	</tr>
      	<tr>
      		<td style="width:50%"><img src="{{_fileUrl}}{{contentone}}" width="60px"/><br>{{contentone}}</td>
      		<td style="width:50%"><img src="{{_fileUrl}}{{contenttwo}}" width="60px"/><br>{{contenttwo}}</td>
      	</tr>
      </table>
    fields:
      contentone: 
        label: Image left
        type:  image
        width: 1/2
        help: Required
      contenttwo:
        label: Image right
        type: image
        width: 1/2
        help: Required