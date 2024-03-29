/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    tablet = 1025,
    index = 1,
    ySpeed, elemW, startPos, rotationStart, rotationEnd, controller, parallax, $slidecontainer, $body, $intro, $mouse_nav, mobile = false;
$(function() {
    var app = {
        init: function() {
            $(window).resize(function(event) {
                app.sizeSet();
            });
            $(document).ready(function($) {
                $root = "/";
                $body = $('body');
                $intro = $('.intro');
                $slidecontainer = $('.content .inner');
                $projects = $('.project');
                $categories = $('ul .category');
                $mouse_nav = $('.mouse_nav');
                app.sizeSet();
                var hash;
                if (app.getParameters('filter')) {
                    var filter = app.getParameters('filter');
                    var element = $('.category[data-filter="' + filter + '"]');
                    app.filter(filter, element);
                }
                History.Adapter.bind(window, 'statechange', function() {
                    var State = History.getState();
                    console.log(State);
                    var content = State.data;
                    if (content.type == 'page') {
                        $slidecontainer.fadeOut(300, function() {
                            app.loadContent(State.url + '/ajax', $slidecontainer);
                        });
                        $('.overlay').addClass('hidden');
                    } else if (content.type == 'drawings') {
                        $slidecontainer.fadeOut(300, function() {
                            app.loadContent(State.url + '/ajax', $slidecontainer);
                        });
                        $('.overlay').removeClass('hidden');
                    } else if (content.type == 'filter') {
                        var filter = content.filter;
                        var element = $('.category[data-filter="' + filter + '"]');
                        app.filter(filter, element);
                    } else {
                        $body.removeClass('page');
                        $('.overlay').addClass('hidden');
                    }
                });
                $('body').on('click', '[data-target]', function(e) {
                    if (width >= tablet) {
                        $el = $(this);
                        $parent = $el.parent();
                        e.preventDefault();
                        if ($el.data('target') == "index") {
                            app.goIndex();
                            return;
                        }
                        if ($el.data('target') == "drawings") {
                            History.pushState({
                                type: 'drawings'
                            }, "Jérémy Vitté | " + $el.data('title'), $el.attr('href'));
                            return;
                        }
                        if (!$parent.hasClass('hidden')) {
                            $projects.removeClass('active');
                            if ($parent.is('.project') && !$parent.hasClass('pointer-none')) {
                                $parent.addClass('active');
                            }
                            History.pushState({
                                type: 'page'
                            }, "Jérémy Vitté | " + $el.data('title'), $el.attr('href'));
                        } else {
                            app.goIndex();
                        }
                    }
                });
                $('.category[data-filter]').bind('click', function(e) {
                    if (width >= tablet) {
                        $el = $(this);
                        var url = window.location.href.split(/[?#]/)[0];
                        var filter = $el.data('filter');
                        e.preventDefault();
                        History.pushState({
                            type: 'filter',
                            filter: filter
                        }, document.getElementsByTagName("title")[0].innerHTML, url + "?filter=" + filter);
                    }
                });
                $('body').on('click', '.back-btn, .overlay', function(e) {
                    if (width >= tablet) {
                        e.preventDefault();
                        app.goIndex();
                    }
                });
                $('.project [data-target]').hover(function() {
                    if (width >= tablet) {
                        if (!$(this).parent('.project').hasClass('hidden')) {
                            $mouse_nav.html($(this).data('title'));
                        }
                    }
                }, function() {
                    $mouse_nav.html('');
                });
                $('.wrap').click(function(e) {
                    if ($(e.target).is('.wrap')) {
                        app.goIndex();
                    } else {
                        return;
                    }
                });
                //esc
                $(document).keyup(function(e) {
                    if (e.keyCode === 27) app.goIndex();
                });
                //left
                // $(document).keyup(function(e) {
                //     if (e.keyCode === 37 && $slider) app.goPrev($slider);
                // });
                // //right
                // $(document).keyup(function(e) {
                //     if (e.keyCode === 39 && $slider) app.goNext($slider);
                // });
                if (width >= tablet) {
                    $(document).scrollScope();
                    app.scrollEffect();
                    app.mouseNav();
                    $(window).scroll(function(event) {
                        if ($(window).scrollTop() == 0 && $body.hasClass('page')) {
                            app.goIndex();
                        }
                    });
                    $('body').on('click', '.offset', function(event) {
                        event.preventDefault();
                        $('body,html').animate({
                            scrollTop: height / 2
                        }, 1000);
                    });
                }
                $(window).load(function() {
                    lazySizes.init();
                    $(".loader").fadeOut(300);
                });
            });
        },
        getParameters: function(val) {
            var result = null,
                tmp = [];
            location.search
                //.replace ( "?", "" ) 
                // this is better, there might be a question mark inside
                .substr(1).split("&").forEach(function(item) {
                    tmp = item.split("=");
                    if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
                });
            return result;
        },
        filter: function(filter, element) {
            if (filter == 'all') {
                $categories.removeClass('active');
                $projects.removeClass('hidden');
                // TweenMax.to($projects, 0.4, {
                //     webkitFilter: "blur(0px)",
                //     ease: Power1.easeOut,
                // });
            } else {
                $categories.removeClass('active');
                element.addClass('active');
                // TweenMax.to($('.project.hidden'), 0.4, {
                //     webkitFilter: "blur(0px)",
                //     ease: Power1.easeOut,
                // });
                $projects.removeClass('hidden');
                $targets = $('.project:not([data-filter="' + filter + '"])').addClass('hidden');
                // TweenMax.to($targets, 0.4, {
                //     webkitFilter: "blur(30px)",
                //     ease: Power1.easeOut,
                // });
            }
        },
        sizeSet: function() {
            width = $(window).width();
            height = $(window).height();
            if (width >= tablet) {
                s = width / 4;
                $projects.css({
                    width: s - 4,
                    height: s - 4
                });
                if (mobile) {
                    location.reload();
                }
            } else {
                mobile = true;
                $projects.css({
                    width: "",
                    height: ""
                });
            }
        },
        mouseNav: function() {
            $(window).mousemove(function(event) {
                posX = event.pageX;
                posY = event.pageY;
                if (posX < width / 4 && $body.hasClass('page') || posX < width / 2 && !$body.hasClass('page')) {
                    $('.mouse_nav').css({
                        'top': posY + 'px',
                        'left': (posX + 20) + 'px',
                    });
                } else {
                    $('.mouse_nav').css({
                        'top': posY + 'px',
                        'left': (posX - $mouse_nav.outerWidth() - 20) + 'px',
                    });
                }
            });
        },
        scrollEffect: function() {
            controller = new ScrollMagic.Controller({
                globalSceneOptions: {
                    triggerHook: 'onLeave'
                }
            });
            parallax = new ScrollMagic.Controller({
                globalSceneOptions: {
                    triggerHook: 'onEnter'
                }
            });
            //var introAnim = TweenMax.fromTo("#main-title", 1, {opacity: "1"}, {opacity: "0"});
            var padding = $('#main_menu').css('left');
            var introAnim = new TimelineMax().to("#main_menu", 0, {
                x: "-100%",
                left: '0'
            }).to("#about", 0, {
                x: "-100%",
                left: '0'
            }).to("#main_title", 0.5, {
                opacity: "1"
            }).to("#main_title", 0.5, {
                opacity: "0"
            }).to("#main_menu", 0.3, {
                x: "0%",
                left: padding
            }, '-=0.3').to("#about", 0.3, {
                x: "0%",
                left: padding
            }, '-=0.3');
            var scene = new ScrollMagic.Scene({
                triggerElement: ".offset",
                duration: "100%"
            }).setTween(introAnim).addTo(controller);
            var $projectsRegular = document.querySelectorAll(".regular");
            var $projectsImportant = document.querySelectorAll(".important");
            for (var i = 0; i < $projectsRegular.length; i++) {
                app.placeElem($projectsRegular[i], false);
            }
            for (var i = 0; i < $projectsImportant.length; i++) {
                app.placeElem($projectsImportant[i], true);
            }
        },
        placeElem: function(elem, important) {
            if (index % 2 == 0) {
                startPos = rand(0, 50);
            } else {
                startPos = rand(50, 100);
            }
            if (important) {
                if (elem.getAttribute("data-ratio") > 1) {
                    elemW = 100;
                } else {
                    elemW = rand(85, 93);
                }
                rotationStart = rand(-10, 10);
                rotationEnd = rand(-10, 10);
                ySpeed = (startPos + rand(-30, 50)) + '%';
            } else {
                elemW = rand(60, 70);
                rotationStart = rand(-40, 40);
                rotationEnd = rand(-10, 10);
                ySpeed = (startPos + rand(-120, 0)) + '%';
            }
            var spaceAround = 100 - elemW;
            TweenLite.to(elem, 0, {
                width: elemW + "%",
                y: startPos + "%",
                x: rand(0, spaceAround) + "%",
                rotation: rotationStart,
                force3D: true
            });
            new ScrollMagic.Scene({
                triggerElement: elem,
                duration: rand(1.5, 3) * height + "px"
            }).setTween(elem, {
                y: ySpeed,
                rotation: rotationEnd,
                force3D: true
            }).addTo(parallax);
            index++;
        },
        goIndex: function() {
            $projects.removeClass('active');
            History.pushState({
                type: 'index'
            }, "Jérémy Vitté", window.location.origin + $root);
        },
        loadContent: function(url, target) {
            $slidecontainer.scrollTop(0);
            $.ajax({
                url: url,
                success: function(data) {
                    $(target).html(data);
                    $body.addClass('page');
                    $slidecontainer.fadeIn(300);
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
