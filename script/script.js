'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const income = 'фриланс';
const mission = 500000;
const period = 8;

let money;
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
let expenses = [];

let start = function () {
  do {
    money = +prompt('Ваш месячный доход?');
  }

  while (!isNumber(money));
};
start();

const showTypeOf = function (data) {
  console.log(data, typeof (data));
};

const getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt('Введите обязательную статью расходов?');
    sum += +prompt('Во сколько это обойдется');
    while (!isNumber(sum)) {
      sum = +prompt('Во сколько это обойдется');
    }
  }
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function () {
  return money - expensesAmount;
};

const accumulatedMonth = getAccumulatedMonth();
const month = Math.ceil(mission / accumulatedMonth);
const budgetDay = Math.floor(accumulatedMonth / 30);

const getTargetMonth = function () {
  return Math.ceil(mission / accumulatedMonth);
};


const getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  }
  else if (budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  }
  else if (budgetDay < 600 && budgetDay > 0) {
    return ('У вас низкий уровень дохода');
  }
  else if (budgetDay <= 0) {
    return ('Что то пошло не так');
  }
};

if (getTargetMonth() < 0) {
  console.log('Вы не достигните результата');
}
else {
  console.log('Цель будет достигнута за ' + getTargetMonth());
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Ваши траты за месяц ' + expensesAmount);
console.log(addExpenses.toLowerCase().split(', '));
console.log(getStatusIncome());