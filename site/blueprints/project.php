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
  description:
    label: Description
    type: textarea
  medias: 
    label: Images
    type: structure
    entry: >
      <table style="width:100%; font-size: 11px">
      	<tr>
      		<td style="width:25%">Image 1</td>
      		<td style="width:25%">Image 2</td>
      		<td style="width:25%">Caption</td>
      	</tr>
      	<tr>
      		<td style="width:25%"><img src="{{_fileUrl}}{{contentone}}" width="60px"/><br>{{contentone}}</td>
      		<td style="width:25%"><img src="{{_fileUrl}}{{contenttwo}}" width="60px"/><br>{{contenttwo}}</td>
      		<td style="width:25%">{{caption}}</td>
      	</tr>
      </table>
    fields:
      contentone: 
        label: Image 1
        type:  image
        width: 1/2
      contenttwo:
        label: Image 2
        type: image
        width: 1/2
      caption: 
        label: Caption
        type:  text