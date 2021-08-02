let money = 30000;
let income = 'фриланс';
let addExpenses = 'Интернет, Топливо, Сигареты, Комуналка';
let deposit = true;
let mission = 500000;
let period = 8;
let budgetDay = money / 30;


money = +prompt('Ваш месячный доход');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется');
let budgetMonth = money - (amount1 + amount2);
let month = Math.ceil(mission / budgetMonth);
budgetDay = Math.floor(budgetMonth / 30);

console.log(budgetMonth);
console.log(month);

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


console.log('Привет мир!');
console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей!');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);

