jQuery(document).ready(function() {
  $("#subsite-navigation").children('.subsite-navigation__top').children('a').on('click', function(event){
      event.preventDefault();
      var selected = $(this);
      if( selected.next('.subsite-navigation__drop').hasClass('d-none') ) {
        selected.addClass('selected').next('.subsite-navigation__drop').removeClass('d-none').attr('aria-expanded', 'true');
      } else {
        selected.removeClass('selected').next('.subsite-navigation__drop').addClass('d-none').attr('aria-expanded', 'false');
      }
  });
}); 