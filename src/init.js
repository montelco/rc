var styles = ["one", "two", "three","four", "five", "six","seven", "eight", "nine","ten"];
var index = 0;
$(".article").find(".marker").each(function() {
    $(this).addClass(styles[index++]);
    if (index >= styles.length) index = 0;
});

$(function() {
// Arcodion control
$(".arcordion label").on("click", function () {    
if($(this).siblings("input").is(":checked")) { 
$(this).siblings("input").attr("checked", false);
$(this).siblings(".acordion-content").toggleClass("dormatAcordion");
} else {
$(this).siblings("input").attr("checked", true);
$(this).siblings(".acordion-content").removeClass("dormatAcordion");
}
});

$(".arcordion").each(function () {
  $(this).find("input").attr("name", "tabs"); 
  });
  $('.arcordion label').attr('for', function(i) {
     return 'tab'+(i+1);
  });
  $('.arcordion input').attr('id', function(i) {
     return 'tab'+(i+1);
  });
 // To select first arcodion 
  $(this).find("#tab1").attr("checked", true); 
});