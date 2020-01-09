import { getCookieValue } from './getCookieValue.js';

jQuery(document).ready(function() {
  if ($("#dir-active").length > 0 && $('#p-link').length > 0 && getCookieValue('preferred') === "gloucester") {
    var button = $("#d-link");
    button.show();
    $('#p-link').remove();
    console.log('in maintenance mode');
    var contents = $("#dir-active");
    contents.detach();
    contents.insertAfter('#dl-end');
  } else if ($("#dir-active").length > 0 && $('#p-link').length > 0 && getCookieValue('preferred') === "none"){
    $('#p-link').remove();
    console.log('in maintenance mode and no preference');
    var contents = $("#dir-active");
    contents.detach();
    contents.insertAfter('#dl-end');
  } else if ($("#dir-active").length > 0 && $('#p-link').length > 0) {
    $('#p-link').remove();
    console.log('in maintenance mode and not set');
    var contents = $("#dir-active");
    contents.detach();
    contents.insertAfter('#dl-end');
  }

  if (!$("#dir-active").length > 0) {
    $('#frame-links').hide();
    var button = $("#p-link");
    button.show();
    console.log('not in maintenance mode');
  }

  var picker = $("#qlCampusPicker");
  picker.detach();
  picker.insertBefore('#cl-end');

  var cumberland = $("#qlCumberlandCampus");
  cumberland.detach();
  cumberland.insertAfter('#cuql-end');

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
  $("#qlCumberlandCampus li a").on('click', function(e){
    e.preventDefault();
    return window.location.href = $(this).attr('href');
  });
  $("#d-link li a").on('click', function(e){
    e.preventDefault();
    return window.location.href = $(this).attr('href');
  });
});