jQuery(document).ready(function() {
  var mobileSize = 576;
  checkWidth();

  $(window).on('resize', function() {
    checkWidth();
  });

  $("#subsite-navigation").children('.subsite-navigation__top').children('span').children('span').children('a').on('click', function(event){
    event.preventDefault();
    var selected = $(this);
    if( selected.parent().parent().siblings('ul.subsite-navigation__drop').hasClass('d-none') ) {
      $('.subsite-navigation__drop').removeClass('position-xs-static').addClass('d-none').attr('aria-expanded', 'false');
      selected.addClass('selected').parent().parent().siblings('.subsite-navigation__drop').addClass('position-xs-static').removeClass('d-none').attr('aria-expanded', 'true');
      $('.subsite-navigation__drop.d-none').siblings('.menu-item').children().children('.subsite-navigation__top-link.selected').removeClass('selected');
    } else {
      selected.removeClass('selected').parent().parent().siblings('.subsite-navigation__drop').removeClass('position-xs-static').addClass('d-none').attr('aria-expanded', 'false');
    }
  });

  function checkWidth() {
    var e = window
      , a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    if (e[a + 'Width'] >= mobileSize) {
        return true;
    } else {
        return false;
    }
  }

  if (!checkWidth() && !hasCollapsed) {
    var navContainer = $(".subsite");
    var nav = $("#subsite-navigation");
    var site = $("header.hero h1").text();
    $("#subsite-navigation").children('li.top-nav-item').children('a').addClass('d-block');
    $("#site-name").append("<a href='#'>" + site + " Menu</a>");
    // nav.addClass('d-none');

    $("#site-name").children('a').on('click', function(event){
      event.preventDefault();
      $("#subsite-navigation").toggleClass('d-none');
      $("#subsite-navigation").toggleClass('d-block');
    });

    var hasCollapsed = true;
  }

}); 