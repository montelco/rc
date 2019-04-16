const campusSelector = document.querySelector("#appliesTo");
let campuses = campusSelector.innerHTML;


const navigatorExplorer = document.querySelector("#navigationExplorer");

let multiCampus = null;
let threshold = 7;

document.addEventListener("DOMContentLoaded", function() {
  readPreferred(sanitize(campuses));
});

function sanitize(values) {
  let cleaned = values.replace(/(\r\n|\n|\r)/gm,"").split(' ').join('').toLowerCase();
  return cleaned;
}

function multipleCampusesChecker(values) {
  if (values.includes(';')) {
    return multiCampus = 1;
  } else {
    return multiCampus = 0;
  }
}

function checkIfExists (campus, isMulti){
  if (!isMulti) {
    let check = document.cookie.indexOf(campus);
    if (check != -1) {
      return addToCampusCount(campus);
    } else {
      return createCampusCookie(campus);
    }
  } else {
    return "";
  }
}

function createCampusCookie(campus) {
  let cookieValue = campus + "=1";
  return document.cookie = cookieValue;
}

function addToCampusCount (campus) {
  let cookie = parseInt(getCookieValue(campus));
  cookie++;
  let newCookieValue = campus + "=" + cookie;

  return document.cookie = newCookieValue;
}

function getCookieValue(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkThreshold (campus) {
  if (getCookieValue(campus) >= threshold) {
    let isPreferred = confirm("You've gone to several " + campus.charAt(0).toUpperCase() + campus.slice(1) + " pages. Would you like to set it as your preferred campus? (You can always change this later.)");
    if (isPreferred) {
      return createPreferred(campus);
    } else {
      return document.cookie = "preferred=none";
    }
  } else {
    checkIfExists(sanitize(campuses), multipleCampusesChecker(sanitize(campuses)));
  }
}

function readPreferred(campus) {
  let preferred = document.cookie.indexOf('preferred');
  if (preferred != -1) {
    if(getCookieValue("preferred") === "none") {
      return;
    } else {
      doesNavigatorActionExist(getCookieValue("preferred"));
    }
  } else {
    return checkThreshold(campus);
  }
}

function createPreferred(campus) {
  let cookieValue = "preferred=" + campus;
  return document.cookie = cookieValue;
}

function doesNavigatorActionExist(preferred) {
  if (navigatorExplorer != null) {
    let navigationAction = "#" + preferred + "NavigatorAction";
    let navigationActionButton = document.querySelector(navigationAction);
    if (navigationActionButton != null) {
      let URL = navigationActionButton.href;
      window.location.replace(URL);
    }
  }
}
