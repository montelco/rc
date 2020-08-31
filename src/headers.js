export function anchorTags(parameters) {
  let selectors = parameters.selectors || "h1,h2,h3,h4,h5,h6";
  selectors = document.querySelector(parameters.scope).querySelectorAll(selectors);
  selectors.forEach((el, i) => {
    el.id = `h-${el.tagName}_${i}`;
  });
}

anchorTags({
  selectors: "h1,h2,h3,h4,h5,h6",
  scope: "body", 
});