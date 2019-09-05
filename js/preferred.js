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
function sanitize(values) {
  let cleaned = values.replace(/(\r\n|\n|\r)/gm,"").split(' ').join('').toLowerCase();
  return cleaned;
}

// Does the page apply to multiple campuses
function multipleCampusesChecker(values) {
  if (values.includes(';')) {
    return multiCampus = 1;
  } else {
    return multiCampus = 0;
  }
}

// If a page is campus-specific, check if incrementing cookie exists
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

// Create a new counter for the given campus
function createCampusCookie(campus) {
  let cookieValue = campus + "=1";
  return document.cookie = cookieValue;
}

// Add to the counter for a user's preference
function addToCampusCount (campus) {
  let cookie = parseInt(getCookieValue(campus));
  cookie++;
  let date = new Date();
  console.log('new value will be ' + cookie + ' for ' + campus);
  date.setTime(date.getTime()+(expireInDays*24*60*60*1000));
  expires = "; expires="+date.toGMTString();
  let cookieValue = campus + "=" + cookie + expires + ";path=/";
  console.log(cookieValue);
  return document.cookie = cookieValue;
}

// Select a cookie and return its value to a function
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

// If the campus count is equal to or greater than the threshold, prompt a user to select, otherwise check the existince and/or increment the count
function checkThreshold (campus) {
  if (getCookieValue(campus) >= threshold) {
    let toast = toastPopped(campus.charAt(0).toUpperCase() + campus.slice(1));
    return;
  } else {
    checkIfExists(sanitize(campuses), multipleCampusesChecker(sanitize(campuses)));
  }
}

// Check if in editor mode, if so, do nothing; if a preference is set, if so, highlight the preference and redirect if possible; and if a user is on a campus, temporarily set their preference.
function readPreferred(campus) {
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

function preference(preferred, campus) {
  if(preferred){
    createPreferred(campus);
    return;
  } else {
    createPreferred("none");
    return;
  }
}

function createPreferred(campus, expiry) {
  expiry = expiry || expireInDays;
  let date = new Date();
  date.setTime(date.getTime()+(expiry*24*60*60*1000));
  expires = "; expires="+date.toGMTString();
  let cookieValue = "preferred=" + campus + expires + ";path=/";
  document.cookie = cookieValue;
  highlightPreferred();
  changeLinks(getCookieValue("preferred"));
  return true;
}

function doesNavigatorActionExist(preferred) {
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

function highlightPreferred() {
  let cuPicker = document.getElementById("CumberlandCampusSelector");
  let glPicker = document.getElementById("GloucesterCampusSelector");
  let message = "Remove your preferred campus";
  let remover = 'createPreferred("none")';

  if (getCookieValue("preferred") === 'cumberland') {
    cuPicker.classList.add("active");
    cuPicker.setAttribute('title', message);
    cuPicker.setAttribute('onclick', remover);

    glPicker.classList.remove("active");
    glPicker.setAttribute('title', "Update your preferred campus");
    glPicker.setAttribute('onclick', 'createPreferred("gloucester")');
    return true;
  } else if (getCookieValue("preferred") === 'gloucester') {
    glPicker.classList.add("active");
    glPicker.setAttribute('title', message);
    glPicker.setAttribute('onclick', remover);

    cuPicker.classList.remove("active");
    cuPicker.setAttribute('title', "Update your preferred campus");
    cuPicker.setAttribute('onclick', 'createPreferred("cumberland")');
    return true;
  } else {
    cuPicker.classList.remove("active");
    cuPicker.setAttribute('title', "Update your preferred campus");
    cuPicker.setAttribute('onclick', 'createPreferred("cumberland")');

    glPicker.classList.remove("active");
    glPicker.setAttribute('title', "Update your preferred campus");
    glPicker.setAttribute('onclick', 'createPreferred("gloucester")');
  }
}

function detectMaintenance(webpart) {
  if (document.getElementById('maintenanceMenu').length > 0) {

  }
}

async function getIP() {
  try {
    return await fetch('https://api.ipify.org/?format=json').then(response => response.json()).then(data => ip_value = data.ip);
  } catch (e) {
    ip_value = null;
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

function checkForLocationMatch(ip, validRanges=externalRanges) {
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

function createLocationTemp(campus, expiry=expireInDays) {
  if (campus !== null ) {
    let date = new Date();
    date.setTime(date.getTime()+(expiry*24*60*60*1000));
    expires = "; expires="+date.toGMTString();
    let cookieValue = "userTempLocation=" + campus + expires + ";path=/";
    document.cookie = cookieValue;
    return createTempPreference("userTempLocation");
  } else {
    return false;
  }
}

function checkForValidLocation(campus, location, locationCookieName) {
  console.log('Checking location...');
  if (location != -1 && getCookieValue(locationCookieName) !== "null" && typeof getCookieValue(locationCookieName) !== "undefined") {
    console.log('Creating the cookie...');
    return createTempPreference(locationCookieName);
  } else {
    return getIP();
  }
  changeLinks("default");
  return checkThreshold(campus);
}

function createTempPreference(locationCookieName) {
  createPreferred(getCookieValue(locationCookieName), expireByIP);
  highlightPreferred();
  changeLinks(getCookieValue("preferred"));
  return true;
}

function loginClick(campus) {
  return console.log($(this));
}

function changeLinks(campus) {
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

function swapLogo() {
}

function toastPopped(campus) {
  toastr['info']('<p>Would you like to set ' + campus + ' as your preferred campus?<br/><b><a href="/CampusDefault" target="_blank">(You can change this at any time.)</a></b></p><div class="button-container"><button type="button" id="setPreferred" onclick="preference(true, \'' + sanitize(campus) + '\')" class="btn btn-primary">Set Preferred</button><button type="button" id="noPreferred" class="btn" onclick="preference(false)" style="margin: 0 8px 0 8px">No Thanks</button></div>');
}

