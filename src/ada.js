window.onload = () => {fixMainTabsAndId();fixSharePointSearchBox();fixMegaMenu();};

let a = Array.from(document.getElementsByTagName('a'));
let p = Array.from(document.getElementsByTagName('img'));

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

a.forEach(function(link) {
    link.setAttribute('aria-label', link.innerHTML + " link");
});

p.forEach(function(picture) {
  if(!picture.hasAttribute('alt')) {
    if (picture.closest('div').hasAttribute('id')) {
      picture.setAttribute('alt', picture.closest('div').getAttribute('id'));
    } else if (picture.closest('div').hasAttribute('class')) {
      picture.setAttribute('alt', picture.closest('div').getAttribute('class'));
    }
  }
});