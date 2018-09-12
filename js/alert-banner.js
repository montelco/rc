$(document).ready(function () {
  if($(".alert-box").length > 0){
    $("#alerts").css({
      display: 'block',
    });
  }
  $(".alert-box").each(function (e) {
    if (e !== 0) $(this).hide();
  });
  $('.alert-box').attr('id', function(i) {
     return 'alert'+(i+1);
  });
  function closeBox(){  
    var closeBox = $('#alert1').remove();
    $.cookie('closeBox', "true", {
    path: '/'});
    $.cookie('closeBox');
  }
  if($.cookie('closeBox') === "true"){
    console.log('Closed the alert box automatically...');
    closeBox();
  }
  $('#alert1 .alert-switch').click(function () {
    console.log('Closed the alert box manually');
    closeBox();
  });    
  function closeBox2(){     
    var closeBox2 = $('#alert2').remove();
    $.cookie('closeBox2', "true", {
    path: '/'});
    $.cookie('closeBox2');
  }
  if($.cookie('closeBox2') === "true") {
    console.log('Closed the alert box automatically...');
    closeBox2();
  }
  $('#alert2 .alert-switch').click(function () {
    console.log('Closed the alert box manually');
    closeBox2();
  });
  function closeBox3(){     
    var closeBox3 = $('#alert3').remove();
    $.cookie('Box3-closed', "true", {
    path: '/'});
    $.cookie('closeBox3');    
  }
  if($.cookie('closeBox3') === "true") {
    console.log('Closed the alert box automatically...');
    closeBox3();
  }
  $('#alert3 .alert-switch').click(function () {
    console.log('Closed the alert box manually');
    closeBox3();
  });
  $(function () {
      var timer = function () {
          if ($(".alert-box:visible").next().length !== 0) $(".alert-box:visible").next().show().prev().hide();
          else {
            $(".alert-box:visible").hide();
            $(".alert-box:first").show();
          }
      };
      var timerID = null;
      if ($('.alert-box').length > 1) {
        timerID = setInterval(timer, 10000);
      }
      $('.alert-box').hover(function (ev) {
          clearInterval(timerID);
      }, function (ev) {
          timerID = setInterval(timer, 10000);
      });
  });
  var n = $(".alert-box").length;
  $(".alert-count").text("" + n + " Alerts");
  $('.alert-box').length < 2 && $('.alert-right-arrow .fa, .alert-left-arrow .fa, .alert-count').css({
      display: 'none'
  });
});

$('.alert-switch').click(function (event) {
      event.preventDefault();
      var currAlert = $('.alert-box:visible');
      var nextAlert = currAlert.next();
      if (nextAlert.length === 0) {
        nextAlert = currAlert.siblings(':first');
      }
      currAlert.hide();
      nextAlert.show();
  });

$(".alert-right-arrow, .alert-count").click(function () {
  if ($(".alert-box:visible").next().length !== 0){
    $(".alert-box:visible").next().show().prev().hide();
  } else {
    $(".alert-box:visible").hide();
    $(".alert-box:first").show();
  }
  return false;
});
$(".alert-left-arrow").click(function () {
  if ($(".alert-box:visible").prev().length != 0) $(".alert-box").next().show().prev().hide();
  else {
    $(".alert-box:visible").hide();
    $(".alert-box:first").show();
  }
  return false;
});