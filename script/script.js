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
    const getExpensesMonth = function () {
      let sum = 0;
      let keys;
      for (let i = 0; i < 2; i++) {
        keys = prompt('Введите обязательную статью расходов?');
        appData.expenses[keys] = +prompt('Во сколько это обойдется');
        while (!isNumber(sum)) {
          appData.expenses[keys] = +prompt('Во сколько это обойдется');
        }

      }

      for (var key in appData.expenses) {
        appData.expensesMonth += appData.expenses[key];
      }
      console.log(appData.expensesMonth);
      return appData.expensesMonth;

    };
    getExpensesMonth();
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    }
    else if (appData.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    }
    else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
      return ('У вас низкий уровень дохода');
    }
    else if (appData.budgetDay <= 0) {
      return ('Что то пошло не так');
    }
  }
};

appData.asking();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Ваши траты за месяц ' + appData.expensesMonth);

if (appData.getTargetMonth() < 0) {
  console.log('Вы не достигните результата');
}
else if (appData.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за ' + appData.getTargetMonth() + 'месяц(а)');
}

console.log(appData.getStatusIncome());