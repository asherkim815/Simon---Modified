const buttonColors = ['red', 'yellow', 'green', 'blue'];
let computerPattern = [];
let userPattern = [];
let started = false;
let level = 0;

document.addEventListener('keyup', () => {
  if (!started) {
    nextSequence();
    started = true;
  }
});

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', function () {
    // remove focus from button clicked, so pressing the space bar after clicking on a button doesn't trigger the click eventlistener
    document.activeElement.blur();
    if (started) {
      const clickedColor = this.getAttribute('id');
      userPattern.push(clickedColor);
      animate(clickedColor);
      playSound(clickedColor);
      checkAnswer(userPattern.length - 1);
    }
  });
});

function nextSequence() {
  userPattern = [];
  level++;
  document.querySelector('h1').innerText = `Level ${level}`;

  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNumber];
  computerPattern.push(randomColor);

  animate(randomColor);
  playSound(randomColor);
}

function checkAnswer(level) {
  if (computerPattern[level] === userPattern[level]) {
    if (computerPattern.length === userPattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    const body = document.querySelector('body');
    body.classList.add('game-over');
    setTimeout(() => body.classList.remove('game-over'), 1000);

    document.querySelector('#level-title').innerText =
      'Game Over! Press a Key to Restart!';

    playSound('wrong');
    startOver();
  }
}

function animate(colorName) {
  const buttonToAnimate = document.querySelector(`#${colorName}`);
  buttonToAnimate.classList.add('pressed');
  setTimeout(() => {
    buttonToAnimate.classList.remove('pressed');
  }, 200);
}

function playSound(colorName) {
  const audio = new Audio('sounds/' + colorName + '.mp3');
  audio.play();
}

function startOver() {
  level = 0;
  computerPattern = [];
  started = false;
}
