require("@babel/polyfill");
import {getCookieValue} from './getCookieValue.js';

// Variable Declarations
const campusSelector = document.querySelector("#appliesTo");
let campuses = campusSelector.innerHTML;
const navigatorExplorer = document.querySelector("#navigationExplorer");
let cuPicker = document.getElementById("CumberlandCampusSelector");
let glPicker = document.getElementById("GloucesterCampusSelector");
let loginPicker = document.getElementsByClassName("login-intent");
let message = "Remove your preferred campus";
let updater = "Update your preferred campus";
let multiCampus = null;
let threshold = 3;
const expireInDays = 730;
const expireByIP = 0.010416; 
let externalRanges = {'cumberland': /([130]{3}.[156]{3}.[180]{3}.[0-9]{1,3})/g,'gloucester': /([107]{3}.[1]{1,3}.[86]{1,3}.[0-9]{1,3})/g};
let ip_value;

readPreferred(sanitize(campuses));

glPicker.addEventListener("click", function() {
  if (getCookieValue("preferred") === 'gloucester') {
    return createPreferred("none");
  } else if (getCookieValue("preferred") === 'cumberland' || getCookieValue("preferred") === 'none'  || getCookieValue("preferred") === 'undefined') {
    return createPreferred("gloucester");
  } else {
    return createPreferred("gloucester");
  }
});

cuPicker.addEventListener("click", function() {
  if (getCookieValue("preferred") === 'cumberland') {
    return createPreferred("none");
  } else if (getCookieValue("preferred") === 'gloucester' || getCookieValue("preferred") === 'none'  || getCookieValue("preferred") === 'undefined') {
    return createPreferred("cumberland");
  } else {
    return createPreferred("cumberland");
  }
});

Array.from(loginPicker).forEach(function(campus) {
  campus.addEventListener('click', function(e) {
    e.preventDefault();
    createPreferred(campus.dataset.campus, expireInDays);
    return window.location.href = campus.getAttribute('href');
  });
});

// Remove all extraneous characters from campus input
export function sanitize(values) {
  let cleaned = values.replace(/(\r\n|\n|\r)/gm,"").split(' ').join('').toLowerCase();
  return cleaned;
}

// Does the page apply to multiple campuses
export function multipleCampusesChecker(values) {
  if (values.includes(';')) {
    return multiCampus = 1;
  } else {
    return multiCampus = 0;
  }
}

// If a page is campus-specific, check if incrementing cookie exists
export function checkIfExists (campus, isMulti){
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

// Create a new counter for the given campus
export function createCampusCookie(campus) {
  let cookieValue = campus + "=1";
  return document.cookie = cookieValue;
}

// Add to the counter for a user's preference
export function addToCampusCount (campus) {
  let cookie = parseInt(getCookieValue(campus));
  cookie++;
  let date = new Date();
  console.log('new value will be ' + cookie + ' for ' + campus);
  date.setTime(date.getTime()+(expireInDays*24*60*60*1000));
  let expires = "; expires="+date.toGMTString();
  let cookieValue = campus + "=" + cookie + expires + ";path=/";
  console.log(cookieValue);
  return document.cookie = cookieValue;
}

// If the campus count is equal to or greater than the threshold, prompt a user to select, otherwise check the existince and/or increment the count
export function checkThreshold (campus) {
  if (getCookieValue(campus) >= threshold) {
    let toast = toastPopped(campus.charAt(0).toUpperCase() + campus.slice(1));
    return;
  } else {
    checkIfExists(sanitize(campuses), multipleCampusesChecker(sanitize(campuses)));
  }
}

// Check if in editor mode, if so, do nothing; if a preference is set, if so, highlight the preference and redirect if possible; and if a user is on a campus, temporarily set their preference.
export function readPreferred(campus) {
  let preferred = document.cookie.indexOf('preferred');
  let location = document.cookie.indexOf('userTempLocation');
  let editor = window.location.href.indexOf('//manage.');
  if (editor == -1) {
    if (preferred != -1) {
      if(getCookieValue("preferred") === "none") {
        changeLinks("default");
        return;
      } else {
        highlightPreferred();
        changeLinks(getCookieValue("preferred"));
        doesNavigatorActionExist(getCookieValue("preferred"));
      }
    } else {
      checkForValidLocation(campus, location, "userTempLocation");
    }
  } else {
    changeLinks("default");
  }
}

export function preference(preferred, campus) {
  if(preferred){
    createPreferred(campus);
    return;
  } else {
    createPreferred("none");
    return;
  }
}

export function createPreferred(campus, expiry) {
  expiry = expiry || expireInDays;
  let date = new Date();
  date.setTime(date.getTime()+(expiry*24*60*60*1000));
  let expires = "; expires="+date.toGMTString();
  let cookieValue = "preferred=" + campus + expires + ";path=/";
  document.cookie = cookieValue;
  highlightPreferred();
  changeLinks(getCookieValue("preferred"));
  return true;
}

export function doesNavigatorActionExist(preferred) {
  if (navigatorExplorer != null) {
    let navigationAction = "#" + preferred + "NavigatorAction";
    let navigationActionButton = "#" + preferred + "URL";
    let intent = "#" + preferred + "RedirectIntent";
    intent = document.querySelector(intent).innerHTML;
    navigationActionButton = document.querySelector(navigationAction + " " + navigationActionButton + " a");
    let URL = navigationActionButton.href;
    if (URL != null && intent.includes('1')) {
      window.location.replace(URL);
      // return console.log(URL);
    }
  }
}

export function highlightPreferred() {
  if (getCookieValue("preferred") === 'cumberland') {
    cuPicker.classList.add("active");
    cuPicker.setAttribute('title', message);
    glPicker.classList.remove("active");
    glPicker.setAttribute('title', updater);
    return true;
  } else if (getCookieValue("preferred") === 'gloucester') {
    glPicker.classList.add("active");
    glPicker.setAttribute('title', message);
    cuPicker.classList.remove("active");
    cuPicker.setAttribute('title', updater);
    return true;
  } else {
    cuPicker.classList.remove("active");
    cuPicker.setAttribute('title', updater);
    glPicker.classList.remove("active");
    glPicker.setAttribute('title', updater);
    return true;
  }
}

export function detectMaintenance(webpart) {
  if (document.getElementById('maintenanceMenu').length > 0) {

  }
}

export async function getIP() {
  try {
    return await fetch('https://api.ipify.org/?format=json').then(response => response.json()).then(data => ip_value = data.ip);
  } catch (e) {
    let ip_value = null;
    throw e;
  } finally {
    let location = checkForLocationMatch(ip_value, externalRanges);
    if (location !== null) {
      return createLocationTemp(location, expireByIP);
    } else {
      changeLinks("default");
      return checkThreshold(campus);
    }
  }
}

export function checkForLocationMatch(ip, validRanges=externalRanges) {
  try {
    for (const [key, value] of Object.entries(validRanges)) {
      if (value.test(ip)) {
        return key;
      }
    }
  } catch(e) {
    console.log(e);
    return null;
  }
}

export function createLocationTemp(campus, expiry=expireInDays) {
  if (campus !== null) {
    if (campus !== undefined) {
      let date = new Date();
      date.setTime(date.getTime()+(expiry*24*60*60*1000));
      let expires = "; expires="+date.toGMTString();
      let cookieValue = "userTempLocation=" + campus + expires + ";path=/";
      document.cookie = cookieValue;
      return createTempPreference("userTempLocation");
    } else {
      let date = new Date();
      date.setTime(date.getTime()+(expiry*24*60*60*1000));
      let expires = "; expires="+date.toGMTString();
      let cookieValue = "userTempLocation=none" + expires + ";path=/";
      document.cookie = cookieValue;
      return createTempPreference("userTempLocation");
    }
  } else {
    let date = new Date();
    date.setTime(date.getTime()+(expiry*24*60*60*1000));
    let expires = "; expires="+date.toGMTString();
    let cookieValue = "userTempLocation=none" + expires + ";path=/";
    document.cookie = cookieValue;
    return createTempPreference("userTempLocation");
  }
  let date = new Date();
  date.setTime(date.getTime()+(expiry*24*60*60*1000));
  let expires = "; expires="+date.toGMTString();
  let cookieValue = "userTempLocation=none" + expires + ";path=/";
  document.cookie = cookieValue;
  return createTempPreference("userTempLocation");
}

export function checkForValidLocation(campus, location, locationCookieName) {
  if (location != -1 && getCookieValue(locationCookieName) !== "null" && typeof getCookieValue(locationCookieName) !== "undefined") {
    return createTempPreference(locationCookieName);
  } else {
    return getIP();
  }
  changeLinks("default");
  return checkThreshold(campus);
}

export function createTempPreference(locationCookieName) {
  createPreferred(getCookieValue(locationCookieName), expireByIP);
  highlightPreferred();
  let tempPref = getCookieValue("preferred");
  if (tempPref == "default") {
    return changeLinks("default");
  } else {
    return changeLinks(tempPref);
  } 
  return changeLinks("default");
}

export function loginClick(campus) {
  return console.log($(this));
}

export function changeLinks(campus) {
  let portal = document.querySelector('#p-link');
  let quicklinks = document.querySelector('#cu-link');
  let campuspicker = document.querySelector('#campusLogin-link');
  let maintenance = document.querySelector("#dir-active");
  let maintenanceButton = document.querySelector("#d-link");

  if (campus == "cumberland") {
    quicklinks.classList.remove('d-none');
    quicklinks.classList.add('d-block');
    campuspicker.classList.remove('d-block');
    campuspicker.classList.add('d-none');
    if (maintenance) {
      maintenanceButton.classList.remove('d-block');
      maintenanceButton.classList.add('d-none');
    } else {
      portal.classList.remove('d-block');
      portal.classList.add('d-none');
    }
    return true;
  } else if(campus == "gloucester") {
    quicklinks.classList.remove('d-block');
    quicklinks.classList.add('d-none');
    if (maintenance) {
      maintenanceButton.classList.remove('d-none');
      maintenanceButton.classList.add('d-block');
    } else {
      portal.classList.remove('d-none');
      portal.classList.add('d-block');
    }
    campuspicker.classList.remove('d-block');
    campuspicker.classList.add('d-none');
    return true;
  } else if(campus == "default" || campus == "none"){
    let campusLogins = document.getElementById('qlCampusPicker');
    let campusButton = document.getElementById('campusLogin-link');
    campusLogins.classList.remove('d-none');
    campusButton.classList.remove('d-none');
    quicklinks.classList.remove('d-block');
    quicklinks.classList.add('d-none');
    portal.classList.remove('d-block');
    portal.classList.add('d-none');
    if (maintenance) {maintenanceButton.classList.add('d-none');}
    return true;
  }
}

export function swapLogo() {
}

export function toastPopped(campus) {
  toastr['info']('<p>Would you like to set ' + campus + ' as your preferred campus?<br/><b><a href="/CampusDefault" target="_blank">(You can change this at any time.)</a></b></p><div class="button-container"><button type="button" id="setPreferred" onclick="preference(true, \'' + sanitize(campus) + '\')" class="btn btn-primary">Set Preferred</button><button type="button" id="noPreferred" class="btn" onclick="preference(false)" style="margin: 0 8px 0 8px">No Thanks</button></div>');
}

