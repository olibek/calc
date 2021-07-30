let money = 30000;
let income = 3000;
let addExpenses = 'Интернет, Топливо, Сигареты, Комуналка';
let deposit = true;
let mission = 500000;
let period = 8;

alert('Привет Мир!');
console.log('Привет мир!');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей!');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

let budgetDay;
budgetDay = (money + income) / 30;
console.log(budgetDay);