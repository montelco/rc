window.onload = () => {fixMainTabsAndId();fixSharePointSearchBox();fixMegaMenu();};

export function fixMainTabsAndId() {
  let main = document.querySelector("main");
  main.setAttribute('tabindex', '-1');
  main.setAttribute('id', 'main');
  return true;
}

export function fixSharePointSearchBox() {
  let searchbox = document.querySelector("#SearchBox input");
  let replacement = "<label for='" + searchbox.getAttribute('id') + "' class='sr-only'>Search: </label>";
  searchbox.removeAttribute('accesskey');
  search.setAttribute('aria-label', 'Search');
  search.setAttribute('name', 'search');
  search.insertAdjacentHTML('beforebegin', replacement);
}

export function fixMegaMenu() {
  let nav = document.querySelector("nav:first");
  nav.accessibleMegaMenu({
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