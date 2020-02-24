
// 10 minutes from now
var time_in_minutes = 5;
var current_time = Date.parse(new Date()); //this instant
var deadline = new Date(current_time + time_in_minutes*60*1000); //sum of this instant plus however far away the deadline is


function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date()); //difference between the deadline and this instant
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}

var timeinterval; //var holding the 1s interval for the countdown

function run_clock(id,endtime){

	var clock = document.getElementById(id);

  function update_clock(){
		var t = time_remaining(endtime); //var to hold time_remaining, eventually passing in deadline as the param
		clock.innerHTML = t.minutes+':'+t.seconds; //change the display with the minutes and seconds of time_remaining
		if(t.total<=0){ clearInterval(timeinterval); } //if t.total equals or is less than 0, clear the interval so it stops counting down
	}
	update_clock(); // run function once at first to avoid delay
	timeinterval = setInterval(update_clock,1000); //set var timeinterval to 1s, passing in update_clock. i.e., update clock runs every 1s
}


run_clock('time',deadline);
 // on load, starts the clock
 // if I remove this, set interval will start, but update clock will not run
 //only when I pause, and then start again, does the timer show the correct time

var paused = false; // is the clock paused?
var time_left; // time left on the clock when paused


function pause_clock(){
	if(!paused){ //if paused is not true (i.e. it is running),
		paused = true; //set pause status to equal true
		clearInterval(timeinterval); // stop the clock by clearing the timeinterval
		time_left = time_remaining(deadline).total; // preserve remaining time using the total of timeRemaining
	}
}

function resume_clock(){
	if(paused){ //if paused is true (ie. it is not running)
		paused = false; //set pause status to equal false

		// update the deadline to preserve the amount of time remaining
		deadline = new Date(Date.parse(new Date()) + time_left); //create new Date passing in the value of the current time plus the time left on the clock at that instant
    //right now if i use this to start the clock, time_left doesnt exist until I pause it

		// start the clock
		run_clock('time',deadline); //passing in the id of the clock display and the deadline
    console.log(deadline);
	}
}

// handle pause and resume button clicks
document.getElementById('pause-btn').onclick = pause_clock;
document.getElementById('start-btn').onclick = resume_clock;






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

function restart() {
  const res = document.querySelector('.restart-btn');
  res.addEventListener('click', function(){
    this._home = 0;
  });
}

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
