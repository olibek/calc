'use strict';

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = function (n) {
  return isNaN(n);
};

let incomeItems = document.querySelectorAll('.income-items'),
  inputDepositCheck = document.getElementById('deposit-check'),
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

  inputDepositAmount = document.querySelector('.deposit-amount'),

  inputDepositPercent = document.querySelector('.deposit-percent'),

  inputTargetAmount = document.querySelector('.target-amount'),

  inputPeriodSelect = document.querySelector('.period-select'),

  depositBank = document.querySelector('.deposit-bank'),

  depositAmount = document.querySelector('.deposit-amount'),

  depositPercent = document.querySelector('.deposit-percent'),

  periodAmount = document.querySelector('.period-amount');

const rusWord = function () {
  let words = document.querySelectorAll('[placeholder="Наименование"]');
  for (let i = 0; i < Object.keys(words).length; i++) {
    words[i].addEventListener('input', function () {
      this.value = this.value.replace(/[\w]/g, '');
    });
  }
};

rusWord();

const inputNumb = function () {
  let numbers = document.querySelectorAll('[placeholder="Сумма"]');
  for (let i = 0; i < Object.keys(numbers).length; i++) {
    numbers[i].addEventListener('input', function () {
      this.value = this.value.replace(/[^\d]/g, '');
    });
  }
  depositPercent.addEventListener('input', function () {
    this.value = this.value.replace(/[^\d]/g, '');
    if (depositPercent.value > 100) {
      depositPercent.value = 100;
    }
  });

};

inputNumb();

class AppData {
  constructor() {
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
  }
  start() {
    if (inputSalaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
    }
    else {
      startBut.disabled = false;
      startBut.style.display = 'none';
      cancelBut.style.display = 'block';
      const inputLeft = classData.querySelectorAll('input[type=text]');
      inputLeft.forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
      });
      this.budget = +inputSalaryAmount.value;

      this.getExpenses();
      this.getIncome();
      this.getInfoDeposit();

      this.getBudget();
      this.getTargetMonth();
      this.getStatusIncome();
      this.getAddIncome();
      this.getAddExpenses();
      this.showResult();
    }

  }

  showResult() {
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
  }

  addExpensesBlock() {
    const cloneExpensesItems = expensesItems[0].cloneNode(true);
    cloneExpensesItems.childNodes[1].value = "";
    cloneExpensesItems.childNodes[3].value = "";
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, plusButExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      plusButExpenses.style.display = 'none';
    }
  }

  addIncomeBlock() {
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    cloneIncomeItems.childNodes[1].value = "";
    cloneIncomeItems.childNodes[3].value = "";
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plusButIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      plusButIncome.style.display = 'none';
    }
  }

  getAddExpenses() {
    const addExpenses = inputAdditionalExpenses.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    inpIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = +item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }

  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = +item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getPeriodAmount() {
    const result = inputPeriodSelect.value;
    periodAmount.innerText = result;

  }

  getBudget() {

    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);

  }

  getTargetMonth() {
    return Math.ceil(inputTargetAmount.value / this.budgetMonth);
  }

  getStatusIncome() {
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
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;

    }
  }
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';

    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
  }
  depositHandler() {
    if (inputDepositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      depositPercent.value = '';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);

    } else {

      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';

      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  reset() {
    const inputAll = document.querySelectorAll('input[type=text]');
    inputAll.forEach((item) => {
      item.removeAttribute('disabled');
      item.value = null;
      this.income = {};
      this.incomeMonth = 0;
      this.addIncome = [];
      this.expenses = {};
      this.addExpenses = [];
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;
      inputDepositCheck.checked = false;
    });

    expensesItems.forEach((item, index) => {
      if (index !== 0) {
        item.remove();
        plusButExpenses.style.display = 'block';
      }
    });

    incomeItems.forEach((item, index) => {
      if (index !== 0) {
        item.remove();
        plusButIncome.style.display = 'block';
      }
    });

    startBut.style.display = 'block';
    cancelBut.style.display = 'none';
  }

  eventListener() {

    cancelBut.addEventListener('click', () => this.reset());
    startBut.addEventListener('click', () => this.start());

    plusButExpenses.addEventListener('click', this.addExpensesBlock);

    plusButIncome.addEventListener('click', this.addIncomeBlock);

    inputPeriodSelect.addEventListener('mousemove', this.getPeriodAmount);

    inputDepositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}


const appData = new AppData();

appData.eventListener();


