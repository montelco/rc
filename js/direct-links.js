jQuery(document).ready(function() {

  if($("#dir-active").length > 0 ) {
    var button = $("#d-link");
    button.show();
    $('#p-link').remove();

    var contents = $("#dir-active");
    contents.detach();
    contents.insertAfter('#dl-end');

    var myTimeout;
    $("#d-link").on('click', function(){
      $("#dir-active").toggle(10);
    });
  }
  if (!$("#dir-active").length > 0) {
    $('#frame-links').hide();
    var button = $("#p-link");
    button.show();
  }
});