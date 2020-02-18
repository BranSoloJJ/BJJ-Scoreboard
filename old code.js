//object for calculqtor
const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

//function to replace calculator.displayValue according to calculation

function inputDigit(digit) {
  const {
    displayValue
  } = calculator;


  calculator.displayValue = digit;
}

// function to read operator and perform next calculation

function handleOperator(nextOperator) {
  const {
    firstOperand,
    displayValue,
    operator
  } = calculator;
  const inputValue = parseFloat(displayValue);

  if (firstOperand == null && nextOperator == "+") {
    calculator.firstOperand = inputValue;
  } else if (firstOperand == null && nextOperator == "-") {
    calculator.firstOperand = (inputValue * (-1));
    calculator.displayValue = String("-" + inputValue);
  } else if (operator) {
    const result = performCalculation[nextOperator](firstOperand, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};


// function to change display
function updateDisplay() {
  const display = document.querySelector(".home-score");
  display.innerHTML = calculator.displayValue;
}

updateDisplay();

// function to recognize clicks

for (var i = 0; i < document.querySelectorAll(".score-btn").length; i++)

  document.querySelectorAll(".btn")[i].addEventListener("click", (event) => {
    const {
      target
    } = event;
    inputDigit(target.innerHTML.slice(1, 2));
    handleOperator(target.innerHTML.slice(0, 1));
    updateDisplay();
  });

// const keys = document.querySelector('.score-btn');
// keys.addEventListener('click', (event) => {
//     const {target} = event;
//     // if (target.classList.contains('add')) {
//     //     console.log('operator', target.innerHTML.slice (1,2)); // Maybe just need innerHTML instead of slice, and retrieve slice later
//     //     return;
//     // }
//
//     inputDigit(target.innerHTML.slice(1,2));
//     handleOperator(target.innerHTML.slice(0,1));
//     updateDisplay();
//
//     // if (target.classList.contains('min')) {
//     //   console.log('operator', target.innerHTML.slice (1,2));
//     //   return;
//     // }
// });
