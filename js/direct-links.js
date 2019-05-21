jQuery(document).ready(function() {

  if($("#dir-active").length > 0 ) {
    var button = $("#d-link");
    button.show();
    $('#p-link').remove();

    var contents = $("#dir-active");
    contents.detach();
    contents.insertAfter('#dl-end');
  }

  if (!$("#dir-active").length > 0) {
    $('#frame-links').hide();
    var button = $("#p-link");
    button.show();
  }

  var contents = $("#qlCampusPicker");
  contents.detach();
  contents.insertAfter('#cl-end');

  var contents = $("#qlCumberlandCampus");
  contents.detach();
  contents.insertAfter('#cuql-end');

  var myTimeout;
  $(".login-action").on('click', function(e){
    if ($(this).hasClass('no-menu')) {
      return;
    } else {
      e.preventDefault();
      $(this).children(".dropdown-menu").toggle(1);
      $(this).toggleClass('brb-none');
      $(this).children(".dropdown-menu").toggleClass('brt-none');
    }
  });

  $(".login-intent").on('click', function(e){
    e.preventDefault();
    createPreferred($(this).data('campus'))
    return window.location.href = $(this).attr('href');
  });
});