document.addEventListener("DOMContentLoaded", function (event) {

  let acc = document.getElementsByClassName("accordion");
  let panel = document.getElementsByClassName('panel');
  let touchmoved = false;

  for (let i = 0; i < acc.length; i++) {

    acc[i].setAttribute("tabindex", 0);

    acc[i].addEventListener('click', function (event) {
      return expand(this);
    });
    
    acc[i].addEventListener('keydown', function (event) {
      if (event.key === "Enter" || event.key === "Tab") {
        expand(this);
        return;
      }
    });
  }

  function expand(open) {
    let setClasses = !open.classList.contains('active');
    setClass(acc, 'active', 'remove');
    setClass(panel, 'show', 'remove');

    if (setClasses) {
      open.classList.toggle("active");
      open.nextElementSibling.classList.toggle("show");
    }
  }

  function setClass(els, className, fnName) {
    for (var i = 0; i < els.length; i++) {
      els[i].classList[fnName](className);
    }
  }

});