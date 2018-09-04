$(document).ready(function() {
  if (window.location.href.indexOf("www-dev.") > -1 || window.location.href.indexOf("www.") > -1) {
      $('link[rel=stylesheet][href*="corev15"]').remove();
  }
});
