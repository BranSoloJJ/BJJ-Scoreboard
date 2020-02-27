//jshint esversion:6

class Countdown {
  constructor() {
    this.duration = 0; //this.whatever makes it a constructor function
    this.elapsed = 0;
    this.isActive = false;
    this.lastFrameTime = Date.now();
    this.minutes = 0;
    this.seconds = 0;

    this.onTick = () => {}; //arrow function. same meaning as Countdown.onTick = function(){}
    // right now this is empty. will be filled with a function to replace the label

    this.onCompleted = () => {};

    this.tick(); //reminder: this represents the object that is executing the current function when it is inside a method of an object. i.e. constructor.tick
  }


  getTimeLeft() { //the timeleft is the difference between the total duration and the time that has elapsed. this syntax meaks getTimeLeft is a method being added to the Countdown class
    // adding a method to a constructor (countdown)

    const t = this.duration - this.elapsed; //const t is the difference between the total duration and the elapsed time (i.e. 300seconds minus however long the clock has been running)
    // since getTimeLeft
    this.minutes = Math.floor((t / 60) % 60);
    this.seconds = Math.floor(t % 60);

    return Math.max(0, t); //returns the largest number between 0 and the difference. i.e. will never be a negative.

  }

  pause() {
    this.isActive = false; //changes active status to false

    return this; //returns the object that this belongs too. Allows you to chain methods together. i.e. Countdown.pause
  }

  reset() {
    this.isActive = false;
    this.elapsed = 0; //sets elapsed time to equal 0
  }

  setDuration(seconds) {
    this.lastFrameTime = Date.now();
    this.duration = seconds;

    return this;
  }

  start() {
    this.isActive = true;

    return this;
  }

  tick() { //function that is executed when clock is running
    const currentFrameTime = Date.now();
    const deltaTime = currentFrameTime - this.lastFrameTime; //the change in time equals the difference between the current time and the last timeframe
    this.lastFrameTime = currentFrameTime; //while ticking, this.lastFrameTime and currentFrameTime are the same

    if (this.isActive) { //if the clock is running
      this.elapsed += deltaTime / 1000; //constructor.elapsed = the change in time.
      //x +=y -> x = x + y.
      //elapsed time equals elapsed time plus the change in time.

      this.onTick(this.getTimeLeft()); //call onTick, calls getTimeLeft to return the timeleft (t)
      // this.getTimeLeft will be time later on

      if (this.getTimeLeft() <= 0) { //if the timer is 0
        this.pause(); //pause the clock
        this.onCompleted(); //clears onTick function ?
      }
    }

    window.requestAnimationFrame(this.tick.bind(this)); //bind sets the value of this regardless of how its called
    // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation
    // and requests that the browser calls a specified function to update an animation before the next repaint.
    //The method takes a callback as an argument to be invoked before the repaint.
    // i.e. calls this.tick before the next 'repaint'
    //The number of callbacks is usually 60 times per second
    //ensures that this is bound to the this inside of tick

  }
}

const countdown = new Countdown().setDuration(300);
//create a new countdown object

const label = document.querySelector('#time');
const scoreLabel = document.querySelectorAll('.score');

document.querySelector('#pause-btn').addEventListener('click', () => {
  countdown.pause(); //add pause function to pause button
});

document.querySelector('#reset-btn').addEventListener('click', () => {
  countdown.reset(); //add reset function to reset button
  label.innerHTML = '05:00'; //Math.ciel rounds up to nearest whole number. change the label to the timeLeft

//for loop to update all scores to 0 when reset button is clicked
	for (var i = 0; i <scoreLabel.length; i++) {
		scoreLabel[i].innerHTML = "0";
	}

	scoreBoard._home = 0;
	scoreBoard._away = 0;
	scoreBoard._homeadv = 0;
	scoreBoard._homepen = 0;
	scoreBoard._awayadv = 0;
	scoreBoard._awaypen = 0;
});

document.querySelector('#start-btn').addEventListener('click', () => {
  countdown.start(); //add start function to start button
});

countdown.onTick = (time) => { //coundown.onTick function (time) {...}

  minutes = countdown.minutes < 10 ? "0" + countdown.minutes : countdown.minutes;
  seconds = countdown.seconds < 10 ? "0" + countdown.seconds : countdown.seconds;

  if (countdown.minutes && countdown.seconds < 0) {
    label.innerHTML = "Match Over";
  } else {
    label.innerHTML = minutes + ':' + seconds;
    // Math.round(time); //while ticking, change the label to represent the time
    // //time is getTimeLeft()
  }
};

countdown.onCompleted = () => {
  console.log('DONE');
};





const scoreBoard = {

//point holders
  _round: 0,
  _home: 0,
  _homeadv: 0,
  _homepen: 0,
  _away: 0,
  _awayadv: 0,
  _awaypen: 0,
  range: [0, 99],

	//update point holders and text content
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

//method to increment or decrement points
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

//function to initialize checkRangeAndUpdate on button click
function init() {
  const container = document.querySelector('.scoreboard');
  container.addEventListener('click', function(e) {
    // run function with params that match the buttons id
    scoreBoard.checkRangeAndUpdate.apply(scoreBoard, scoreBoard[e.target.id]);
  });
}

//initialize function
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
