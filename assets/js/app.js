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
                    //console.log(oldHash);
                    hash = hasher.getHashAsArray();
                    var element = $('*[data-target="' + newHash + '"]');
                    if (hash[0] == "index") {
                        if (oldHash != null) {
                            $intro.remove();
                        }
                        $body.removeClass('album infos');
                    }
                    if (hash[0] == "about") {
                        $intro.remove();
                        $body.addClass('infos');
                    }
                    if (hash[0] == "work") {
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
                //esc
                $(document).keyup(function(e) {
                    if (e.keyCode === 27) hasher.setHash('index');
                });
                //left
                $(document).keyup(function(e) {
                    if (e.keyCode === 37 && $slider) app.goPrev($slider);
                });
                //right
                $(document).keyup(function(e) {
                    if (e.keyCode === 39 && $slider) app.goNext($slider);
                });
                if (Modernizr.touch) {
                    app.mobileMenu();
                } else {
                    app.mouseNav();
                    $(window).mousemove(function(event) {
                        app.mouseNav();
                    });
                }
                var slidecontainer = $('.content');
            });
        },
        mouseNav: function() {
            posX = event.pageX;
            posY = event.pageY;
            $('.mouse_nav').css({
                'top': posY + 'px',
                'left': posX + 'px'
            });
        },
        mobileMenu: function() {
            $("ul.category .title").click(function(event) {
                var parent = $(this).parent();
                if (!parent.hasClass('active')) {
                    $("ul.category.active").removeClass('active').find('ul.albums').slideToggle(800);
                    parent.addClass('active').find('ul.albums').slideToggle(800);
                }
            });
        },
        loadContent: function(url, target) {
            $.ajax({
                url: url,
                success: function(data) {
                    $(target).html(data);
                    $body.addClass('page');
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