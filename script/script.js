'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function (n) {
  return isNaN(n);
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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 500000,
  period: 5,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {

    if (confirm('Есть ли у вас дополнительный заработок?')) {
      let itemIncome;
      const getItemIncome = function () {
        do {
          itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
        }
        while (!isString(itemIncome));
      };
      getItemIncome();
      let cashIncome;
      appData.income[itemIncome] = cashIncome;
      const getCashIncome = function () {
        do {
          cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
        }
        while (!isNumber(cashIncome));
      };
      getCashIncome();
    }

    let addExpenses;
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    appData.getInfoDeposit();
    const getAddExpenses = function () {
      do {
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      }
      while (!isString(addExpenses));
    };
    getAddExpenses();
    appData.addExpenses = addExpenses.toLowerCase().split(', ');

    for (let i = 0; i < appData.addExpenses.length; i++) {
      let word = appData.addExpenses[i];
      word = word.substr(0, 1).toUpperCase(0) + word.slice(1);
      appData.addExpenses[i] = word;
    }
    console.log(appData.addExpenses.join(", "));

    const getExpensesMonth = function () {
      let sum = 0;
      let keys;

      for (let i = 0; i < 2; i++) {
        do {
          keys = prompt('Введите обязательную статью расходов?');
        }
        while (!isString(keys));
        do {
          appData.expenses[keys] = +prompt('Во сколько это обойдется');
        }
        while (!isNumber(appData.expenses[keys]));
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
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент', 10);
      }
      while (!isNumber(appData.percentDeposit));
      appData.moneyDeposit = prompt('Какая сумма у вас в депозите', 10000);
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
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
console.log(appData.addExpenses);