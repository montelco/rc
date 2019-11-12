import {getCookieValue} from './getCookieValue.js';
import {setCookieValue} from './setCookieValue.js';

const video = document.getElementById('bgvid');
const vTrimControl = document.getElementById('vTrimControl');
let present = isVideoThere(video);
let playState = getCookieValue('video-state');

window.onload = () => {
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
  return false;
}