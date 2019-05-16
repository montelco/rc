const campusSelector = document.querySelector("#appliesTo");
let campuses = campusSelector.innerHTML;
const navigatorExplorer = document.querySelector("#navigationExplorer");
let multiCampus = null;
let threshold = 7;
const expireInDays = 730;
let maintenance = document.querySelector('#dir-active');

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
    let toast = toastPopped(campus.charAt(0).toUpperCase() + campus.slice(1));

    // if (isPreferred) {
    //   return createPreferred(campus);
    // } else {
    //   return document.cookie = "preferred=none";
    // }
  } else {
    checkIfExists(sanitize(campuses), multipleCampusesChecker(sanitize(campuses)));
  }
}

function toastPopped(campus) {
  toastr['info']('<p>You\'ve gone to several ' + campus + ' pages. Would you like to set it as your preferred campus. (You can change this at any time.)</p><div><button type="button" id="setPreferred" class="btn btn-primary">Set Preferred</button><button type="button" id="noPreferred" class="btn" style="margin: 0 8px 0 8px">No Thanks</button></div>');
}

function readPreferred(campus) {
  let preferred = document.cookie.indexOf('preferred');
  let editor = window.location.href.indexOf('//manage.');
  if (editor == -1) {
    if (preferred != -1) {
      if(getCookieValue("preferred") === "none") {
        return;
      } else {
        highlightPreferred();
        swapLogo();
        changeLink();
        doesNavigatorActionExist(getCookieValue("preferred"));
      }
    } else {
      return checkThreshold(campus);
    }
  }
}

function createPreferred(campus) {
  let date = new Date();
  date.setTime(date.getTime()+(expireInDays*24*60*60*1000));
  expires = "; expires="+date.toGMTString();
  let cookieValue = "preferred=" + campus + expires + ";path=/";
  document.cookie = cookieValue;
  return highlightPreferred();
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

function highlightPreferred() {
  let cuPicker = document.getElementById("CumberlandCampusSelector");
  let cuQuickLinks = document.getElementsByClassName('qlCumberlandCampus');
  let glPicker = document.getElementById("GloucesterCampusSelector");
  console.log(cuQuickLinks);
  if (getCookieValue("preferred") === 'cumberland') {
    cuPicker.classList.add("yellow", "textBlack", "last", "pd-sm");
    glPicker.classList = '';
    cuQuickLinks.setAttribute('id', 'dir-active');
    cuQuickLinks.classList.remove('d-none');
    return;
  } else if (getCookieValue("preferred") === 'gloucester') {
    glPicker.classList.add("yellow", "textBlack", "last", "pd-sm");
    cuPicker.classList = '';
    return;
  }
}

function changeCampusLogins() {

}

function swapLogo() {
  let logo = document.getElementById("rowanSJLogo");
  if (getCookieValue("preferred") === 'cumberland') {
    logo.src = '/Style%20Library/logo-wbg-cu.png';
  } else if (getCookieValue("preferred") === 'gloucester') {
    logo.src = '/Style%20Library/logo-wbg-gl.png';
  } else {
    logo.src = '/Style%20Library/logo-wbg.png';
  }
}
