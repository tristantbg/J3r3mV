/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    $slider, $body, $intro, flkty, flickityFirst = true,
    lastCell = false;
$(function() {
    var app = {
        init: function() {
            $(window).load(function() {
                app.deferImages();
                $(".loader").fadeOut(300);
                hasher.init();
            });
            $(window).resize(function(event) {});
            $(document).ready(function($) {
                var $root = '/CharlesNegre/';
                $body = $('body');
                $intro = $('.intro');
                var hash;
                //hasher.prependHash = '/';
                function handleChanges(newHash, oldHash) {
                    console.log(oldHash);
                    hash = hasher.getHashAsArray();
                    var element = $('*[data-target="' + newHash + '"]');
                    if (hash[0] == "index") {
                        if (oldHash != null) {
                            $intro.remove();
                        }
                        $body.removeClass('album infos');
                        if ($slider != null) {
                            // $slider.delay(800).fadeOut('100', function() {
                            //    $(this).flickity('destroy').empty().show();
                            //  });
                            $slider.flickity('destroy').empty().show();
                        }
                    }
                    if (hash[0] == "infos") {
                        $intro.remove();
                        $body.addClass('infos');
                    }
                    if (hash[0] == "work") {
                        $intro.remove();
                        $body.addClass('album loading');
                        app.loadContent(element.attr('href') + '/ajax', slidecontainer);
                    }
                }
                hasher.changed.add(handleChanges);
                hasher.initialized.add(handleChanges);
                $('[data-target]').bind('click', function(e) {
                    $el = $(this);
                    e.preventDefault();
                    if ($el.is('.intro')) {
                        setTimeout(function() {
                            hasher.setHash($el.data('target'));
                        }, 1100);
                    } else {
                        hasher.setHash($el.data('target'));
                    }
                });
                $('.intro').click(function(event) {
                    $(this).addClass('closed');
                });
                $(document).keyup(function(e) {
                    if (e.keyCode === 27) hasher.setHash('index');
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
                    if (!$body.hasClass('loading')) {
                        $('.slider.hover .gallery_cell').addClass('hidden');
                    }
                });
            });
        },
        mouseNav: function() {
            $(window).mousemove(function(event) {
                posX = event.pageX;
                posY = event.pageY;
                $('.mouse_nav').css({
                    'top': posY + 'px',
                    'left': posX + 'px'
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
                setGallerySize: false,
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
                    app.goNext($slider);
                });
                $slider.on('lazyLoad', function(event, cellElement) {
                    $body.removeClass('loading');
                    $('.slider.hover .gallery_cell').addClass('hidden');
                });
                $('.prev').bind('click', function(e) {
                    e.preventDefault();
                    app.goPrev($slider);
                });
                $('.next').bind('click', function(e) {
                    e.preventDefault();
                    app.goNext($slider);
                });
                flickityFirst = false;
            }
        },
        goNext: function($slider) {
            $slider.flickity('next', false);
            app.checkLastCell(flkty);
        },
        goPrev: function($slider) {
            $slider.flickity('previous', false);
            app.checkLastCell(flkty);
        },
        loadContent: function(url, target) {
            $.ajax({
                url: url,
                success: function(data) {
                    $(target).html(data);
                    app.loadSlider();
                }
            });
        },
        deferImages: function() {
            var imgDefer = document.getElementsByTagName('img');
            for (var i = 0; i < imgDefer.length; i++) {
                if (imgDefer[i].getAttribute('data-src')) {
                    imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
                }
            }
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