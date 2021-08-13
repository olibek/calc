'use strict';

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = function (n) {
  return isNaN(n);
};

let incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items');


const startBut = document.getElementById('start'),
  cancelBut = document.getElementById('cancel'),

  classData = document.getElementsByClassName('data')[0],

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

  inputAdditionalExpenses = document.querySelector('.additional_expenses-item'),

  inputDepositCheck = document.querySelector('#deposit-check'),

  inputDepositAmount = document.querySelector('.deposit-amount'),

  inputDepositPercent = document.querySelector('.deposit-percent'),

  inputTargetAmount = document.querySelector('.target-amount'),

  inputPeriodSelect = document.querySelector('.period-select'),

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


      this.budget = +inputSalaryAmount.value;
      console.log(this);

      this.getExpenses();
      this.getIncome();

      this.getBudget();
      this.getTargetMonth();
      this.getStatusIncome();
      this.getAddIncome();
      this.getAddExpenses();
      this.showResult();

    },
    showResult: function () {
      budgetMonthClass.value = this.budgetMonth;
      budgetDayClass.value = this.budgetDay;
      expensesMonthClass.value = this.expensesMonth;
      additionalExpensesClass.value = this.addExpenses.join(', ');
      additionalIncomeClass.value = this.addIncome.join(', ');
      targetMonthClass.value = this.getTargetMonth() + ' месяцев';
      inputPeriodSelect.addEventListener('mousemove', () => {
        incomePeriodClass.value = this.budgetMonth * periodAmount.textContent;
      });
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
      addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== '') {
          this.addExpenses.push(item);
        }
      });
    },
    getAddIncome: function () {
      inpIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
          this.addIncome.push(itemValue);
        }
      });
    },
    getExpenses: function () {
      expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = +item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          this.expenses[itemExpenses] = cashExpenses;
        }
      });
      for (var key in appData.expenses) {
        this.expensesMonth += this.expenses[key];
      }
    },
    getIncome: function () {
      incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = +item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
          this.income[itemIncome] = cashIncome;
        }
      });

      for (let key in this.income) {
        this.incomeMonth += +this.income[key];
      }
      console.log(this.income);
    },
    getPeriodAmount: function () {
      let result = inputPeriodSelect.value;
      periodAmount.innerText = result;
    },
    getBudget: function () {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.ceil(this.budgetMonth / 30);
    },
    getTargetMonth: function () {
      return Math.ceil(inputTargetAmount.value / this.budgetMonth);
    },
    getStatusIncome: function () {
      if (this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
      }
      else if (this.budgetDay >= 600) {
        return ('У вас средний уровень дохода');
      }
      else if (this.budgetDay < 600 && this.budgetDay > 0) {
        return ('У вас низкий уровень дохода');
      }
      else if (this.budgetDay <= 0) {
        return ('Что то пошло не так');
      }
    },
    getInfoDeposit: function () {
      if (this.deposit) {
        do {
          appData.percentDeposit = prompt('Какой годовой процент', 10);
        }
        while (!isNumber(this.percentDeposit));

        do {
          this.moneyDeposit = prompt('Какая сумма у вас в депозите');
        }
        while (!isNumber(this.moneyDeposit));
      }
    },
    reset: function () {
      let inputAll = document.querySelectorAll('input[type=text]');
      inputAll.forEach(item => {
        item.removeAttribute('disabled', 'disabled');
        item.value = '';
      });
      startBut.style.display = 'block';
      cancelBut.style.display = 'none';
    }
  };
cancelBut.addEventListener('click', appData.reset);
startBut.addEventListener('click', function () {
  if (inputSalaryAmount.value === '') {
    alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
  }
  else {

    appData.start.apply(appData);

    startBut.style.display = 'none';
    cancelBut.style.display = 'block';
    const inputLeft = classData.querySelectorAll('input[type=text]');
    inputLeft.forEach(item => {
      item.setAttribute('disabled', 'disabled');
    });
  }
});


plusButExpenses.addEventListener('click', appData.addExpensesBlock);

plusButIncome.addEventListener('click', appData.addIncomeBlock);

inputPeriodSelect.addEventListener('mousemove', appData.getPeriodAmount);


