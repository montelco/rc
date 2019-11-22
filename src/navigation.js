jQuery(document).ready(function($) {
    var MqL = 768;
    var hasScrolledPage = false;
    moveNavigation();
    stickyHeader();
    $(window).on('resize', function() {
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
        checkWindowWidth();
    });

    $(".article div[data-name*='Page Field: Page Content'] a").filter(function() {
        return this.hostname && this.hostname !== location.hostname;
    }).addClass('external');

    $('.cd-nav-trigger').on('click', function(event) {
        event.preventDefault();
        if ($('.cd-main-content').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        } else {
            $(this).addClass('nav-is-visible');
            $('.cd-primary-nav').addClass('nav-is-visible');
            $('.cd-main-header').addClass('nav-is-visible');
            $('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                $('body').addClass('overflow-hidden');
            });
            toggleSearch('close');
            $('.cd-overlay').addClass('is-visible');
        }
    });
    $('.cd-search-trigger').on('click', function(event) {
        event.preventDefault();
        toggleSearch();
        // var search = $('div.search');
        // if (search.hasClass('d-mm-none')) {
        //     hideFixed("visible");
        //     return true;
        // } else {
        //     hideFixed("hidden");
        //     return true;
        // }
        // closeNav();
    });
    $('.cd-overlay').on('swiperight', function() {
        if ($('.cd-primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        }
    });
    $('.nav-on-left .cd-overlay').on('swipeleft', function() {
        if ($('.cd-primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        }
    });
    $('.cd-overlay').on('click', function() {
        closeNav();
        toggleSearch('close')
        $('.cd-overlay').removeClass('is-visible');
    });
    $('.cd-primary-nav').children('.has-children').children('a').on('click', function(event) {
        event.preventDefault();
    });
    var delay=1000, setTimeoutConst;
    if (checkWindowWidth()) {
        $(document).on("mouseover", function(event) {
            checkWindowWidth();
            event.preventDefault();
            var menu = $('.has-children').children('a, ul.cd-secondary-nav, ul.cd-nav-icons');
            if (!menu.is(event.target) && menu.has(event.target).length === 0) {
                menu.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
                $('.cd-overlay').removeClass('is-visible');
            }
        });

        $('.has-children').children('a, ul.cd-secondary-nav, ul.cd-nav-icons').on('mouseover', function(event) {
            checkWindowWidth();
            if (!checkWindowWidth()) event.preventDefault();
            var selected = $(this);
            setTimeoutConst = setTimeout(function() {
                console.log('Plate Opened');
                if (selected.next('ul').hasClass('is-hidden')) {
                    selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
                    selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
                    $('.cd-overlay').addClass('is-visible');
                } else {
                    selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
                    $('.cd-overlay').removeClass('is-visible');
                }
            }, 250);
        }).on('mouseleave', function() {
            clearTimeout(setTimeoutConst);
        });

        $('.cd-primary-nav').children('.has-children').children('a').on('click', function(event){
            checkWindowWidth();
            if( !checkWindowWidth() ) event.preventDefault();
            var selected = $(this);
            if( selected.next('ul').hasClass('is-hidden') ) {
                selected.addClass('selected').attr('aria-expanded', 'true').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
                selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
                $('.cd-overlay').addClass('is-visible');
            } else {
                selected.removeClass('selected').attr('aria-expanded', 'false').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
                $('.cd-overlay').removeClass('is-visible');
                toggleSearch('close');
            }
        });
        function clickNav() {
            $('.cd-primary-nav').children('.has-children').children('a').on('click', function(event){
                checkWindowWidth();
                if( !checkWindowWidth() ) event.preventDefault();
                var selected = $(this);
                if( selected.next('ul').hasClass('is-hidden') ) {
                    selected.addClass('selected').attr('aria-expanded', 'true').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
                    selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
                    $('.cd-overlay').addClass('is-visible');
                } else {
                    selected.removeClass('selected').attr('aria-expanded', 'false').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
                    $('.cd-overlay').removeClass('is-visible');
                    toggleSearch('close');
                }
            });
        }
    }
    if (!checkWindowWidth()) {
        $('.has-children').children('a').on('click', function(event) {
            checkWindowWidth();
            if (!checkWindowWidth())
                event.preventDefault();
            var selected = $(this);
            if (selected.next('ul').hasClass('is-hidden')) {
                selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
                selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
                $('.cd-overlay').addClass('is-visible');
            } else {
                selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
                $('.cd-overlay').removeClass('is-visible');
            }
            toggleSearch('close');
        });
    }
   
    $('.go-back').on('click', function() {
        $(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
    });
    function closeNav() {
        $('.cd-nav-trigger').removeClass('nav-is-visible');
        $('.cd-main-header').removeClass('nav-is-visible');
        $('.cd-primary-nav').removeClass('nav-is-visible');
        $('.has-children ul').addClass('is-hidden');
        $('.has-children a').removeClass('selected');
        $('.moves-out').removeClass('moves-out');
        $('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            $('body').removeClass('overflow-hidden');
        });
    }
    function toggleSearch(type) { 
        if ($('.cd-search-trigger').hasClass('search-is-visible')) {
            // $('.cd-search').removeClass('is-visible');
            $('.cd-search-trigger').removeClass('search-is-visible');
            // $('.cd-overlay').removeClass('search-is-visible');
            hideFixed('hidden');
            console.log('Close triggered');
        } else {
            // $('.cd-search').toggleClass('is-visible');
            $('.cd-search-trigger').toggleClass('search-is-visible');
            // $('.cd-overlay').toggleClass('search-is-visible');
            hideFixed('visible');
            console.log('Open triggered');
        }
    }
    function hideFixed(visibility) {
        var search = $('div.search.can-hide');
        if (visibility == "hidden") {
            search.addClass('d-mm-none');
            console.log('Hiding Search');
        } else if (visibility == "visible") {
            search.removeClass('d-mm-none');
            console.log('Showing Search');
        } else {
            console.log('An error has occurred.');
        }
    }
    function checkWindowWidth() {
        var e = window
          , a = 'inner';
        if (!('innerWidth'in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if (e[a + 'Width'] >= MqL) {
            return true;
        } else {
            checkForImageResize();
            return false;
        }
    }
    function moveNavigation(){
        var navigation = $('.cd-nav');
        var desktop = checkWindowWidth();
        if ( desktop ) {
            navigation.detach();
            navigation.insertBefore('.nav-end');
        } else {
            navigation.detach();
            navigation.insertAfter('.nav-start');
        }
    }
    function stickyHeader(){
        var header = $('header');
        var search = $('div.can-hide');
        var toggle = $('a.cd-search-trigger');
        var isDesktop = checkWindowWidth();
        var lastScrollTop = 0;
        var lastScrollTopA = 0;
        if (!isDesktop) {
            if(!hasScrolledPage){
                $(document.body).on('scroll touchmove', function() {
                    $(window).on('scroll', function() {
                        st = $(window).scrollTop();
                        if(st > 0  && !hasScrolledPage) {
                            search.addClass('d-mm-none');
                            toggle.removeClass('d-mm-none');
                            hasScrolledPage = true;
                        }
                    });
                    $(window).on('touchmove', function() {
                        st = $(window).scrollTop();
                        if(st > 0 && !hasScrolledPage) {
                            search.addClass('d-mm-none');
                            toggle.removeClass('d-mm-none');
                            hasScrolledPage = true;
                            
                        }
                    });

                });
                var iev=0;
                var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
                var trident = !!navigator.userAgent.match(/Trident\/7.0/);
                var rv=navigator.userAgent.indexOf("rv:11.0");

                if (ieold) iev=new Number(RegExp.$1);
                if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
                if (trident&&rv!=-1) iev=11;

                if(typeof InstallTrigger !== 'undefined' || iev == 11) {
                    $(window).on('scroll', function() {
                        st = $(this).scrollTop();
                        if(st > 0  && !hasScrolledPage) {
                            search.addClass('d-mm-none');
                            toggle.removeClass('d-mm-none');
                            hasScrolledPage = true;
                        }
                    });
                }
                else {
                    $('body').on('mousewheel', function(e){
                        if(e.originalEvent.wheelDelta < 0  && !hasScrolledPage) {
                            search.addClass('d-mm-none');
                            toggle.removeClass('d-mm-none');
                            hasScrolledPage = true;
                        }
                    });
                }
            } 
        }
    }
    function stickyHeader(){
        var header = $('header');
        var search = $('div.can-hide');
        var toggle = $('a.cd-search-trigger');
        var isDesktop = checkWindowWidth();
        var lastScrollTop = 0;
        var lastScrollTopA = 0;
        if (!isDesktop) {
            if(!hasScrolledPage){
                $(document.body).on('scroll touchmove', function() {
                    $(window).on('scroll', function() {
                        st = $(window).scrollTop();
                        if(st > 0  && !hasScrolledPage) {
                            search.addClass('d-mm-none');
                            toggle.removeClass('d-mm-none');
                            hasScrolledPage = true;
                        }
                    });
                    $(window).on('touchmove', function() {
                        st = $(window).scrollTop();
                        if(st > 0 && !hasScrolledPage) {
                            search.addClass('d-mm-none');
                            toggle.removeClass('d-mm-none');
                            hasScrolledPage = true;
                            
                        }
                    });

                });
                var iev=0;
                var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
                var trident = !!navigator.userAgent.match(/Trident\/7.0/);
                var rv=navigator.userAgent.indexOf("rv:11.0");

                if (ieold) iev=new Number(RegExp.$1);
                if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
                if (trident&&rv!=-1) iev=11;

                if(typeof InstallTrigger !== 'undefined' || iev == 11) {
                    $(window).on('scroll', function() {
                        st = $(this).scrollTop();
                        if(st > 0  && !hasScrolledPage) {
                            search.addClass('d-mm-none');
                            toggle.removeClass('d-mm-none');
                            hasScrolledPage = true;
                        }
                    });
                }
                else {
                    $('body').on('mousewheel', function(e){
                        if(e.originalEvent.wheelDelta < 0  && !hasScrolledPage) {
                            search.addClass('d-mm-none');
                            toggle.removeClass('d-mm-none');
                            hasScrolledPage = true;
                        }
                    });
                }
            } 
        }
    }
    function checkForImageResize(){
        // var hero = $(".no_overlay_hero").find(".ms-siteicon-img");
        // if (hero.attr('src').indexOf('_thumb') > -1) {
        //     return;
        // } else {
        //     var filename = hero.attr('src').split('.').shift();
        //     var filename = filename + '_mobile';
        //     // hero.attr('src', filename + '.' + hero.attr('src').split('.').pop());
        // }
    }
});
