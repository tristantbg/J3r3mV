/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    $slidecontainer, $body, $intro, $mouse_nav;
$(function() {
    var app = {
        init: function() {
            $(window).load(function() {
                app.deferImages();
                $(".loader").fadeOut(300);
                hasher.init();
            });
            $(window).resize(function(event) {
                app.sizeSet();
            });
            $(document).ready(function($) {
                var $root = '/CharlesNegre/';
                $body = $('body');
                $intro = $('.intro');
                $slidecontainer = $('.content');
                $projects = $('.project');
                $categories = $('ul .category');
                $mouse_nav = $('.mouse_nav');
                var hash;
                //hasher.prependHash = '/';
                function handleChanges(newHash, oldHash) {
                    //console.log(oldHash);
                    hash = hasher.getHashAsArray();
                    var element = $('*[data-target="' + newHash + '"]');
                    if (hash[0] == 'filter') {
                        var filter = hash[1];
                        if (filter == 'all') {
                            $categories.removeClass('active');
                            $projects.removeClass('hidden');
                            TweenMax.to($projects, 0.5, {
                                scale: 1,
                                autoAlpha: 1,
                                ease: Power1.easeInOut,
                            });
                        } else {
                            $categories.removeClass('active');
                            element.addClass('active');
                            TweenMax.to($('.project.hidden'), 0.5, {
                                scale: 1,
                                autoAlpha: 1,
                                ease: Power1.easeInOut,
                            });
                            $targets = $('.project:not([data-filter="' + filter + '"])').addClass('hidden');
                            TweenMax.to($targets, 0.5, {
                                scale: 0,
                                autoAlpha: 0,
                                rotation: 0,
                                ease: Power1.easeInOut,
                            });
                        }
                    } else {
                        app.loadContent(newHash + '/ajax', $slidecontainer);
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
                $projects.hover(function() {
                  $mouse_nav.html($(this).data('title'));
                }, function() {
                  $mouse_nav.html('');
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
                app.scrollEffect();
                if (Modernizr.touch) {
                    app.mobileMenu();
                } else {
                    app.mouseNav();
                    app.mouseNav();
                }
            });
        },
        sizeSet: function() {
            width = $(window).width();
            height = $(window).height();
        },
        mouseNav: function() {
            $(window).mousemove(function(event) {
                posX = event.pageX;
                posY = event.pageY;

                if (posX < width / 4) {
                    $('.mouse_nav').css({
                    'top': posY + 'px',
                    'left' : (posX + 20) + 'px',
                });
                } else {
                    $('.mouse_nav').css({
                    'top': posY + 'px',
                    'left' : (posX - $mouse_nav.outerWidth() - 20) + 'px',
                });
                }
                
            });
        },
        scrollEffect: function() {
            var controller = new ScrollMagic.Controller({
                globalSceneOptions: {
                    triggerHook: 'onEnter'
                }
            });
            var parallax = new ScrollMagic.Controller();
            //var introAnim = TweenMax.fromTo("#main-title", 1, {opacity: "1"}, {opacity: "0"});
            var padding = $('#main_menu').css('left');
            var introAnim = new TimelineMax().to("#main_menu", 0, {
                x: "-100%",
                left: '0'
            }).to("#about", 0, {
                x: "-100%",
                left: '0'
            }).to("#main_title", 0.6, {
                opacity: "0"
            }).to("#main_menu", 0.3, {
                x: "0%",
                left: padding
            }, '-=0.3').to("#about", 0.3, {
                x: "0%",
                left: padding
            }, '-=0.3');
            var scene = new ScrollMagic.Scene({
                triggerElement: ".projects",
                duration: "100%"
            }).setTween(introAnim).addTo(controller);
            var projects = document.querySelectorAll(".project");
            for (var i = 0; i < projects.length; i++) {
                new ScrollMagic.Scene({
                    triggerElement: projects[i],
                    duration: "100%"
                }).setTween(projects[i], {
                    y: rand(30, -100) + "%",
                    rotation: rand(-30, 30)
                }).addTo(parallax);
            }
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