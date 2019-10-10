import {get}

const video = document.getElementById('bgvid');
const vTrimControl = document.getElementById('vTrimControl');
const pausedPreference = new getCookieValue();

vTrimControl.addEventListener("click", function() {
  if (video.paused == true) {
    video.play();
    playPause.classList.toggle('pause');
  } else {
    video.pause();
   playPause.classList.toggle('pause');
  }
});

export function rememberPreference() {
  if (video != null && video != undefined) {
    
  }
}