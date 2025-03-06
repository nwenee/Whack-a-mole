const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// Add missing query selectors
const score = document.querySelector('#score'); // Use querySelector() to get the score element
const timerDisplay = document.querySelector('#timer'); // Use querySelector() to get the timer element

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

/**
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay based on the difficulty parameter.
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}

/**
 * Chooses a random hole from a list of holes.
 */
function chooseHole(holes) {
  const index = randomInteger(0, holes.length - 1);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

/**
 * Calls showUp() if time > 0, otherwise stops the game.
 */
function gameOver() {
  if (time > 0) {
    timeoutId = showUp();
    return timeoutId;
  } else {
    return stopGame();
  }
}

/**
 * Calls the showAndHide function with a specific delay and hole.
 */
function showUp() {
  let delay = setDelay(difficulty); // Use setDelay() to get the delay based on difficulty
  const hole = chooseHole(holes);  // Use chooseHole() to get a random hole
  return showAndHide(hole, delay);
}

/**
 * Shows and hides the mole.
 */
function showAndHide(hole, delay) {
  toggleVisibility(hole);  // Show the mole
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);  // Hide the mole
    gameOver();  // Call gameOver() to either stop the game or continue
  }, delay);
  return timeoutID;
}

/**
 * Adds or removes the 'show' class to/from a hole.
 */
function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}

/**
 * Updates the score when a mole is clicked.
 */
function updateScore() {
  points += 1;
  score.textContent = points;
  return points;
}

/**
 * Clears the score.
 */
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
 * Updates the timer display.
 */
function updateTimer() {
  timerDisplay.textContent = time;
  return time;
}

/**
 * Starts the timer.
 */
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
 * Event handler for when a mole is clicked.
 */
function whack(event) {
  updateScore();  // Increment the score when a mole is clicked
  return points;
}

/**
 * Sets event listeners on each mole.
 */
function setEventListeners() {
  moles.forEach(mole => mole.addEventListener('click', whack));
  return moles;
}

/**
 * Sets the duration of the game.
 */
function setDuration(duration) {
  time = duration;
  return time;
}

/**
 * Stops the game.
 */
function stopGame() {
  clearInterval(timer);
  return "game stopped";
}

/**
 * Starts the game when the start button is clicked.
 */
function startGame() {
  clearScore();  // Clear the score
  setDuration(10);  // Set game duration (10 seconds for example)
  setEventListeners();  // Set up event listeners on the moles
  startTimer();  // Start the timer
  showUp();  // Start showing moles
  return "game started";
}

startButton.addEventListener("click", startGame);

// Testing code for validating the functions
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;

