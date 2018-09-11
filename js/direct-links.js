jQuery(document).ready(function() {
  var $direct = "Direct Links";

  if($("#d-links ul").length > 0 ) {  
    $("#d-links").css("left", -25); 
    $("#dir-active").text($direct);
    $(".essentials li:contains(Portal)").text($direct).addClass("iconer");
    
    var myTimeout;
    $("#binder").on('mouseenter', function(){
      myTimeout = setTimeout(function () {
        $("#d-links").show(10);
        $(".link-to-portal").css("opacity", 1); 
      }, 200);
    }).mouseleave(function () { 
      $('#d-links').hide(50); 
      clearTimeout(myTimeout);
    });
  }
});