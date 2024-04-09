const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const animals = ['animals', 'birdo', 'carangas', 'chicken', 'coala', 'cow', 'dog', 'frog', 'giras', 'kanga', 'leon', 'php', 'ra', 'serpente', 'water'];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let timerValue = 0;

const saveTimerValue = () => {
  localStorage.setItem('timer', timerValue);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timerValue++;
    timer.innerHTML = timerValue;
    saveTimerValue();
  }, 1000);
}

let timerInterval;

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player') || '';
  timerValue = parseInt(localStorage.getItem('timer')) || 0;
  timer.innerHTML = timerValue;
  startTimer();
  loadGame();
}

let secondCard = '';

const checkEnd = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 30) {
    clearInterval(timerInterval);
    window.location = 'end.html';
  }
}

const checkCards = () => {
  const firstanimal = firstCard.getAttribute('data-animal');
  const secondanimal = secondCard.getAttribute('data-animal');

  if (firstanimal === secondanimal) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    firstCard = '';
    secondCard = '';
    checkEnd();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard = '';
      secondCard = '';
    }, 500);
  }
}

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    checkCards();
  }
}

const createCard = (animals) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${animals}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-animal', animals)

  return card;
}

const loadGame = () => {
  const duplicateAnimal = [...animals, ...animals];
  const shuffledArray = duplicateAnimal.sort(() => Math.random() - 0.5);
  shuffledArray.forEach((animal) => {
    const card = createCard(animal);
    grid.appendChild(card);
  });
}
