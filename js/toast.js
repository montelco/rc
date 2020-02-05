toastr.options = {
  "onShown": function () {setPref.addEventListener("click", function () {preference(true, sanitize(campus));});noPref.addEventListener("click", function () {preference(false);});},
  "closeButton": true,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-center",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "250",
  "hideDuration": "1000",
  "timeOut": "0",
  "extendedTimeOut": "0",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "slideDown",
  "hideMethod": "slideUp"
}