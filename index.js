// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';
import confetti from 'canvas-confetti';
import emoji from './assets/images/rock-emoji.png';
import rock from './assets/images/hand-rock.png';
import paper from './assets/images/hand.png';
import scissors from './assets/images/hand-scissors.png';
import { getRandomNumber } from './modules/getRandomNumber.js';

// ⚡️ Render Skeleton
const mock = [
  {
    name: 'rock',
    src: rock,
  },
  {
    name: 'paper',
    src: paper,
  },
  {
    name: 'scissors',
    src: scissors,
  },
];

document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='rps'>
    <h3>Rock Paper Scissors</h3>

    <main>
      <div class='score'>
        <span class='score__label score__label--user'>user</span>
        <span class='score__label score__label--computer'>computer</span>
        <span data-user-score=''>0</span>:
        <span data-computer-score=''>0</span>
      </div>

      <div class='message h5' data-message=''>Get Started, Let\`s Rock!</div>

      <ul class='options'>
        ${mock.map(({ name, src }) => `
          <li>
            <button class='options__btn' data-${name}>
              <img src='${src}' alt='${name}'>
            </button>
          </li>
        `).join('')}
      </ul>
    </main>

    <footer>
      <p>Make your move.</p>
      <button class='hide' data-replay=''>Repeat Game</button>
    </footer>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Class
class App {
  constructor() {
    this.choices = {
      rock: document.querySelector('[data-rock]'),
      paper: document.querySelector('[data-paper]'),
      scissors: document.querySelector('[data-scissors]'),
    };
    this.scores = {
      user: 0,
      computer: 0,
    };
    this.DOM = {
      user: document.querySelector('[data-user-score]'),
      computer: document.querySelector('[data-computer-score]'),
      message: document.querySelector('[data-message]'),
      button: document.querySelector('[data-replay]'),
    };

    this.choices.rock.addEventListener('click', this.gameMove);
    this.choices.paper.addEventListener('click', this.gameMove);
    this.choices.scissors.addEventListener('click', this.gameMove);

    this.DOM.button.addEventListener('click', () => location.reload());
  }

  /**
   * @function gameMove - Game logic
   * @param target
   */
  gameMove = ({ target }) => {
    const computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    const userChoice = Object.keys(target.dataset)[0];

    switch (`${computerChoice}-${userChoice}`) {
      case 'rock-paper':
      case 'paper-scissors':
      case 'scissors-rock':
        this.optionGame(userChoice, computerChoice, 'win');
        break;
      case 'paper-rock':
      case 'scissors-paper':
      case 'rock-scissors':
        this.optionGame(userChoice, computerChoice, 'lose');
        break;
      case 'rock-rock':
      case 'scissors-scissors':
      case 'paper-paper':
        this.optionGame(userChoice, computerChoice, 'draw');
        break;
      default:
        break;
    }
  };

  /**
   * @function optionGame - Game move option
   * @param userChoice
   * @param computerChoice
   * @param type
   */
  optionGame = (userChoice, computerChoice, type) => {
    switch (type) {
      case 'win':
        this.scores.user++;
        this.DOM.user.textContent = this.scores.user;
        break;
      case 'lose':
        this.scores.computer++;
        this.DOM.computer.textContent = this.scores.computer;
        break;
      case 'draw':
        this.scores.user++;
        this.scores.computer++;
        this.DOM.user.textContent = this.scores.user;
        this.DOM.computer.textContent = this.scores.computer;
        break;
      default:
        break;
    }

    this.updateMessage(userChoice, computerChoice, type);

    if (this.scores.user === 3) {
      this.endGame('You WIN 🥳');
      confetti({
        angle: getRandomNumber(55, 125),
        spread: getRandomNumber(50, 70),
        particleCount: getRandomNumber(50, 100),
        origin: { y: 0.6 },
      });
    }

    if (this.scores.computer === 3) {
      this.endGame('You LOSE 🤥');
    }

    if (this.scores.user === 3 && this.scores.computer === 3) {
      this.endGame('DRAW 🤝');
    }
  };

  /**
   * @function updateMessage - Update message text
   * @param userChoice
   * @param computerChoice
   * @param type
   */
  updateMessage = (userChoice, computerChoice, type) => {
    return this.DOM.message.innerHTML = `
      ${userChoice === 'rock' ? 'Rock' : userChoice === 'paper' ? 'Paper' : 'Scissors'}
      <span class='small ${type !== 'draw' ? 'win' : 'equal'}'>(user)</span>
      ${type === 'win' ? 'beats' : type === 'lose' ? 'lose' : 'equals'}
      ${computerChoice === 'rock' ? 'Rock' : computerChoice === 'paper' ? 'Paper' : 'Scissors'}
      <span class='small ${type !== 'draw' ? 'lose' : 'equal'}'>(comp)</span> .`;
  };

  /**
   * @function endGame - Finish game
   * @param message
   */
  endGame = (message) => {
    this.DOM.message.innerHTML = `${message}`;
    document.querySelector('.options').classList.add('hide');
    document.querySelector('footer p').classList.add('hide');
    this.DOM.button.classList.remove('hide');
  };
}

// ⚡️Class Instance
new App();

