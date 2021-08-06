'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  }

  while (!isNumber(money));
};
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 500000,
  period: 5,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  }
};

const showTypeOf = function (data) {
  console.log(data, typeof (data));
};

const getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    appData.expenses[i] = prompt('Введите обязательную статью расходов?');
    sum += +prompt('Во сколько это обойдется');
    while (!isNumber(sum)) {
      sum = +prompt('Во сколько это обойдется');
    }
  }
  console.log(appData.expenses);
  return sum;
};

let expensesMount = getExpensesMonth();

const getAccumulatedMonth = function () {
  return money - expensesMount;
};

const accumulatedMonth = getAccumulatedMonth();
const month = Math.ceil(appData.mission / accumulatedMonth);
const budgetDay = Math.floor(accumulatedMonth / 30);

const getTargetMonth = function () {
  return Math.ceil(appData.mission / accumulatedMonth);
};
if (getTargetMonth() < 0) {
  return ('Вы не достигните результата');
}
else if (getTargetMonth() > 0) {
  return ('Цель будет достигнута за ' + getTargetMonth());
}

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


showTypeOf(money);
showTypeOf(appData.income);
showTypeOf(appData.deposit);
console.log('Ваши траты за месяц ' + expensesMount);
console.log(getStatusIncome());