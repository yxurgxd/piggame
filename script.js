"use strict";

const firstPlayer = document.querySelector(".player--0");
const secondPlayer = document.querySelector(".player--1");
const firstPlayerScore = document.querySelector("#score--0");
const secondPlayerScore = document.querySelector("#score--1");
const firstPlayerCurrentScore = document.querySelector("#current--0");
const secondPlayerCurrentScore = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  firstPlayerScore.textContent = 0;
  secondPlayerScore.textContent = 0;
  firstPlayerCurrentScore.textContent = 0;
  secondPlayerCurrentScore.textContent = 0;

  diceEl.classList.add("hidden");
  firstPlayer.classList.remove("player--winner");
  secondPlayer.classList.remove("player--winner");
  firstPlayer.classList.add("player--active");
  secondPlayer.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  firstPlayer.classList.toggle("player--active");
  secondPlayer.classList.toggle("player--active");
};

// 1. Generating a random dice roll
// 2. Display dice
// 3. Check for rolled 1
// Add dice to current score
// Switch to next player

btnRoll.addEventListener("click", function () {
  if (playing) {
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceRoll}.png`;

    if (diceRoll != 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init());
