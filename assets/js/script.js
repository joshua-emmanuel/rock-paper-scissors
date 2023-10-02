const rulesModal = document.querySelector(".rules-modal");
const openModalBtn = document.querySelector(".rules__btn");
const closeModalBtn = document.querySelector(".rules-modal__btn");
const game = document.querySelector('.game');
const results = document.querySelector('.results');
const playerPlaceholder = document.querySelector('.results__result--player');
const housePlaceholder = document.querySelector('.results__result--house');
const resultsWinner = document.querySelector('.results__winner');
const winStatus = document.querySelector('.win-status');
const playAgainBtn = document.querySelector('.play-again');
const playerScore = document.querySelector('.score--player .score__number');
const houseScore = document.querySelector('.score--house .score__number');

openModalBtn.addEventListener("click", () => {
  rulesModal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  rulesModal.close();
});

const choices = [
  {
    name: 'paper',
    beats: 'rock',
  },
  {
    name: 'scissors',
    beats: 'paper',
  },
  {
    name: 'rock',
    beats: 'scissors',
  },
];

function getPlayerChoice(choiceBtn) {
  const choiceName = choiceBtn.dataset.choice;
  const playerChoice = choices.find((choice) => choice.name === choiceName);
  return playerChoice;
}

function getHouseChoice() {
  const randomChoicesIndex = Math.floor(Math.random() * choices.length);
  const houseChoice = choices[randomChoicesIndex];
  return houseChoice;
}

function displayPlayerChoice(playerChoice) {
  playerPlaceholder.innerHTML = `
    <div class="choice choice--${playerChoice.name}">
      <img src="./assets/images/icon-${playerChoice.name}.svg" alt="${playerChoice.name}">
    </div>
  `;
}

function displayHouseChoice(houseChoice) {
  housePlaceholder.innerHTML = `
    <div class="choice choice--${houseChoice.name}">
      <img src="./assets/images/icon-${houseChoice.name}.svg" alt="${houseChoice.name}">
    </div>
  `;
}

function getWinner(playerChoice, houseChoice) {
  const playerWins = playerChoice.beats === houseChoice.name;
  const houseWins = houseChoice.beats === playerChoice.name;

  if (playerWins) {
    return 'Player';
  } else if (houseWins) {
    return 'House';
  } else {
    return 'Draw';
  }
}

function displayWinner(winner) {
  switch (winner) {
    case 'Player':
      winStatus.textContent = 'You Win';
      break;
    case 'House':
      winStatus.textContent = 'House Wins';
      break;
    default:
      winStatus.textContent = 'Draw';
      break;
  }
  winStatus.setAttribute('aria-hidden', false);
  resultsWinner.setAttribute('aria-hidden', false)
  results.classList.add('show-winner');
}

function highlightWinner(winner) {
  switch (winner) {
    case 'Player':
      playerPlaceholder.classList.add('winner');
      break;
    case 'House':
      housePlaceholder.classList.add('winner');     
      break;
    default:
      break;
  }
}

function setScore(winner) {
  if (winner === 'Player') {
    playerScore.textContent = Number(playerScore.textContent) + 1;
  } else if (winner === 'House') {
    houseScore.textContent = Number(houseScore.textContent) + 1;
  }
}

function playGame(event) {
  if (!event.target.closest('.choice-btn')) return;
  const choiceBtn = event.target;

  const playerChoice = getPlayerChoice(choiceBtn);
  const houseChoice = getHouseChoice();

  game.setAttribute('aria-hidden', true);
  results.setAttribute('aria-hidden', false);
  displayPlayerChoice(playerChoice);
  setTimeout(() => {
    displayHouseChoice(houseChoice);
  }, 1000);

  const winner = getWinner(playerChoice, houseChoice);
  setTimeout(() => {
    displayWinner(winner);
    setScore(winner);
    highlightWinner(winner);
  }, 1500);
}

function resetUI() {
  game.setAttribute('aria-hidden', false);
  results.setAttribute('aria-hidden', true);
  winStatus.setAttribute('aria-hidden', true);
  resultsWinner.setAttribute('aria-hidden', true)
  results.classList.remove('show-winner');
  playerPlaceholder.innerHTML = '';
  housePlaceholder.innerHTML = '';
  playerPlaceholder.classList.remove('winner');
  housePlaceholder.classList.remove('winner');
}

game.addEventListener('click', playGame);
playAgainBtn.addEventListener('click', resetUI);