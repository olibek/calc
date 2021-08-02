// let money = 30000;
// let income = 'фриланс';
// let addExpenses = 'Интернет, Топливо, Сигареты, Комуналка';
// let deposit = true;
let mission = 500000;
let period = 8;
// let budgetDay = money / 30;
const money = +prompt('Ваш месячный доход');
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется');
const budgetMonth = money - (amount1 + amount2);
const month = Math.ceil(mission / budgetMonth);
const budgetDay = Math.floor(budgetMonth / 30);


if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
}
else if (budgetDay >= 600) {
  console.log('У вас средний уровень дохода');
}
else if (budgetDay < 600 && budgetDay > 0) {
  console.log('У вас низкий уровень дохода');
}
else if (budgetDay <= 0) {
  console.log('Что то пошло не так');
}


alert('Привет Мир!');


console.log(budgetMonth);
console.log(month);
console.log('Привет мир!');
console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей!');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);

