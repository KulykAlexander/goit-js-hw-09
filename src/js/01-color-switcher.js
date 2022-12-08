const screen = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function startChangeColor() {
  changeColor = setInterval(() => {
    let randomColor = getRandomHexColor();
    screen.style.backgroundColor = randomColor;
  }, 1000);
  startBtn.disabled = true;
}
function stopChangeColor() {
  clearInterval(changeColor);
  startBtn.disabled = false;
}
startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangeColor);
