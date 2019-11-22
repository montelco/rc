window.onload = () => {fixMainTabsAndId();fixSharePointSearchBox();};

let a = Array.from(document.getElementsByTagName('a'));
let p = Array.from(document.getElementsByTagName('img'));

function fixMainTabsAndId() {
  let main = document.querySelector("main");
  main.setAttribute('tabindex', '-1');
  main.setAttribute('id', 'main');
  return true;
}

function fixSharePointSearchBox() {
  let searchbox = document.querySelector("#SearchBox input");
  let replacement = "<label for='" + searchbox.getAttribute('id') + "' class='sr-only'>Search: </label>";
  searchbox.removeAttribute('accesskey');
  searchbox.setAttribute('aria-label', 'Search');
  searchbox.setAttribute('name', 'search');
  searchbox.insertAdjacentHTML('beforebegin', replacement);
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

// p.forEach(function(picture) {
//   if(!picture.hasAttribute('alt')) {
//     if (picture.closest('div').hasAttribute('id')) {
//       picture.setAttribute('alt', picture.closest('div').getAttribute('id'));
//     } else if (picture.closest('div').hasAttribute('class')) {
//       picture.setAttribute('alt', picture.closest('div').getAttribute('class'));
//     }
//   }
// });