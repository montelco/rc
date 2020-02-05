import { sanitize } from './preferred.js';
import { preference } from './preferred.js';
import { getCookieValue } from './getCookieValue.js';

const campusSelector = document.querySelector("#appliesTo");
let campuses = campusSelector.innerHTML;
let campus = sanitize(campuses);

toastr.options = {
  "onShown": function () {let setPref = document.getElementById("setPreferred");let noPref = document.getElementById("noPreferred");setPref.addEventListener("click", function () { preference(true, sanitize(campus)); }); noPref.addEventListener("click", function () { preference(false); }); },
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