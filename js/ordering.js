jQuery(document).ready(function($) {

  var shouldSort = [ 
   { '#Calendar .card__body a': '#Calendar .card__body' },
   { '.tp-banner-container ul li': '.tp-banner-container ul' },
   { '#Highlights .row.mb-32 col-md-4': '#Highlights .row.mb-32' }
  ];

  $.each(shouldSort, function() {
    $.each(this, function(name, value) {
      $(name).sort(dataOrdering).appendTo(value);
    });
  });

  function dataOrdering(a, b){
    return ($(b).data('order')) < ($(a).data('order')) ? 1 : -1;    
  } 
});