$(document).ready(function() {
  if (window.location.href.indexOf("www-dev.") > -1 || window.location.href.indexOf("www.") > -1) {
      $('link[rel=stylesheet][href*="corev15"]').remove();
      $('div#appliesTo').addClass('d-none');
      $('div#gloucesterRedirectIntent').addClass('d-none');
      $('div#cumberlandRedirectIntent').addClass('d-none');
  }
  if (window.location.href.indexOf("manage-dev.") > -1 || window.location.href.indexOf("manage.") > -1) {
      $('script[src="/SiteAssets/js/preferred.js"]').remove();
  }
  
});
