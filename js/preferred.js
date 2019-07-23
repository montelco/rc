const campusSelector = document.querySelector("#appliesTo");
let campuses = campusSelector.innerHTML;
const navigatorExplorer = document.querySelector("#navigationExplorer");
let multiCampus = null;
let threshold = 3;
const expireInDays = 730;

document.addEventListener("DOMContentLoaded", function() {
  // readPreferred(sanitize(campuses));
});

readPreferred(sanitize(campuses));

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
  let date = new Date();
  console.log('new value will be ' + cookie + ' for ' + campus);
  date.setTime(date.getTime()+(expireInDays*24*60*60*1000));
  expires = "; expires="+date.toGMTString();
  let cookieValue = campus + "=" + cookie + expires + ";path=/";
  console.log(cookieValue);
  return document.cookie = cookieValue;
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
    return;
  } else {
    checkIfExists(sanitize(campuses), multipleCampusesChecker(sanitize(campuses)));
  }
}

function readPreferred(campus) {
  let preferred = document.cookie.indexOf('preferred');
  let editor = window.location.href.indexOf('//manage.');
  detectLocation();
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
      changeLinks("default");
      return checkThreshold(campus);
    }
  } else {
    changeLinks("default");
  }
}

function preference(preferred, campus) {
  if(preferred){
    console.log('making preferred for' + campus);
    createPreferred(campus);
    return;
  } else {
    createPreferred("none");
    return;
  }
}

function createPreferred(campus) {
  let date = new Date();
  date.setTime(date.getTime()+(expireInDays*24*60*60*1000));
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
  // console.log(cuQuickLinks);
  swapLogo();
  if (getCookieValue("preferred") === 'cumberland') {
    cuPicker.classList.add("active");
    cuPicker.setAttribute('title', message);
    cuPicker.setAttribute('onclick', remover);
    glPicker.classList.remove("active");
    return true;
  } else if (getCookieValue("preferred") === 'gloucester') {
    glPicker.classList.add("active");
    glPicker.setAttribute('title', message);
    glPicker.setAttribute('onclick', remover);
    cuPicker.classList.remove("active");
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

function getInternalIp() {
  window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
  var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
  pc.createDataChannel('');//create a bogus data channel
  pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
  pc.onicecandidate = function(ice)
  {
   if (ice && ice.candidate && ice.candidate.candidate)
   {
    var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
    return console.log(myIP);
    pc.onicecandidate = noop;
   }
  };
}

function detectLocation() {
  // getInternalIp();
}

function loginClick(campus) {
  return console.log($(this));
  // createPreferred(campus);
  // window.location.replace(action);
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
    portal.classList.remove('d-block');
    portal.classList.add('d-none');
    campuspicker.classList.remove('d-block');
    campuspicker.classList.add('d-none');
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
    return true;
  }
}

function swapLogo() {
  // let logo = document.getElementById("rowanSJLogo");
  // if (getCookieValue("preferred") === 'cumberland') {
  //   logo.src = '/Style%20Library/logo-wbg-cu.png';
  // } else if (getCookieValue("preferred") === 'gloucester') {
  //   logo.src = '/Style%20Library/logo-wbg-gl.png';
  // } else {
  //   logo.src = '/Style%20Library/logo-wbg.png';
  // }
}

function toastPopped(campus) {
  toastr['info']('<p>Would you like to set ' + campus + ' as your preferred campus?<br/><b>(You can change this at any time.)</b></p><div class="button-container"><button type="button" id="setPreferred" onclick="preference(true, \'' + sanitize(campus) + '\')" class="btn btn-primary">Set Preferred</button><button type="button" id="noPreferred" class="btn" onclick="preference(false)" style="margin: 0 8px 0 8px">No Thanks</button></div>');
}

