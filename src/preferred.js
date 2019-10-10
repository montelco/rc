require("@babel/polyfill");
// Variable Declarations
// Look for checkbox area for campuses
const campusSelector = document.querySelector("#appliesTo");
// Campus value of current page
let campuses = campusSelector.innerHTML;
// Locate element which contains redirect URLs
const navigatorExplorer = document.querySelector("#navigationExplorer");
// Does it apply to mulitple campuses
let multiCampus = null;
// Threshold before prompt to choose a preference
let threshold = 3;
// Preference cookie duration (default: 2 years)
const expireInDays = 730;
// How long between location checks for users with no preference
const expireByIP = 0.010416; 
// Array containing campus names and IP ranges
let externalRanges = {'cumberland': /([130]{3}.[156]{3}.[180]{3}.[0-9]{1,3})/g,'gloucester': /([107]{3}.[1]{1,3}.[86]{1,3}.[0-9]{1,3})/g};
// Setting empty variable to use
let ip_value;

// Start Program
// Begin by taking the value, sanitizing, and comparing to campus prefernce values
readPreferred(sanitize(campuses));

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
  let cuPicker = document.getElementById("CumberlandCampusSelector");
  let glPicker = document.getElementById("GloucesterCampusSelector");
  let message = "Remove your preferred campus";
  let remover = 'preferred.createPreferred("none")';

  if (getCookieValue("preferred") === 'cumberland') {
    cuPicker.classList.add("active");
    cuPicker.setAttribute('title', message);
    cuPicker.setAttribute('onclick', remover);

    glPicker.classList.remove("active");
    glPicker.setAttribute('title', "Update your preferred campus");
    glPicker.setAttribute('onclick', 'preferred.createPreferred("gloucester")');
    return true;
  } else if (getCookieValue("preferred") === 'gloucester') {
    glPicker.classList.add("active");
    glPicker.setAttribute('title', message);
    glPicker.setAttribute('onclick', remover);

    cuPicker.classList.remove("active");
    cuPicker.setAttribute('title', "Update your preferred campus");
    cuPicker.setAttribute('onclick', 'preferred.createPreferred("cumberland")');
    return true;
  } else {
    cuPicker.classList.remove("active");
    cuPicker.setAttribute('title', "Update your preferred campus");
    cuPicker.setAttribute('onclick', 'preferred.createPreferred("cumberland")');

    glPicker.classList.remove("active");
    glPicker.setAttribute('title', "Update your preferred campus");
    glPicker.setAttribute('onclick', 'preferred.createPreferred("gloucester")');
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
    return false;
  }
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
  changeLinks(getCookieValue("preferred"));
  return true;
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
  } else if(campus == "default"){
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

