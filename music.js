var audio = new Audio("music.mp3");

function playMusic() {
  audio.play();
}

function pauseMusic() {
  audio.pause();
}

function stopMusic() {
  audio.pause();
  audio.currentTime = 0;
}
