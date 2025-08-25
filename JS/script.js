const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const player = document.getElementById("player");

const sounds = {
  1: "Music/I Really Do....mp3",
  2: "Music/For A Reason.mp3",
  3: "Music/HIM..mp3",
};

btn1.addEventListener("click", () => {
  playSound(sounds[1]);
  clearGradients();
  btn1.classList.add("active-gradient");
});
btn2.addEventListener("click", () => {
  playSound(sounds[2]);
  clearGradients();
  btn2.classList.add("active-gradient");
});
btn3.addEventListener("click", () => {
  playSound(sounds[3]);
  clearGradients();
  btn3.classList.add("active-gradient");
});

function playSound(file) {
  player.src = file;
  player.play();
  player.classList.add("show");
}

document.getElementById("reset").addEventListener("click", () => {
  stopSound();
});

function stopSound() {
  player.pause();
  player.classList.remove("show");
  clearGradients();
}
const buttons = [btn1, btn2, btn3];
function clearGradients() {
  buttons.forEach((b) => b.classList.remove("active-gradient"));
}
