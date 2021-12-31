'use strict';
// HTML elements variables
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const roll = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const holdScore = document.querySelector('.btn--hold');
const dicePicture = document.querySelector('.dice');
const settingsSection = document.getElementById('settings');
const buttonStyle = document.querySelectorAll('.btn'); // Here is used querySelectorAll because this variable is used in the loop.

// These all are counter variables,
let currentRealScoreOne = 0; //
let currentRealScoreTwo = 0;
let realScoreOne = 0;
let realScoreTwo = 0;
let playing = true; // This variable checks is it game still active (did somebody won).
let playerOneName = 'Player 1';
let playerTwoName = 'Player 2';
let victoryScore = 100;

// Function for displaying the cube
const diceSide = function (num) {
  return `dice-${num}.png`;
};
//Function for displaying in element
const displaySomething = function (where, what) {
  document.querySelector(where).textContent = what;
};

//Settings
// Event Listener for opening and closing settings button.
document
  .getElementById('settingsButtonOpen')
  .addEventListener('click', function () {
    settingsSection.classList.remove('hidden');
    settingsSection.classList.add('settings');
    displaySomething('#settingsButton', `Save and close`);
  });

// Function for taking values form the setting options.
const settings = function (event) {
  playerOneName = document.getElementById('player0').value || `PLAYER 1`;
  playerTwoName = document.getElementById('player1').value || `PLAYER 2`;
  victoryScore = Number(document.getElementById('victoryScore').value) || 100;
  displaySomething('#name--0', playerOneName);
  displaySomething('#name--1', playerTwoName);
  settingsSection.classList.add('hidden');
  settingsSection.classList.remove('settings');
};
//Executing of the function above
document
  .getElementById('settingsButton')
  .addEventListener('click', function () {
    settings();
  });

// Setting initial score on 0.
displaySomething('#score--0', 0);
displaySomething('#score--1', 0);

//Loops which makes buttons bluer after the victory.
const addBluer = function () {
  for (let i = 0; i < buttonStyle.length; i++) {
    buttonStyle[i].classList.toggle('btn-bluer');
  }
};

// Hiding dice on the beginning of the game.
dicePicture.classList.add('hidden');

// Part witch rolls dice and set currentScore(One and Twos)
roll.addEventListener('click', function () {
  if (playing) {
    dicePicture.classList.remove('hidden');
    let rolledResult = Math.trunc(Math.random() * 6) + 1;

    // can't be 7 it has it be 6 + 1 because if not + 1 returns sometimes 0.
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
      playerOne.classList.remove('player--active');
      if (realScoreOne > victoryScore) {
        displaySomething('#score--0', 'VICTORY');
        playing = false;
        dicePicture.classList.add('hidden');
        addBluer();
      }
    } else if (playerTwo.classList.contains('player--active')) {
      realScoreTwo += currentRealScoreTwo;

      displaySomething('#score--1', realScoreTwo);
      displaySomething('#current--1', 0);
      playerOne.classList.add('player--active');
      playerTwo.classList.remove('player--active');

      if (realScoreTwo > victoryScore) {
        displaySomething('#score--1', 'VICTORY');
        playing = false;
        dicePicture.classList.add('hidden');
        addBluer();
      }
    }
  }
});

// Part which resets the game

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
  if (newGame.classList.contains('btn-bluer')) {
    addBluer();
  }
});

// 1.Dry out code.
// 2. You can add a settings button  as a modal window.
