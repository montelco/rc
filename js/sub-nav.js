jQuery(document).ready(function() {
  var mobileSize = 576;
  var hasRun = false;
  checkWidth();
  label();

  var header = $("a.ms-siteicon-a");
  var url = header.attr('href');
  var home = url.replace(/-site/g, '');
  $("a.ms-siteicon-a").addClass('controlHomeLink').attr('href', home);

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
        // label();
        return false;
    }
  }

  function label() {
    if (hasRun) {
      return;
    } else {
      var hasRun = true;
    }
    
    var site = $("section.title_ribbon h1").text();
    var header = $("a.ms-siteicon-a");
    var url = header.attr('href');
    var home = url.replace(/-site/g, '');
    $("#site-name").addClass('yellow').append("<a class='textBlack' href='"+home+"'><h1 class='pd-md'>" + site + ' <span class="d-md-none"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/></svg></span></h1></a>');

    var editor = window.location.href.indexOf('//manage.');
    if (editor == -1) {
      header.attr('id', 'lazy-home-link');
      $("a.ms-siteicon-a").addClass('HomeLink').attr('href', home);
      return;
    } else {
      return;
    }
  }

  if (!checkWidth() && !hasCollapsed) {
    var navContainer = $(".subsite");
    var nav = $("#subsite-navigation");
    var site = $("section.title_ribbon h1").text();
    console.log(site);
    $("#subsite-navigation").children('li.subnav__topLevel-listItems').addClass('d-none');
    // $("#site-name").append("<a class='textBlack' href='#'><h1 class='pd-md'>" + site + " Links »</h1></a>");
    // nav.addClass('d-none');

    $("#site-name").children('a').on('click', function(event){
      event.preventDefault();
      $("li.subnav__topLevel-listItems").toggleClass('d-none');
      $("li.subnav__topLevel-listItems").toggleClass('d-block');
    });

    var hasCollapsed = true;
  }

}); 