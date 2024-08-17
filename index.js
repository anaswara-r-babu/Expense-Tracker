const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     {id:1, text:'flower', amount:-200},
//     {id:2, text:'salary', amount:30000},
//     {id:3, text:'book', amount:-150},
//     {id:4, text:'camera', amount:20000}
// ];

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

// Add transactions 
function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text :text.value,
            amount: +amount.value

        };
        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value ='';
        
    }
}

// generate random id 
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// add transaction to DOM list 
function addTransactionDOM(transaction) {
    // get sign 
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // add class based on value 
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// updates the balance icome and expense 
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);

    const income = amounts
                    .filter(item => item > 0)
                    .reduce((acc,item) => (acc += item),0).toFixed(2);

    const expense = (amounts.filter(item => item < 0)
                    .reduce((acc,item) => (acc += item),0) * -1).toFixed(2);
                
    balance.innerText = `₹${total}`;
    money_plus.innerText = `₹${income}`;
    money_minus.innerText = `₹${expense}`;

    
    
}

// remove transaction by id 
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id );

    updateLocalStorage();

    init();
}

// update local Storage transactions 
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app 
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit',addTransaction);










