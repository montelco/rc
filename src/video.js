import {getCookieValue} from './getCookieValue.js';

const video = document.getElementById('bgvid');
const vTrimControl = document.getElementById('vTrimControl');
let present = isVideoThere(video);
let playState = getCookieValue('video-state');

window.onload = () => {
  if (present && playState == "paused") {
    video.pause();
    vTrimControl.classList.toggle('pause');
    return true;
  }
}

vTrimControl.addEventListener("click", function() {
  if (video.paused == true) {
    video.play();
  } else {
    video.pause();
    setCookieValue("video-state", "paused", 7);
  }
  vTrimControl.classList.toggle('pause');
  return true;
});

export function isVideoThere(video) {
  if (video != null && video != undefined) {
    return true;
  } else {
    return false;
  }
  return false;
}