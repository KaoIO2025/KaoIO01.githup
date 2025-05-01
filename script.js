// โหลดข้อมูลตอนเปิดหน้า
document.addEventListener('DOMContentLoaded', loadTransactions);

document.getElementById('transaction-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const transactionType = document.getElementById('transaction-type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    if (!date || amount <= 0) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
    }

    const transaction = {
        id: Date.now(),
        type: transactionType,
        amount,
        description,
        date
    };

    addTransactionToTable(transaction);
    saveTransaction(transaction);
    updateTotals();

    // เคลียร์ช่องกรอก
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
});

function addTransactionToTable(transaction) {
    const table = document.getElementById('transaction-list').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.setAttribute('data-id', transaction.id);

    row.innerHTML = `
        <td>${transaction.type === 'income' ? 'รายรับ' : 'รายจ่าย'}</td>
        <td>${transaction.amount.toFixed(2)} บาท</td>
        <td>${transaction.description}</td>
        <td>${transaction.date}</td>
        <td><button class="delete-btn">ลบ</button></td>
    `;

    row.querySelector('.delete-btn').addEventListener('click', function () {
        deleteTransaction(transaction.id);
        row.remove();
        updateTotals();
    });
}

function saveTransaction(transaction) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactions() {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(addTransactionToTable);
    updateTotals();
}

function deleteTransaction(id) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = transactions.filter(tran => tran.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateTotals() {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let income = 0;
    let expense = 0;

    transactions.forEach(tran => {
        if (tran.type === 'income') {
            income += tran.amount;
        } else {
            expense += tran.amount;
        }
    });

    document.getElementById('total-income').innerText = income.toFixed(2);
    document.getElementById('total-expense').innerText = expense.toFixed(2);
    document.getElementById('net-total').innerText = (income - expense).toFixed(2);
}

