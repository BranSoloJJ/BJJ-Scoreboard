//jshint esversion:6

const scoreBoard = {
  _round: 0,
  _home: 0,
  _homeadv: 0,
  _homepen: 0,
  _away: 0,
  _awayadv: 0,
  _awaypen: 0,
  range: [0, 99],
  set home(val) {
    this._home = val;
    document.querySelector('#home-score').textContent = this._home;
  },
  set homeadv(val) {
    this._homeadv = val;
    document.querySelector('#home-adv-score').textContent = this._homeadv;
  },
  set homepen(val) {
    this._homepen = val;
    document.querySelector('#home-pen-score').textContent = this._homepen;
  },
  set away(val) {
    this._away = val;
    document.querySelector('#away-score').textContent = this._away;
  },
  set awayadv(val) {
    this._awayadv = val;
    document.querySelector('#away-adv-score').textContent = this._awayadv;
  },
  set awaypen(val) {
    this._awaypen = val;
    document.querySelector('#away-pen-score').textContent = this._awaypen;
  },
  set round(val) {
    this._round = val;
    document.querySelector('#roundnum').textContent = this._round;
  },
  checkRangeAndUpdate(value, operator, step) {
    // destructure max and min
    const [min, max] = this.range;
    // set getter to underscore value for accessing object
    const getter = `_${value}`;
    if (operator === '+' && (this[getter] + step) - 1 < max) {
      // if operator is add and the incrementation wont exceede max increment by step
      this[value] = this[getter] + step;
    }
    if (operator === '-' && (this[getter] - step) + 1 > min) {
      // if operator is sub and the decrementation wont go below min deincrement by step
      this[value] = this[getter] - step;
    }
  },
  homep4: ['home', '+', 4],
  homep3: ['home', '+', 3],
  homep2: ['home', '+', 2],
  homem1: ['home', '-', 1],
  homeadvp1: ['homeadv', '+', 1],
  homeadvm1: ['homeadv', '-', 1],
  homepenp1: ['homepen', '+', 1],
  homepenm1: ['homepen', '-', 1],
  awayp4: ['away', '+', 4],
  awayp3: ['away', '+', 3],
  awayp2: ['away', '+', 2],
  awaym1: ['away', '-', 1],
  awayadvp1: ['awayadv', '+', 1],
  awayadvm1: ['awayadv', '-', 1],
  awaypenp1: ['awaypen', '+', 1],
  awaypenm1: ['awaypen', '-', 1],
  roundplus: ['round', '+', 1],
  roundminus: ['round', '-', 1]
};

function init() {
  const container = document.querySelector('.scoreboard');
  container.addEventListener('click', function(e) {
    // run function with params that match the buttons id
    scoreBoard.checkRangeAndUpdate.apply(scoreBoard, scoreBoard[e.target.id]);
  });
}

init();

// OLD CODE

// var round = 0, homeScore = 0, awayScore = 0;

// $('document').ready(function() {
//   $('#homeplus').click(function() {
//     if (homeScore < 100) {
//       homeScore += 1;
//       $('#team1').text(homeScore);
//     }
//   });
//   $('#homeminus').click(function() {
//     if (homeScore > 0) {
//       homeScore -= 1;
//       $('#team1').text(homeScore);
//     }
//   });
//   $('#roundminus').click(function() {
//     if (round > 0) {
//       round -= 1;
//       $('#roundnum').text(round);
//     }
//   });
//   $('#roundplus').click(function() {
//     if (round < 1000) {
//       round += 5;
//       $('#roundnum').text(round);
//     }
//   });
//   $('#awayplus').click(function() {
//     if (awayScore < 100) {
//       awayScore += 1;
//       $('#team2').text(awayScore);
//     }
//   });
//   $('#awayminus').click(function() {
//     if (awayScore > 0) {
//       awayScore -= 1;
//       $('#team2').text(awayScore);
//     }
//   });
// });
