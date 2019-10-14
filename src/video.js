import {getCookieValue} from './getCookieValue.js';

const video = document.getElementById('bgvid');
const vTrimControl = document.getElementById('vTrimControl');
const pausedPreference = new getCookieValue();

window.onload = () => {
  let present = isVideoThere(video);
  if (present) {rememberPreference()}
};

vTrimControl.addEventListener("click", function() {
  if (video.paused == true) {
    video.play();
  } else {
    video.pause();
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

export function rememberPreference() {
  
}