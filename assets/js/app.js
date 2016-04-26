/* globals $:false */
var width = $(window).width(),
    height = $(window).height();
$(function() {
    var app = {
        init: function() {
            $(window).load(function() {
                $(".loader").fadeOut("fast");
            });
            $(window).resize(function(event) {});
            History.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
                var State = History.getState(); // Note: We are using History.getState() instead of event.state
                console.log(State);
                if (State == 'index') {
                  $body.removeClass('page');
                }

                if (State == 'page') {
                  $body.addClass('page');
                }
            });
            $(document).ready(function($) {
                var $root = '/CharlesNegre/';
                var $body = $('body');
                $('.intro').click(function(event) {
                    $(this).addClass('closed');
                });
                var slidecontainer = $('.container .slider:not(".hover")');
                $('[href]').bind('click', function(e) {
                    var el = $(this);
                    e.preventDefault();
                    History.pushState({key: 'page'}, null, $root + el.data('title'));
                    app.loadContent(el.attr('href') + '/ajax', slidecontainer);
                    if (el.is(".main_menu a")) {
                        $body.toggleClass('page');
                    }
                });
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
                    var album = $(this).data('title');
                    $('.slider.hover .gallery_cell[data-title="' + album + '"]').removeClass('hidden');
                }, function() {
                    $('.slider.hover .gallery_cell').addClass('hidden');
                });
            });
        },
        loadSlider: function() {
            var $slider = $('.slider.albumslider').flickity({
                cellSelector: '.gallery_cell',
                imagesLoaded: true,
                //percentPosition: false,
                wrapAround: true,
                prevNextButtons: false,
                pageDots: false,
                //draggable: false
            });
            $slider.on('staticClick', function(event, pointer, cellElement, cellIndex) {
                if (!cellElement) {
                    return;
                }
                $(this).flickity('next', true);
            });
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