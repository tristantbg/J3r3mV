/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    $slider, flkty, flickityFirst = true,
    lastCell = false;
$(function() {
    var app = {
        init: function() {
            $(window).load(function() {
                $(".loader").fadeOut("fast");
                hasher.init();
            });
            $(window).resize(function(event) {});
            $(document).ready(function($) {
                var $root = '/CharlesNegre/';
                var $body = $('body');
                var $intro = $('.intro');
                var hash;
                //hasher.prependHash = '/';
                function handleChanges(newHash, oldHash) {
                    console.log(newHash);
                    hash = hasher.getHashAsArray();
                    var element = $('*[data-target="' + newHash + '"]');
                    if (hash[0] == "index") {
                        if (oldHash != null) {
                            $intro.remove();
                        }
                        $body.removeClass('album infos');
                        if ($slider != null) {
                            $slider.delay(600).fadeOut('200', function() {
                                $(this).flickity('destroy').empty().show();
                            });
                        }
                    }
                    if (hash[0] == "infos") {
                        $intro.remove();
                        $body.addClass('infos');
                    }
                    if (hash[0] == "work") {
                        $intro.remove();
                        app.loadContent(element.attr('href') + '/ajax', slidecontainer);
                        $body.addClass('album');
                    }
                }
                hasher.changed.add(handleChanges);
                hasher.initialized.add(handleChanges);
                $('[data-target]').bind('click', function(e) {
                    $el = $(this);
                    e.preventDefault();
                    hasher.setHash($(this).data('target'));
                });
                $('.intro').click(function(event) {
                    $(this).addClass('closed');
                });
                var slidecontainer = $('.container .slider:not(".hover")');
                // $('[href]').bind('click', function(e) {
                //     var el = $(this);
                //     e.preventDefault();
                //     History.pushState({
                //         key: 'page'
                //     }, null, $root + el.data('title'));
                //     app.loadContent(el.attr('href') + '/ajax', slidecontainer);
                //     if (el.is(".main_menu a")) {
                //         $body.toggleClass('page');
                //     }
                // });
                // $('.main_menu .albums a').hover(function() {
                //     slidecontainer.empty().show();
                //     var albumJSON = window.location.origin + '/CharlesNegre/api/' + $(this).data('target');
                //     $.getJSON(albumJSON, function(data) {
                //         var pattern = data.page.content['pattern'];
                //         var images = data.images;
                //         if (pattern == 'one') {
                //             slidecontainer.html('<div class="gallery_cell"><img class="content" src="' + data.page.url + '/' + images[0].safeName + '?w=1000&q=100"></div>');
                //         } else {
                //             slidecontainer.html('<div class="gallery_cell"><img class="content" src="' + data.page.url + '/' + images[0].safeName + '?w=1000&q=100"><img class="content" src="' + data.page.url + '/' + images[1].safeName + '?w=1000&q=100"></div>');
                //         }
                //     });
                // }, function() {
                //     slidecontainer.hide();
                //     return false;
                // });
                $('.main_menu .albums a').hover(function() {
                    var album = $(this).data('target');
                    $('.slider.hover .gallery_cell[data-title="' + album + '"]').removeClass('hidden');
                }, function() {
                    $('.slider.hover .gallery_cell').addClass('hidden');
                });
            });
        },
        checkLastCell: function(flkty) {
            if (flkty.selectedIndex < flkty.cells.length - 1) {
                lastCell = false;
            }
            if (lastCell) {
                hasher.setHash('index');
            }
            if (flkty.selectedIndex == flkty.cells.length - 1) {
                lastCell = true;
            }
        },
        loadSlider: function() {
            $slider = $('.slider.albumslider').flickity({
                cellSelector: '.gallery_cell',
                imagesLoaded: true,
                lazyLoad: 1,
                //percentPosition: false,
                //wrapAround: true,
                prevNextButtons: false,
                pageDots: false,
                //draggable: false
            });
            flkty = $slider.data('flickity');
            lastCell = false;
            if (flickityFirst) {
                $slider.on('staticClick', function(event, pointer, cellElement, cellIndex) {
                    if (!cellElement) {
                        return;
                    }
                    $(this).flickity('next', false);
                    app.checkLastCell(flkty);
                });
                $('.prev').bind('click', function(e) {
                    e.preventDefault();
                    $slider.flickity('previous', false);
                    app.checkLastCell(flkty);
                });
                $('.next').bind('click', function(e) {
                    e.preventDefault();
                    $slider.flickity('next', false);
                    app.checkLastCell(flkty);
                });
                flickityFirst = false;
            }
        },
        loadContent: function(url, target) {
            $.ajax({
                url: url,
                success: function(data) {
                    $(target).html(data);
                    app.loadSlider();
                }
            });
        }
    };
    app.init();
});

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arrayRand(myArray) {
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    return rand;
}

function init() {}
init();