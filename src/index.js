const startButton = document.getElementById('start');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const molesong = document.getElementById('molesong');
const hitSound = document.getElementById('hit');

let score = 0;
let time = 30; // 30 seconds for the game
let timer;

startButton.addEventListener('click', startGame);

function startGame() {
  score = 0;
  time = 30;
  scoreElement.textContent = score;
  timerElement.textContent = time;
  
  // Start background music
  molesong.currentTime = 0; // Reset song to beginning
  molesong.volume = 0.5; // Set volume to 50%
  molesong.loop = true; // Make the song loop
  molesong.play();
  
  timer = setInterval(updateTimer, 1000); // Start the timer
  showMole();
}

function updateTimer() {
  if (time > 0) {
    time--;
    timerElement.textContent = time;
  } else {
    clearInterval(timer); // Stop the game when the timer runs out
    
    // Fade out the music
    const fadeOut = setInterval(() => {
      if (molesong.volume > 0.1) {
        molesong.volume -= 0.1;
      } else {
        molesong.pause();
        molesong.volume = 0.5; // Reset volume for next game
        clearInterval(fadeOut);
      }
    }, 100);
    
    // Play hit sound as game over sound
    hitSound.currentTime = 0;
    hitSound.play();
    
    setTimeout(() => {
      alert(`Game Over! Your score is: ${score}`);
    }, 500);
  }
}

function showMole() {
  if (time <= 0) return; // Stop showing moles if game is over
  
  const randomHole = document.getElementById(`hole${Math.floor(Math.random() * 9)}`);
  const mole = randomHole.querySelector('.mole');
  
  // Show mole
  mole.style.top = '0';
  
  // Hide mole after a random delay between 500ms and 1500ms
  const delay = Math.random() * 1000 + 500;
  setTimeout(() => {
    if (time > 0) { // Only hide if game is still running
      mole.style.top = '100%';
      
      // Wait a bit before showing next mole
      setTimeout(() => {
        if (time > 0) showMole(); // Only show next mole if game is still running
      }, 300);
    }
  }, delay);
}

// Detect mole click
document.querySelectorAll('.mole').forEach(mole => {
  mole.addEventListener('click', () => {
    score++;
    scoreElement.textContent = score;
    
    // Play hit sound when mole is clicked
    hitSound.currentTime = 0; // Reset sound to beginning
    hitSound.play();
    
    // Add visual feedback when hitting a mole
    mole.style.transform = 'scale(0.9)';
    setTimeout(() => {
      mole.style.transform = 'scale(1)';
    }, 100);
  });
});
