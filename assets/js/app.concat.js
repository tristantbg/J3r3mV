/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    ySpeed, controller, parallax, $slidecontainer, $body, $intro, $mouse_nav, mobile = false;
$(function() {
    var app = {
        init: function() {
            $(window).load(function() {
                app.deferImages();
                $(".loader").fadeOut(300);
            });
            $(window).resize(function(event) {
                app.sizeSet();
            });
            $(document).ready(function($) {
                $root = "/jeremyvitte";
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
                History.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
                    var State = History.getState(); // Note: We are using History.getState() instead of event.state
                    console.log(State);
                    var content = State.data;
                    if (content.type == 'page') {
                        $slidecontainer.fadeOut(300, function() {
                            app.loadContent(State.url + '/ajax', $slidecontainer);
                        });
                    } else if (content.type == 'filter') {
                        var filter = content.filter;
                        var element = $('.category[data-filter="' + filter + '"]');
                        app.filter(filter, element);
                    } else {
                        $body.removeClass('page');
                    }
                });
                $('body').on('click', '[data-target]', function(e) {
                    $el = $(this);
                    $parent = $el.parent();
                    e.preventDefault();
                    if (!$parent.hasClass('hidden')) {
                        $projects.removeClass('active');
                        if ($parent.is('.project')) {
                            $parent.addClass('active');
                        }
                        History.pushState({
                            type: 'page'
                        }, "Jérémy Vitté | " + $el.data('title'), $el.attr('href'));
                    } else {
                        app.goIndex();
                    }
                });
                $('.category[data-filter]').bind('click', function(e) {
                    $el = $(this);
                    var url = window.location.href.split(/[?#]/)[0];
                    var filter = $el.data('filter');
                    e.preventDefault();
                    History.pushState({
                        type: 'filter',
                        filter: filter
                    }, document.getElementsByTagName("title")[0].innerHTML, url + "?filter=" + filter);
                });
                $('body').on('click', '.back-btn', function(e) {
                    e.preventDefault();
                    app.goIndex();
                });
                $('.project [data-target]').hover(function() {
                    if (!$(this).parent('.project').hasClass('hidden')) {
                        $mouse_nav.html($(this).data('title'));
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
                if (width >= 900) {
                    $(document).scrollScope();
                    app.scrollEffect();
                    app.mouseNav();
                    $(window).scroll(function(event) {
                        if ($(window).scrollTop() == 0 && $body.hasClass('page')) {
                            app.goIndex();
                        }
                    });
                    $('.offset').click(function(event) {
                        $body.animate({
                            scrollTop: height / 3
                        }, 1000);
                    });
                }
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
                TweenMax.to($projects, 0.4, {
                    webkitFilter: "blur(0px)",
                    ease: Power1.easeOut,
                });
            } else {
                $categories.removeClass('active');
                element.addClass('active');
                TweenMax.to($('.project.hidden'), 0.4, {
                    webkitFilter: "blur(0px)",
                    ease: Power1.easeOut,
                });
                $projects.removeClass('hidden');
                $targets = $('.project:not([data-filter="' + filter + '"])').addClass('hidden');
                TweenMax.to($targets, 0.4, {
                    webkitFilter: "blur(30px)",
                    ease: Power1.easeOut,
                });
            }
        },
        sizeSet: function() {
            width = $(window).width();
            height = $(window).height();
            if (width >= 900) {
                $projects.css({
                    width: width / 4,
                    height: width / 4
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
            ySpeed = ['0%', '0%', '0%', '-100%', '50%', '100%', '-130%'];
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
                app.defineScrollElem($projectsRegular[i], false);
            }
            for (var i = 0; i < $projectsImportant.length; i++) {
                app.defineScrollElem($projectsImportant[i], true);
            }
        },
        defineScrollElem: function(elem, important) {
            var elemW;
            if (important) {
                elemW = rand(85, 96) + "%";
            } else {
                elemW = rand(50, 70) + "%";
            }
            TweenLite.to(elem, 0, {
                width: elemW,
                yPercent: rand(0, 50),
                xPercent: rand(-40, 40),
                rotation: rand(-10, 10)
            });
            new ScrollMagic.Scene({
                triggerElement: elem,
                duration: rand(100, 300) + "%"
            }).setTween(elem, {
                yPercent: arrayRand(ySpeed),
                rotation: rand(-30, 30)
            }).addTo(parallax);
        },
        goIndex: function() {
            $projects.removeClass('active');
            History.pushState({
                type: 'index'
            }, "Jérémy Vitté", window.location.origin + $root);
        },
        mobileMenu: function() {
            // $("ul.category .title").click(function(event) {
            //     var parent = $(this).parent();
            //     if (!parent.hasClass('active')) {
            //         $("ul.category.active").removeClass('active').find('ul.albums').slideToggle(800);
            //         parent.addClass('active').find('ul.albums').slideToggle(800);
            //     }
            // });
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