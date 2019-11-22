import {isMobile} from './isMobile.js';

let header = document.getElementsByTagName('header');
let search = document.querySelector('div.can-hide');
let toggle = document.querySelector('a.cd-search-trigger');
let spFrame = document.querySelector('#s4-workspace');
let isUsingMobile = new isMobile();
let lastScrollTop = 0;
let lastScrollTopA = 0;
let hasScrolledPage = false;
document.body.addEventListener('scroll', stickyHeader(), false);
document.body.addEventListener('touchmove', stickyHeader(), false);
spFrame.addEventListener('touchmove', stickyHeader(), false);

function stickyHeader() {
  if (isUsingMobile) {
    if(!hasScrolledPage){
      window.addEventListener('scroll', scrollFromTop());
      window.addEventListener('touchmove', scrollFromTopTouch());
      spFrame.addEventListener('touchmove', scrollFromTopTouch());
      let iev=0;
      let ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
      let trident = !!navigator.userAgent.match(/Trident\/7.0/);
      let rv=navigator.userAgent.indexOf("rv:11.0");

      if (ieold) iev=new Number(RegExp.$1);
      if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
      if (trident&&rv!=-1) iev=11;

      if(typeof InstallTrigger !== 'undefined' || iev == 11) {
        window.addEventListener('scroll', scrollFromTop());
      } else {
        document.body.addEventListener('mousewheel', function(e){
          if(e.originalEvent.wheelDelta < 0  && !hasScrolledPage) {
            search.classList.add('d-mm-none');
            toggle.classList.remove('d-mm-none');
            hasScrolledPage = true;
          }
        });
      }
    } 
  }
}

function scrollFromTop() {
  if(pageYOffset > 0  && !hasScrolledPage) {
    search.classList.add('d-mm-none');
    toggle.classList.remove('d-mm-none');
    hasScrolledPage = true;
  }
}

function scrollFromTopTouch() {
  console.log("Touch event occured!");
  if(pageYOffset > 0  && !hasScrolledPage) {
    search.classList.add('d-mm-none');
    toggle.classList.remove('d-mm-none');
    hasScrolledPage = true;
  }
}

stickyHeader();