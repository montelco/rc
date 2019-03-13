jQuery(document).ready(function() {
  var mobile = 576;
  checkWindowWidth();

  $(window).on('resize', function() {
      checkWindowWidth();
  });

  $("#subsite-navigation").children('.subsite-navigation__top').children('a').on('click', function(event){
      event.preventDefault();
      var selected = $(this);
      if( selected.next('.subsite-navigation__drop').hasClass('d-none') ) {
        selected.addClass('selected').next('.subsite-navigation__drop').addClass('position-xs-static').removeClass('d-none').attr('aria-expanded', 'true');
      } else {
        selected.removeClass('selected').next('.subsite-navigation__drop').removeClass('position-xs-static').addClass('d-none').attr('aria-expanded', 'false');
      }
  });

  if (!checkWindowWidth()) {
    var navContainer = $(".subsite");
    var nav = $("#subsite-navigation");
    var site = $("header.hero h1").text();
    $("#subsite-navigation").children('li.top-nav-item').children('a').addClass('d-block');
    $("#site-name").append("<a href='#'>" + site + " Menu</a>");
    nav.addClass('d-none');

    $("#site-name").children('a').on('click', function(event){
      event.preventDefault();
      $("#subsite-navigation").toggleClass('d-none');
      $("#subsite-navigation").toggleClass('d-block');
    });
  }

  function checkWindowWidth() {
    var e = window
      , a = 'inner';
    if (!('innerWidth'in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    if (e[a + 'Width'] >= mobile) {
        return true;
    } else {
        return false;
    }
  }
}); 