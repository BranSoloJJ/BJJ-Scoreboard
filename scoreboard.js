//jshint esversion:6

var timeInMinutes = 5;
var currentTime = Date.parse(new Date()); // returns date in ms as since 1970
var deadline = Date.parse(currentTime + (timeInMinutes*60*1000)); //currentTime + timer

function timeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date()); // t= the difference between the deadline and current time
  var seconds = Math.floor ((t/1000) % 60);
  var minutes = Math.floor ((t/1000/60) % 60);
  var hours = Math.floor ((t/(1000*60*60) % 24));
  var days = Math.floor (t/(1000*60*60*24));

  return {
    'total':t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds};
    }

var timeInterval;

function runClock(id, endtime) {
  var clock = document.getElementById(id);

  function updateClock(){
    var t = timeRemaining(endtime);
    clock.innerHTML = t.minutes + ":" + t.seconds;
    if (t.total<=0) {clearInterval(timeInterval);}
  }
  timeInterval = setInterval (updateClock, 1000);

}

// runClock('time', deadline);

var paused = true;
var timeLeft; // time left on the clock when paused

function pauseClock(){
  if(!paused){
    paused = true;
    clearInterval(timeInterval); //stop the clock by clearing the interval
    timeLeft = timeRemaining(deadline).total;
  }
}

function resumeClock (){
  if(paused){
    paused = false;

    deadline = new Date(Date.parse(new Date()) + timeLeft);

    runClock('time', deadline);
  }
}

function clockInit(){
  var startBtn = document.querySelector('#start-btn');
  startBtn.addEventListener('click', function(){
    if (paused){
      resumeClock();
      console.log("start");
      console.log(timeInMinutes);
      console.log(currentTime);
      console.log(deadline);
    } else if (!paused) {
      pauseClock();
      console.log("pause");
    }
  }
);
}

clockInit();

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
    const getter = `_${value}`; //template literal string
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
