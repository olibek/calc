'use strict';

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = function (n) {
  return isNaN(n);
};

let startBut = document.getElementById('start'),

  plusButIncome = document.getElementsByTagName('button')[0],

  plusButExpenses = document.getElementsByTagName('button')[1],

  chekBoxDeposit = document.querySelector('#deposit-check'),

  inpIncomeItem = document.querySelectorAll('.additional_income-item'),

  budgetMonthClass = document.getElementsByClassName('budget_month-value')[0],

  budgetDayClass = document.getElementsByClassName('budget_day-value')[0],

  expensesMonthClass = document.getElementsByClassName('expenses_month-value')[0],

  additionalIncomeClass = document.getElementsByClassName('additional_income-value')[0],

  additionalExpensesClass = document.getElementsByClassName('additional_expenses-value')[0],

  incomePeriodClass = document.getElementsByClassName('income_period-value')[0],

  targetMonthClass = document.getElementsByClassName('target_month-value')[0],

  inputSalaryAmount = document.querySelector('.salary-amount'),

  inputIncome = document.querySelector('.income-title'),

  inputAmount = document.querySelector('.income-amount'),

  inputAdditionalIncome = document.querySelectorAll('.additional_income-item')[0],

  inputAdditionalIncomeTwo = document.querySelectorAll('.additional_income-item')[1],

  inputExpenses = document.querySelector('input.expenses-title'),

  expensesItems = document.querySelectorAll('.expenses-items'),

  inputAdditionalExpenses = document.querySelector('.additional_expenses-item'),

  inputDepositCheck = document.querySelector('#deposit-check'),

  inputDepositAmount = document.querySelector('.deposit-amount'),

  inputDepositPercent = document.querySelector('.deposit-percent'),

  inputTargetAmount = document.querySelector('.target-amount'),

  inputPeriodSelect = document.querySelector('.period-select'),

  incomeItems = document.querySelectorAll('.income-items'),

  periodAmount = document.querySelector('.period-amount'),

  appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function () {


      appData.budget = +inputSalaryAmount.value;
      console.log(appData.budget);

      appData.getExpenses();
      appData.getIncome();

      appData.getBudget();
      appData.getTargetMonth();
      appData.getStatusIncome();
      appData.getAddIncome();
      appData.getAddExpenses();
      appData.calcPeriod();
      appData.showResult();

    },
    showResult: function () {
      budgetMonthClass.value = appData.budgetMonth;
      budgetDayClass.value = appData.budgetDay;
      expensesMonthClass.value = appData.expensesMonth;
      additionalExpensesClass.value = appData.addExpenses.join(', ');
      additionalIncomeClass.value = appData.addIncome.join(', ');
      targetMonthClass.value = appData.getTargetMonth() + ' месяцев';
      const inc = function () {
        let n = incomePeriodClass.value = appData.calcPeriod();
        return n;
      };
      inputPeriodSelect.addEventListener('mousemove', inc);




    },
    addExpensesBlock: function () {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusButExpenses);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
        plusButExpenses.style.display = 'none';
      }
    },
    addIncomeBlock: function () {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusButIncome);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
        plusButIncome.style.display = 'none';
      }
    },
    getAddExpenses: function () {
      let addExpenses = inputAdditionalExpenses.value.split(',');
      addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      });
    },
    getAddIncome: function () {
      inpIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    },
    getExpenses: function () {
      expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = +item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
      for (var key in appData.expenses) {
        appData.expensesMonth += appData.expenses[key];
      }
    },
    getIncome: function () {
      incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = +item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
          appData.income[itemIncome] = cashIncome;
        }
      });
      // if (confirm('Есть ли у вас дополнительный заработок?')) {
      //   let itemIncome = prompt('Какой?', 'Таксую');
      //   let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      //   appData.income[itemIncome] = cashIncome;
      // }

      for (let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
      }
      console.log(appData.income);
    },
    getPeriodAmount: function () {
      let result = inputPeriodSelect.value;
      periodAmount.innerText = result;
      return result;
    },
    getBudget: function () {
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
      return Math.ceil(inputTargetAmount.value / appData.budgetMonth);
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

        do {
          appData.moneyDeposit = prompt('Какая сумма у вас в депозите');
        }
        while (!isNumber(appData.moneyDeposit));
      }
    },
    calcPeriod: function () {
      return appData.budgetMonth * appData.getPeriodAmount();
    }
  };

startBut.addEventListener('click', function () {
  if (inputSalaryAmount.value === '') {
    alert('Ошибка, поле должно "Месячный доход" быть заполнено');
  }
  else {
    appData.start();
  }
});


plusButExpenses.addEventListener('click', appData.addExpensesBlock);

plusButIncome.addEventListener('click', appData.addIncomeBlock);

inputPeriodSelect.addEventListener('mousemove', appData.getPeriodAmount);

// inputPeriodSelect.addEventListener('mousemove', appData.calcPeriod);



// console.log('Ваши траты за месяц ' + appData.expensesMonth);

// if (appData.getTargetMonth() < 0) {
//   console.log('Вы не достигните результата');
// }
// else if (appData.getTargetMonth() > 0) {
//   console.log('Цель будет достигнута за ' + appData.getTargetMonth() + 'месяц(а)');
// }

// console.log(appData.getStatusIncome());
// console.log(appData.addExpenses);