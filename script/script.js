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

  inputLeft = classData.querySelectorAll('input[type=text]'),

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

  periodAmount = document.querySelector('.period-amount');

const AppData = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expenses = {};
};

AppData.prototype.start = function () {
  console.log(this);
  this.budget = +inputSalaryAmount.value;

  this.getExpenses();
  this.getIncome();

  this.getBudget();
  this.getTargetMonth();
  this.getStatusIncome();
  this.getAddIncome();
  this.getAddExpenses();
  this.showResult();

};

AppData.prototype.showResult = function () {
  budgetMonthClass.value = this.budgetMonth;
  budgetDayClass.value = this.budgetDay;
  expensesMonthClass.value = this.expensesMonth;
  additionalExpensesClass.value = this.addExpenses.join(', ');
  additionalIncomeClass.value = this.addIncome.join(', ');
  targetMonthClass.value = this.getTargetMonth() + ' месяцев';
  const _this = this;
  inputPeriodSelect.addEventListener('mousemove', function () {
    incomePeriodClass.value = _this.budgetMonth * periodAmount.textContent;
  });
};

AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItems = expensesItems[0].cloneNode(true);
  cloneExpensesItems.childNodes[1].value = "";
  cloneExpensesItems.childNodes[3].value = "";
  expensesItems[0].parentNode.insertBefore(cloneExpensesItems, plusButExpenses);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    plusButExpenses.style.display = 'none';
  }
};

AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItems = incomeItems[0].cloneNode(true);
  cloneIncomeItems.childNodes[1].value = "";
  cloneIncomeItems.childNodes[3].value = "";
  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plusButIncome);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    plusButIncome.style.display = 'none';
  }
};

AppData.prototype.getAddExpenses = function () {
  let addExpenses = inputAdditionalExpenses.value.split(',');
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  }, this);
};

AppData.prototype.getAddIncome = function () {
  inpIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  }, this);
};

AppData.prototype.getExpenses = function () {
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = +item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  }, this);
  for (var key in this.expenses) {
    this.expensesMonth += this.expenses[key];
  }
};

AppData.prototype.getIncome = function () {
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = +item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = cashIncome;
    }
  }, this);

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getPeriodAmount = function () {
  let result = inputPeriodSelect.value;
  periodAmount.innerText = result;

};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.ceil(this.budgetMonth / 30);

};

AppData.prototype.getTargetMonth = function () {
  return Math.ceil(inputTargetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function () {
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
};

AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент', 10);
    }
    while (!isNumber(this.percentDeposit));

    do {
      this.moneyDeposit = prompt('Какая сумма у вас в депозите');
    }
    while (!isNumber(this.moneyDeposit));
  }
};

AppData.prototype.reset = function () {
  let inputAll = document.querySelectorAll('input[type=text]');
  inputAll.forEach(function (item) {
    item.removeAttribute('disabled');
    item.value = null;
    AppData.income = {};
    AppData.incomeMonth = 0;
    AppData.addIncome = [];
    AppData.expenses = {};
    AppData.addExpenses = [];
    AppData.deposit = false;
    AppData.percentDeposit = 0;
    AppData.moneyDeposit = 0;
    AppData.budget = 0;
    AppData.budgetDay = 0;
    AppData.budgetMonth = 0;
    AppData.expensesMonth = 0;
  });

  expensesItems.forEach(function (item, index) {
    if (index !== 0) {
      item.remove();
      plusButExpenses.style.display = 'block';
    }
  });

  incomeItems.forEach(function (item, index) {
    if (index !== 0) {
      item.remove();
      plusButIncome.style.display = 'block';
    }
  });

  startBut.style.display = 'block';
  cancelBut.style.display = 'none';
};

const appData = new AppData();

AppData.prototype.eventListener = function () {

  const start = this.start.bind(appData);
  const reset = this.reset.bind(appData);
  console.log(this);
  cancelBut.addEventListener('click', reset);
  startBut.addEventListener('click', function () {
    if (inputSalaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
    }
    else {

      start();
      startBut.style.display = 'none';
      cancelBut.style.display = 'block';
      const inputLeft = classData.querySelectorAll('input[type=text]');
      inputLeft.forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
      });
    }
  });

  plusButExpenses.addEventListener('click', appData.addExpensesBlock);

  plusButIncome.addEventListener('click', appData.addIncomeBlock);

  inputPeriodSelect.addEventListener('mousemove', appData.getPeriodAmount);
};

AppData.prototype.eventListener();