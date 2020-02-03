import {getCookieValue} from './getCookieValue.js';
import {setCookieValue} from './setCookieValue.js';

const video = document.getElementById('bgvid');
const vTrimControl = document.getElementById('vTrimControl');
let poster = document.querySelector("#main-home #poster");
let present = isVideoThere(video);
let playState = getCookieValue('video-state');

window.onload = () => {
  if (poster) {
    poster.classList.add("fadeOutAnimation");
  }

  if (vTrimControl) {
    vTrimControl.classList.add("fadeInAnimation");
  }

  if (present && playState !== "paused") {
    setTimeout(function () {
      document.querySelector("#main-home #bgvid").play();
    }, 6000);
  }

  if (present && playState == "paused") {
    video.pause();
    vTrimControl.classList.add('pause');
    return true;
  }
}

if (vTrimControl) {
  vTrimControl.addEventListener("click", function() {
    if (video.paused == true) {
      video.play();
      vTrimControl.classList.remove('pause');
      setCookieValue("video-state", "un-paused", 7);
    } else {
      video.pause();
      vTrimControl.classList.add('pause');
      setCookieValue("video-state", "paused", 7);
    }
    return true;
  });
}

export function isVideoThere(video) {
  if (video != null && video != undefined && vTrimControl) {
    return true;
  } else {
    return false;
  }
}