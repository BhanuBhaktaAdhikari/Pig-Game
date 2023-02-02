'use strict';

//selecting elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const diceImg = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');


// initialize part
let scores;
let activePlayer;
let currentScore;
let playing;

const newGame = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceImg.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
};
newGame();

//-------------------
const activePlayerFunc = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};

//-----------------
const switchPlayers = function () {
  //-------
  activePlayerFunc();
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  //--------
  activePlayerFunc();
  // player will be switched here and after switching current score will be null
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    let myAudio = document.querySelector('#audio'); // Audio
    myAudio.play();
    let dice = Math.trunc(Math.random() * 6) + 1; // generate random number for dice
    diceImg.src = `dice-${dice}.png`; // random image of dice selected
    diceImg.classList.remove('hidden'); // dice image is generated according to the dice value we get

    if (dice !== 1) {
      // if dice = 0 then player 0 will be selected
      currentScore = currentScore + dice; // current score will be added with the dice value
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore; // in current score the value will be displayed
    } else {
      switchPlayers(); // function is called
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore; // score will be added with current score and will be saved and displayed in an array
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //if score is greater than 100
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceImg.classList.add('hidden');

      playing = false;
    } else {
      //if score is less than 100 then switch player function is called
      switchPlayers();
    }
  }
});

//new game button is clicked
btnNew.addEventListener('click', newGame); // the game will we reset when 'new game' button is clicked
