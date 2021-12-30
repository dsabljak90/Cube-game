'use strict';
// It is possible to declare several empty variables in one let. For exsample currentRealScoreOne, CurrentRealScoreTwo, realScoreOne, realScoreTwo, and etc.

// Elements variables (As we have an  elements with id we can use getElementById insted of querySelector)
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const roll = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const holdScore = document.querySelector('.btn--hold');
const buttonStyle = document.querySelectorAll('.btn'); // To be abel to use this element in loop, we have to target it with querySelectorAll.
const dicePicture = document.querySelector('.dice');
const settingsSection = document.getElementById('settings');
// These all are counter variables, they have to be displayed outside of function wihch adds to them. Othervise if they would be displayed in function they would always be set on 0.
let currentRealScoreOne = 0; //
let currentRealScoreTwo = 0;
let realScoreOne = 0;
let realScoreTwo = 0;
let playing = true;
let playerOneName = 'Player 1';
let playerTwoName = 'Player 2';
let victoryScore = 100;

// Functions
const diceSide = function (num) {
  return `dice-${num}.png`;
};
const displaySomething = function (where, what) {
  document.querySelector(where).textContent = what;
};

//Settings
document
  .getElementById('settingsButtonOpen')
  .addEventListener('click', function () {
    settingsSection.classList.remove('hidden');
    settingsSection.classList.add('settings');
    document.getElementById('settingsButton').innerText = `Save and close`;
  });

const settings = function (event) {
  playerOneName = document.getElementById('player0').value || `PLAYER 1`;
  playerTwoName = document.getElementById('player1').value || `PLAYER 2`;
  victoryScore = Number(document.getElementById('victoryScore').value) || 100;
  document.getElementById('name--0').innerText = playerOneName;
  document.getElementById('name--1').innerText = playerTwoName;
  settingsSection.classList.add('hidden');
  settingsSection.classList.remove('settings');
};

document
  .getElementById('settingsButton')
  .addEventListener('click', function () {
    settings();
  });

// Seting initial score on 0.
displaySomething('#score--0', 0);
displaySomething('#score--1', 0);

//Loops
const addBlure = function () {
  for (let i = 0; i < buttonStyle.length; i++) {
    buttonStyle[i].classList.toggle('btn-blure');
  }
};

// Hiding dice on the beagining.
dicePicture.classList.add('hidden');

// Part witch rolls dice and set realScore(One and Twos)
roll.addEventListener('click', function () {
  if (playing) {
    dicePicture.classList.remove('hidden');
    let rolledResult = Math.trunc(Math.random() * 6) + 1;

    // can't be 7 it has ti be 6 + 1 because if not + 1 returns sometimes 0.
    if (playerOne.classList.contains('player--active')) {
      dicePicture.src = diceSide(rolledResult);
      currentRealScoreTwo = 0;
      if (rolledResult !== 1) {
        currentRealScoreOne += rolledResult;

        displaySomething('#current--0', currentRealScoreOne);
      } else {
        currentRealScoreOne = 0;
        displaySomething('#current--0', currentRealScoreOne);
        console.log(currentRealScoreOne);
        playerTwo.classList.add('player--active');
        playerOne.classList.remove('player--active');
      }
    } else if (playerTwo.classList.contains('player--active')) {
      dicePicture.src = diceSide(rolledResult);
      currentRealScoreOne = 0;
      if (rolledResult !== 1) {
        currentRealScoreTwo += rolledResult;
        displaySomething('#current--1', currentRealScoreTwo);
      } else {
        currentRealScoreTwo = 0;
        displaySomething('#current--1', currentRealScoreTwo);
        playerOne.classList.add('player--active');
        playerTwo.classList.remove('player--active');
      }
    }
  }
});

// Part witch saves the score
holdScore.addEventListener('click', function () {
  if (playing) {
    if (playerOne.classList.contains('player--active')) {
      realScoreOne += currentRealScoreOne;
      displaySomething('#score--0', realScoreOne);
      displaySomething('#current--0', 0);
      playerTwo.classList.add('player--active');
      playerOne.classList.remove('player--active'); // Toggle check is it class add and if it is remove it and if is not there, remove it.

      if (realScoreOne > victoryScore) {
        displaySomething('#score--0', 'WICTORY');
        playing = false;
        dicePicture.classList.add('hidden');
        addBlure();
      }
    } else if (playerTwo.classList.contains('player--active')) {
      realScoreTwo += currentRealScoreTwo;

      displaySomething('#score--1', realScoreTwo);
      displaySomething('#current--1', 0);
      playerOne.classList.add('player--active');
      playerTwo.classList.remove('player--active');

      if (realScoreTwo > victoryScore) {
        displaySomething('#score--1', 'WICTORY');
        playing = false;
        dicePicture.classList.add('hidden');
        addBlure();
      }
    }
  }
});

// Part wich resets the game
newGame.addEventListener('click', function () {
  currentRealScoreOne = 0;
  currentRealScoreTwo = 0;
  realScoreOne = 0;
  realScoreTwo = 0;
  dicePicture.classList.add('hidden');
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');

  displaySomething('#score--0', realScoreOne);
  displaySomething('#score--1', realScoreOne);
  displaySomething('#current--0', currentRealScoreTwo);
  displaySomething('#current--1', currentRealScoreTwo);
  playing = true;

  addBlure();
});

// 1.Dry out code.
// 2. You can add a settings button  as a modal window.
