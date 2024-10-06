let startBtn = document.getElementById('start-button');
let round = 0;
let colors = ['green', 'red', 'yellow', 'blue'];
let btns = Array.from(document.querySelectorAll('.color-button'));
let userBlinkClick = [];  
let systemBlink = [];     

startBtn.addEventListener('click', Start);

function Start() {
  resetGame();
  levelup();
}

function userInput(event) {
  const clickedBtn = event.target; 
  userBlinkClick.push(clickedBtn);  
  checkUserInput();  
}

function randBlink() {
  let randNumber = Math.floor(Math.random() * 4);
  const btnToBlink = btns[randNumber];

  btnToBlink.classList.add('blink');
  setTimeout(() => {
    btnToBlink.classList.remove('blink');
  }, 500);

  systemBlink.push(btnToBlink);

  enableUserInput();
}

function levelup() {
  document.getElementById('start-button').innerText = "Restart";
  document.getElementById('message').innerHTML = "Restart The game.";
  round++;
  document.getElementsByClassName('level')[0].innerText = `Round: ${round}`;
  randBlink();
}

function enableUserInput() {
  btns.forEach(btn => {
    btn.addEventListener('click', userInput);
  });
}

function disableUserInput() {
  btns.forEach(btn => {
    btn.removeEventListener('click', userInput);
  });
}

function checkUserInput() {
  let currentClickIndex = userBlinkClick.length - 1;

  
  if (userBlinkClick[currentClickIndex] !== systemBlink[currentClickIndex]) {
    alert(`Game Over! You clicked the wrong button. Score : ${round}`);
    resetGame();
    return;
  }

  if (userBlinkClick.length === systemBlink.length) {
    disableUserInput();  
    setTimeout(() => {
      userBlinkClick = [];  
      levelup();  
    }, 1000);
  }
}

function resetGame() {
  round = 0;
  systemBlink = [];
  userBlinkClick = [];
  document.getElementsByClassName('level')[0].innerText = `Round: 0`;
}
