'use strict';
const income = 'фриланс';
const mission = 500000;
const period = 8;

const money = +prompt('Ваш месячный доход');
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется');

const showTypeOf = function (data) {
  console.log(data, typeof (data));
};

const getExpensesMonth = function () {
  return amount1 + amount2;
};

const getAccumulatedMonth = function () {
  return money - getExpensesMonth();
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

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(getExpensesMonth());
console.log(addExpenses.toLowerCase().split(', '));
console.log(getTargetMonth());
console.log(budgetDay);
console.log(getStatusIncome());




