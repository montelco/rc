jQuery(document).ready( function() {
  $('main').first().attr({
    tabindex: '-1',
    id: 'main',
  });

  function fixSharePointSearchBox() {
    var searchbox = $("#SearchBox input");
    searchbox.removeAttr("accesskey"); // remove access-key
    searchbox.attr("aria-label", "Search").attr("name", "search");
    searchbox.before("<label for='" + searchbox.attr("id") + "' class='sr-only'>Search: </label>");
  }

  function fixMegaMenu() {
    $("nav:first").accessibleMegaMenu({
        uuidPrefix: "menu-link",
        menuClass: "cd-primary-menu",
        topNavItemClass: "top-nav-item",
        panelClass: "sub-nav",
        panelGroupClass: "sub-nav-group",
        hoverClass: "hover",
        focusClass: "focus",
        openClass: "open",
        debug: "true"
    });
  }
  
  fixSharePointSearchBox();
  fixMegaMenu();
});