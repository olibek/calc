'use strict';

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = function (n) {
  return isNaN(n);
};

let money;

const start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  }

  while (!isNumber(money));
};
// start();

const startBut = document.getElementById('start');

const plusButIncome = document.getElementsByTagName('button')[0];

const plusButExpenses = document.getElementsByTagName('button')[1];

const chekBoxDeposit = document.querySelector('#deposit-check');

const inpIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetMonthClass = document.getElementsByClassName('budget_month-value'[0]);

const budgetDayClass = document.getElementsByClassName('budget_day-value'[0]);

const expensesMonthClass = document.getElementsByClassName('expenses_month-value'[0]);

const additionalIncomeClass = document.getElementsByClassName('additional_income-value'[0]);

const additionalExpensesClass = document.getElementsByClassName('additional_expenses-value'[0]);

const incomePeriodClass = document.getElementsByClassName('income_period-value'[0]);

const targetMonthClass = document.getElementsByClassName('target_month-value'[0]);

const inputSalaryAmount = document.querySelector('.salary-amount');

const inputIncome = document.querySelector('input.income-title');

const inputAmount = document.querySelector('.income-amount');

const inputAdditionalIncome = document.querySelectorAll('.additional_income-item')[0];

const inputAdditionalIncomeTwo = document.querySelectorAll('.additional_income-item')[1];

const inputExpenses = document.querySelector('input.expenses-title');

const inputExpensesAmount = document.querySelector('.expenses-amount');

const inputAdditionalExpenses = document.querySelector('.additional_expenses-item');

const inputDepositCheck = document.querySelector('#deposit-check');

const inputDepositAmount = document.querySelector('.deposit-amount');

const inputDepositPercent = document.querySelector('.deposit-percent');

const inputTargetAmount = document.querySelector('.target-amount');

const inputPeriodSelect = document.querySelector('.period-select');

const appData = {
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
    console.warn(appData.addExpenses);

    for (let i = 0; i < appData.addExpenses.length; i++) {
      let word = appData.addExpenses[i];
      word = word[0].toUpperCase(0) + word.slice(1);
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