jQuery(document).ready(function($) {

  // var sidebarNavigation = $('#sideNavBox');
  // var navigationList = $('ul.ms-core-listMenu-root');
  // var listItems = $('li.static');
  // var linkTitle = $('span.menu-item-text');
  // var siteTitle = null;

  // function reDomSideNavItems() {
  //   if (sidebarNavigation != null) {
  //     return hasList(sidebarNavigation);
  //   }
  // }

  // function hasList(navigation) {
  //   if (navigation.has(navigationList).has(listItems)) {
  //     return collectTopLevel(sidebarNavigation.find(navigationList));
  //   }
  // }

  // function collectTopLevel(ul) {
  //   var siteTitle = $('#SubsiteNavigation ul.ms-core-listMenu-root > li.static span.ms-core-listMenu-item').text();
  //   console.log(siteTitle);
  // }

  // function siteTitle()
  // {

  // }

  // reDomSideNavItems();
  $('#SubsiteNavigation ul.static').not('.ms-core-listMenu-root').each( function() {
    $(this).addClass('dropdown__menu-items').addClass('subsite-navigation__drop').addClass('d-none');
    $(this).parent().addClass('subsite-navigation__top');
  });

  $('#SubsiteNavigation ul.dropdown__menu-items li.static').each( function() {
    $(this).addClass('dropdown__menu-list-items');
  });

  $('#SubsiteNavigation ul.dropdown__menu-items li.static.dropdown__menu-list-items span.menu-item-text').each( function() {
    $(this).addClass('dontWrap');
  });

  $('#SubsiteNavigation ul.static').not('.dropdown__menu-items').each( function() {
    $(this).addClass('subnav__topLevel').addClass('textBlack').attr('id', 'subsite-navigation');
  });

  $('#SubsiteNavigation ul.subnav__topLevel > li.static').not('.dropdown__menu-list-items').each( function() {
    $(this).addClass('subnav__topLevel-listItems');
  });

  $('#subsite-navigation').prepend('<li id="site-name"></li>');

  $('#SubsiteNavigation ul.subnav__topLevel > li.subsite-navigation__top span.menu-item-text').not('.dontWrap').each( function() {
    $(this).wrap('<a href="#" class="subsite-navigation__top-link"></a>');
  });
  
  // $(document).ready(function() {
  //   var recentMenuItem = $(".menu-item-text").text() === "Recent";
  //   recentMenuItem.each(function() {
  //     $(this).parent().parent().parent().hide();
  //   });
  // });

  $('#subsite-navigation').detach().insertAfter("#end-subnav");

  // var siteTitle = $('#SubsiteNavigation ul.subnav__topLevel li.subnav__topLevel-listItems > .ms-core-listMenu-item').text();
  // console.log(siteTitle);
});