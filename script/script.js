'use strict';
const start = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  allInputs = document.getElementsByTagName("input"),
  salary = document.querySelector(".salary-amount"),
  btnPlus = document.getElementsByTagName("button"),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  deposit = document.querySelector("#deposit-check"),
  addIncomeItem = document.querySelectorAll(".additional_income-item"),
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  expensesMonthValue = document.getElementsByClassName("expenses_month-value")[0],
  addIncomeValue = document.getElementsByClassName("additional_income-value")[0],
  addExpensesValue = document.getElementsByClassName("additional_expenses-value")[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonthValue = document.getElementsByClassName("target_month-value")[0],
  incomeTitle = document.querySelector(".income-title"),
  incomeAmount = document.querySelector(".income-amount"),
  expensesTitle = document.querySelector(".expenses-title");
let expensesItems = document.querySelectorAll(".expenses-items");
const addExpensesItem = document.querySelector(".additional_expenses-item"),
  depositBank = document.querySelector(".deposit-bank"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPersent = document.querySelector(".deposit-percent"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  periodAmount = document.querySelector(".period-amount");
let incomeItems = document.querySelectorAll(".income-items");



// запрет на использование букв
const takeNumbers = function () {
  let numbers = document.querySelectorAll('[placeholder="Сумма"]');
  for (let i = 0; i < Object.keys(numbers).length; i++) {
    numbers[i].addEventListener('input', function () {
      this.value = this.value.replace(/[^\d]/g, '');
    });
  }
};
takeNumbers();

// запрет на использование цифр и латинских букв
const takeWords = function () {
  let words = document.querySelectorAll('[placeholder="Наименование"]');
  for (let i = 0; i < Object.keys(words).length; i++) {
    words[i].addEventListener('input', function () {
      this.value = this.value.replace(/[\w]/g, '');
    });
  }
};
takeWords();


let isNumber = function (n) {
  return (!isNaN(parseFloat(n)) && isFinite(n));
};

let firstUpperCase = function (word) {
  word = word[0].toUpperCase() + word.substring(1).toLowerCase();
  return word;
};



const AppData = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDesopit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.start = function () {
  this.budget = +salary.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getBudget();
  this.getAddExpenses();
  this.getTargetMonth();
  this.calcPeriod();
  this.showResult();

};
AppData.prototype.showResult = function () {
  let _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  addExpensesValue.value = this.addExpenses.join(", ");
  addIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener("input", function () {
    incomePeriodValue.value = _this.calcPeriod();
  });
};

AppData.prototype.addExpensesBlock = function () {

  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.childNodes[1].value = "";
  cloneExpensesItem.childNodes[3].value = "";
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll(".expenses-items");
  if (expensesItems.length === 3) {
    expensesPlus.style.display = "none";
  }
  takeNumbers();
  takeWords();

};
AppData.prototype.getExpenses = function () {
  let _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[firstUpperCase(itemExpenses)] = cashExpenses;
    }
  }, _this);
};

AppData.prototype.addIncomeBlock = function () {

  let cloneIncomeItems = incomeItems[0].cloneNode(true);
  cloneIncomeItems.childNodes[1].value = "";
  cloneIncomeItems.childNodes[3].value = "";
  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    incomePlus.style.display = "none";
  }
  takeNumbers();
  takeWords();
};

AppData.prototype.getIncome = function () {
  let _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== "" && cashIncome !== "") {
      _this.income[firstUpperCase(itemIncome)] = cashIncome;
    }
  }, _this);

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getAddExpenses = function () {
  let _this = this;
  let addExpenses = addExpensesItem.value.split(", ");
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== "") {
      _this.addExpenses.push(firstUpperCase(item));
    }
  });
};

AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};

AppData.prototype.getBudget = function () {

  this.budgetMonth = ((this.budget - this.expensesMonth) + this.incomeMonth);
  this.budgetDay = Math.ceil(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {

  let target = (Math.ceil(targetAmount.value / this.budgetMonth));
  if (target > 0 && target !== Infinity) {
    return target;
  }
  else {
    return "Вам не достичь цели";
  }
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.changeRange = function () {
  periodAmount.innerHTML = periodSelect.value;
};
AppData.prototype.cancel = function () {
  start.style.display = "block";
  cancel.style.display = "none";

  for (let key in this) {
    switch (typeof (appData[key])) {
      case "string": appData[key] = ''; break;
      case "number": appData[key] = 0; break;
      case "boolean": appData[key] = false; break;
      case "object":
        if (Array.isArray(appData[key]) === true) {
          appData[key] = [];
        }
        else {
          appData[key] = {};
        }
        break;
    }
  }
  console.log(AppData);
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].removeAttribute('disabled');
    allInputs[i].value = "";
  }

};

AppData.prototype.addEventListeners = function () {
  const _this = this;
  const cancel1 = this.cancel.bind(this);

  expensesPlus.addEventListener('click', this.addExpensesBlock);

  incomePlus.addEventListener("click", this.addIncomeBlock);

  periodSelect.addEventListener("input", this.changeRange);

  start.addEventListener("click", function () {
    _this.start.apply(_this);
    salary.value = salary.value.trim();
    if (salary.value) {
      start.style.display = "none";
      cancel.style.display = "block";
      for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].setAttribute('disabled', 'disabled');
      }
    }
    else {
      alert('ошибка');
    }
  });

  cancel.addEventListener('click', this.cancel);

};

const appData = new AppData();

appData.addEventListeners();