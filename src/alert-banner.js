import {getCookieValue} from './getCookieValue.js';
import {setCookieValue} from './setCookieValue.js';

$(document).ready(function () {
  if($(".alert-box").length > 0){
    $("#alerts").css({
      display: 'block',
    });
  }
  
  $('.alert-box').attr('id', function(i) {
     return 'alert'+(i+1);
  });

  $('.alert-switch').on('click', function (event) {
      event.preventDefault();
      var currAlert = $('.alert-box:visible');
      var nextAlert = currAlert.next();
      if (nextAlert.length === 0) {
        nextAlert = currAlert.siblings(':first');
      }
      currAlert.hide();
      nextAlert.show();
  });

$(".alert-right-arrow, .alert-count").on('click', function () {
  if ($(".alert-box:visible").next().length !== 0){
    $(".alert-box:visible").next().show().prev().hide();
  } else {
    $(".alert-box:visible").hide();
    $(".alert-box:first").show();
  }
  return false;
});

$(".alert-left-arrow").on('click', function () {
  if ($(".alert-box:visible").prev().length != 0) {
    if ($(".alert-box:first").is(":visible")) {
      $(".alert-box:last").show();
      $(".alert-box:first").hide();
    } else {
      $(".alert-box:visible").hide().prev().show();
    }
  } else {
    $(".alert-box:visible").hide();
    $(".alert-box:first").show();
  }

  return false;
});
  
  function hideAllButFirst(){
    $(".alert-box").each(function (e) {
      if (e !== 0) $(this).hide();
    });
  }

  function hideNavIfOne(){
    $('.alert-box').length === 1 && $('.alert-navigator').css({
      display: 'none'
    });
    if ($('.alert-box').length === 1) {
      $('.alert-box:first').show();
    }
  }

  function countAlerts(){
    var n = $(".alert-box").length;
    $(".alert-count").text("" + n + " Alerts");
  }
  countAlerts();
  hideAllButFirst();
  hideNavIfOne();
  function closeBox(){  
    var closeBox = $('#alert1').remove();
    setCookieValue('closeBox', "true", 365);
    getCookieValue('closeBox');
    countAlerts();
    hideNavIfOne();
    if ($("#alert2").length > 0) {
      $(".alert-box:first").show();
    }
  }
  if(getCookieValue('closeBox') === "true"){
    hideAllButFirst();
    closeBox();
  }
  $('#alert1 .alert-switch').one('click', function () {
    closeBox();
  });    
  function closeBox2(){     
    var closeBox2 = $('#alert2').remove();
    setCookieValue('Box2-closed', "true", 1);
    getCookieValue('Box2-closed');
    countAlerts();
    hideNavIfOne();
  }
  if(getCookieValue('Box2-closed') === "true") {
    hideAllButFirst();
    closeBox2();
  }
  $('#alert2 .alert-switch').one('click', function () {
    closeBox2();
  });
  function closeBox3(){     
    var closeBox3 = $('#alert3').remove();
    setCookieValue('Box3-closed', "true", 1);
    getCookieValue('Box3-closed');
    countAlerts();
    hideNavIfOne();    
  }
  if(getCookieValue('Box3-closed') === "true") {
    hideAllButFirst();
    closeBox3();
  }
  $('#alert3 .alert-switch').one('click', function () {
    closeBox3();
  });
});
