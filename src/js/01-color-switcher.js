function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let timerId = null;
let bodyEl = document.querySelector('body');
let btnStart = document.querySelector('button[data-start]');
let btnStop = document.querySelector('button[data-stop]');
btnStop.disabled = true;

btnStart.addEventListener('click', makeMagic);

function makeMagic() {
  btnStop.disabled = false;
  btnStart.disabled = true;
  bodyEl.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

btnStop.addEventListener('click', stopMagic);

function stopMagic() {
  clearInterval(timerId);
  btnStart.disabled = false;
  btnStop.disabled = true;
  bodyEl.style.backgroundColor = '#ffffff';
}
